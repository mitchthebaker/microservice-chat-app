import ChatsService from "#root/adapters/ChatsService";

interface Args {
  username: string;
}

const getChatsResolver = async (obj: any, { username }: Args) => {
  const chats = await ChatsService.fetchChats({ username });
  if(!chats) throw new Error("No chats found belonging to " + username);

  return chats;
};

export default getChatsResolver;