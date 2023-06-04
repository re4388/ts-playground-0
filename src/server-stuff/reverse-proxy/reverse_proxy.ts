import {
  HttpReverseProxy,
  SimpleHttpServer,
  Statistics,
  StatisticsServer,
  StatisticsServerOptions,
  Logger
} from 'http-reverse-proxy-ts'

// const stats = new Statistics();

// const statisticsServerOptions: StatisticsServerOptions = {
//   stats: stats,
//   htmlFilename: "./public/statisticsAndLoggingPage.html",
// };

// const statisticsServer = new StatisticsServer(statisticsServerOptions);

const logger = new Logger()

const server1 = new SimpleHttpServer(1, 8001)
const server2 = new SimpleHttpServer(2, 8002)

server1.start()
server2.start()

const proxy = new HttpReverseProxy({
  // stats: stats,
  log: logger
})

proxy.addRoute('http://server1.qzqzqz.com', 'localhost:8001')
proxy.addRoute('http://server2.qzqzqz.com', 'localhost:8002')

logger.info(null, 'Proxy server started')
