import * as Yup from 'yup';
import { FORM_ERRORS } from '../enum/form.enum';

export const WithdrawFormSchema = Yup.object().shape({
    bankName: Yup.string().required(FORM_ERRORS.REQUIRED),
    routingNumber: Yup.string().length(9, FORM_ERRORS.MISSMATCH_LENGTH).required(FORM_ERRORS.REQUIRED),
    name: Yup.string().required(FORM_ERRORS.REQUIRED),
    accountNumber: Yup.string().required(FORM_ERRORS.REQUIRED),
    amount: Yup.string().required(FORM_ERRORS.REQUIRED),
})