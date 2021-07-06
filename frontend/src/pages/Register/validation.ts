import * as yup from 'yup';
import AppConst from './../../configs/appconst';

export const validationSchema = yup.object({
  nome: yup
    .string()
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
  cpf: yup
    .string()
    .matches(AppConst.validation.patterns.CPF, AppConst.validation.messages.CPF_INVALIDO)
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
  data_nascimento: yup
    .string()
    .matches(AppConst.validation.patterns.DATA, AppConst.validation.messages.DATA_INVALIDA)
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
  telefone: yup
    .string()
    .matches(AppConst.validation.patterns.TELEFONE, AppConst.validation.messages.TELEFONE_INVALIDO)
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
  grupo_prioritario: yup
    .boolean()
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
  endereco: yup
    .string()
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
  email: yup
    .string()
    .email(AppConst.validation.messages.CAMPO_INVALIDO)
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
});

export const initialValues = {
  nome: '',
  cpf: '',
  data_nascimento: '',
  telefone: '',
  grupo_prioritario: false,
  endereco: '',
  email: '',
  password: ''
}