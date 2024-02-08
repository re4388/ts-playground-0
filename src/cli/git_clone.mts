import clipboard from 'clipboardy'


export async function getGitCloneCmd (){

  // 拿到剪貼版的資料
  let copied = clipboard.readSync()
  const cmd = `cd /Users/re4388/project/personal/git-clone-pjt && git clone --depth 1 ${copied+'.git'}`

  return cmd

}
