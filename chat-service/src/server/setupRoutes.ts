import config from "config";
import { Express } from "express";
import dayjs from "dayjs";
//import omit from "lodash.omit";
import { getConnection, getRepository } from "typeorm";

import Chat from "#root/db/entities/Chat";
import generateUUID from "#root/helpers/generateUUID";

const setupRoutes = (app: Express) => {
  const connection = getConnection();
  const chatRepository = getRepository(Chat);

  app.get("/chats/:username", async (req, res, next) => {
    try {
      const chats = await chatRepository.find({ where: { username: req.params.username} });

      if(!chats) return res.status(404).end();

      return res.json(chats);
    }
    catch(err) {
      return next(err);
    }
  });

  app.post("/chats", async (req, res, next) => {
    if(!req.body.username || !req.body.message) return next(new Error("Invalid body"));

    try {
      const newChat = {
        id: generateUUID(),
        message: req.body.message,
        username: req.body.username
      };

      await connection.createQueryBuilder().insert().into(Chat).values([newChat]).execute();

      return res.json(newChat)
    }
    catch(err) {
      return next(err);
    }
  });
};

export default setupRoutes;