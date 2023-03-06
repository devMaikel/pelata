import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ITokenObject } from 'src/interfaces';
import { AdminService } from './admin.service';
import {
  CriarGrupo,
  CriarPartida,
  CriarPelada,
  CriarTime,
} from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('criargrupo')
  criarGrupo(@Body() data: CriarGrupo) {
    return this.adminService.criarGrupo(data);
  }

  @Post('criarpelada')
  criarPelada(@Body() data: CriarPelada) {
    return this.adminService.criarPelada(data);
  }

  @Post('criartime')
  criarTime(@Body() data: CriarTime) {
    return this.adminService.criarTime(data);
  }

  @Post('criarpartida')
  criarPartida(@Body() data: CriarPartida) {
    return this.adminService.criarPartida(data);
  }

  @Post('findallgrupos')
  findAllGrupos(@Body() data: ITokenObject) {
    return this.adminService.findAllGrupos(data.token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
