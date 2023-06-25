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
import { run_ts_sql_query0 } from './db/sqlite3/ts-sql-query0'
import { runRegex } from './regex'
import { tryEventEmitter } from './eventEmitter'

const main = async () => {
  // runRegex()
  run_facker();
  // tryEventEmitter()
  // async_1()
  // momentPlay()

  // ramdaPlay()
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
  // await run_sqlite0()
  // run_ts_sql_query0()
  // run_facker()
  //

}


main()
