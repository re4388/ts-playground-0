export enum FileNodeType {
  dir = 'dir',
  file = 'file'
}

export class FileNode {
  parent: FileNode | null
  nodeType: FileNodeType
  name: string
  size: number | null
  children: FileNode[]

  constructor(
    parent: FileNode | null,
    nodeType: FileNodeType,
    name: string,
    size: number | null,
    children = null
  ) {
    this.parent = parent
    this.size = size
    this.name = name
    this.children = []
    this.nodeType = nodeType
  }

}


export class FileTree {
  private root: FileNode
  private current: FileNode

  constructor(fileNode: FileNode) {
    this.root = fileNode
    this.current = fileNode
  }


  public ls() {
    return this.current.children.map(child => {
      return {
        type: child.nodeType,
        name: child.name,
        size: child.size
      }
    })
  }

  // like `cd ..`
  public goUp() {

    if (this.current.parent === null) {
      console.log('this is root, no way to go up')
      return
    }

    this.current = this.current.parent
  }


  public cd(name: string): FileNode {
    // 確認這個 fileNode在當下 this.root 下面的某一個 children
    let fileNode = this.current.children.find(child => child.name === name)
    if (fileNode === undefined) throw new Error('file/dir is not exist')

    // 換 current node 為 這個要切過去的那個 node
    this.current = fileNode

    return this.current
  }

  public insertAsChildNode(childNode: FileNode) {
    let fileNode = this.current.children.find(child => child.name === childNode.name)
    if (fileNode !== undefined) throw new Error('file/dir is already exist')


    this.current.children.push(childNode)
  }


  public getTotalSizeByNode(node: FileNode) {
    let sizeList: number[] = this.preorderFromCurrent(node).map((ele: any) => ele[0])
    return sizeList.reduce((prev, cur) => prev + cur, 0)
  }


  public getTotalSizeForCurrentDir() {
    //
    // console.log(this.current.children)
    //
    // let fileNode = this.current.children.find(child => child.name === dirName)
    // if (fileNode === undefined) throw new Error('dir is not exist')

    let sizeList: number[] = this.preorder().map((ele: any) => ele[0])
    return sizeList.reduce((prev, cur) => prev + cur, 0)
  }

  // 不改變當前dir
  public findAllDir() {
    // 先把當前 dir 存下來
    const tmp = this.current

    // 看 preorder
    this.current = this.root
    const allResult = this.preorder()
    const dirList = allResult.filter((ele: any) => {
      return (ele[1] === 'dir' && ele[2] !== 'root')
    })

    let res: any = []
    dirList.forEach((ele: any) => res.push(ele[2]))


    // 恢復當前的 dir
    this.current = tmp

    return res
  }


  public findDirAndGetEachSizeFromRoot() {

    let res: any = []
    let that = this

    function dfs(node: FileNode) {
      if (node === null) return


      if (node.nodeType === FileNodeType.dir) {
        res.push({
          name: node.name,
          size: that.getTotalSizeByNode(node)
        })
      }

      for (let n of node.children) {
        dfs(n)
      }

    }

    dfs(this.root)

    return res
  }

  public preorderFromCurrent(node: FileNode): any {
    let res: any = []

    function dfs(node: FileNode) {
      if (node !== null) {
        res.push([node.size, node.nodeType, node.name])

        for (let n of node.children) {
          dfs(n)
        }

      }
    }

    dfs(node)
    return res
  }


  public preorder(): any {
    let res: any = []

    function dfs(node: FileNode) {
      if (node !== null) {
        res.push([node.size, node.nodeType, node.name])

        for (let n of node.children) {
          dfs(n)
        }

      }
    }

    dfs(this.current)
    return res
  }


  public goRoot() {
    this.current = this.root
    return this.current
  }

  public getCurrentDir() {
    return this.current
  }

  public getParentDir() {
    return this.current.parent
  }
}

//////////////////////

// runExample()
// runExampleV2()

function runExampleV2() {
  let rootDir = new FileNode(null, FileNodeType.dir, `root`, null)

  let aDir = new FileNode(rootDir, FileNodeType.dir, `a`, null)
  let fileTree = new FileTree(rootDir)
  fileTree.insertAsChildNode(aDir)
  fileTree.insertAsChildNode(aDir)
}


function runExample() {
  //////////////////////////// 建立 node
  let rootDir = new FileNode(null, FileNodeType.dir, `root`, null)

  let aDir = new FileNode(rootDir, FileNodeType.dir, `a`, null)
  let bTXT = new FileNode(rootDir, FileNodeType.file, `b.txt`, 14848514)
  let cDat = new FileNode(rootDir, FileNodeType.file, `c.dat`, 8504156)
  let dDir = new FileNode(rootDir, FileNodeType.dir, `d`, null)

// inside dir a
  let eDir = new FileNode(aDir, FileNodeType.dir, `e`, null)
  let fFile = new FileNode(aDir, FileNodeType.file, `f`, 29116)
  let gFile = new FileNode(aDir, FileNodeType.file, `g`, 2557)
  let hList = new FileNode(aDir, FileNodeType.file, `h.lst`, 62596)

// inside dir e
  let iFile = new FileNode(eDir, FileNodeType.file, `i`, 584)

// inside dir d
  let jFile = new FileNode(dDir, FileNodeType.file, `j`, 4060174)
  let dLog = new FileNode(dDir, FileNodeType.file, `d.log`, 8033020)
  let dExt = new FileNode(dDir, FileNodeType.file, `d.ext`, 5626152)
  let kFile = new FileNode(dDir, FileNodeType.file, `k`, 7214296)


  /////////////////////////

  let fileTree = new FileTree(rootDir)
  fileTree.insertAsChildNode(aDir)
  fileTree.insertAsChildNode(bTXT)
  fileTree.insertAsChildNode(cDat)
  fileTree.insertAsChildNode(dDir)


  let rootLs = fileTree.ls()
// console.log("=====> rootLs: ", rootLs);


  let current_a_Dir = fileTree.cd('a')
  fileTree.insertAsChildNode(eDir)
  fileTree.insertAsChildNode(fFile)
  fileTree.insertAsChildNode(gFile)
  fileTree.insertAsChildNode(hList)
  let aLs = fileTree.ls()
// console.log("=====> aLs: ", aLs);


  let current_e_Dir = fileTree.cd('e')
  fileTree.insertAsChildNode(iFile)
  let eLs = fileTree.ls()
// console.log("=====> eLs: ", eLs);

  fileTree.goUp()
  let aLsAgain = fileTree.ls()
// console.log("=====> aLsAgain: ", aLsAgain);

  fileTree.goUp()
  let checkLsAgain = fileTree.ls()
// console.log("=====> checkLsAgain: ", checkLsAgain);

  let current_d_Dir = fileTree.cd('d')
  fileTree.insertAsChildNode(jFile)
  fileTree.insertAsChildNode(dLog)
  fileTree.insertAsChildNode(dExt)
  fileTree.insertAsChildNode(kFile)

  let checkLsAgain2 = fileTree.ls()
// console.log("=====> checkLsAgain2: ", checkLsAgain2);


  fileTree.goUp()
  fileTree.cd('a')


  let allDirAndSize = fileTree.findDirAndGetEachSizeFromRoot()
  console.log('=====> allDirAndSize: ', allDirAndSize)


  let finalRes = getAtMostByNumber(100000, allDirAndSize)
  console.log('=====> finalRes: ', finalRes)

  // let lschecktmp = fileTree.ls()
// console.log("=====> lschecktmp: ", lschecktmp);
// let res1 = fileTree.getTotalSizeForCurrentDir()
// console.log("=====> res1: ", res1);


// let allDir = fileTree.findAllDir()
// console.log('=====> allDir: ', allDir)

// fileTree.goRoot()
// let lschecktmp = fileTree.ls()
// console.log("=====> lschecktmp: ", lschecktmp);


// let res = fileTree.preorder()
// console.log('=====> res: ', res)

}


export function getAtMostByNumber(figure: number, allDirAndSize: {
  name: string,
  size: number
}[]) {
  const validDir = allDirAndSize.filter(ele => ele.size <= 100000)
  return validDir.reduce((prev, cur) => prev + cur.size, 0)

}


// tree 需要支援的method
// `/`  -> return root
// `ls` -> 看目前是在那一個 node, 顯示當前 node 的孩子們的資訊
// `cd x` -> 可以 "走" 到當前 node 底下的某一個孩子 x
// `cd ..` -> 走到 parent node
// getSize -> file 就直接拿就好, dir 需要算裡面有哪些 file, dir, 遞迴的去算總 size
// 捞出所有的 dir and its size
// 同上，但是可以算出 dir 至多 100000, 然後加起來
// 上dir 包 下dir, 上dir 算出的 size 可以包括 下dir 的size (這樣反而單純)


/**
 *
 *
 * root 一開始寫好
 * 模擬器要 goRoot
 *
 * parse 到  ls (模擬器可以忽略 ls)
 *
 * 接下來的東西（dir or 1~9開頭），就是 root 這一層，底下需要建立的 node
 * dir    -> 建立 dir
 * 1~9開頭 -> 建立 file
 *
 * command `cd x` or `cd ..`  模擬器要 run  (前面有 $ )
 *
 *
 * $ cd /
 * $ ls
 *
 * dir a
 * 14848514 b.txt
 * 8504156 c.dat
 * dir d
 *
 * $ cd a
 * $ ls
 *
 * dir e
 * 29116 f
 * 2557 g
 * 62596 h.lst
 *
 * $ cd e
 * $ ls
 * 584 i
 * $ cd ..
 * $ cd ..
 * $ cd d
 * $ ls
 * 4060174 j
 * 8033020 d.log
 * 5626152 d.ext
 * 7214296 k
 *
 *
 *
 * example file:
 * - / (dir)
 *   - a (dir)
 *     - e (dir)
 *       - i (file, size=584)
 *     - f (file, size=29116)
 *     - g (file, size=2557)
 *     - h.lst (file, size=62596)
 *   - b.txt (file, size=14848514)
 *   - c.dat (file, size=8504156)
 *   - d (dir)
 *     - j (file, size=4060174)
 *     - d.log (file, size=8033020)
 *     - d.ext (file, size=5626152)
 *     - k (file, size=7214296)
 */
