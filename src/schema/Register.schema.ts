import * as Yup from 'yup';
import { FORM_ERRORS } from '../enum/form.enum';

export const RegisterFormSchema = Yup.object().shape({
    name: Yup.string().required(FORM_ERRORS.REQUIRED),
    email: Yup.string()
        .email(FORM_ERRORS.EMAIL)
        .required(FORM_ERRORS.REQUIRED),
    password: Yup.string()
      .min(6, FORM_ERRORS.TOO_SHORT)
      .max(50, FORM_ERRORS.TOO_LONG)
    //   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, 'Password must contain at least 10 characters, one uppercase letter, one lowercase letter, one number, one special character, and no spaces')
      .required(FORM_ERRORS.REQUIRED),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required(FORM_ERRORS.REQUIRED),
})

export const RegisterOTPSchema = Yup.object().shape({
    otp: Yup.string().required(FORM_ERRORS.REQUIRED).length(6, FORM_ERRORS.TOO_SHORT),
    email: Yup.string().required(FORM_ERRORS.REQUIRED),
})