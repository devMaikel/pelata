import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  EmailAndPassword,
  IdAndToken,
  IdTokenIdf,
  PatchJogadorDto,
  TokenObj,
  UserDto,
} from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create/')
  create(@Body() userData: UserDto) {
    return this.userService.create(userData);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('updatebyid/:id')
  update(@Param('id') id: string, @Body() userData: PatchJogadorDto) {
    return this.userService.updateJogadorById(+id, userData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('login')
  login(@Body() userLogin: EmailAndPassword) {
    return this.userService.login(userLogin);
  }

  @Post('checktoken')
  checkToken(@Body() token: TokenObj) {
    return this.userService.checkToken(token);
  }

  @Patch('addgol') // passa { id, token } no body e sera adicionado um gol ao jogador com id passado
  addGol(@Body() userData: IdAndToken) {
    return this.userService.addGol(userData.id, userData.token);
  }

  @Patch('addgrupo') // passa { id, token } no body e sera adicionado um gol ao jogador com id passado
  addGrupo(@Body() userData: IdTokenIdf) {
    return this.userService.addGrupo(
      userData.id,
      userData.token,
      userData.foreignId,
    );
  }

  @Patch('rmvgrupo') // passa { id, token } no body e sera adicionado um gol ao jogador com id passado
  rmvGrupo(@Body() userData: IdTokenIdf) {
    return this.userService.rmvGrupo(
      userData.id,
      userData.token,
      userData.foreignId,
    );
  }

  @Patch('addpelada') // passa { id, token } no body e sera adicionado um gol ao jogador com id passado
  addPelada(@Body() userData: IdTokenIdf) {
    return this.userService.addPelada(
      userData.id,
      userData.token,
      userData.foreignId,
    );
  }

  @Patch('rmvpelada') // passa { id, token } no body e sera adicionado um gol ao jogador com id passado
  rmvPelada(@Body() userData: IdTokenIdf) {
    return this.userService.rmvPelada(
      userData.id,
      userData.token,
      userData.foreignId,
    );
  }

  // @Patch('addtime') // passa { id, token } no body e sera adicionado um gol ao jogador com id passado
  // addTime(@Body() userData: IdTokenIdf) {
  //   return this.userService.addTime(
  //     userData.id,
  //     userData.token,
  //     userData.foreignId,
  //   );
  // }

  // @Patch('rmvtime') // passa { id, token } no body e sera adicionado um gol ao jogador com id passado
  // rmvTime(@Body() userData: IdTokenIdf) {
  //   return this.userService.rmvTime(
  //     userData.id,
  //     userData.token,
  //     userData.foreignId,
  //   );
  // }
}
