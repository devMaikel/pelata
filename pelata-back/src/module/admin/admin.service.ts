import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { validateFunction } from 'src/utils/tokenFunctions';
import { CriarGrupo } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // create(createAdminDto: CreateAdminDto) {
  //   return 'This action adds a new admin';
  // }

  async criarGrupo(data: CriarGrupo) {
    validateFunction(data.token);
    const response = await this.prisma.grupo.create({
      data: {
        descricao: data.descricao,
        nome: data.descricao,
        admin_id: data.admin_id,
      },
    });
    return response;
  }

  findAll() {
    return `This action returns all admin`;
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
