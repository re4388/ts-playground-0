// Definition for singly-linked list.
class ListNode {
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

const printList = function(head) {
  let cur = head
  while (cur) {
    console.log(cur.val)
    cur = cur.next
  }
console.log("=====> : ", );
}


const addNodeAtEnd = (head, val) => {
  let cur = head
  while (cur.next) {
    cur = cur.next
  }

  let newNode = new ListNode(val)
  cur.next = newNode

}

const insertAfter = (prevNode, val) => {
  let newNode = new ListNode(val)
  newNode.next = prevNode.next
  prevNode.next = newNode
}


let first = new ListNode(1)
let second = new ListNode(2)
let third = new ListNode(3)
first.next = second
second.next = third


// printList(first)
// ans: 1,2,3

let newHead = addNodeAtEnd(first, 33)
// printList(newHead)
// ans: 1,2,3, 33

insertAfter(first.next, 8)
printList(first)
// ans: 1,2, 8, 3, 33
