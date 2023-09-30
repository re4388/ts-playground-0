import { AbstractHandler } from "./abstract"

export class GetCurrencyRate extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'currencyRate') {
      return `${request} is received, run currencyRate`
    }
    return super.handle(request)
  }
}
