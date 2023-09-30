/**
 *
 * Handler Interface 定義了 COR 的兩種關鍵方法
 * setNext 下一個
 * handle 處理
 */
export interface Handler {
  setNext(handler: Handler): Handler;

  handle(request: string): string | null;
}


/**
 * 可以復用的，放在抽象類
 * 另外需要實作 Handler
 * 基本上，可以共用的，也就是 COR 的關鍵方法
 */
export abstract class AbstractHandler implements Handler {
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


