import React from 'react'
import { Link } from 'react-router-dom'

export default function Contact({ contact, confirmDelete }) {
    return (
        <>
            <div className="col-md-6">
                <div className="card my-2">
                    <div className="card-body">
                        <div className="row align-items-center justify-content-around">
                            <div className="col-3">
                                <img src={contact.photo ? contact.photo : 'https://via.placeholder.com/200'} alt='' className='img-fluid rounded contacts_img' />
                            </div>
                            <div className="col-8 ">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-dark">
                                        نام و نام‌خانوادگی :
                                        <span className='fw-bold'> {contact.fullname}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark">
                                        شماره تلفن :
                                        <span className='fw-bold'> {contact.mobile}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark">
                                        ایمیل :
                                        <span className='fw-bold'> {contact.email}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-1 d-flex flex-column align-items-center">
                                <Link type='button' to={`/contacts/${contact.id}`} className='btn btn_eye my-1'>
                                    <i className="bi bi-eye"></i>
                                </Link>
                                <Link to={`/contacts/edit/${contact.id}`} className='btn btn_pencil my-1'>
                                    <i className="bi bi-pencil"></i>
                                </Link>
                                <button onClick={confirmDelete} className='btn btn_trash3 my-1'>
                                    <i className="bi bi-trash3"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
