// const http = require('http');
//
//
// function handler1(req, res) {
//   console.log(req.url);
// }
//
// function handler2(req, res) {
//   console.log(req.url);
// }
//
// http.createServer((req, res) => {
//   handler1(req, res);
//   handler2(req, res);
//   res.end();
// }).listen();

/////////////////////////////

// const { AsyncLocalStorage } = require('async_hooks');
//
// const asyncLocalStorage = new AsyncLocalStorage();
//
//
// function logWithId(msg) {
//   const id = asyncLocalStorage.getStore();
//   console.log(`${id !== undefined ? id : '-'}:`, msg);
// }
//
// asyncLocalStorage.run(1, () => {
//   logWithId('start');
//   setImmediate(() => {
//     logWithId('finish');
//   });
// });

/////////////////////////////

const http = require('http');
const { AsyncLocalStorage } = require('async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

function handler1() {
  const { req } = asyncLocalStorage.getStore();
  console.log(req.url);
}

function handler2() {
  setImmediate(() => {
    const { req } = asyncLocalStorage.getStore();
    console.log(req.url);
  });
}

http.createServer((req, res) => {

  asyncLocalStorage.run({ req, res }, () => {
    handler1();
    handler2();
  });

  res.end();

}).listen(9999, () => {
  http.get({ port: 9999, path: '/test' })
});

////////



class AsyncLocalStorage {
  constructor() {
    this.kResourceStore = Symbol('kResourceStore');
    this.enabled = false;
  }
}



const storageList = [];

const storageHook = createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    const currentResource = executionAsyncResource();
    // 传递上下文
    for (let i = 0; i < storageList.length; ++i) {
      storageList[i]._propagate(resource, currentResource, type);
    }
  },
});

main(store, callback, ...args) {
  // 把当前 AsyncLocalStorage 加入队列
  ArrayPrototypePush(storageList, this);
  // 启动 AsyncHooks
  storageHook.enable();
  // 获取当前的异步资源，比如收到的请求
  const resource = executionAsyncResource();
  // 记录旧的上下文
  const oldStore = resource[this.kResourceStore];
  // 修改当前异步资源的上下文
  resource[this.kResourceStore] = store;
  // 在新的上下文中执行传入的回调函数
  try {
    return ReflectApply(callback, null, args);
  } finally {
    resource[this.kResourceStore] = oldStore;
  }
}






