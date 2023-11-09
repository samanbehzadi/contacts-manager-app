import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Tobbar";
import { useForm } from "../../Hooks/useForm";
import {
    requiredValidator,
    minValidator,
    maxValidator,
    emailValidator
} from "../../Validators/Rules";
import AuthContext from "../../Context/authContext";

import "./Register.css";

export default function Register() {
    const authContext = useContext(AuthContext);

    const [formState, onInputHandler] = useForm(
        {
            name: { value: "", isValid: false },
            username: { value: "", isValid: false },
            email: { value: "", isValid: false },
            password: { value: "", isValid: false },
            phone: { value: "", isValid: false }
        },
        false
    );

    const registerNewUser = event => {
        event.preventDefault();

        const newUserInfos = {
            name: formState.inputs.name.value,
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            confirmPassword: formState.inputs.password.value,
            phone: formState.inputs.phone.value
        };
        fetch(`http://localhost:4000/v1/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUserInfos)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                authContext.login(result.user, result.accessToken);
            });

        // path: GET me  (receive inforamtion of a User by its Access Token)
        fetch(`http://localhost:4000/v1/auth/me`, {
            method: "GET",
            // to get the information by Access Token, should write {Bearer} befor Access Token
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmI2NzhhMzRhZjQ0N2RlZjJiY2M5NiIsImlhdCI6MTY5NDE5NzY0MiwiZXhwIjoxNjk2Nzg5NjQyfQ.7OGkj0-Y9z-SNqzVNEbD8R5UkKRjsHGnA-qt2BM3Cp0"
            }
        }).then(response => response.json());
        console.log("user Registered");
    };

    return (
        <>
            <Topbar />
            <Navbar />

            <section className="register-register">
                <div className="register">
                    <span className="register__title">ساخت حساب کاربری</span>
                    <span className="register__subtitle">
                        خوشحالیم قراره به جمع ما بپیوندی
                    </span>
                    <div className="register__new-member">
                        <span className="register__new-member-text">
                            قبلا ثبت‌نام کرده‌اید؟{" "}
                        </span>
                        <Link className="register__new-member-link" to="/login">
                            وارد شوید
                        </Link>
                    </div>
                    <form action="#" className="register-form">
                        <div className="register-form__username">
                            {/* <input className="register-form__username-input" type="text" placeholder="نام و نام خانوادگی" /> */}
                            <Input
                                type="text"
                                className="register-form__username-input"
                                placeholder="نام و نام خانوادگی"
                                element="input"
                                id="name"
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minValidator(4),
                                    maxValidator(16)
                                ]}
                            />
                            <i className="register-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="register-form__username">
                            {/* <input className="register-form__username-input" type="text" placeholder="نام کاربری" /> */}
                            <Input
                                type="text"
                                className="register-form__username-input"
                                placeholder="نام کاربری"
                                element="input"
                                id="username"
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minValidator(4),
                                    maxValidator(16)
                                ]}
                            />
                            <i className="register-form__username-icon fa fa-user"></i>
                        </div>

                        <div className="register-form__password">
                            {/* <input className="register-form__password-input" type="text" placeholder="آدرس ایمیل" /> */}
                            <Input
                                type="text"
                                className="register-form__password-input"
                                placeholder="آدرس ایمیل"
                                element="input"
                                id="email"
                                onInputHandler={onInputHandler}
                                validations={[requiredValidator(), maxValidator(26)]}
                            />
                            <i className="register-form__password-icon fa fa-envelope"></i>
                        </div>
                        <div className="register-form__password">
                            {/* <input className="register-form__password-input" type="text" placeholder="رمز عبور" /> */}
                            <Input
                                type="text"
                                className="register-form__password-input"
                                placeholder="گذرواژه"
                                element="input"
                                id="password"
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(16)
                                ]}
                            />
                            <i className="register-form__password-icon fa fa-lock-open"></i>
                        </div>
                        <div className="register-form__password">
                            {/* <input className="register-form__password-input" type="text" placeholder="رمز عبور" /> */}
                            <Input
                                type="text"
                                className="register-form__password-input"
                                placeholder="شماره تلفن"
                                element="input"
                                id="phone"
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minValidator(3),
                                    maxValidator(16)
                                ]}
                            />
                            <i className="register-form__password-icon fa fa-phone"></i>
                        </div>
                        {/* <Button className={`register-form__btn ${formState.isFormValid ? 'success' : 'error'}`} type='submit'>
                            <i className="register-form__btn-icon fa fa-user-plus"></i>
                            <span className="register-form__btn-text">عضویت</span>
                        </Button> */}
                        <Button
                            className={`register-form__btn ${!formState.isFormValid ? "bg-secondary" : null
                                }`}
                            type="submit"
                            disabled={!formState.isFormValid}
                            onClick={registerNewUser}
                        >
                            <i className="register-form__btn-icon fas fa-user-plus"></i>
                            <span className="register-form__btn-text">عضویت</span>
                        </Button>
                    </form>
                    <div className="register__des">
                        <span className="register__des-title">سلام کاربر محترم:</span>
                        <ul className="register__des-list">
                            <li className="register__des-item">
                                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                                استفاده کنید.
                            </li>
                            <li className="register__des-item">
                                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
                            </li>
                            <li className="register__des-item">
                                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
