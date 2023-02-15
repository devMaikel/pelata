import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { cepRequest } from 'src/utils/cepRequest';
import { PatchUserDto, UserDto } from './dto/user.dto';
import { createHash } from 'crypto';
import { createToken } from 'src/utils/tokenFunctions';

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
    data.gols = 0;
    data.password = createHash('md5').update(data.password).digest('hex');
    const newUser = await this.prisma.user.create({
      data,
    });
    return newUser;
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany();
    allUsers.forEach((e) => delete e.password);
    return allUsers;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    delete user.password;
    return user;
  }

  async update(id: number, data: PatchUserDto) {
    const updateUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: data.username,
        posicao: data.posicao,
      },
    });
    delete updateUser.password;
    return updateUser;
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
      throw new HttpException('Cep inválido', 404, {
        cause: new Error('Email ou senha inválido'),
      });
    }
    delete user.password;
    const token = createToken(user);
    return { status: 200, message: { ...user, token } };
  }
}
