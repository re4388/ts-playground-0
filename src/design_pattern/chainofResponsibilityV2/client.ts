import { Handler } from "./abstract";
import { GetHelpMsg } from './GetHelpMsg'
import { GetDcardList } from './GetDcardList'
import { GetCurrencyRate } from './GetCurrencyRate'
import { GetWeatherInfo } from './GetWeatherInfo'

export class Client {

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





