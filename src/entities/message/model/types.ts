import type { User } from '@/entities/user';

export interface Message {
  id: string;
  chatId: string;
  sender: User;
  text: string;
  createdAt: string;
}
