import { ioredis_play } from './redis/ioredis_play'
import { lua_script_redis } from './redis/luaScript_redis_play'
import { magic_regexp } from './magic_regexp'
import { momentPlay } from './moment_play'
import { mqttPlay } from './mqtt_client_play'
import { netmask } from './netmask_play'
import { ramdaPlay } from './ramda_play'
import { bullJob, bullWorker } from './redis/redis_bull'
import { tcpServer } from './server-stuff/tcp_server_play'
import { run_facker } from './facker'
import { proxyServerWithExpress } from './server-stuff/reverse-proxy/reverse-proxy-server-with-express'
import { expressProxy } from './server-stuff/reverse-proxy/express-proxy-middleware'
import { port_forwarding } from './server-stuff/reverse-proxy/port-forwarding'
import { nodeJS_Process } from './nodeJS/process'
import { run_sqlite0 } from './db/sqlite3/sqlite0'

const main = async () => {
  // facker();
  // momentPlay()
  // ramdaPlay();
  // mqttPlay();
  // tcpServer();
  // netmask()
  // ioredis_play();
  // lua_script_redis();
  // magic_regexp();
  // await bullJob();
  // await bullWorker();
  // await proxyServer()
  // expressProxy()
  // proxyServerWithExpress()
  // port_forwarding()
  // nodeJS_Process()
  run_sqlite0()
  // run_facker()
}

main()
