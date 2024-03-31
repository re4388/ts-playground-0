import * as crypto from 'node:crypto'

function demoTLSExchangeSecretProcess() {
  // 1. server端產生一對公私鑰
  let { publicKey, privateKey } = genPubAndPriKeys()

  // 2. pubKey可以透過網路沒關係，傳給 client

  // 3. 客戶端先產生一個密碼，自己存起來, 這個密碼叫做共享密鑰
  const pass = genPassword()
  console.log('=====> pass: ', pass)

  // 4. 客戶端使用server的公鑰加密這個密碼 get encrypted_password
  let encrypted_password = encryptWithPub(publicKey, pass)

  // 5. 客戶端把 encrypted_password 傳給伺服器

  // 6. server端可以使用私鑰解密(因為這是用公鑰加密的) 來拿到 encrypted_password
  let res = decryptWithPri(privateKey, encrypted_password)

  // 7. 這樣 client and server端就兩邊都有一組共同的密鑰來加密，後續要傳的資料
  console.log('=====> res: ', res)
}

// demoTLSExchangeSecretProcess()

/**
 * 我要傳一個資料給A
 * A 要確保這個資料是我傳的
 *
 * 我會把資料hash後加密
 *
 * A 可以用我提供的public key解密
 * 看看 hash 是否 跟我的一樣
 *
 * 如果一樣，表示資料是我的
 * 如果不一樣, 表示資料被改了
 *
 * why?
 *
 * 因為只有用這個 pub key 可以解掉的我pri key
 * 加密的資料
 *
 * 另外加密後，也可以透過 hash 比對資料是否一樣
 */
function demoDigitSignatureProcess() {
  // step1
  const data = 'this is the data'

  const data_hashed = hash(data)
  console.log('=====> data_hashed: ', data_hashed)

  const { publicKey: pubKey, privateKey: priKey } = genPubAndPriKeys()

  let data_encrypted = encryptWithPri(priKey, data_hashed)

  // send pub key to receiver
  let data_decrypted = decryptWithPub(pubKey, data_encrypted)
  console.log('=====> data_decrypted: ', data_decrypted)

  console.log(data_hashed === data_hashed)
}

//////////// UTIL ///////////////////

function genPassword() {
  return Math.random().toString(36).slice(-8)
}

function hash(content: string) {
  let hashAlgo = crypto.createHash('sha256')
  const result = hashAlgo.update(content).digest('hex')
  return result
}
function genPubAndPriKeys() {
  const keySize = 2048 // You can adjust this size as needed

  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: keySize,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  })

  // console.log('Public Key:')
  // console.log(publicKey)
  //
  // console.log('\nPrivate Key:')
  // console.log(privateKey)

  return {
    publicKey: publicKey,
    privateKey: privateKey
  }
}

function encryptWithPub(pubkey: string, content: string) {
  const encryptedData = crypto.publicEncrypt(
    {
      key: pubkey,
      padding: crypto.constants.RSA_PKCS1_PADDING
    },
    Buffer.from(content, 'utf-8')
  )

  // console.log('Encrypted Data:')
  return encryptedData
}
function encryptWithPri(priKey: string, content: string) {
  const encryptedData = crypto.publicEncrypt(
    {
      key: priKey,
      padding: crypto.constants.RSA_PKCS1_PADDING
    },
    Buffer.from(content, 'utf-8')
  )

  // console.log('Encrypted Data:')
  return encryptedData
}
function stringToArrayBufferView(input: string) {
  // Encode the string as UTF-8
  const encoder = new TextEncoder()
  const utf8Encoded = encoder.encode(input)

  // Create a Uint8Array view from the encoded data
  const arrayBufferView = new Uint8Array(utf8Encoded)

  return arrayBufferView
}
function decryptWithPub(pubkey: string, data: Buffer) {
  const decryptedData = crypto.publicDecrypt(
    {
      key: pubkey,
      padding: crypto.constants.RSA_PKCS1_PADDING
    },
    data
  )

  return decryptedData.toString('utf-8')
}

function decryptWithPri(privateKey: string, data: Buffer) {
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING
    },
    data
  )

  return decryptedData.toString('utf-8')
}
function encryptWithSecret(plaintext: string, syncKey: string) {
  const iv = crypto.randomBytes(16) // 16 bytes (128 bits) for AES
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(syncKey), iv)

  let encryptedData = cipher.update(plaintext, 'utf-8', 'hex')
  encryptedData += cipher.final('hex')
  // console.log('Encrypted Data:', encryptedData);
  // console.log('Initialization Vector (IV):', iv.toString('hex'));
  return encryptedData
}
