import Cookies from 'js-cookie';
import { action, makeObservable } from 'mobx';
import AppConst from '../configs/appconst';
import agendamentoService from '../services/agendamento/agendamentoService';
import AgendamentoDto from '../services/agendamento/dto/agendamentoDto';

class AgendamentoStore {
  constructor() { // iniciar os estados das variáveis e métodos
    makeObservable(this, {
      create: action
    });
  }

  public async create(input: AgendamentoDto) {
    var idPessoa: number = Cookies.get(AppConst.authorization.encrptedAuthTokenName) ? (+Cookies.get(AppConst.authorization.encrptedAuthTokenName)!) : 0;
    input.pessoa_id = idPessoa;
    let result = await agendamentoService.create(input);
    return result;
  }

}
export default AgendamentoStore;