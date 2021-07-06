import * as yup from 'yup';
import AppConst from './../../configs/appconst';

export const validationSchema = yup.object({
  email: yup
    .string()
    //.email(AppConst.validation.messages.CAMPO_INVALIDO)
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
});

export const initialValues = {
  email: '',
  password: ''
}