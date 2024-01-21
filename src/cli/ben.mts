import { peco } from 'node-peco'
import { $ } from 'zx'
import * as prompts from 'prompts'
import select = prompts.prompts.select
import { openInIterm2 } from './util/openInIterm2.mjs'
import clipboard from 'clipboardy'

enum scripts {
  check_port = 'check port',
  check_listening_tcp = 'check listening tcp',
  gen_QAT_User_Token = 'gen QAT User token',
  vim_macro_cheatsheet = 'vim macro cheatsheet',
  edit_in_vim = 'edit in vim',
  remove_duplicates_in_screenshot_and_open = 'remove duplicate in screenshot folder',
  json_format = 'json format',
  git_clone_depth1 = 'git clone --depth 1',
  go_to_meeting_tab = 'go to Meeting Tab',
  pushCopiedToLine = 'push copied to line',
  'setup_simple_http_server' = 'set up simple http server'
}

const cmd_prefix = '/Users/re4388/.nvm/versions/node/v18.12.1/bin/node /Users/re4388/project/personal/nodets/ts-playground-0/node_modules/ts-node/dist/bin.js /Users/re4388/project/personal/nodets/ts-playground-0/src/cli'

const candidate = [
  scripts.check_port,
  scripts.check_listening_tcp,
  scripts.gen_QAT_User_Token,
  scripts.vim_macro_cheatsheet,
  scripts.edit_in_vim,
  scripts.remove_duplicates_in_screenshot_and_open,
  scripts.json_format,
  scripts.git_clone_depth1,
  scripts.go_to_meeting_tab,
  scripts.pushCopiedToLine,
  scripts.setup_simple_http_server,
]


peco(candidate).then(async (selected) => {
  switch (selected[0]) {

    case scripts.setup_simple_http_server: {
      await $`/Users/re4388/.nvm/versions/node/v18.18.0/bin/node /Users/re4388/project/personal/nodets/ts-playground-0/node_modules/ts-node/dist/bin.js /Users/re4388/project/personal/nodets/ts-playground-0/src/cli/server_up.mts`
    }
      break

    case scripts.pushCopiedToLine: {
      await $`/Users/re4388/.nvm/versions/node/v18.18.0/bin/node /Users/re4388/project/personal/nodets/ts-playground-0/node_modules/ts-node/dist/bin.js /Users/re4388/project/personal/nodets/ts-playground-0/src/cli/pushToLine.mts`
    }
      break



    case scripts.go_to_meeting_tab: {
      await $`/Users/re4388/.nvm/versions/node/v18.18.0/bin/node /Users/re4388/project/personal/nodets/ts-playground-0/node_modules/ts-node/dist/bin.js /Users/re4388/project/personal/nodets/ts-playground-0/src/cli/goToMeetingTab.mts`
    }
      break




    case scripts.git_clone_depth1: {
      await $`cd /Users/re4388/project/personal/git-clone-pjt && git clone --depth 1 ${clipboard.readSync()+'.git'}`
    }
      break


    case scripts.json_format: {
      await $`/Users/re4388/.nvm/versions/node/v18.12.1/bin/node /Users/re4388/project/personal/nodets/ts-playground-0/node_modules/ts-node/dist/bin.js /Users/re4388/project/personal/nodets/ts-playground-0/src/cli/jsonFormat.mts`
    }
      break


    case scripts.remove_duplicates_in_screenshot_and_open: {
      await $`rg --files *\\(2\\).png | xargs -I {} echo "\\"{}\\"" | xargs rm -f && open /Users/re4388/Library/CloudStorage/OneDrive-g.ntu.edu.tw/screenshots`
    }
      break

    case scripts.edit_in_vim: {
      await $`/Users/re4388/.nvm/versions/node/v18.18.0/bin/node /Users/re4388/project/personal/nodets/ts-playground-0/node_modules/ts-node/dist/bin.js /Users/re4388/project/personal/nodets/ts-playground-0/src/cli/edit_in_vim.mts`
    }
      break


    case scripts.vim_macro_cheatsheet: {
      await $`/Users/re4388/.nvm/versions/node/v18.12.1/bin/node /Users/re4388/project/personal/nodets/ts-playground-0/node_modules/ts-node/dist/bin.js /Users/re4388/project/personal/nodets/ts-playground-0/src/cli/vim_macro_cheatsheet.mts`
    }
      break


    case scripts.check_port: {
      await $`/Users/re4388/.nvm/versions/node/v18.12.1/bin/node /Users/re4388/project/personal/nodets/ts-playground-0/node_modules/ts-node/dist/bin.js /Users/re4388/project/personal/nodets/ts-playground-0/src/cli/checkPort.ts`
      break
    }
    case scripts.check_listening_tcp: {
      await $`lsof -iTCP -sTCP:LISTEN | awk  '{print $1, $2,$9}' | peco`
      break
    }
    case scripts.gen_QAT_User_Token: {
      await $`/Users/re4388/.nvm/versions/node/v18.12.1/bin/node /Users/re4388/project/personal/nodets/ts-playground-0/node_modules/ts-node/dist/bin.js /Users/re4388/project/personal/nodets/ts-playground-0/src/cli/getUserToken.mts`
      break
    }
    default: {
      //statements;
      break
    }
  }
})

