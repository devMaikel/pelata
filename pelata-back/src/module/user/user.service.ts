import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { cepRequest } from 'src/utils/cepRequest';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: UserDto) {
    const cepRequester = new cepRequest();
    const emailExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: user.email }, { username: user.username }],
      },
    });

    if (emailExists) {
      return 'Usuário já existe';
    }
    const data = await cepRequester.getAddress(user);
    if (typeof data === 'string') {
      return 'Cep inválido';
    }
    data.gols = 0;
    const newUser = await this.prisma.user.create({
      data,
    });
    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, data: UserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
