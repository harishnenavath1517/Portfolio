import { Message } from '../models/Message.js';

export async function createMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  return Message.create(data);
}
