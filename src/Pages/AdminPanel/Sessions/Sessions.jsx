import React, { useEffect, useState } from 'react'

import { useForm } from '../../../hooks/useForm'
import Input from '../../../Components/Form/Input'
import { minValidator } from '../../../Validators/Rules'
import swal from 'sweetalert'

export default function Sessions() {
    const [courses, setCourses] = useState([])
    const [sessionCourse, setSessionCourse] = useState('-1')
    const [sessionVideo, setSessionVideo] = useState({})
    const [formState, onInputHandler] = useForm({
        title: { value: '', isValid: false },
        time: { value: '', isValid: false }
    }, false)

    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses`)
            .then(respJSON => respJSON.json())
            .then(allCourses => {
                setCourses(allCourses)
            })
    }, [])

    const createSession = event => {
        event.preventDefault()
        let localStorageData = JSON.parse(localStorage.getItem('user'))
        let myFormData = new FormData()
        myFormData.append('title', formState.inputs.title.value)
        myFormData.append('time', formState.inputs.time.value)
        myFormData.append('free', 'رایگان')
        myFormData.append('video', sessionVideo)

        fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorageData.token}` },
            body: myFormData
        }).then(respJSON => {
            if(respJSON.ok){
                swal({title: 'جلسه موردنظر با موفقیت اضافه شد', icon: 'success', buttons: 'باشه'})
            }
        }).then(()=> console.log('all Sessions Received'))
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
        </>
    )
}
