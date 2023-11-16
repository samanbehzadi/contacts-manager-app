import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import './Contact.css'

export default function Contact() {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        getAllContacts()
    }, [])

    function getAllContacts() {
        fetch(`http://localhost:4000/v1/contact`)
            .then(respJSON => respJSON.json())
            .then(allContacts => {
                setContacts(allContacts)
            })
    }

    const showContactBody = (contactBody) => {
        swal({ buttons: 'بستن', text: contactBody })
    }

    const sendAnswerToUser = (contactEmail) => {
        let localStorageData = JSON.parse(localStorage.getItem('user'))
        swal({ title: 'متن پاسخ', content: 'input', buttons: 'ارسال' })
            .then(answerResult => {
                const answerInfo = { email: contactEmail, answer: answerResult }
                fetch(`http://localhost:4000/v1/contact/answer`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'applicaton/json', 'Authorization': `Bearer ${localStorageData.token}` },
                    body: JSON.stringify(answerInfo)
                }).then(respJSON => {
                    console.log(respJSON);
                    if (respJSON.ok) {
                        getAllContacts()
                        return respJSON.json()
                    }
                }).then(result => console.log('Result:', result))
            })
    }

    const removeContact = (contactID) => {
        let localStorageData = JSON.parse(localStorage.getItem('user'))
        swal({ title: "آیا از حذف این پیام اطمینان دارید؟", icon: 'warning', buttons: ['خیر', 'بله'] })
            .then(result => {
                if(result){
                    fetch(`http://localhost:4000/v1/contact/${contactID}`, {
                        method: "DELETE",
                        headers: { 'Authorization': `Bearer ${localStorageData.token}` }
                    }).then(response => {
                        if (response.ok) {
                            swal({ text: "پیام موردنظر با موفقیت حذف شد", icon: 'success', buttons: 'باشه' })
                        }
                    }).then(() => getAllContacts())
                }
            })
    }

    return (
        <>
            <DataTable title="لیست پیغام ها">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>نام و نام خانوادگی</th>
                            <th>ایمیل</th>
                            <th>شماره تماس</th>
                            <th>مشاهده </th>
                            <th>پاسخ</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr>
                                <td className={`bg bg-${contact.answer === 0 ? 'danger' : 'success'}`}>{index + 1}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <button type="button" className="btn btn-primary edit-btn" onClick={() => showContactBody(contact.body)}>
                                        مشاهده
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-info delete-btn"
                                        onClick={() => sendAnswerToUser(contact.email)}>
                                        پاسخ
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger delete-btn"
                                        onClick={() => removeContact(contact._id)}>
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}
