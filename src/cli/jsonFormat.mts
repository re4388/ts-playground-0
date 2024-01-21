import clipboard  from 'clipboardy'
import prettier from 'prettier'




// 拿到剪貼版的資料
let copied = clipboard.readSync()

// covert to json and throw err if the conversion occurs errors
try {
  let result = await prettier.format(copied, {
    parser: 'json',
  });

  clipboard.writeSync(result);
} catch (err) {
  console.log("format to JSON 失敗: err: " + err);
}
