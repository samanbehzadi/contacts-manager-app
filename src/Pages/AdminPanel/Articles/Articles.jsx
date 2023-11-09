import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'

import { useForm } from '../../../hooks/useForm'
import Input from '../../../Components/Form/Input'
import { minValidator } from '../../../Validators/Rules'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import './Articles.css'
import Editor from '../../../Components/Form/Editor'

export default function AdminArticles() {
    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState([])
    const [articleCategory, setArticleCategory] = useState('-1')
    const [articleCover, setArticleCover] = useState({})
    const [articleBody, setArticleBody] = useState('')
    const [formState, onInputHandler] = useForm({
        title: { value: '', isValid: false },
        shortName: { value: '', isValid: false },
        description: { value: '', isValid: false },
    }, false)

    useEffect(() => {
        getAllArticles()
        fetch(`http://localhost:4000/v1/category`)
            .then(respJSON => respJSON.json())
            .then(allCategories => setCategories(allCategories))
    }, [])

    function getAllArticles() {
        fetch(`http://localhost:4000/v1/articles`)
            .then(respJSON => respJSON.json())
            .then(allArticles => {
                setArticles(allArticles)
            })
    }

    const removeArticle = (articleID) => {
        let localStorageData = JSON.parse(localStorage.getItem('user'))
        swal({ title: 'آیا از حذف این مقاله اطمینان دارید؟', icon: 'warning', buttons: ['خیر', 'بله'] })
            .then(response => {
                if (response) {
                    fetch(`http://localhost:4000/v1/articles/${articleID}`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${localStorageData.token}` },
                    }).then(result => {
                        if (result.ok) {
                            swal({ title: 'مقاله موردنظر با موفقیت حذف شد', icon: 'success', buttons: 'باشه' })
                        }
                    })
                        .then(() => getAllArticles())
                }
            })
    }

    const createArticle = event => {
        event.preventDefault()
        let localStorageData = JSON.parse(localStorage.getItem('user'))
        let formData = new FormData()
        formData.append('title', formState.inputs.title.value)
        formData.append('shortName', formState.inputs.shortName.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('cover', articleCover)
        formData.append('body', articleBody)
        formData.append('categoryID', articleCategory)

        fetch(`http://localhost:4000/v1/articles`,{
            method: 'POST',
            headers: {Authorization: `Bearer ${localStorageData.token}`},
            body: formData
        }).then(respJSON => {
            if(respJSON.ok){
                swal({ title: 'مقاله جدید با موفقیت اضافه شد', icon: 'success', buttons: 'متوجه‌ام' })
            }
        }).then(()=> getAllArticles())
    }

    return (
        <>
            <div className="container-fluid" id="home-content">
                <div className="container">
                    <div className="home-title">
                        <span>افزودن مقاله جدید</span>
                    </div>
                    <form className="form row">
                        <div className="col-6 ">
                            <div className="name input ">
                                <label className="input-title">عنوان</label>
                                <Input type="text" className='w-100' id='title' element="input" onInputHandler={onInputHandler} validations={[minValidator(8)]} />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title">لینک</label>
                                <Input type="text" className='w-100' id='shortName' element="input" onInputHandler={onInputHandler} validations={[minValidator(3)]} />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6 my-4">
                            <div className="name input" >
                                <label className="input-title ms-3 mt-4">کاور</label>
                                <input type="file" onChange={event => setArticleCover(event.target.files[0])} />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6 my-4">
                            <div className="name input" >
                                <label className="input-title ms-3 mt-4">دسته‌بندی مقاله</label>
                                <select onChange={event => setArticleCategory(event.target.value)}>
                                    <option value={articleCategory}>دسته‌بندی مقاله را انتخاب کنید</option>
                                    {categories.map(category => (
                                        <option value={category._id}>{category.title}</option>
                                    ))}
                                </select>
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12 w-100">
                            <div className="name input w-100">
                                <label className="input-title ">چکیده مقاله</label>
                                <Editor value={articleBody} setValue={setArticleBody} />
                            </div>
                        </div>
                        <div className="col-6 w-100 my-2">
                            <div className="name input">
                                <label className="input-title ">محتوای مقاله</label>
                                <Input className="article-textarea" id='description' element="textarea" onInputHandler={onInputHandler} validations={[minValidator(8)]} />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="bottom-form">
                                <div className="submit-btn">
                                    <input type="submit" value='افزودن' onClick={createArticle} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <DataTable title="مقالات">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>لینک</th>
                            <th>نویسنده</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{article.title}</td>
                                <td>{article.shortName}</td>
                                <td>{article.creator.name}</td>
                                <td>
                                    <button type="button" className="btn btn-primary edit-btn">
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger delete-btn"
                                        onClick={() => removeArticle(article._id)}
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
    )

}