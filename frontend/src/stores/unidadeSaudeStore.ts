import { action, makeObservable } from 'mobx';
import UnidadeSaudeDto from '../services/unidadeSaude/dto/unidadeSaudeDto';
import unidadeSaudeService from '../services/unidadeSaude/unidadeSaudeService';

class UnidadeSaudeStore {
  constructor() { // iniciar os estados das variáveis e métodos
    makeObservable(this, {
      getList: action
    });
  }

  public async getList(): Promise<UnidadeSaudeDto[]> {
    let result = await unidadeSaudeService.getList();
    return result
  }

}
export default UnidadeSaudeStore;