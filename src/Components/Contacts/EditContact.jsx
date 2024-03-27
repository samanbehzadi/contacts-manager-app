import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { ContactContext } from '../../Context/contactContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function EditContact() {
    const { contactId } = useParams()
    // const [state, setState] = React.useState({ contact: {} })
    const [contact, setContact] = React.useState({})
    const navigate = useNavigate()
    const { contacts, setContacts,setFilteredContacts, loading, setLoading, groups } = useContext(ContactContext)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                let contactData = await axios.get(`http://localhost:9000/contacts/${contactId}`)
                // should delete
                // console.log(contactData.data);
                // let groupsData = await axios.get(`http://localhost:9000/groups`)
                // setState({ ...state, loading: false, contact: contactData.data, groups: groupsData.data })
                // should delete

                setLoading(false)
                setContact(contactData.data)
            } catch (err) {
                console.log(err.message);
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const onContactChange = event => {
        // setState({ ...state, contact: { ...state.contact, [event.target.name]: event.target.value } })
        // setContact({...contact, contact: {...contact, [event.target.name]: event.target.value}})
        // setContact({ [event.target.name]: event.target.value })

        // we should use bracket [] for key,  when key is a string. like: fullname, password
        // we shoul NOT use bracket for values. WRONG: {[e.target.name]: [e.target.value]}
        setContact({...contact, [event.target.name]: event.target.value})
    }

    const submitForm = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const updateContact = await axios.put(`http://localhost:9000/contacts/${contact.id}`, contact)
            if (updateContact.data) {
                // 1: get copy from the Contacts,
                let allContacts = [...contacts]
                
                // 2: find the contact that we want to update 
                let contactIndex = allContacts.findIndex( c => c.id === parseInt(contactId))
                
                // 3: update new the contact with new data
                allContacts[contactIndex] = {...updateContact.data}
                
                // 4: add new contact to Contacts
                setContacts(allContacts)
                setFilteredContacts(allContacts)
                setLoading(false)
                navigate('/')
            }
        } catch (err) {
            console.log(err.message);
            setLoading(false)
        }
    }

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
                                                <input className="form-control mb-1" name='fullname' onChange={onContactChange} value={contact.fullname} />

                                                <label className='mt-1 mb-0' htmlFor="">ایمیل</label>
                                                <input className="form-control mb-1" name='email' onChange={onContactChange} value={contact.email} />

                                                <label className='mt-1 mb-0' htmlFor="">شماره تلفن</label>
                                                <input type='text' className="form-control mb-1" name='mobile' onChange={onContactChange} value={contact.mobile} />

                                                <label className='mt-1 mb-0' htmlFor="">شغل</label>
                                                <input className="form-control mb-1" name='job' onChange={onContactChange} value={contact.job} />

                                                <label htmlFor="" className='mt-1 mb-0'>گروه</label>
                                                <select className='form-control mb-1' name="group" value={contact.group} onChange={onContactChange} required={true}>
                                                    <option disabled value="-1">نوع گروه را انتخاب کنید</option>
                                                    {groups.map(group => (
                                                        <option value={group.id} key={group.id}>{group.name}</option>
                                                    ))}
                                                </select>

                                                <label className='mt-1 mb-0' htmlFor="">نشانی تصویر</label>
                                                <input className="form-control mb-1" name='photo' value={contact.photo} onChange={onContactChange} />

                                            </form>
                                        </div>
                                        <div className="d-flex justify-content-evenly w-75 mt-5">
                                            <Link onClick={submitForm} className='btn btn-outline-purple rounded-pill border'>
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
