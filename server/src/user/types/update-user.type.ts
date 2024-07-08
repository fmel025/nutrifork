import { User } from '@prisma/client';

export type UpdateUserType = Partial<Omit<User, 'id'>>;
