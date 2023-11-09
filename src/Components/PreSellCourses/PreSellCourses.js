import React, { useEffect, useState, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from '../CourseBox/CourseBox'

import "swiper/css";
import "swiper/css/pagination";

import "./PreSellCourses.css";

export default memo(function PreSellCourses() {
    const [presellCourses, setPresellCourses] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:4000/v1/courses/presell`)
        .then(respJSON => respJSON.json())
        .then(result => setPresellCourses(result))
    },[])

    return (
        <div className="popular">
            <div className="container">
                <SectionHeader
                    title="دوره های در حال پیش فروش"
                    desc="متن تستی برای توضیحات دوره های پیش فروش"
                />

                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                loop={true}
                                className="mySwiper"
                            >
                                {presellCourses && presellCourses.map((course) => (
                                    <SwiperSlide key={course._id}>
                                        <CourseBox {...course} isSlider={true} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
})
