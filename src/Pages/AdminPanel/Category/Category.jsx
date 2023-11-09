import React, { useEffect, useState } from "react";

import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../../Components/Form/Input";
import { requiredValidator, minValidator, maxValidator } from '../../../Validators/Rules'
import { useForm } from "../../../hooks/useForm";

import './Category.css'
import swal from "sweetalert";

export default function Category() {
    const [formState, onInputHandler] = useForm({
        shortName: { value: '', isValid: false },
        title: { value: '', isValid: false },
    }, false)
    const [categories, setCategories] = useState([]);
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        getAllCategories()
    }, []);

    function getAllCategories() {
        fetch(`http://localhost:4000/v1/category`)
            .then((res) => res.json())
            .then((allCategories) => {
                setCategories(allCategories);
            });
    }

    const createNewCategory = (event) => {
        event.preventDefault()
        let newCategoryInfo = { name: formState.inputs.shortName.value, title: formState.inputs.title.value }
        console.log(newCategoryInfo);

        fetch(`http://localhost:4000/v1/category`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorageData.token}` },
            body: JSON.stringify(newCategoryInfo)
        }).then(respJSON => respJSON.json())
            .then(result => {
                console.log(result)
                swal({ title: 'دسته‌بندی جدید با موفقیت اضافه شد', icon: 'success', buttons: 'باشه' })
                    .then(() => getAllCategories())
            })
    }

    const removeCategoryHandler = (categoryID) => {
        swal({ title: 'آیا از حذف این دسته‌بندی اطمینان دارید؟', icon: 'warning', buttons: ['نه', 'بله'] })
            .then(result => {
                if (result) {
                    fetch(`http://localhost:4000/v1/category/${categoryID}`, {
                        method: 'DELETE',
                        headers: { "Authorization": `Bearer ${localStorageData.token}` }
                    }).then(respJSON => respJSON.json())
                        .then(() => {
                            getAllCategories()
                            swal({ title: 'دسته‌بندی با موفقیت حذف شد', icon: "success", buttons: "خوبه" })
                        })
                }
            })
    }

    const editCategoryHandler = (categoryID) => {
        swal({ title: "عنوان دسته‌بندی جدید را وارد نمایید", content: "input", buttons: "ثبت" })
            .then(result => {
                if (result.trim().length) {
                    fetch(`http://localhost:4000/v1/category/${categoryID}`, {
                        method: 'PUT',
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorageData.token}` },
                        body: JSON.stringify({name: result, title: result})
                    })
                        .then(respJSON => respJSON.json())
                        .then(result => {
                            swal({title: 'عنوان دسته‌بندی جدید ثبت شد', icon: 'success', buttons: "باشه"})
                            getAllCategories()
                        })
                }
            })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="home-title">
                        <span>افزودن دسته‌بندی جدید</span>
                        <form className="form row">
                            <div className="col-6">
                                <div className="name-input">
                                    <label className='input-title'>عنوان</label>
                                    <Input element='input' onInputHandler={onInputHandler} validations={[minValidator(3), maxValidator(30)]} type="text" id='title' placeholder='عنوان دسته‌بندی را وارد کنید' />
                                    <span className="error-message text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="name-input">
                                    <label className='input-title'>اسم کوتاه</label>
                                    <Input element='input' onInputHandler={onInputHandler} validations={[minValidator(3), maxValidator(10)]} type="text" id='shortName' placeholder='اسم کوتاه دسته‌بندی را وارد کنید' />
                                    <span className="error-message text-danger"></span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="bottom-form">
                                    <div className="submit-btn">
                                        <input value='افزودن' type="submit" onClick={createNewCategory} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <DataTable title="دسته‌بندی‌ها">
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{category.title}</td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn" onClick={() => editCategoryHandler(category._id)}>
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => removeCategoryHandler(category._id)}>
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
