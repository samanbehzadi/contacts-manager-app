import { useCallback, useReducer } from "react"

const formReducer = (prvState, action) => {
    switch(action.type){
        case 'INPUT_CHANGE':{
            let isFormValid = true
            for(let inputId in prvState.inputs){
                if(inputId === action.inputId){
                    isFormValid = isFormValid && action.isValid
                } else {
                    isFormValid = isFormValid && prvState.inputs[inputId].isValid
                }
            }
            return {...prvState, inputs: {...prvState.inputs, [action.inputId]: { value: action.value, isValid: action.isValid}},isFormValid: isFormValid}
        }
        default:{
            return prvState
        }
    }
}

export const useForm = (initInputs, initFormIsValid) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initInputs, isFormValid: initFormIsValid,
    })

    const onInputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE', value, isValid, inputId: id
        })
    },[])
    return [formState, onInputHandler]
}