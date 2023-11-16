import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import Input from '../../Components/Form/Input';
import { emailValidator } from "../../Validators/Rules";
import FooterItem from "../FooterItem/FooterItem";

import "./Footer.css";

export default function Footer() {

    const [newUserEmail, setNewUserEmail] = useState('')
    const addNewEmail = (event) => {
        event.preventDefault()
        const newEmail = { email: newUserEmail }

        fetch(`http://localhost:4000/v1/newsletters`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmail)
        }).then(respJSON => respJSON.json())
            .then(result => {
                if (result.email){
                    swal({title: "موفقیت آمیز", text: 'تبریک !  شما مشترک سایت شدید', buttons: 'تایید', icon: 'success'})
                }   else{
                    swal({title: 'خطا', text: 'خطایی در ثبت ایمیل شما به وجود آمد', buttons: 'تلاش دوباره', icon: 'error'})
                }
            })
    }

    return (
        <div className="footer">
            <div className="container">
                <div className="footer-widgets ">
                    <div className="row">
                        <FooterItem footerTitle="درباره ما">
                            <p className="footer-widgets__text col-sm-12 col-lg-12 ps-3">
                                وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که در
                                فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول
                                بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و فنی
                                قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم! و خب
                                امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی خصوصی
                                فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس در اون
                                رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه! این به
                                این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با دانشجو
                                بسیار مهمه! ما در آکادمی سبزلرن تضمین پشتیبانی خوب و با کیفیت رو
                                به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای پشتیبانی دوره
                                های رایگان شون هم هزینه دریافت میکنند و متعهد هستند که هوای کاربر
                                های عزیز رو داشته باشند !
                            </p>
                        </FooterItem>

                        <FooterItem footerTitle="آخرین مطالب">
                            <div className="footer-widgets__links">
                                <a href="#" className="footer-widgets__link">
                                    نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                                </a>
                                <a href="#" className="footer-widgets__link">
                                    چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن پایتون
                                </a>
                                <a href="#" className="footer-widgets__link">
                                    آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به
                                    گام و تصویری
                                </a>
                                <a href="#" className="footer-widgets__link">
                                    بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی
                                    معایب و مزایا
                                </a>
                                <a href="#" className="footer-widgets__link">
                                    معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش
                                    رایگان
                                </a>
                            </div>
                        </FooterItem>

                        <FooterItem footerTitle="دسترسی سریع">
                            <div className="row">
                                <div className="col-6">
                                    <a href="#" className="footer-widgets__link">
                                        آموزش HTML
                                    </a>
                                </div>

                                <div className="col-6">
                                    <a href="#" className="footer-widgets__link">
                                        آموزش CSS
                                    </a>
                                </div>

                                <div className="col-6">
                                    <a href="#" className="footer-widgets__link">
                                        آموزش جاوا اسکریپت
                                    </a>
                                </div>
                                <div className="col-6">
                                    <a href="#" className="footer-widgets__link">
                                        آموزش ریکت
                                    </a>
                                </div>

                                <div className="col-6">
                                    <a href="#" className="footer-widgets__link">
                                        آموزش پایتون
                                    </a>
                                </div>
                                <div className="col-6">
                                    <Link to={'/contact'} className="footer-widgets__link">
                                        ارتباط با ما
                                    </Link>
                                </div>
                                <div className="col-12 my-4">
                                    <span className="footer-widgets__title">اشتراک در خبرنامه</span>
                                    <span className="footer-widgets__text mb-3 d-block">برای اطلاع از جدیدترین اخبار مشترک شوید</span>
                                    <form action="#" className="footer-widgets__form form-control-lg">
                                        <input type="text" placeholder='ایمیل شما' onChange={event => setNewUserEmail(event.target.value)} className="footer-widgets__input input-group mb-2 py-2" />
                                        {/* <Input onInputHandler={() => { }} element='input' id='email' type="text" placeholder='ایمیل خود را وارد نمایید' className="footer-widgets__input input " 
                                        validations={[emailValidator()]}/> */}

                                        <button type="submit" onClick={addNewEmail} className="footer-widgets__btn btn w-100 btn-lg btn-dark">
                                            عضویت
                                        </button>
                                    </form>
                                    {/* <FooterItem footerTitle='اشتراک در خبرنامه' >
                                        <div className=""> </div>
                                    </FooterItem> */}
                                </div>
                            </div>
                        </FooterItem>
                    </div>
                </div>
                <div className="footer__copyright">
                    <span className="footer__copyright-text">
                        کلیه حقوق برای آکادمی آموزش برنامه نویسی سبز لرن محفوظ است.
                    </span>
                </div>
            </div>
        </div>
    );
}
