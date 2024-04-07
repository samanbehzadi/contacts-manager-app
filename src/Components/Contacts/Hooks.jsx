import React, { useEffect, useMemo, useReducer, useState, useDeferredValue, useTransition } from 'react'

export let UseReducer = () => {

    const cusotmReducer = (state, action) => {
        switch (action.type) {
            case 'increment':
                return { customKey: state.customKey + 1 }
            case 'decrement':
                return { customKey: state.customKey - 1 }
            default: return state
        }
    }
    let [state, dispatch] = useReducer(cusotmReducer, { customKey: 100 })
    const increment = () => {
        dispatch({ type: 'increment' })
    }
    const decrement = () => {
        dispatch({ type: 'decrement' })
    }
    return (
        <>
            <h3 className='text-center d-block'>useReducer</h3>
            <button className='btn btn-success' onClick={increment}>Increment</button>
            <h3 style={{ direction: "ltr" }} className=' mx-3'>value of Count is: <span className='badge bg-warning text-primary'>{state.customKey}</span></h3>
            <button className='btn btn-danger' onClick={decrement}>Decrement</button>
        </>
    )
}

const List = ({ value }) => {
    const deferredvalue = useDeferredValue(value)
    let list = useMemo(() => {
        let numberList = []
        let count = 0
        while (count < 5000) {
            numberList.push(
                <div key={count}>{value, deferredvalue}</div>
            )
            count += 1
        }
        return numberList
    }, [value, deferredvalue])

    useEffect(() => {
        console.log('Original Value', value);
        console.log('Deferred value: ', deferredvalue);
    }, [value, deferredvalue])
    return list
}

export let UseDeferredValue = () => {
    const [value, setValue] = useState(0)
    return (
        <div>
            <input className='form-control' type="text" value={value} onChange={e => setValue(e.target.value)} />
            {value !== 0 ? <List value={value} /> : null}
        </div>
    )
}

export let UseTransitoin = () => {
    const [value, setValue] = useState(0)
    const [list, setList] = useState([])
    const [isPending, startTransition] = useTransition()
    
    const handleChange = e => {
        setValue(e.target.value)
        startTransition(()=>{
            // your code here
        })
    }
    return (
        <>
            <input className='d-block form-control w-50 mt-3' type="text" value={value} onChange={handleChange} />
            <br />
            <h3>____________</h3>
            <hr />
            { isPending ? 'is loading...':
            list.map((item, index) => (
                <div className='d-flex flex-column' key={index}>{item}</div>
            ))}
        </>
    )
}