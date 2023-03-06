import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IAdress } from 'src/interfaces';
import { cepRequest } from 'src/utils/cepRequest';
import { validateFunction } from 'src/utils/tokenFunctions';
import { UserDtoNoPassword } from '../user/dto/user.dto';
import {
  CriarGrupo,
  CriarPartida,
  CriarPelada,
  CriarTime,
} from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // create(createAdminDto: CreateAdminDto) {
  //   return 'This action adds a new admin';
  // }

  async criarGrupo(data: CriarGrupo) {
    const userData = validateFunction(data.token) as UserDtoNoPassword;
    const response = await this.prisma.grupo.create({
      data: {
        nome: data.descricao,
        descricao: data.descricao,
        admin_id: userData.id,
      },
    });
    return response;
  }

  async criarPelada(data: CriarPelada) {
    validateFunction(data.token);
    const cepRequester = new cepRequest();
    const adress = (await cepRequester.getAddressByCep(data.cep)) as IAdress;
    if (!adress.cidade) {
      throw new HttpException('Cep inválido', 400, {
        cause: new Error('Cep inválido'),
      });
    }
    const response = await this.prisma.pelada.create({
      data: {
        grupo_id: data.grupo_id,
        data: new Date(data.data),
        cep: data.cep,
        cidade: adress.cidade,
        estado: adress.estado,
        bairro: adress.bairro,
        rua: adress.rua,
      },
    });
    return response;
  }

  async criarPartida(data: CriarPartida) {
    validateFunction(data.token);
    const response = await this.prisma.partida.create({
      data: {
        pelada_id: data.pelada_id,
        vencedor_id: data.vencedor_id,
      },
    });
    return response;
  }

  async criarTime(data: CriarTime) {
    validateFunction(data.token);
    const response = await this.prisma.time.create({
      data: {
        cor: data.cor,
        pelada_id: data.pelada_id,
      },
    });
    return response;
  }

  async findAllGrupos(token: string) {
    validateFunction(token);
    return await this.prisma.grupo.findMany({
      include: {
        peladas: true,
        jogadores_cadastrados: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  // update(id: number, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
