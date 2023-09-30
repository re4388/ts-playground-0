import { AbstractHandler } from "./abstract"

/**
 * 新增的 weather 行為
 */
export class GetWeatherInfo extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'weather') {
      return `${request} is received, run weather`
    }
    return super.handle(request)

  }
}
