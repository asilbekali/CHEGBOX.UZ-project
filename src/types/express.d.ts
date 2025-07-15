import { Role } from 'src/user/enum/role.enum';

declare module 'express' {
  interface Request {
    user?: {
      id: number;
      email: string;
      role: Role;
    };
  }
}
