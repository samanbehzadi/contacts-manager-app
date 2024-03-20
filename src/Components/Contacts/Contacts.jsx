import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Contact from './Contact'
import './Contacts.css'


export default function Contacts({contacts, loading, confirmDelete}) {
  
    return (
        <>
            <div className='container-fluid'>
                <div className="row d-flex justify-content-center">
                    {/* <div className="col"> */}
                    {/* <p className="h3"> */}
                    <Link to='contacts/add-contact' className='btn mx-auto rounded-pill create_new_contact_btn' title='مخاطب جدید'>
                        {/* مخاطب جدید */}
                        <i className="bi bi-person-plus mx-1 fs-3"></i>
                    </Link>
                    {/* </p> */}
                    {/* </div> */}
                </div>
                {loading ? <Loading />
                    :
                    (
                        <div className="row">
                            {contacts.length !== 0 ? contacts.map(contact => (
                                <>
                                    <Contact key={contact.id} contact={contact}  confirmDelete={() => confirmDelete(contact.id)}/>
                                </>
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
