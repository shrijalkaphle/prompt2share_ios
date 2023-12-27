import * as Yup from 'yup';
import { FORM_ERRORS } from '../enum/form.enum';

export const ReportFormSchema = Yup.object().shape({
    title: Yup.string().required(FORM_ERRORS.REQUIRED),
    message: Yup.string().required(FORM_ERRORS.REQUIRED),
})