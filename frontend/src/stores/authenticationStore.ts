import AppConst from '../configs/appconst';
import { action, makeObservable } from 'mobx';
import Cookies from 'js-cookie';
import AuthenticationDto from '../services/auth/dto/authenticationDto';
import authService from '../services/auth/authService';
import isAuthenticatedOutput from '../services/auth/dto/isAuthenticatedOutput';

class AuthenticationStore {
  constructor() { // iniciar os estados das variáveis e métodos
    makeObservable(this, {
      login: action,
      logout: action
    });
  }

  get isAuthenticated(): isAuthenticatedOutput { // verificar se esta logado
    let isLogged = !!Cookies.get(AppConst.authorization.encrptedAuthTokenName);
    let isAdmin = Cookies.get(AppConst.authorization.typeUserName) === 'admin' ? true : false;
    
    return {
      isLogged,
      isAdmin
    } as isAuthenticatedOutput;
  }

  public async login(model: AuthenticationDto) { // realizar login
    let result = await authService.authenticate({ // chamar método de autenticação do service
      email: model.email,
      password: model.password
    });

    // salvar token de autenticação no cookies com 1 dia de expiração
    Cookies.set(AppConst.authorization.encrptedAuthTokenName, result.id.toString(), { expires: 1 });

    // salvar cookie de tipo de usuário
    if (model.email === 'admin') {
      Cookies.set(AppConst.authorization.typeUserName, 'admin', { expires: 1 });
    } else {
      Cookies.set(AppConst.authorization.typeUserName, 'user', { expires: 1 });
    }
  }

  logout() { // fazer logout
    Cookies.remove(AppConst.authorization.encrptedAuthTokenName); // remover cookie de token
    Cookies.remove(AppConst.authorization.typeUserName); // remover cookie de tipo usuário
    localStorage.clear(); // limpar local storage
    sessionStorage.clear(); // limpar session
  }
}
export default AuthenticationStore;