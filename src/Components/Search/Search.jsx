import React from 'react';
import './Search.css';

export default function Search({query, search}) {
    console.log(query.text);
    return (
        <>
            <div className="input-group mx-2 " dir='ltr'>
                <span className="input-group-text" type='button' id='basic-addon1'>
                    <i className="bi bi-search" ></i>
                </span>
                <input value={query.text} onChange={search} type="text" className='form-control search_input' dir='rtl' placeholder='جستجو' aria-label='Search' aria-describedby='#basic-addon1' />
            </div>
        </>
    )
}
