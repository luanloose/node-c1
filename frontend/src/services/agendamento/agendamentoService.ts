import http from '../httpService';
import AgendamentoDto from './dto/agendamentoDto';

class AgendamentoService {
  public async create(input: AgendamentoDto): Promise<AgendamentoDto> {
    console.log(input);
    let result = await http.post('agendamentos', input);
    return result.data;
  }
}

export default new AgendamentoService();
