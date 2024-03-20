import axios from 'axios'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function ViewContact({forceRender, setForceRender}) {
    const { contactId } = useParams()
    const [state, setState] = React.useState({ loading: false, contact: { fullname: '', photo: '', mobile: '', email: '', group: '', job: '' }, groups: [] })
    const navigate = useNavigate()

    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setState({ ...state, loading: true })

    //             /* assign data to a variable using Object Destructuring
    //              const { data: contactsData } = await axios.get(`http://localhost:9000/contacts/${contactId}`)
    //             const {data: groupsData } = await axios.get(`http://localhost:9000/groups/${contactData.data.group}`)*/

    //             let contactData = await axios.get(`http://localhost:9000/contacts/${contactId}`)
    //             // console.log('=>', contactData.data);
    //             let groupData = await axios.get(`http://localhost:9000/groups/${contactData.data.group}`)
    //             // let groupData = await axios.get(`http://localhost:9000/groups`)
    //             let allGroups = await axios.get(`http://localhost:9000/groups`)
    //             setState({...state, groups: [allGroups.data]})
    //             // setState({ ...state, loading: false, contact: contactData.data, groups: groupData.data })
    //             setState({ ...state, loading: false, contact: contactData.data, groups: groupData.data })

    //         } catch (err) {
    //             console.log(err.message)
    //             setState({ ...state, loading: false })
    //         }
    //     }
    //     fetchData()
    // }, []) 

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setState({ ...state, loading: true })
                let contactData = await axios.get(`http://localhost:9000/contacts/${contactId}`)
                console.log(contactData.data);
                let groupsData = await axios.get(`http://localhost:9000/groups`)
                setState({ ...state, loading: false, contact: contactData.data, groups: groupsData.data })
            } catch (err) {
                console.log(err.message);
                setState({ ...state, loading: false })
            }
        }
        fetchData()
    }, [])

    const setContactInfo = event => {
        setState({ ...state, contact: { ...state.contact, [event.target.name]: event.target.value } })
    }

    const submitForm = async (event) => {
        event.preventDefault()
        try {
            setState({ ...state, loading: true })
            const updateContact = await axios.put(`http://localhost:9000/contacts/${contact.id}`, state.contact)
            // const upContact = await updateContact(state.contact, contactId)
            setState({ ...state, loading: false })
            if (updateContact.data) {
                setForceRender(!forceRender)
                navigate('/')
            }
        } catch (err) {
            console.log(err.message);
            setState({ ...state, loading: false })
        }
    }
    const { loading, contact, groups } = state

    return (
        <>
            <div className="container-fluid">
                <section className="view-contact-intro p-2">
                    <div className="my-2 text-center">
                        <p className="fs-5 fw-bold">ویرایش مخاطب</p>
                    </div>
                </section>
                <hr className='text-danger' />
                {loading ?
                    <Loading />
                    : (
                        <>
                            {Object.keys(contact).length > 0 && (
                                <div className="container">
                                    <div className="row justify-content-center mt-5">
                                        <div className="col-md-3">
                                            {/* <img src={contact.photo} alt={contact.fullname} /> */}
                                            <img src={contact.photo ? contact.photo : '/images/FastFood/client1.jpg'} width='auto' height='auto' className='img-fluid rounded' alt={contact.fullname} />
                                        </div>
                                        <div className="col-md-7">
                                            <form onSubmit={submitForm} className="list-group">

                                                <label className='mt-1 mb-0' htmlFor="">نام و نام‌خانوادگی</label>
                                                <input className="form-control mb-1" name='fullname' onChange={setContactInfo} value={contact.fullname} />

                                                <label className='mt-1 mb-0' htmlFor="">ایمیل</label>
                                                <input className="form-control mb-1" name='email' onChange={setContactInfo} value={contact.email} />

                                                <label className='mt-1 mb-0' htmlFor="">شماره تلفن</label>
                                                <input type='text' className="form-control mb-1" name='mobile' onChange={setContactInfo} value={contact.mobile} />

                                                <label className='mt-1 mb-0' htmlFor="">شغل</label>
                                                <input className="form-control mb-1" name='job' onChange={setContactInfo} value={contact.job} />

                                                <label htmlFor="" className='mt-1 mb-0'>گروه</label>
                                                <select className='form-control mb-1' name="group" value={contact.group} onChange={setContactInfo} required={true}>
                                                    <option disabled value="-1">نوع گروه را انتخاب کنید</option>
                                                    {groups.map(gr => (
                                                        <option value={gr.id} key={gr.id}>{gr.name}</option>
                                                    ))}
                                                </select>

                                                <label className='mt-1 mb-0' htmlFor="">نشانی تصویر</label>
                                                <input className="form-control mb-1" name='photo' value={contact.photo} onChange={setContactInfo} />

                                            </form>
                                        </div>
                                        <div className="d-flex justify-content-evenly w-75 mt-5">
                                            <Link to='/' onClick={submitForm} className='btn btn-outline-purple rounded-pill border'>
                                                به‌روزرسانی
                                                {/* <i className='bi bi-arrow-left fs-4'></i> */}
                                            </Link>
                                            <Link to='/' className='btn btn-danger rounded-pill'>
                                                انصراف
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
            </div>
        </>
    )
}
