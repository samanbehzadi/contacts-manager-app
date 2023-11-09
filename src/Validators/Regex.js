// Regex to check the Email
const testEmail = (value) => {
    let emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
    //                            nima23   @ gmail  . com
    //                            saman23  @yahoo . org
    return emailPattern.test(value)
}

export default {testEmail}