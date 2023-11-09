import React, { useEffect, useReducer } from "react";
import validator from "../../Validators/Validator";
import "./Input.css";

const inputReducer = (prvState, action) => {
    switch (action.type) {
        case "CHANGE": {
            return {
                ...prvState,
                value: action.value,
                isValid: validator(action.value, action.validations)
            };
        }
        default:
            return prvState;
    }
};

export default function Input(props) {
    const [mainInput, dispatch] = useReducer(inputReducer, {
        value: "",
        isValid: false
    });

    const { value, isValid } = mainInput
    const { id, onInputHandler } = props
    useEffect(() => {
        onInputHandler(id, value, isValid)
    }, [value])

    const onChangeHandler = event => {
        dispatch({
            type: "CHANGE",
            value: event.target.value,
            isValid: true,
            validations: props.validations
        });
    };

    const element =
        props.element === "textarea" ? (
             <textarea
                placeholder={props.placeholder}
                className={`${props.className} ${mainInput.isValid ? "success" : "error"
                    }`}
                onChange={onChangeHandler}
                value={mainInput.value}
            />
            
        ) : (
           <input
                type={props.type}
                placeholder={props.placeholder}
                className={`${props.className} ${mainInput.isValid ? "success" : "error"
                    }`}
                onChange={onChangeHandler}
                value={mainInput.value}
            />
        );
    return <div>{element}</div>;
}
