import React, { useState } from 'react'

import Footer from '../../Components/Footer/Footer'
import Button from '../../Components/Form/Button'
import Input from '../../Components/Form/Input'
import Navbar from '../../Components/Navbar/Navbar'
import Tobbar from '../../Components/Topbar/Tobbar'
import { requiredValidator, minValidator, maxValidator, emailValidator } from '../../Validators/Rules'
import { useForm } from '../../Hooks/useForm'

import './ContactUs.css'
import swal from 'sweetalert'


export default function ContactUs() {
    const [formState, onInputHandler] = useForm(
        { username: { value: "", isValid: false }, password: { value: "", isValid: false } },
        false
    );

    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [phoneInput, setPhoneInput] = useState('')
    const [messageInput, setMessageInput] = useState('')

    const addNewContact = (event) => {
        event.preventDefault()
        let newContactMessage = { name: nameInput, email: emailInput, phone: phoneInput, body: messageInput }
        fetch(`http://localhost:4000/v1/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContactMessage),
        })
            .then(respJSON => {
                respJSON.json()
                if (respJSON.ok) {
                    swal({ title: 'موفقیت آمیز', text: 'پیام شما با موفقیت ارسال شد', icon: 'success', buttons: 'تایید' })
                } else {
                    swal({ title: 'خطا', text: 'ارسال پیام با خطا روبرو شد', icon: 'error', buttons: 'تلاش دوباره' })
                }
            })
        // .then(result => console.log(result))
    }

    return (
        <>
            <Tobbar />
            <Navbar />

            <section className="login-register">
                <div className="login">
                    <span className="login__title">ارتباط با ما</span>
                    <span className="login__subtitle">
                        نظر یا انتقادت رو برامون بنویس
                    </span>

                    <form action="#" className="login-form">
                        <div className="login-form__username">
                            <input onChange={event => setNameInput(event.target.value)} id='name' className="login-form__password-input" type="text" placeholder="نام و نام خانوادگی" />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__password">
                            <input onChange={event => setEmailInput(event.target.value)} id='email' className="login-form__password-input" type="text" placeholder="نشانی ایمیل" />
                            <i className="login-form__password-icon fa fa-envelope"></i>
                        </div>
                        <div className="login-form__password">
                            <input onChange={event => setPhoneInput(event.target.value)} id='phone' className="login-form__password-input" type="text" placeholder="شماره تماس" />
                            <i className="login-form__password-icon fa fa-phone"></i>
                        </div>
                        <div className="login-form__text login-form__parent">
                            <textarea onChange={event => setMessageInput(event.target.value)} className="login-form__text-input" placeholder='متن خود را وارد کنید' ></textarea>
                        </div>

                        <Button className={`login-form__btn `} type="submit" onClick={addNewContact}>
                            <i className="login-form__btn-icon fas fa-message"></i>
                            <span className="login-form__btn-text">ارسال</span>
                        </Button>

                    </form>
                </div>
            </section>


            <Footer />
        </>
    )
}
