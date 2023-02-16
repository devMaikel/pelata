import { IAdress, ICepReturn } from '../interfaces';
import axios from 'axios';
import { UserDto } from 'src/module/user/dto/user.dto';

export class cepRequest {
  async getAddress(user: UserDto): Promise<UserDto | string> {
    try {
      const { data } = (await axios(
        `https://viacep.com.br/ws/${user.cep.toString()}/json/`,
      )) as ICepReturn;
      user.cidade = data.localidade;
      user.bairro = data.bairro;
      user.rua = data.logradouro;
      user.estado = data.uf;
      if (user.cidade) {
        return user; //retornar doctor com cep preenchido em caso de sucesso na requisição com dados corretos
      }
      return 'error'; //retornar doctor com cep preenchido em caso de sucesso na requisição com dados nulos
    } catch (err) {
      return 'error'; //retornar 'error' em caso de falha na requisição
    }
  }

  async getAddressByCep(cep: string): Promise<IAdress | string> {
    const adress: IAdress = {
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
    };
    try {
      const { data } = (await axios(
        `https://viacep.com.br/ws/${cep}/json/`,
      )) as ICepReturn;
      adress.estado = data.uf;
      adress.cidade = data.localidade;
      adress.bairro = data.bairro;
      adress.rua = data.logradouro;
      if (adress.rua !== '') {
        return adress;
      }
      return 'cep inválido';
    } catch (err) {
      return err;
    }
  }
}
