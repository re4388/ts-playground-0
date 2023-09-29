/**
 * 因為是 gof, 因此是 oop 架構，每個接受者都是 class
 * 發送者 和 接受者 解藕
 *
 * 因此發送者就發出去，沒有跟具體的接受者 couple
 *
 * 發出去就一個一個傳，哪一個應該處理，就會處理
 *
 */


// wemo 有很類似 COR 的設計
/**
 *
 * 下面的 promotionList 有使用 工廠模式建立出各種類
 * 然後會一個一個處理，如果有處理好，就會停止   if (!p.isNext()) break
 * 因此 呼叫 promotionVariousValidations 的人不需要帶入是哪一種 promotion 的資訊
 *
 * export async function promotionVariousValidations(promotionCode: string, userPO: User): Promise<PromotionVO[]> {
 *   const now = new Date()
 *
 *   const promotionList = getPromotionList()
 *   let promotion: PromotionVO | undefined
 *
 *   for (const p of promotionList) {
 *     p.setUser(userPO).setTime(now).setPromotionCode(promotionCode)
 *     if (p.isFormatMatch()) {
 *       promotion = await p.validation()
 *       if (!p.isNext()) break
 *     }
 *   }
 *
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
help.setNext(dcard).setNext(currencyRate)
let c1 = new Client(help)



// 要處理的東西
// const command = 'Dcard'
// const command = 'not_existed'
// const command = 'help'
const command = 'currencyRate'

c1.processCommand(command)









