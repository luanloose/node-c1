import React from 'react';
import AgendamentoStore from './agendamentoStore';
import AuthenticationStore from './authenticationStore';
import PessoaStore from './pessoaStore';
import UnidadeSaudeStore from './unidadeSaudeStore';

// iniciar todos os stores
export const storesContext = React.createContext({
  authenticationStore: new AuthenticationStore(),
  pessoaStore: new PessoaStore(),
  unidadeSaudeStore: new UnidadeSaudeStore(),
  agendamentoStore: new AgendamentoStore(),
});