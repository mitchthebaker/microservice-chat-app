// access a variable inside of process.env, throwing an error of it's not found
// always run this method in advance (i.e. upon initialisation) so that the error is thrown 
// caching the values improves performance - accessing process.env many times is bad 

const cache: { [key: string]: string } = {};

const accessEnv = (key: string, defaultValue: string) => {
  if(!(key in process.env) || typeof process.env[key] === undefined) {
    if(defaultValue) return defaultValue;

    throw new Error(`${key} not found in process.env`);
  }

  if(!(key in cache)) {
    cache[key] = <string>process.env[key];
  }

  return cache[key];
};

export default accessEnv;