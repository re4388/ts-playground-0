// ex
function delay(ms) { // <-- 參數帶進來
  return new Promise((resolve, reject) => {
    // setTimeout 非同步呼叫
    setTimeout(() => {
      resolve(new Date())   //
    }, ms)      // <-- 因為參數要被 setTimepit 使用
  })
}




// ex node 基本 callback 格式
// getStuff("dataParam", function(err, data) { …
function getStuffAsync(param) {
  return new Promise(function(resolve, reject) {

    // 非同步呼叫, cb style
    getStuff(param, function(err, data) {
      if (err !== null) reject(err);
      else resolve(data);
    });
  });
}



// ex  node 其他 callback 格式
// function getUserData(userId, onLoad, onFail) {}
function getUserDataAsync(userId) {
  return new Promise(function(resolve, reject) {
    getUserData(userId, resolve, reject);
  });
}



// XMLHttpRequest to Promise
const xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.onload = () => {
  return xhr.response
}

xhr.onerror = () => {
  throw new Error(JSON.stringify({
    status: xhr.status,
    statusText: xhr.statusText
  }))
}

xhr.send();

// =>
function makeRequest (method, url) {

  // 一樣用 建構子包住
  return new Promise(function (resolve, reject) {

    // 這邊一樣
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);

    // 非同步監聽 onload
    xhr.onload =  () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);  // resolve 包住 會 ret 的東西
      } else {

        // reject 包住會 reject 的東西
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };

    // 非同步監聽 error
    xhr.onerror =  () => {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };

    // 這邊一樣
    xhr.send();
  });
}

// 上面的使用方法
makeRequest('GET', 'http://example.com')
  .then(function (datums) {
    console.log(datums);
  })
  .catch(function (err) {
    console.error('Augh, there was an error!', err.statusText);
  });


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// 找 dp-book 例子

// 一個最簡單的模擬非同步函數, 透過 setTimeout
export function asyncFn (label) {
  return new Promise(resolve => {

    // setTimeout 非同步呼叫
    setTimeout(() => {
      console.log(`Async asyncFn ${label} completed`)
      resolve(`Async asyncFn ${label} result`)
    }, 1000)
  })
}

// delayError
function delayError (milliseconds) {
  return new Promise((resolve, reject) => {

    // setTimeout 非同步呼叫
    setTimeout(() => {
      reject(new Error(`Error after ${milliseconds}ms`))
    }, milliseconds)
  })
}


// 有 cb 的非同步操作，我們用 promise 建構子包起來
export function balancedRequest(options) {

  return new Promise((resolve) => {

    options.hostname = servers[i].host
    options.port = servers[i].port

    // 非同步呼叫, cb style
    request(options, (response) => {
      resolve(getStream(response))
    }).end()
  })
}


// 同上，包住 cb style 的非同步操作
function sendRequest(data) {

  console.log('Sending request', data)

  return new Promise((resolve, reject) => {

    const correlationId = nanoid()

    // setTimeout 非同步呼叫
    const replyTimeout = setTimeout(() => {
      correlationMap.delete(correlationId)
      reject(new Error('Request timeout'))
    }, 10 * 1000) // 10 sec

    // cb style 的非同步呼叫
    correlationMap.set(correlationId, (replyData) => {
      correlationMap.delete(correlationId)
      clearTimeout(replyTimeout)
      resolve(replyData)
    })

    proc.send({
      type: 'request',
      data,
      id: correlationId
    })


  })
}


class WhatEver {

  // 同上，包住 cb style 的非同步操作
  send (queue, message) {
    return new Promise((resolve, reject) => {

      const id = nanoid()

      // setTimeout 非同步呼叫
      const replyTimeout = setTimeout(() => {
        this.correlationMap.delete(id)
        reject(new Error('Request timeout'))
      }, 10000)

      // 這裡有 cb based 的非同步呼叫
      this.correlationMap.set(id, (replyData) => {
        this.correlationMap.delete(id)
        clearTimeout(replyTimeout)
        resolve(replyData)
      })

      this.channel.sendToQueue(queue,
        Buffer.from(JSON.stringify(message)),
        { correlationId: id, replyTo: this.replyQueue }
      )


    })
  }

}


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// hermes 例子


function readiness() {
  return __awaiter(this, void 0, void 0, function* () {

    return new Promise((resolve, reject) => {
      let counter = 0;

      // setInterval 非同步呼叫
      const timer = setInterval(() => __awaiter(this, void 0, void 0, function* () {
        if (yield checkRedisConnection()) {
          clearInterval(timer);
          resolve();
        }
        counter++;
        if (counter > 10) {
          clearInterval(timer);
          reject('Cannot connect to Redis');
        }
      }), 1000); // ms



    });
  });
}



//

async function parseCSV(file: Express.Multer.File): Promise<any[]> {

  if (file.mimetype !== 'text/csv') {
    throw new Error(PARAMS_INVALID.type)
  }

  let csvString = file.buffer.toString()

  // Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
  // conversion translates it to FEFF (UTF-16 BOM)
  if (csvString.charCodeAt(0) === 0xfeff) {
    csvString = csvString.slice(1)
  }

  return new Promise((resolve, reject) => {

    // papa.parse 本身是非同步的
    papa.parse(csvString, {
      header: false,
      trimHeaders: true,
      skipEmptyLines: true,
      complete: (results: any) => resolve(results.data),
      error: (error: ParseError) => reject(error)
    })

  })
}


function _append(reqVO) {
  return new Promise((resolve, reject) => {

    // 非同步呼叫, cb style
    sheets.spreadsheets.values.append(reqVO, (error, response) => {
      _callbackLogic(resolve, reject, reqVO, error, response, 'spread-sheets-helper/append')
    })
  })
}

function _get(reqVO) {
  return new Promise((resolve, reject) => {

    // 非同步呼叫, cb style
    sheets.spreadsheets.values.get(reqVO, (error, response) => {
      _callbackLogic(resolve, reject, reqVO, error, response, 'spread-sheets-helper/get')
    })
  })
}

function _authorize() {
  return new Promise((resolve, reject) => {

    // 非同步呼叫, cb style
    googAuthClient.authorize((error, tokens) => {
      _callbackLogic(resolve, reject, null, error, tokens, 'spread-sheets-helper/authorize')
    })
  })
}


// 拿 apple public key
async function _getApplePublicKey(kid) {

  const applePubKeyUrl = config.thirdPartyLoginAuth.apple
  const client = jwksClient({ jwksUri: applePubKeyUrl })

  return new Promise((resolve, reject) => {

    // 非同步呼叫, cb style
    client.getSigningKey(kid, (err, key) => {
      if (err) return reject(err)

      const signingKey = key.getPublicKey()
      return resolve(signingKey)
    })
  })
}


// http 呼叫 grpc 接口，呼叫後都是非同步呼叫
export function create(category: string): Promise<CreateReply> {
  const createRequest: CreateRequest = { category }

  return new Promise((resolve, reject) => {

    // 非同步呼叫
    audienceListsStub.create(createRequest, (err: Error, createReply: CreateReply) => {
      if (err) {
        reject(err)
      } else {
        resolve(createReply)
      }
    })

  })
}

export function EmailVerify(request: EmailVerifyRequest): Promise<EmailVerifyReply> {
  return new Promise((resolve, reject) => {

    // 非同步呼叫
    authStub.EmailVerify(request, (err: Error, reply: EmailVerifyReply) => {
      if (err) {
        reject(err)
      } else {
        resolve(reply)
      }
    })
  })
}

export function smsUpdateStatus(request: SmsStatusUpdateRequest): Promise<void> {
  return new Promise((resolve, reject) => {

    // 非同步呼叫
    smsStub.SmsUpdateStatus(request, (err: Error, reply: void) => {
      if (err) {
        reject(err)
      } else {
        resolve(reply)
      }
    })
  })
}

export function checkClientConnected(req: CheckClientConnectedRequest): Promise<CheckClientConnectedResponse> {
  return new Promise((resolve, reject) => {

    // 非同步呼叫
    emqxServiceStub.CheckClientConnected(req, (err: Error, res: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}


// gcp pubsub
export function pullCommandResponse(eventType: any, deviceId: string, opt: any = { timeout: 10000 }): Promise<any> {

  return new Promise((resolve, reject) => {

    // setTimeout 就是一個非同步呼叫
    const timeoutId = setTimeout(() => {
      try {
        commandResponseEventEmitter.removeListener(eventName, onEvent)
        reject(new Error(CustomErrorsV2.TIMEOUT.type))
      } catch (err) {
        reject(err)
      }
    }, opt.timeout)

    const onEvent = function (response: openGateResponse | testLoopResponse) {
      try {
        clearTimeout(timeoutId)
        resolve(response)
      } catch (err) {
        reject(new Error(CustomErrorsV2.PARKING_BOX_PULL_COMMAND_ERROR.type))
      }
    }

    const eventName = commandResponseEventEmitter.buildEventName(eventType, deviceId, { actionType: opt.actionType, positionType: opt.positionType })
    commandResponseEventEmitter.once(eventName, onEvent)


  })
}
