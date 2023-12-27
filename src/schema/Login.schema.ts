import * as Yup from 'yup';
import { FORM_ERRORS } from '../enum/form.enum';

export const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
        .email(FORM_ERRORS.EMAIL)
        .required(FORM_ERRORS.REQUIRED),
    password: Yup.string()
      .min(6, FORM_ERRORS.TOO_SHORT)
      .max(50, FORM_ERRORS.TOO_LONG)
      .required(FORM_ERRORS.REQUIRED),
})