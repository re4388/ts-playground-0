import * as crypto from 'node:crypto'




function demoTLSExchangeSecretProcess() {

  // 1. server gen pub and pri
  let {publicKey, privateKey} = genPubAndPriKeys()

  // 2. server send pubKey to client


  // 3. client use pubKey to encrypt the sym-key
  const pass = genPassword()
  console.log("=====> pass: ", pass);
  let encrypted_password = encryptWithPub(publicKey, pass)


  // 4. client sent the encrypted_sym_key to server



  // 5. server use priKey to decrypt and get the sym-key
  let res = decryptWithPri(privateKey, encrypted_password)

  // 6. client and server can both then use sym-key to talk to each other
  console.log("=====> res: ", res);

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
  console.log("=====> data_hashed: ", data_hashed);

  const {publicKey: pubKey, privateKey: priKey} =  genPubAndPriKeys()

  let data_encrypted = encryptWithPri(priKey, data_hashed)


// send pub key to receiver
  let data_decrypted = decryptWithPub(pubKey, data_encrypted)
  console.log("=====> data_decrypted: ", data_decrypted);

  console.log(data_hashed === data_hashed)

}



//////////// UTIL ///////////////////


function genPassword() {
  return Math.random().toString(36).slice(-8);
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
function stringToArrayBufferView(input:string) {
  // Encode the string as UTF-8
  const encoder = new TextEncoder();
  const utf8Encoded = encoder.encode(input);

// Create a Uint8Array view from the encoded data
  const arrayBufferView = new Uint8Array(utf8Encoded);

  return arrayBufferView
}
function decryptWithPub(pubkey: string, data: Buffer) {
  const decryptedData = crypto.publicDecrypt(
    {
      key: pubkey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    data
  );

  return decryptedData.toString('utf-8')
}

function decryptWithPri(privateKey: string, data: Buffer) {
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    data
  );

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
