import axios, { AxiosRequestConfig } from 'axios'


class TappayError extends Error {
  code: number

  constructor(msg: string, code: number) {
    super(msg)
    this.code = code
  }
}

interface BindCardResultVO {
  authCode: string
  tradeId: string
  bankName: string
  bankCode: string
  binCode: string
  lastFour: string
  type: number
  expiredDate: string
  key: string
  token: string
}

interface BindingVO {
  prime: string
  phone: string
  name: string
  email: string
}

interface TapPayConfig {
  merchantIdLinePay: string
  merchantIdPlusPay: string
  merchantIdApplePay: string
  merchantIdFubon: string
  baseUrl: string
  partnerKey: string
  notifyUrl: string
  baseBatchUrl: string
}

interface BindCardResponse {
  /**
   * Response code. 0 indicates success.
   */
  status: number
  /**
   * Error message.
   */
  msg: string

  rec_trade_id: string
  order_id: string
  auth_code: string
  /**
   * Contains the card key and token. Only returned if the “remember” parameter in payByPrime API is set to true
   */
  card_secret: {
    card_key: string
    card_token: string
  }
  card_info: {
    /**
     * First six digits of the card
     */
    bin_code: string
    /**
     * Last four digits of the card
     */
    last_four: string
    /**
     * Card issuer
     */
    issuer: string
    /**
     * Card usage
     * 0 = credit card
     * 1 = debit card
     * 2 = prepaid card
     */
    issuer_zh_tw: string
    bank_id: string
    funding: number
    /**
     * Card type
     * 1 = VISA
     * 2 = MasterCard
     * 3 = JCB
     * 4 = Union Pay
     * 5 = AMEX
     */
    type: number
    /**
     * Card level
     */
    level: string
    /**
     * Country of card issuer
     */
    country: string
    /**
     * Country code of card issuer
     */
    country_code: string
    /**
     * Card expired date, Format : YYYYMM,
     */
    expiry_date: string
  }
  /**
   * Time of transaction.
   */
  mills: number
  /**
   * Time when the bank handles the transaction.
   */
  bank_transaction_time: {
    start_time_millis: string
    end_time_millis: string
  }
  /**
   * Response code from the bank.
   */
  bank_result_code: string
  /**
   * Error message from the bank.
   */
  bank_result_msg: string
}

interface BindCardRequest {
  /**
   * The one time token returned from createToken.
   */
  prime: string
  /**
   * Involved merchant’s identifier as defined on Portal.
   */
  merchant_id: string

  partner_key: string
  /**
   * The letter abbreviation for currency, following ISO 4217.
   */
  currency: string
  /**
   * Cardhodler Information
   */
  cardholder: {
    /**
     * Cellphone number, E. 164 format with the ’+’ sign(“+886923456789”)
     */
    phone_number: string
    /**
     * Name
     */
    name: string
    /**
     * E-mail address
     */
    email: string
    /**
     * Zip code number
     */
    zip_code: string
    /**
     * Billing address
     */
    address: string
    /**
     * National ID
     */
    national_id: string
  }
}


// qat config in ceres
const config = {
  'merchantIdLinePay': 'wemoscooter_LINEPAY',
  'merchantIdFubon': 'wemoscooter_TAISHIN',
  'merchantIdApplePay': 'wemoscooter_TAISHIN', //TODO: Must match settings on TapPay
  'merchantIdPlusPay': 'wemoscooter_PLUSPAY',
  'baseUrl': 'https://sandbox.tappaysdk.com',
  'baseBatchUrl': 'https://sandbox-batch.tappaysdk.com',
  'partnerKey': 'partner_meTfyUGNe4rZMuyuvinVvNaWYyCMqNNy0gt0z2TFNlRJBEQmfZ15ya1r',
  'notifyUrl': 'https://ceres-qat.wemoscooter.com/v2/orders/tapPayNotify'
}

const makeRequest = async (config: TapPayConfig, url: string, data: any): Promise<any> => {
  const requestConfig = {
    headers: {
      'x-api-key': config.partnerKey,
      'Content-Type': 'application/json'
    }
  } as AxiosRequestConfig

  data['partner_key'] = config.partnerKey

  return axios
    .post(url, data, requestConfig)
    .then((response) => response.data)
    .catch((error) => error)
}


async function bindCard(arg: BindingVO): Promise<BindCardResultVO> {
  try {
    const { prime, email, name, phone } = arg
    const data: BindCardRequest = {
      prime,
      partner_key: config.partnerKey,
      merchant_id: config.merchantIdFubon,
      currency: 'TWD',
      cardholder: {
        phone_number: phone,
        name,
        email,
        zip_code: '',
        address: '',
        national_id: ''
      }
    }
    const url = `${config.baseUrl}/tpc/card/bind`
    const ret: BindCardResponse = await makeRequest(config, url, data)
    console.log({ msg: 'make request result', ret })
    if (ret.status !== 0) {
      throw new TappayError(`return status is invalid: ${ret.status} ${ret.msg}`, ret.status)
    }
    const card_info = ret.card_info
    return {
      authCode: ret.auth_code,
      tradeId: ret.rec_trade_id,
      bankName: card_info.issuer_zh_tw,
      bankCode: card_info.bank_id,
      binCode: card_info.bin_code,
      lastFour: card_info.last_four,
      type: card_info.type,
      expiredDate: card_info.expiry_date,
      key: ret.card_secret.card_key,
      token: ret.card_secret.card_token
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}







//////////////////
