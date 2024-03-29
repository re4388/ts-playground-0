


function getCurrentBatteryLevel(): number {
  const randomDecimal = Math.random();
  const randomNumber = randomDecimal * 100;
  console.log("=====> bat vol: ", randomNumber);
  return randomNumber;
}



function checkVoucherPriceToGiveAtRentFinish() {

  // 撈今天 (凌晨0:00 -> 到今晚) 換幾次了
  // 可以用 user_battery_exchange_count_log 撈出來
  // select * from user_battery_exchange_count_log where
  // createdAt 在今天的時間範圍內
  // user_id = 'xxx'
  // batVolWhenExchange <= 30

  // example
  // SELECT count
  // FROM user_battery_exchange_count_log
  // WHERE user_id = 201212
  // AND batVolWhenExchange <= 30
  // AND DATE(exchangedAt) = CURRENT_DATE
  // AND EXTRACT(HOUR FROM exchangedAt) BETWEEN 0 AND 12;


  // 上面可以這個使用者今天成功換電幾次了(條件：<=30電量)
  // 可以透過 user_batExchange_config 來撈到要換的 rebateVoucher的價格


  // 同時也去 vouchPrice_if_below_battery_vol 撈低於特定電量的 獎勵


  // 另外也檢查目前時間是否是在加碼的時間內 via user_batExchange_config


  // 兩面兩個擇優發放

}


function addUserExchangeRecord() {
  // INSERT INTO user_battery_exchange_count_log (user_id, count, batVolWhenExchange, exchangedAt)
  // VALUES ('201212', count++, 30, CURRENT_TIMESTAMP);
}


/**
 *
 *
 * table: user_battery_exchange_count_log
 *
 * user_id (int)
 * count (int)
 * batVolWhenExchange (int) (always shall be lower than and equal to 30)
 * exchangedAt
 *
 *
 *
 *
 *
 * table: user_batExchange_config
 *
 * bat_vol_special_period_start(utc)
 * bat_vol_special_period_end(utc)
 * bat_vol_special_price
 *
 * bat_vol_threshold(int): 30
 *
 *
 * vouchPrice_by_count (jsonb)
 * {
 *   1: 20
 *   2: 30
 *   3: 40
 *   4: 50
 *   5: 60
 * }
 *
 * vouchPrice_if_below_battery_vol (jsonb)
 * {
 *   15: 40
 *   5: 50
 * }
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

// 獎勵條件：
// 換電當下剩餘電量為 30% (含)以下，完成1次換電可獲得騎乘券獎勵。
// 換電獎勵內容：

// (1) 採階梯式補助，計算以『日』為單位，00:00 後重新計算
// - 每日完成 1 次換電可獲得 20元 騎乘券獎勵。
// - 每日完成 2 次換電可獲得 30元 騎乘券獎勵。
// - 每日完成 3 次換電可獲得 40元 騎乘券獎勵。
// - 每日完成 4 次換電可獲得 50元 騎乘券獎勵。
// - 每日完成 5 次換電可獲得 60元 騎乘券獎勵。
// - 每日完成 6 以上(含)換電，獲得1張最高獎勵


// (2)超低電量換電獎勵
// - 完成 15 % (含)以下換電可獲得 40元 騎乘券獎勵。
// - 完成 5  % (含)以下換電可獲得 50元 騎乘券獎勵。

// 獎勵計算方式：
// 階梯式補助/ 超低電量補助，同時符合時，擇最優金額發送。
// 獎勵派送時間：完成換電"當下發送"並推播通知(event trigger)

// [推播內容]
// 標題：恭喜獲得換電獎勵騎乘券!
// 內容：感謝你讓 WeMo 再次電力滿點！送你騎乘金溫暖你的心
// 獎勵次數限制：無上限
// 獲得騎乘券可於當次騎乘結帳使用
// - 延伸調整項目：騎乘券調整於結帳前選擇使用

// 加碼換電獎勵, 特定時段，可同時獲得基礎換電獎勵及加碼獎勵
// 獎勵條件與基礎換電相同
// e.g.
// 可針對特定時間設定 e.g. 2022/1/1 00:00~2022/1/3 15:00，進行設定，用戶完成換電可加碼獲得10元騎乘券
// 比如說，用戶於1/1~1/4期間騎乘完成3次換電
// 1/1 15:00 完成換電 獲得 20元*1 / 10 元*1
// 1/1 20:00 完成換電獲得 30元*1 / 10 元*1
// 1/4 17:00 完成換電 獲得 20元*1


// 換電提醒
// 提醒時機：
// 當用戶符合換電標準時( 30% )，App通知顯示換電提醒，並計算顯示當下可獲得的騎乘金額。
// 當用戶符合超低電量換電標準(15 % / 5%) 時，App 再次提醒換電，並計算顯示當下可獲得的騎乘金額。
// 換電紀錄
// 結帳頁面顯示當次騎乘成功換電(符合換電獎勵)次數。


/**
 * 換電提醒:
 *    新的(?)API let app 可以打，會確認用戶是否符合換電標準，顯示換電提醒，並計算顯示當下可獲得的騎乘金額。
 *
 * ??
 * API 調整：結帳頁面顯示當次騎乘成功換電(符合換電獎勵)次數。
 * Apollo API 新開? for Apollo 可以設定加碼換電獎勵
 *
 *
 *  偵測到用戶換電後，可以計算上面的獎勵邏輯(基礎獎勵和加碼獎勵)，然後進行推播
 *  - new API or batInfo or updateBoxMsg
 *
 * 一個專屬的 class 來負責上面的換電獎勵計算(基礎和加碼)
 *
 */
