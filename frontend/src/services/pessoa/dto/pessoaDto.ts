class PessoaDto {
  id!: number;
  nome!: string;
  password!: string;
  cpf!: string;
  data_nascimento!: string;
  telefone!: string;
  grupo_prioritario!: boolean;
  endereco!: string;
  email!: string;
  unidade_saude_id?: string;
}

export default PessoaDto;