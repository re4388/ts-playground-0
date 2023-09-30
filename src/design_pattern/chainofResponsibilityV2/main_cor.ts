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


import { GetHelpMsg } from './GetHelpMsg'
import { GetDcardList } from './GetDcardList'
import { GetCurrencyRate } from './GetCurrencyRate'
import { GetWeatherInfo } from './GetWeatherInfo'
import { Client } from './client'


// 要處理的東西
// const command = 'Dcard'
// const command = 'not_existed'
// const command = 'help'
const command = 'weather'

// 建立責任練
const help = new GetHelpMsg()
const dcard = new GetDcardList()
const currencyRate = new GetCurrencyRate()

// 假設我們要新增一個功能
// 1. 這邊需要動到
const weather = new GetWeatherInfo()
help.setNext(dcard).setNext(currencyRate).setNext(weather) // 2. 這邊也需要動到
let c1 = new Client(help)



c1.processCommand(command)









