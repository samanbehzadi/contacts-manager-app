const requiredValue = 'REQUIRED_VALUE'
const minValue = 'MIN_VALUE'
const maxValue = 'MAX_VALUE'
const emailValue = 'EMIAL_VALUE'

export const requiredValidator = () => ({
    value: requiredValue
})
export const minValidator = (min) => ({
    min: min,
    value: minValue
})
export const maxValidator = (max) => ({
    max,
    value: maxValue
})
export const emailValidator = () => ({
    value: emailValue
})

export default {requiredValue, minValue, maxValue, emailValue}