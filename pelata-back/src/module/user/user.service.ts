import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { cepRequest } from 'src/utils/cepRequest';
import {
  PatchJogadorDto,
  TokenObj,
  UserDto,
  UserDtoNoPassword,
} from './dto/user.dto';
import { createHash } from 'crypto';
import { createToken, validateFunction } from 'src/utils/tokenFunctions';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: UserDto) {
    if (user.password.length < 6) {
      throw new HttpException('A senha deve conter 6 ou mais caracteres', 400, {
        cause: new Error('A senha deve conter 6 ou mais caracteres'),
      });
    }

    const cepRequester = new cepRequest();

    const emailExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: user.email }, { username: user.username }],
      },
    });

    if (emailExists) {
      throw new HttpException('Usuário já existe', 400, {
        cause: new Error('Usuário já existe'),
      });
    }
    const data = await cepRequester.getAddress(user);
    if (typeof data === 'string') {
      throw new HttpException('Cep inválido', 400, {
        cause: new Error('Cep inválido'),
      });
    }
    data.password = createHash('md5').update(data.password).digest('hex');
    const newUser = await this.prisma.user.create({
      data,
    });
    return newUser;
  }

  // async findAll() {
  //   const allUsers = await this.prisma.user.findMany({
  //     include: {
  //       grupos_cadastrados: true,
  //       peladas_cadastradas: true,
  //       times: true,
  //     },
  //   });
  //   allUsers.forEach((e) => delete e.password);
  //   return allUsers;
  // }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    delete user.password;
    return user;
  }

  async findOneJogador(id: number) {
    const jogador = await this.prisma.jogador.findFirst({
      where: { id },
    });
    return jogador;
  }

  async updateJogadorById(id: number, data: PatchJogadorDto) {
    const updateJogador = await this.prisma.jogador.update({
      where: {
        id,
      },
      data: {
        nome: data.username,
        posicao: data.posicao,
      },
    });
    return updateJogador;
  }

  async remove(id: number) {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    delete deleteUser.password;
    return deleteUser;
  }

  async login({ email, password }) {
    const passwordMd5 = createHash('md5').update(password).digest('hex');
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user || user.password !== passwordMd5) {
      throw new HttpException('Email ou senha inválidos', 404, {
        cause: new Error('Email ou senha inválidos'),
      });
    }
    delete user.password;
    const token = createToken(user);
    return { ...user, token };
  }

  async addGol(id: number, token: string) {
    validateFunction(token);
    const jogador = await this.findOneJogador(id);
    const result = this.prisma.jogador.update({
      where: {
        id,
      },
      data: {
        gols: jogador.gols + 1,
      },
    });
    return result;
  }

  async addPelada(id: number, token: string, foreignId: number) {
    const userData = validateFunction(token) as UserDtoNoPassword;
    try {
      const result = await this.prisma.jogador.update({
        where: { id: userData.id },
        data: {
          peladas_cadastradas: {
            connect: { id: foreignId },
          },
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async rmvPelada(id: number, token: string, foreignId: number) {
    const userData = validateFunction(token) as UserDtoNoPassword;
    try {
      const result = await this.prisma.jogador.update({
        where: { id: userData.id },
        data: {
          peladas_cadastradas: {
            disconnect: { id: foreignId },
          },
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async addGrupo(id: number, token: string, foreignId: number) {
    validateFunction(token);
    try {
      const result = await this.prisma.jogador.update({
        where: { id },
        data: {
          grupos_cadastrados: {
            connect: { id: foreignId },
          },
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async rmvGrupo(id: number, token: string, foreignId: number) {
    validateFunction(token);
    try {
      const result = await this.prisma.jogador.update({
        where: { id },
        data: {
          grupos_cadastrados: {
            disconnect: { id: foreignId },
          },
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async checkToken(token: TokenObj) {
    validateFunction(token.token);
    return 'Token ok';
  }

  // async addTime(id: number, token: string, foreignId: number) {
  //   validateFunction(token);
  //   try {
  //     const result = await this.prisma.jogador.update({
  //       where: { id },
  //       data: {
  //         times: {
  //           connect: { id: foreignId },
  //         },
  //       },
  //     });
  //     delete result.password;
  //     return result;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // async rmvTime(id: number, token: string, foreignId: number) {
  //   validateFunction(token);
  //   try {
  //     const result = await this.prisma.user.update({
  //       where: { id },
  //       data: {
  //         times: {
  //           disconnect: { id: foreignId },
  //         },
  //       },
  //     });
  //     delete result.password;
  //     return result;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async test() {
    // const test = await this.prisma.pelada.create({ //adicionar pelada e já cadastrar um jogador
    //   data: {
    //     cep: '59060300',
    //     data: new Date('2023-02-15'),
    //     jogadores_cadastrados: {
    //       connect: { id: 1 },
    //     },
    //   },
    // });

    // const test = await this.prisma.user.findFirst({  //buscar por id e incluir o campo peladas_cadastradas
    //   where: { id: 1 },
    //   include: {
    //     peladas_cadastradas: true,
    //   },
    // });
    return test;
  }
}
