export interface ICepReturn {
  data: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  };
}

export interface IAdress {
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
}
