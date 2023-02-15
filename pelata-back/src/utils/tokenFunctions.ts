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
    return { status: 401, message: 'Expired or invalid token' };
  }
};
