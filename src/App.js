import axios from 'axios'
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './App.css'
import AddContact from './Components/Contacts/AddContact'
import Contacts from './Components/Contacts/Contacts'
import EditContact from './Components/Contacts/EditContact'
import ViewContact from './Components/Contacts/ViewContact'
import Navbar from './Components/Navbar/Navbar'

export default function App() {
    const [contacts, setContacts] = React.useState([])
    const [groups, setGroups] = React.useState([])
    const [query, setQuery] = React.useState({ text: '' })
    const [filteredContacts, setFilteredContacts] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [forceRender, setForceRender] = React.useState(false)
    // get the value of all inputs & set them to their keys Together
    const [contact, setContact] = React.useState({ fullname: "", photo: "", email: "", mobile: "", job: "", group: "" });
    const navigate = useNavigate()

    // Fetching data using axios
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                /* assign data to a variable using Object Destructuring
                 const { data: contactsData } = await axios.get('http://localhost:9000/contacts')
                const {data: groupsData } = await axios.get('http://localhost://9000/groups') */

                const contactsResp = await axios.get('http://localhost:9000/contacts')
                const groupsResp = await axios.get('http://localhost:9000/groups')

                setContacts(contactsResp.data)
                setFilteredContacts(contactsResp.data)
                setGroups(groupsResp.data)
                setLoading(false)
            } catch (error) {
                console.log(error.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [forceRender])

    const setContactInfo = event => {
        setContact({ ...contact, [event.target.name]: event.target.value });
    };

    const createContactForm = async event => {
        event.preventDefault()
        try {
            const { status } = await axios.post(`http://localhost:9000/contacts`, contact)
            if (status === 201) {
                setForceRender(!forceRender)
                Swal.fire({ title: 'مخاطب جدید با موفقیت ساخته شد', icon: 'success', confirmButtonText: 'خوبه', confirmButtonColor: "green" })
                navigate('/')
                // redirect('/contacts')
            }
        } catch (err) {
            console.log(err.message);
            Swal.fire({ title: "مشکلی پیش آمد و عملیات انجام نشد", icon: 'warning', confirmButtonText: 'باشه', confirmButtonColor: "red" })
        }
    }

    const contactSearch = event => {
        setQuery({ ...query, text: event.target.value })
        const allContacts = contacts.filter(contact => {
            return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFilteredContacts(allContacts)
    }


    const deleteContact = contactId => {
        try {
            Swal.fire({
                title: 'آیا از حذف این مخاطب اطمینان دارید؟', icon: 'warning', confirmButtonText: 'بله',
                denyButtonText: 'خیر', denyButtonColor: 'red', showDenyButton: 'true'
            })
                .then(result => {
                    if (result.isConfirmed) {
                        let response = axios.delete(`http://localhost:9000/contacts/${contactId}`)
                        if (response) {
                            Swal.fire({ title: 'مخاطب با موفقیت حذف شد', icon: 'success', confirmButtonText: 'خوبه' })
                            setForceRender(!forceRender)
                        }
                    }
                })
        } catch (err) {
            Swal.fire({ title: 'مشکلی پیش آمد و عملیات انجام نشد', icon: 'error', confirmButtonText: 'باشه' })
            console.log(err.message);
        }
    }
    return (
        <div >
            <Navbar query={query} search={contactSearch} />
            <Routes>
                <Route path='/' element={
                    <Contacts confirmDelete={deleteContact} loading={loading} contacts={filteredContacts} forceRender={forceRender} setForceRender={setForceRender} />} />

                <Route path='/contacts/add-contact' element={
                    <AddContact setContactInfo={setContactInfo} contact={contact} groups={groups} createContactForm={createContactForm} />} />

                <Route path='/contacts/:contactId' element={<ViewContact />} />
                
                <Route path='/contacts/edit/:contactId' element={
                    <EditContact forceRender={forceRender} setForceRender={setForceRender} />} />

                <Route path='*' element={<h2 className='text-center mt-5'>not found</h2>} />
            </Routes>
        </div>
    )
}
