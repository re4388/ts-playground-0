import clipboard from 'clipboardy'
import { runAppleScript } from 'run-applescript'
import moment from 'moment-timezone'
import { promises as fs } from 'fs'
import { $ } from 'zx'


// 建立路徑
const filePath = `/Users/re4388/tmp/${moment.utc(Date.now()).tz("Asia/Taipei").format()}`

// 拿到剪貼版的資料
let copied = clipboard.readSync()

// 寫入路徑
try {
  await fs.writeFile(filePath, copied);
  // console.log('File created successfully!');
} catch (err) {
  console.error('Error creating file:', err);
}


// // 建立 script and 跑起來
await runAppleScript(createAppleScript(filePath))



/////////////////////////////////////////////////

function createAppleScript(path: string) {
  return `
set commandToRun to "nvim ${path}"

if application "iTerm" is running then
    tell application "iTerm"
        activate
        try
            set currentWindow to first window
        on error
            set currentWindow to (create window with default profile)
        end try
        tell current session of currentWindow
            write text commandToRun
        end tell
    end tell
else
    tell application "iTerm"
        activate
        set newWindow to (create window with default profile)
        tell current session of newWindow
            write text commandToRun
        end tell
    end tell
end if

`
}

