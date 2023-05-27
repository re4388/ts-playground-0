import "reflect-metadata";
import { ioredis_play } from "./redis/ioredis_play";
import { lua_script_redis } from "./redis/luaScript_redis_play";
import { magic_regexp } from "./magic_regexp";
import { momentPlay } from "./moment_play";
import { mqttPlay } from "./mqtt_client_play";
import { netmask } from "./netmask_play";
import { ramdaPlay } from "./ramda_play";
import { bullJob, bullWorker } from "./redis/redis_bull";
import { tcpServer } from "./tcp_server_play";

const main = async () => {
  // momentPlay();
  ramdaPlay();
  // mqttPlay();
  // tcpServer();
  // netmask()
  // ioredis_play();
  // lua_script_redis();
  // magic_regexp();
  //   await bullJob();
  // await bullWorker();
};

main();
