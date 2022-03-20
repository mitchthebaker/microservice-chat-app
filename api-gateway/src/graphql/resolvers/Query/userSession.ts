import { ResolverContext } from "#root/graphql/types";

interface Args {
  me: boolean;
}

const userSessionResolver = async (obj: any, args: Args, context: ResolverContext) => {
  if(args.me !== true) throw new Error("Unsupported argument value");
  console.log(args.me);
  console.log(context.res.locals);
  console.log(context.res.locals.userSession);
  return context.res.locals.userSession;
};

export default userSessionResolver;