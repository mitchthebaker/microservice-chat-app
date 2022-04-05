import config from "config";
import got from "got-cjs";

const CHAT_SERVICE_URI = <string>config.get("CHAT_SERVICE_URI");

export interface Chat {
  createdAt: string;
  id: string;
  message: string;
  username: string;
}

class ChatsService {
  static async fetchChats({ username }: { username: string }): Promise<Chat[] | null> {
    const body = await got.get(`${CHAT_SERVICE_URI}/chats/${username}`).json().catch((err) => {
      if(err.response.statusCode === 404) return null;
      throw err;
    });

    if(!body) return null;

    return <Chat[]>body;
  }

  static async createChat({ username, message }: { username: string, message: string }): Promise<Chat | null> {
    const body = await got.post(`${CHAT_SERVICE_URI}/chats`, { json: { username, message } }).json();
    return <Chat>body;
  }
}

export default ChatsService;