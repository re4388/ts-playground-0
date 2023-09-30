import { AbstractHandler } from "./abstract"


export class GetDcardList extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'Dcard') {
      return `${request} is received, run Dcard`
    }
    return super.handle(request)
  }
}
