import clipboard  from 'clipboardy'
import prettier from 'prettier'


/**
 *
 *
 * no need to have this plugin
 * reason: not complicated enough
 *
 *
 * go to IDE
 * use file to open scratch file, .json
 * paste it
 * format
 *
 */


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
