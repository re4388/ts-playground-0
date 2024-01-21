import clipboard from 'clipboardy'



// copy the entire git repo path
// https://github.com/markusressel/py-image-dedup
// https://github.com/markusressel/py-image-dedup.git

// cover the url to .git path

// run cmd to git clone on my folder
// cd /Users/re4388/project/personal/git-clone-pjt
//
// git clone --depth 1 https://github.com/provectus/kafka-ui.git



export async function getGitCloneCmd (){

  // 拿到剪貼版的資料
  let copied = clipboard.readSync()

  const gitClonePath = copied+'.git'

  const cmd = `cd /Users/re4388/project/personal/git-clone-pjt && git clone --depth 1 ${gitClonePath}`

  return cmd

}
