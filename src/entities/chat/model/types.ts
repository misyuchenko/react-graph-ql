import type { User } from '@/entities/user';

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  participants: User[];
}
