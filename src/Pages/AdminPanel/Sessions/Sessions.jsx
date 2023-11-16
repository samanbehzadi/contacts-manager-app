import React, { useEffect, useState } from 'react'

import { useForm } from '../../../hooks/useForm'
import Input from '../../../Components/Form/Input'
import { minValidator } from '../../../Validators/Rules'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

import swal from 'sweetalert'

export default function Sessions() {
    const [courses, setCourses] = useState([])
    const [sessions, setSessions] = useState([])
    const [isSessionFree, setIsSessionFree] = useState('0')
    const [sessionCourse, setSessionCourse] = useState('-1')
    const [sessionVideo, setSessionVideo] = useState({})
    const [formState, onInputHandler] = useForm({
        title: { value: '', isValid: false },
        time: { value: '', isValid: false }
    }, false)

    useEffect(() => {
        getAllSessions()

        fetch(`http://localhost:4000/v1/courses`)
            .then(respJSON => respJSON.json())
            .then(allCourses => {
                setCourses(allCourses)
            })
    }, [])

    function getAllSessions() {
        fetch(`http://localhost:4000/v1/courses/sessions`)
            .then(respJSON => respJSON.json())
            .then(allSessions => {
                setSessions(allSessions)
            })
    }
    
    const createSession = event => {
        event.preventDefault()
        let localStorageData = JSON.parse(localStorage.getItem('user'))
        let myFormData = new FormData()
        myFormData.append('title', formState.inputs.title.value)
        myFormData.append('time', formState.inputs.time.value)
        myFormData.append('free', isSessionFree)
        myFormData.append('video', sessionVideo)

        fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorageData.token}` },
            body: myFormData
        }).then(respJSON => {
            if (respJSON.ok) {
                swal({ title: 'جلسه موردنظر با موفقیت اضافه شد', icon: 'success', buttons: 'باشه' })
            }
        }).then(() => getAllSessions())
    }

    const removeSession = (sessionID) => {
        let localStorageData = JSON.parse(localStorage.getItem('user'))
        swal({
            title: "آیا از حذف این جلسه اطمینان دارید؟", icon: 'warning', buttons: ["خیر", "بلی"]
        })
            .then(result => {
                if (result) {
                    fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${localStorageData.toekn}` }
                    }).then(respJSON => {
                        if (respJSON.ok) {
                            swal({ title: 'جلسه موردنظر با موفقیت حذف شد', icon: 'success', buttons: 'باشه' })
                        }
                    }).then(() => getAllSessions())
                }
            })
    }

    return (
        <>
            <div className="containerf" id='home-content'>
                <div className="container">
                    <div className="home-title">
                        <span>افزودن جلسه جدید</span>
                    </div>
                    <form className='form row'>
                        <div className="col-6">
                            <div className="name input">
                                <label className='input-title'>عنوان جلسه</label>
                                <Input element="input" onInputHandler={onInputHandler} validations={[minValidator(3)]} id='title' type="text" className='w-100' />
                                <span className='error-message text-danger'></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className='input-title'>مدت زمان جلسه</label>
                                <Input element="input" onInputHandler={onInputHandler} validations={[minValidator(4)]} id='time' type="text" className='w-100' />
                                <span className='error-message text-danger'></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="price input">
                                <label className='input-title ms-2'>دوره</label>
                                <select onChange={e => setSessionCourse(e.target.value)}>
                                    <option value={setCourses}>دوره مورد‌نظر را انتخاب کنید</option>
                                    {courses.map(course => (
                                        <option key={course._id} value={course._id}>{course.name}</option>
                                    ))}
                                </select>
                                <span type="text" /><span className='error-message text-danger'></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className='input-title'>فایل ویدیو جلسه</label>
                                <input type="file" className='me-3' onChange={e => setSessionVideo(e.target.files[0])} />
                                <span className='error-message text-danger'></span>
                            </div>
                        </div>
                        <div className="col-6">
                                <div className="bottom-form">
                                    <div className="status">
                                        <label className="input-title  mb-3 ">وضعیت دوره</label>
                                        <div className="radios">
                                            <div className="available">
                                                <label className="ps-5">
                                                    <span className="fw-lighter f ms-3" style={{ fontSize: "15px" }} >
                                                        غیررایگان
                                                    </span>
                                                    <input onInput={(event) => setIsSessionFree(event.target.value)} className="ms-5" type="radio" value='0' name="condition"
                                                    />

                                                    <span className="fw-lighter f ms-3" style={{ fontSize: "15px" }} >
                                                        رایگان
                                                    </span>
                                                    <input onInput={(event) => setIsSessionFree(event.target.value)} className="ms-5" type="radio" value='1' name="condition"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        <div className="col-12">
                            <div className="bottom-form">
                                <div className="submit-btn">
                                    <input type="submit" value='افزودن' onClick={createSession} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <DataTable title="جلسات">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>مدت زمان</th>
                            <th>دوره</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{session.title}</td>
                                <td>{session.time}</td>
                                <td>{session.course.name}</td>
                                <td>
                                    <button type="button" className="btn btn-primary edit-btn">
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button" className="btn btn-danger delete-btn" onClick={() => removeSession(session._id)}>
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
