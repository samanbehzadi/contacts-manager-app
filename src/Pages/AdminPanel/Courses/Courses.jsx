import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "../../../Validators/Rules";

import "./Courses.css";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [courseCategory, setCourseCategory] = useState("-1");
    const [categories, setCategories] = useState([]);
    const [courseStatus, setCourseStatus] = useState('start')
    const [courseCover, setCourseCover] = useState('')
    const [formState, onInputHandler] = useForm({
        name: { value: "", isValid: false },
        description: { value: "", isValid: false },
        shortName: { value: "", isValid: false },
        price: { value: "", isValid: false },
        support: { value: "", isValid: false }
    }, false
    );
    let localStorageData = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getAllCourses();
        fetch(`http://localhost:4000/v1/category`)
            .then(respJSON => respJSON.json())
            .then(result => setCategories(result));
    }, []);

    function getAllCourses() {
        let localStorageData = localStorage.getItem("user");
        fetch(`http://localhost:4000/v1/courses`, {
            headers: { Authorization: `Bearer ${localStorageData.token}` }
        })
            .then(respJSON => respJSON.json())
            .then(result => {
                setCourses(result);
            });
    }

    const removeCourseHandler = courseID => {
        swal({
            title: "آیا از حذف این دوره اطمینان دارید",
            icon: "warning",
            buttons: ["خیر", "بله"]
        }).then(result => {
            if (result) {
                fetch(`http://localhost:4000/v1/courses/${courseID}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${localStorageData.token}` }
                }).then(response => {
                    if (response.ok) {
                        swal({
                            title: "دوره مورد‌نظر با موفقیت حذف شد",
                            icon: "success",
                            buttons: "باشه"
                        });
                        getAllCourses();
                    } else {
                        swal({
                            title: "دوره مورد‌نظر با خطا مواجه شد",
                            icon: "error",
                            buttons: "باشه"
                        });
                    }
                });
            }
        });
    };

    const selectCategoryHandler = event => {
        setCourseCategory(event.target.value)

    };

    const addNewCourse = event => {
        event.preventDefault()
        let formData = new FormData()
        formData.append('name', formState.inputs.name.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('shortName', formState.inputs.shortName.value)
        formData.append('categoryID', courseCategory)
        formData.append('price', formState.inputs.price.value)
        formData.append('support', formState.inputs.support.value)
        formData.append('status', courseStatus)
        formData.append('cover', courseCover)

        if (courseCategory === '-1') {
            swal({ title: 'لطفا دسته‌بندی موردنظر را وارد نمایید', icon: 'error', buttons: 'متوجه‌شدم' })
        } else {
            fetch(`http://localhost:4000/v1/courses`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${localStorageData.token}` },
                body: formData,
            }).then(respJSON => {
                // respJSON.json()
                console.log('respJSO', respJSON);
                if (respJSON.ok) {
                    swal({ title: 'دوره جدید با موفقیت اضافه شد', icon: 'success', buttons: 'باشه' })
                }
            }).then(() => getAllCourses())
                .catch(err => console.log('Error for this', err))

        }
    }


    return (
        <>
            <div className="container-fluid" id="home-content">
                <div className="container">
                    <div className="home-title">
                        <span>افزودن دوره جدید</span>
                        <form className="form row">
                            <div className="col-6">
                                <div className="name input">
                                    <label className="input-title ps-3">نام دوره</label>
                                    <Input
                                        className='w-100 px-2'
                                        id="name"
                                        element="input"
                                        onInputHandler={onInputHandler}
                                        validations={[minValidator(5)]}
                                        type="text"
                                        placeholder="نام دوره"
                                        isValid="false"
                                    />
                                    <span className="error-message text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="name input">
                                    <label className="input-title ps-3">توضیحات دوره</label>
                                    <Input
                                        className='w-100 px-2'
                                        id="description"
                                        element="input"
                                        onInputHandler={onInputHandler}
                                        validations={[minValidator(5)]}
                                        type="text"
                                        placeholder="توضیحات دوره"
                                    />
                                    <span className="error-message text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="name input">
                                    <label className="input-title ps-3">قیمت دوره</label>
                                    <Input
                                        className='w-100 px-2'
                                        id="price"
                                        element="input"
                                        onInputHandler={onInputHandler}
                                        validations={[minValidator(5)]}
                                        type="text"
                                        placeholder="قیمت دوره"
                                    />
                                    <span className="error-message text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="name input">
                                    <label className="input-title ps-3">لینک کوتاه دوره</label>
                                    <Input
                                        className='w-100 px-2'
                                        id="shortName"
                                        element="input"
                                        onInputHandler={onInputHandler}
                                        validations={[minValidator(5)]}
                                        type="text"
                                        placeholder="لینک کوتاه دوره"
                                        isValid="false"
                                    />
                                    <span className="error-message text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="name input">
                                    <label className="input-title ps-3">پشتیبانی دوره</label>
                                    <Input
                                        className="w-100 px-2"
                                        id="support"
                                        element="input"
                                        onInputHandler={onInputHandler}
                                        validations={[minValidator(5)]}
                                        type="text"
                                        placeholder="پشتیبانی دوره"
                                        isValid="false"
                                    />
                                    <span className="error-message text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="bottom-form">
                                    <div className="status">
                                        <label className="input-title  mb-3 ">وضعیت دوره</label>
                                        <div className="radios">
                                            <div className="available">
                                                <label className="ps-5">
                                                    <span
                                                        className="fw-lighter f ms-3"
                                                        style={{ fontSize: "15px" }}
                                                    >
                                                        پیش فروش
                                                    </span>
                                                    <input onInput={(event) => setCourseStatus(event.target.value)} className="ms-5" type="radio" value="presell" name="condition"
                                                    />

                                                    <span className="fw-lighter f ms-3"
                                                        style={{ fontSize: "15px" }}
                                                    >
                                                        در‌حال برگزاری
                                                    </span>
                                                    <input onInput={(event) => setCourseStatus(event.target.value)} className="ms-5" type="radio" value="start" name="condition"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="name input">
                                    <label className="input-title ps-3">تصویر دوره</label>
                                    <input type="file" isValid="false" onChange={event => {
                                        setCourseCover(event.target.files[0])
                                    }
                                    } />
                                    <span className="error-message text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="name input">
                                    <label className="input-title ps-3">دسته‌بندی دوره</label>
                                    <select onChange={selectCategoryHandler}>
                                        <option value="-1">دسته‌بندی مورد‌نظر را وارد نمایید</option>
                                        {categories.map(category => (
                                            <option value={category._id}>{category.title}</option>
                                        ))}
                                    </select>
                                    <span className="error-message text-danger"></span>
                                </div>
                                <button className='btn btn-primary float-start fs-5 mt-5' onClick={addNewCourse}>
                                    افزودن
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <DataTable title="دوره‌ها">
                <table className="table table-hover table-secondary">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>مبلغ</th>
                            <th>وضعیت</th>
                            <th>لینک</th>
                            <th>مدرس</th>
                            <th>دسته بندی</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{course.name}</td>
                                <td className={course.price === 0 ? "text-info" : null}>
                                    {course.price === 0
                                        ? "رایگان"
                                        : course.price.toLocaleString()}
                                </td>
                                <td className={course.isComplete ? "text-primary" : null}>
                                    {course.isComplete === 1 ? "کامل شده" : "در‌حال برگزاری"}
                                </td>
                                <td>
                                    <Link to={`/course-info/${course.shortName}`}>
                                        {course.shortName}
                                    </Link>
                                </td>
                                <td>{course.creator}</td>
                                <td>{course.categoryID.title}</td>
                                <td>
                                    <button type="button" className="btn btn-primary edit-btn">
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger delete-btn"
                                        onClick={() => removeCourseHandler(course._id)}
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DataTable>
        </>
    );
}
