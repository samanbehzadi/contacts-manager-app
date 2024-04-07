import React from "react";
import { useContext } from "react";
import { ContactContext } from "../../Context/contactContext";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { contactSchema } from "../../Validation/contactValidaton";

export default function AddContact() {
    const { contact, groups, createContact, onContactChange } = useContext(ContactContext)
    const formik = useFormik({
        initialValues: { fullname: '', photo: '', email: '', mobile: '', job: '', group: '' }, validationSchema: contactSchema, onSubmit: values => {
            console.log(values);
            createContact(values)
        }
    })
    return (
        <>
            <div className="container-fluid">
                <h3 className="text-center my-4 mb-5">ایجاد مخاطب جدید</h3>
                <div className="row justify-content-center">
                    <div className="col-6 px-4">
                        <form className="" onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <input id='fullname' type="text" className="form-control" name="fullname" placeholder="نام‌ و‌ نام خانوادگی" value={formik.values.fullname} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                />
                                {formik.touched.fullname && formik.errors.fullname && <div className='text-danger'>{formik.errors.fullname}</div>}
                            </div>
                            <div className="form-group">
                                <input id='photo' type="file" placeholder='عکس خود را وارد کنید' dir='ltr' className="form-control" name="photo" placeholder="نشانی عکس" value={formik.values.photo} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                />
                                {formik.touched.photo && formik.errors.photo && <div className='text-danger'>{formik.errors.photo}</div>}
                            </div>
                            <div className="form-group">
                                <input id='mobile' type="number" className="form-control" name="mobile" placeholder="شماره تلفن" value={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                />
                                {formik.touched.mobile && formik.errors.mobile && <div className='text-danger'>{formik.errors.mobile}</div>}
                            </div>
                            <div className="form-group">
                                <input id='email' type="email" className="form-control" name="email" placeholder="آدرس ایمیل" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && <div className='text-danger'>{formik.errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <input id='job' type="text" className="form-control" name="job" placeholder="شغل" value={formik.values.job} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                />
                                {formik.touched.job && formik.errors.job && <div className='text-danger'>{formik.errors.job}</div>}
                            </div>
                            <div className="form-group">
                                <select id='group' name="group" value={formik.values.group} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control">
                                    <option value="-1" disabled>نوع گروه </option>
                                    {groups.length > 0 && groups.map(group => (
                                        <option value={group.id} key={group.id}>{group.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="d-flex justify-content-evenly my-4">
                                <input className="btn btn-primary" type='submit' value='ایجاد مخاطب' />
                                <Link to="/" className="btn btn-outline-danger">
                                    انصراف
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
