import * as Yup from 'yup'

export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required('نام و نام خانوادگی الزامیست'),
    photo: Yup.string(),
    mobile: Yup.number().required('شماره تماس الزامیست'),
    email: Yup.string().email('آدرس ایمیل معتبر نیست').required('نشانی ایمیل الزامیست'),
    job: Yup.string().required('انتخاب شغل الزامیست'),
    group: Yup.string()
})
