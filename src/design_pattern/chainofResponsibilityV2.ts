/**
 *
 * V2 版本，我會建立一個新的行為
 *
 * 需要改動的地方
 *
 * 1. 需要新增一個行為
 * 2. 要動的連動的地方
 * 3. 客戶端不需要動的
 * 4. 舊的行為和抽象類都不需要動到
 *
 */

// 下面是 一個例子 https://refactoring.guru/design-patterns/chain-of-responsibility/typescript/example


/**
 *
 * Handler Interface 定義了 COR 的兩種關鍵方法
 * setNext 下一個
 * handle 處理
 */
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

/**
 * 可以復用的，放在抽象類
 * 另外需要實作 Handler
 * 基本上，可以共用的，也就是 COR 的關鍵方法
 */
abstract class AbstractHandler implements Handler {
  nextHandler: Handler | undefined

  /**
   * 這個方法拿來建立 責任鏈
   * @param handler
   */
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler
    return handler
  }

  /**
   * 如果有下一個，讓下一個去執行
   * 如果沒有，就是最後一個，返回 null
   * 如果有，執行了會 return -> 不會每個都執行
   * @param request
   */
  public handle(request: string): string | null {
    // 如果有下一個，讓下一個去執行
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }

    return null
  }
}


/**
 * 新增的 weather 行為
 */
class getWeatherInfo extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'weather') {
      return `${request} is received, run weather`
    }
    return super.handle(request)

  }
}



/**
 * 下面就是三個子類
 * 分別去實作出
 */
class getHelpMsg extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'help') {
      return `${request} is received, run help`
    }
    return super.handle(request)

  }
}

class getDcardList extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'Dcard') {
      return `${request} is received, run Dcard`
    }
    return super.handle(request)
  }
}

class getCurrencyRate extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'currencyRate') {
      return `${request} is received, run currencyRate`
    }
    return super.handle(request)
  }
}



class Client {

  handler: Handler

  constructor(handler: Handler) { // 委託 handler 去處理
    this.handler = handler
  }

  public processCommand(request: string) {
    const result = this.handler.handle(request)
    if(result===null) console.log('command is not existed')

    console.log("=====> result: ", result);
  }
}


// 建立責任練
const help = new getHelpMsg()
const dcard = new getDcardList()
const currencyRate = new getCurrencyRate()



// 這邊需要動到
const weather = new getWeatherInfo()



help.setNext(dcard).setNext(currencyRate).setNext(weather) // 這邊也需要動到
let c1 = new Client(help)


// 要處理的東西
// const command = 'Dcard'
// const command = 'not_existed'
// const command = 'help'
const command = 'weather'

c1.processCommand(command)









