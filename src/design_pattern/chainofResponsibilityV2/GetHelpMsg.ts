import { AbstractHandler } from "./abstract"


/**
 * 下面就是三個子類
 * 分別去實作出
 */
export class GetHelpMsg extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'help') {
      return `${request} is received, run help`
    }
    return super.handle(request)

  }
}
