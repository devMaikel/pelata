import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  CriarGrupo,
  CriarPartida,
  CriarPelada,
  CriarTime,
} from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('criargrupo')
  criarGrupo(@Body() data: CriarGrupo) {
    return this.adminService.criarGrupo(data);
  }

  @Post('criarpelada')
  criarPelada(@Body() createAdminDto: CriarPelada) {
    return this.adminService.create(createAdminDto);
  }

  @Post('criartime')
  criarTime(@Body() createAdminDto: CriarTime) {
    return this.adminService.create(createAdminDto);
  }

  @Post('criarpartida')
  criarPartida(@Body() createAdminDto: CriarPartida) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
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
