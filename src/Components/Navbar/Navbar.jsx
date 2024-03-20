import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Search from '../Search/Search'
import './Navbar.css'

export default function Navbar({ query, search }) {
    const location = useLocation()
    return (
        <nav className='navbar navbar-dark  navbar-expand-sm text-white'>
            <div className="container-fluid">
                <div className="row mx-auto justify-content-evenly contact_container align-items-center p-2">
                    <div className="col">
                        <Link className='text-white' to='/'>
                            <div className="navbar-brand">
                                <i className="bi bi-person-square ms-3 fs-5"></i>
                                <span>مخاطبین</span>
                            </div>
                        </Link>
                    </div>
                    {location.pathname === '/' ? (
                        <div className="col">
                            <Search query={query} search={search} />
                        </div>
                    ) : null}
                </div>
            </div>
        </nav>
    )
}
