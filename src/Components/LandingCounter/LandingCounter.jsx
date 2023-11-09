import React, { useEffect, useState } from 'react'

export default function LandingCounter({ goalNumber }) {
    const [courseCounter, setCourseCounter] = useState(0)

    useEffect(() => {
        let interval = setInterval(() => {
            setCourseCounter(prevState => prevState + 1)
        }, 1);
        if (courseCounter === goalNumber) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [courseCounter])
    // to Prevent getting Duplicate of Intervale we should ClearInterval  ( Cleaning up useEffect )
    return (
        <span>{courseCounter}</span>
    )
}
