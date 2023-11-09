import React, { useState } from "react";
import { Link } from "react-router-dom";

import CircleSpinner from "../CircleSpinner/CircleSpinner";

import "./CourseBox.css";

export default function CourseBox( props ) {
    const [isImgShow, setIsImgShow] = useState(false);
    const [imgAddress, setImgAddress] = useState("/images/courses/fareelancer.png")

    return (
        // if this Component used in Slider, manage it by isSlider property instead of using just col class
        <div className={`${!props.isSlider ? 'col-4' : 'col'}`}>
            <div className="course-box">
                <Link to={`/course-info/${props.shortName}`}>
                    <img
                        src={props.cover ? props.cover : imgAddress }
                        // src={imgAddress}
                        alt="Course img"
                        className="course-box__img"
                        onLoad={() => setIsImgShow(true)}
                        onError={() => setImgAddress('https://placeimg.com/295/295/any/tech?t=190129384')}
                    />
                    {!isImgShow && <CircleSpinner />}
                </Link>
                <div className="course-box__main">
                    <Link to={`/course-info/${props.shortName}`} className="course-box__title"> {props.name} </Link>

                    <div className="course-box__rating-teacher">
                        <div className="course-box__teacher">
                            <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                            <Link to={`/course-info/${props.creator}`} className="course-box__teacher-link">
                                {" "}
                                {props.creator ? props.creator : ''}
                            </Link>
                        </div>
                        <div className="course-box__rating">
                            <img
                                src="/images/svgs/star.svg"
                                alt="rating"
                                className="course-box__star"
                            />
                            <img
                                src="/images/svgs/star_fill.svg"
                                alt="rating"
                                className="course-box__star"
                            />
                            <img
                                src="/images/svgs/star_fill.svg"
                                alt="rating"
                                className="course-box__star"
                            />
                            <img
                                src="/images/svgs/star_fill.svg"
                                alt="rating"
                                className="course-box__star"
                            />
                            <img
                                src="/images/svgs/star_fill.svg"
                                alt="rating"
                                className="course-box__star"
                            />
                        </div>
                    </div>

                    <div className="course-box__status">
                        <div className="course-box__users">
                            <i className="fas fa-users course-box__users-icon"></i>
                            <span className="course-box__users-text"> {props.students ? props.students : '124'}</span>
                        </div>
                        <span className="course-box__price">{props.price ? props.price.toLocaleString() : 'رایگان'}</span>
                    </div>
                </div>

                <div className="course-box__footer">
                    <Link to={`/course-info/${props.shortName}`} className="course-box__footer-link">
                        مشاهده اطلاعات
                        <i className="fas fa-arrow-left course-box__footer-icon"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}
