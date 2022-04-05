import ChatsService from "#root/adapters/ChatsService";
import { create } from "got-cjs/dist/source";

interface Args {
  username: string;
  message: string;
}

const createChatResolver = async (obj: any, { username, message }: Args) => {
  return await ChatsService.createChat({ username, message });
};

export default createChatResolver;