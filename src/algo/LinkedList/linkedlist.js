class Node {
  constructor(value, next) {
    this.value = value || 0
    this.next = next || null
  }
}


function print(head) {
  let cur = head
  while (cur) {
    console.log(cur)
    cur = cur.next
  }
}

function AddNodeAtListEnd(head, value) {
  let cur = head
  // 只要 cur.next 不是 null, 就一直走
  // 因此最後會停在 cur.next 是 null的地方
  // 也就是最後一個 node
  while (cur.next) {
    cur = cur.next
  }

  // 建立一個node
  let newNode = new Node(value)
  // 把這個 node 接在最後一個 node 上
  cur.next = newNode
}


function insertNodeAfterAt(node, value) {
  let newNode = new Node(value)

  /**
   * old
   * N1 -> N2
   * N1 is the to be insert aftter
   *
   * newN
   * step1: newN -> N2
   * step2: N1 -> newN
   * result: N1->newN->N2
   *
   */

  // step1
  newNode.next = node.next

  // step2
  node.next = newNode
}




