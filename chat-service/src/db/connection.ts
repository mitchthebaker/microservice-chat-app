import config from "config";
import { Connection, createConnection } from "typeorm";

import Chat from "./entities/Chat";

let connection: Connection;

export const initConnection = async () => {
  connection = await createConnection({
    entities: [Chat],
    type: "mysql",
    url: <string>config.get("CHAT_SERVICE_DB_URL")
  });
};

const getConnection = () => connection;

export default getConnection;