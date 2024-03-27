import React from 'react'
import { useContext } from 'react'
import { ContactContext } from '../../Context/contactContext'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Contact from './Contact'
import './Contacts.css'


export default function Contacts() {
    const {filteredContacts, loading, deleteContact} = useContext(ContactContext)
    return (
        <>
            <div className='container-fluid'>
                <div className="row d-flex justify-content-center">
                    <Link to='contacts/add-contact' className='btn mx-auto rounded-pill create_new_contact_btn' title='مخاطب جدید'>
                        <i className="bi bi-person-plus mx-1 fs-3"></i>
                    </Link>
                </div>
                {loading ? <Loading />
                    :
                    (
                        <div className="row">
                            {filteredContacts.length !== 0 ? filteredContacts.map(contact => (
                                    <Contact key={contact.id} contact={contact}  confirmDelete={() => deleteContact(contact.id)}/>
                            ))
                                :
                                <div className="text-center my-3">
                                    <div className="alert alert-danger" role="alert">
                                        <strong>مخاطبی وجود ندارد</strong>
                                        <i className='my-3 d-block'>لطفا از راه اندازی سرور اطمینان پیدا کنید</i>
                                    </div>
                                </div>
                            }
                        </div>
                    )}
            </div>

        </>
    )
}
