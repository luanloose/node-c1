import http from '../httpService';
import PessoaDto from '../pessoa/dto/pessoaDto';
import AuthenticationDto from './dto/authenticationDto';

class AuthService {
  public async authenticate(authenticationInput: AuthenticationDto): Promise<PessoaDto> {
    let result = await http.post('login', authenticationInput); // chamar api de login do backend
    return result.data;
  }
}

export default new AuthService();
