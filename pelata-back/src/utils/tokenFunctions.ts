import { HttpException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { UserDto } from 'src/module/user/dto/user.dto';

export const createToken = (data: UserDto): string => {
  const jwtKey = process.env.JWT_SECRET;

  const token = sign({ data }, jwtKey, {
    expiresIn: '15d',
    algorithm: 'HS256',
  });

  return token;
};

export const validateToken = (token: string) => {
  try {
    const jwtKey = process.env.JWT_SECRET;
    const data = verify(token, jwtKey);
    return data; // retorna {data: { id, name, email, role}, iat: data de emissao, exp: data de expiração } em caso de sucesso
  } catch (_e) {
    return 'Expired or invalid token';
  }
};

export const validateFunction = (token: string) => {
  const tokenValidate = validateToken(token);
  if (typeof tokenValidate === 'string') {
    throw new HttpException('Token inválido', 409, {
      cause: new Error('Token inválido'),
    });
  }
  return tokenValidate.data;
};
