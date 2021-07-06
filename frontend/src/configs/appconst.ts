const AppConst = {
  authorization: {
    encrptedAuthTokenName: 'authToken',
    typeUserName: 'typeUser',
  },

  validation: {
    patterns: {
      CNPJ: new RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|\d{14}$/),
      CPF: new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|\d{11}$/),
      TELEFONE: new RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$|\d{10,13}$/),
      DATA: new RegExp(
        /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
      ) /* https://stackoverflow.com/a/15504877 */,
      DATA_HORA: new RegExp(
        /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2}) ([0-1]?[0-9]|2?[0-3]):([0-5]\d)$/
      ),
    },
    messages: {
      CAMPO_OBRIGATORIO: 'Campo obrigatório!',
      CAMPO_INVALIDO: 'Preencha o campo corretamente',
      CNPJ_INVALIDO: 'Preencha o campo CNPJ corretamente',
      CPF_INVALIDO: 'Preencha o campo CPF corretamente',
      TELEFONE_INVALIDO: 'Preencha o campo Telefone corretamente',
      DATA_INVALIDA: 'Preencha o campo Data corretamente',
    },
  },
};
export default AppConst;