import { NextFunction, Request, Response } from "express";

import UsersService from "#root/adapters/UsersService";

const injectSession = async (req: Request, res: Response, next: NextFunction) => {
  //console.log(req);
  //console.log(req.cookies);
 if(req.cookies.userSessionId) {
   const userSession = await UsersService.fetchUserSession({ sessionId: req.cookies.userSessionId });
   console.log("userSession injected", userSession);
   res.locals.userSession = userSession;
 }   
 //console.log('user session not injected');

 return next();
}

export default injectSession;