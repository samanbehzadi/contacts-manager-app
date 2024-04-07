import React from 'react';
import { useContext } from 'react';
import { ContactContext } from '../../Context/contactContext';
import './Search.css';

export default function Search() {
    const { contactSearch } = useContext(ContactContext)
    return (
        <>
            <div className="input-group mx-2 " dir='ltr'>
                <span className="input-group-text" type='button' id='basic-addon1'>
                    <i className="bi bi-search" ></i>
                </span>
                <input onChange={(event) => contactSearch(event.target.value)} type="text" className='form-control search_input' dir='rtl' placeholder='جستجو' aria-label='Search' aria-describedby='#basic-addon1' />
            </div>
        </>
    )
}
