import http from '../httpService';
import UnidadeSaudeDto from './dto/unidadeSaudeDto';

class UnidadeSaudeService {
  public async getList(): Promise<UnidadeSaudeDto[]> {
    let result = await http.get('unidadesSaude');
    return result.data;
  }
}

export default new UnidadeSaudeService();
