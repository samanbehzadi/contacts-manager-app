import React, { useEffect, useState } from "react";
import "./LastCourses.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses`)
            .then(respJSON => respJSON.json())
            .then(result => {
                setCourses(result)
            });
    }, []);
    return (
        <div className="courses">
            <div className="container">
                <SectionHeader
                title='جدیدترین دوره‌ها'
                    btnTitle={"تمامی دوره ها"}
                    courseDesc={"سکویی برای پرتاب شما به سمت موفقیت"}
                    courseTitle={"دوره های جدید"}
                    btnHref="/courses/1"
                />

                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            {courses.slice(-4, -1 ).map(course => ( 
                                <CourseBox {...course}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
