import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'

import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function Menus() {
    const [menus, setMenus] = useState([])
    const [newMenuParent, setNewMenuParent] = useState('-1')
    const [newMenuTitle, setNewMenuTitle] = useState('')
    const [newMenuHref, setNewMenuHref] = useState('')

    useEffect(() => {
        getAllMenus()
    }, [])

    function getAllMenus() {
        fetch(`http://localhost:4000/v1/menus/all`)
            .then(respJSON => respJSON.json())
            .then(allMenus => setMenus(allMenus))
    }

    const removeMenu = menuID => {
        let localStorageData = JSON.parse(localStorage.getItem('user'))
        swal({ title: 'آیا از حذف این منو اطمینان دارید؟', icon: 'warning', buttons: ['خیر', 'بله'] })
            .then(response => {
                if (response) {
                    fetch(`http://localhost:4000/v1/menus/${menuID}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${localStorageData.token}` }
                    })
                        .then(respJSON => {
                            if (respJSON.ok) {
                                swal({ title: 'منو موردنظر با موفقیت حذف شد', icon: 'success', buttons: 'متوجه‌ام' })
                            }
                            else { swal({ title: 'عملیات ناموفق', icon: 'danger', buttons: 'تلاش دوباره' }) }
                        })
                        .then(() => getAllMenus())
                }
            })
    }

    const createNewMenu = event => {
        event.preventDefault()
        const newMenuInfo = {
            title: newMenuTitle,
            href: newMenuHref,
            parent: newMenuParent === '-1' ? undefined : newMenuParent
        }
        fetch(`http://localhost:4000/v1/menus`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMenuInfo)
        }).then(response => {
            if (response.ok) {
                swal({ title: 'منوی جدید با موفقیت اضافه شد', icon: 'success', buttons: 'باشه' })
                getAllMenus()
            } else { swal({ title: "خطایی رخ داد", icon: 'warning', buttons: 'تلاش دوباره' }) }
        })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <form className="form row">
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title">عنوان منو</label>
                                <input type="text" className="px-2 mx-3 w-100" id="name" onChange={e => setNewMenuTitle(e.target.value)} />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title">لینک منو</label>
                                <input type="text" className="px-2 mx-3 w-100" id="name" onChange={event => setNewMenuHref(event.target.value)} />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        {/* <div className="col-6">
                            <div className="name input">
                                <label className="input-title">لینک منو</label>
                                <input id='href' onChange={e => setMenuHref(e.target.value)} type="text" className="px-2 mx-3 w-100" id="name"
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div> */}
                        <select className='col-2 mt-3 select' onChange={event => setNewMenuParent(event.target.value)}>
                            <option value='-1'>لطفا منوی اصلی را انتخاب کنید</option>
                            {menus.map(menu => (
                                <>
                                    {!Boolean(menu.parent) && (<option value={menu._id}>{menu.title}</option>)}
                                </>
                            ))}
                        </select>
                        <div className="col-12">
                            <div className="bottom-form">
                                <div className="submit-btn">
                                    <input type="submit" value="افزودن" onClick={createNewMenu} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <DataTable title='منوها' />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>شناسه</th>
                        <th>عنوان</th>
                        <th>لینک</th>
                        <th>فرزند</th>
                        <th>ویرایش</th>
                        <th>حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {menus.map((menu, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{menu.title}</td>
                            <td>{menu.href}</td>

                            {/* insert icon in condision using parantheses */}
                            <td>{menu.parent ? menu.parent.title : (<i className='fa fa-cross'></i>)}</td>
                            <td>
                                <button type="button" className="btn btn-primary edit-btn">
                                    ویرایش
                                </button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger delete-btn" onClick={() => removeMenu(menu._id)} >
                                    حذف
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
