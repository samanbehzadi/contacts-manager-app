import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../../Components/AdminPanel/Sidebar/Sidebar'
import Topbar from '../../Components/AdminPanel/Topbar/Topbar'

import './index.css'

export default function AdminPanel() {
    return (
        <>
        <div className="content">

            <Sidebar />
                <div className="col-10" id="home">
                    <Topbar />
                </div>
            <Outlet />
        </div>
        </>
    )
}
