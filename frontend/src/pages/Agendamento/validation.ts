import * as yup from 'yup';
import AppConst from './../../configs/appconst';

export const validationSchema = yup.object({
  observacoes: yup
    .string(),
  data_hora: yup
    .string()
    .matches(AppConst.validation.patterns.DATA_HORA, AppConst.validation.messages.DATA_INVALIDA)
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
  unidade_saude_id: yup
    .number()
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
  necessidades_especiais: yup
    .boolean()
    .required(AppConst.validation.messages.CAMPO_OBRIGATORIO),
});

export const initialValues = {
  observacoes: '',
  data_hora: '',
  unidade_saude_id: '',
  necessidades_especiais: false
}