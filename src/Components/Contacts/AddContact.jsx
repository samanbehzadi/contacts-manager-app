import React from "react";
import { useContext } from "react";
import { ContactContext } from "../../Context/contactContext";
import { Link } from "react-router-dom";

export default function AddContact() {
    const { contact, groups, createContact, onContactChange } = useContext(ContactContext)
    return (
        <>
            <div className="container-fluid">
                <h3 className="text-center my-4 mb-5">ایجاد مخاطب جدید</h3>
                <div className="row justify-content-center">
                    <div className="col-6 px-4">
                        <form className="" onSubmit={createContact}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="fullname" placeholder="نام‌ و‌ نام خانوادگی" value={contact.fullname} onChange={onContactChange}
                                />
                            </div>
                            <div className="form-group">
                                <input type="file" placeholder='عکس خود را وارد کنید' dir='ltr' className="form-control" name="photo" placeholder="نشانی عکس" value={contact.photo} onChange={onContactChange}
                                />
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" name="mobile" placeholder="شماره تلفن" value={contact.mobile} onChange={onContactChange}
                                />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="آدرس ایمیل" value={contact.email} onChange={onContactChange}
                                />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="job" placeholder="شغل" value={contact.job} onChange={onContactChange}
                                />
                            </div>
                            <div className="form-group">
                                <select name="group" value={contact.group} onChange={onContactChange} className="form-control">
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
