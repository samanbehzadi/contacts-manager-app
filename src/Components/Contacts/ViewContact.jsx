import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { ContactContext } from '../../Context/contactContext'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'


export default function ViewContact() {
    const { contactId } = useParams()
    const [state, setState] = React.useState({ contact: {}, group: {} })
    const {loading, setLoading} = useContext(ContactContext)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                /* assign data to a variable using Object Destructuring
                 const { data: contactsData } = await axios.get(`http://localhost:9000/contacts/${contactId}`)
                const {data: groupsData } = await axios.get(`http://localhost:9000/groups/${contactData.data.group}`)*/
                
                let contactData = await axios.get(`http://localhost:9000/contacts/${contactId}`)
                let groupData = await axios.get(`http://localhost:9000/groups/${contactData.data.group}`)
                
                setLoading(false)
                setState({ ...state, contact: contactData.data, group: groupData.data })                
            } catch (err) {
                console.log(err.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const {  contact, group } = state
    return (
        <>
            <div className="container-fluid">
                <section className="view-contact-intro p-2">
                    <div className="my-2 text-center">
                        <p className="fs-5 fw-bold">اطلاعات مخاطب</p>
                    </div>
                </section>
                <hr className='text-danger' />
                {loading ?
                    <Loading />
                    : (
                        <>
                            {Object.keys(contact).length > 0 && (
                                <div className="container">
                                    <div className="row justify-content-center mt-5">
                                        <div className="col-md-3">
                                        <img src={contact.photo ? contact.photo : '/images/FastFood/client1.jpg'}  width='auto' height='auto' className='img-fluid rounded' alt={contact.fullname} />
                                        </div>
                                        <div className="col-md-7">
                                            <ul className="list-group">
                                                <li className="list-group-item list-group-item-dark">
                                                    نام و نام‌خانوادگی :
                                                    <span className="fw-bold"> {contact.fullname}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-dark">
                                                    شماره تلفن :
                                                    <span className="fw-bold"> {contact.mobile}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-dark">
                                                    ایمیل :
                                                    <span className="fw-bold"> {contact.email}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-dark">
                                                    شغل :
                                                    <span className="fw-bold"> {contact.job}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-dark">
                                                    گروه :
                                                    <span className="fw-bold"> {group.name}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <Link to='/' className='btn btn-outline-purple rounded-pill mt-5 border w-25'>
                                            <i className='bi bi-arrow-left fs-4'></i>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
            </div>
        </>
    )
}
