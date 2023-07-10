export const jsonMiddleware = function () {
  return {
    inbound (message) {
      // 進來，先把 msg 轉 string, then parse
      return JSON.parse(message.toString())
    },
    outbound (message) {
      // 出去, 先 把 msg 轉 string then 轉 buffer/binary
      return Buffer.from(JSON.stringify(message))
    }
  }
}
