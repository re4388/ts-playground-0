// Import ioredis.
// You can also use `import { Redis } from "ioredis"`
// if your project is a TypeScript project,
// Note that `import Redis from "ioredis"` is still supported,
// but will be deprecated in the next major version.
import Redis from "ioredis";

ioredis_play()


export async function ioredis_play() {
  // Create a Redis instance.
  // By default, it will connect to localhost:6379.
  // We are going to cover how to specify connection options soon.
  // docker run --name my-redis -p 6380:6379 -d redis
  const redis = new Redis("6380");

  redis.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

  let res = await redis.get("mykey");
  console.log(res);

  // All arguments are passed directly to the redis server,
  // so technically ioredis supports all Redis commands.
  // The format is: redis[SOME_REDIS_COMMAND_IN_LOWERCASE](ARGUMENTS_ARE_JOINED_INTO_COMMAND_STRING)
  // so the following statement is equivalent to the CLI: `redis> SET mykey hello EX 10`
  redis.set("mykey2", "hello2", "EX", 70);

  // redis.zadd("sortedSet", 1, "one", 2, "dos", 4, "quatro", 3, "three");
  // redis.zrange("sortedSet", 0, 2, "WITHSCORES").then((elements) => {
  //   // ["one", "1", "dos", "2", "three", "3"] as if the command was `redis> ZRANGE sortedSet 0 2 WITHSCORES`
  //   console.log(elements);
  // });
}
