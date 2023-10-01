import { LineReader } from '../lineReader'
import { FileNode, FileNodeType, FileTree, getAtMostByNumber } from './fileTree'
import { trim } from 'ramda'


async function main() {

  try {
    const filePath = 'a2.txt'
    const lineReader = new LineReader(filePath)


    let rootDir = new FileNode(null, FileNodeType.dir, `root`, null)
    let fileTree = new FileTree(rootDir)

    // let currentDirName = ''
    let currentDir: FileNode | null = null
    let parentDir: FileNode | null = rootDir

    for await (const line of lineReader.processFile()) {

      // get command
      if (line[0] === '$') {
        const cmdBody = line.split(' ')[1]

        if (cmdBody === 'cd') {
          const dirToJump = line.split(' ')[2]

          if (dirToJump === '/') {
            fileTree.goRoot()
            currentDir = fileTree.getCurrentDir()
            parentDir = null


          } else if (dirToJump === '..') {
            fileTree.goUp()
            currentDir = fileTree.getCurrentDir()
            parentDir = fileTree.getParentDir()

          } else {
            // 這邊就是切到某個 dir, like 'a' or 'b' or other..
            // 這個時間點，可能還沒建立，要先建立
            // 但是, 目前我看一下，似乎題目很貼心，都一定會先 ls,
            // 因此這邊我好像可以先預設, 如果我要 cd 時, 裡面的檔案都已經建立好了

            fileTree.cd(dirToJump)
            currentDir = fileTree.getCurrentDir()
            parentDir = fileTree.getParentDir()
          }


        } else if (cmdBody === 'ls') {
          // console.log('=====> shall be ls: ', line)
        }


        //  get output
      } else {
        const firstChr = line[0]

        if (firstChr === 'd') {
          const dirName = line.split(' ')[1]
          fileTree.insertAsChildNode(new FileNode(currentDir, FileNodeType.dir, dirName, null))


        } else if (Number(firstChr) > 0 && Number(firstChr) < 10) {
          const fileSize = line.split(' ')[0]
          const fileName = line.split(' ')[1]
          fileTree.insertAsChildNode(new FileNode(currentDir, FileNodeType.file, fileName, Number(fileSize)))
        } else {
          console.error('shall not happen')
        }
      }

    }

    fileTree.goRoot()
    let getTotalSizeForCurrentDir = fileTree.getTotalSizeForCurrentDir()
    console.log('=====> getTotalSizeForCurrentDir: ', getTotalSizeForCurrentDir)

    const totalSize = 70000000
    const diskLeft = totalSize - getTotalSizeForCurrentDir
    console.log('=====> diskLeft: ', diskLeft)
    const reqForUpdate = 30000000
    const needToDelete = reqForUpdate - diskLeft
    console.log('=====> needToDelete: ', needToDelete)


    let allDir = fileTree.findDirAndGetEachSizeFromRoot()
    console.log('=====> allDir: ', allDir)

    const resultList = allDir.filter((dir: any) => dir.size >= needToDelete)

    function sortLogic(a: any, b: any) {
      if (a.size > b.size) {
        return 1
      }
      if (a.size < b.size) {
        return -1
      }
      // a 必須等於 b
      return 0
    }


    let res = resultList.sort(sortLogic)
    console.log(res[0].size)



  } catch (error) {
    console.log('catch error: ', error)

  }


}


main()

/**
 * 共有多少空間?  70000000
 * 已經使用多少? 48381165
 * 剩下多少可用? 70000000-48381165=21618835
 *
 * 更新需要? 30000000
 *
 * 還需要砍掉多少?  30000000-21618835 = 8381165
 *
 * 24933642
 * 8381165
 * 94853
 *
 * => 找到最小可以砍的目錄, 的大小
 *
 *
 *
 */


