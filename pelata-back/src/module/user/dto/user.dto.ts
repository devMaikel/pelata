export type UserDto = {
  id?: number;
  email: string;
  password: string;
  username: string;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export type UserDtoNoPassword = {
  id?: number;
  email: string;
  password?: string;
  username: string;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export type PatchJogadorDto = {
  username: string;
  posicao: string;
};

export type EmailAndPassword = {
  email: string;
  password: string;
};

export type IdAndToken = {
  id: number;
  token: string;
};

export type IdTokenIdf = {
  id: number;
  token: string;
  foreignId: number;
};

export type TokenObj = {
  token: string;
};
