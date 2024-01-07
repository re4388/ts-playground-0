// I then start working on references to defaultOwner. When I see a reference, I replace it with a call to the getting function.
spaceship.owner = getDefaultOwner()

// When I see an assignment, I replace it with the setting function.
setDefaultOwner({ firstName: 'Rebecca', lastName: 'Parsons' })


// The basic refactoring encapsulates the reference to the data item. In many cases, this is all I want to do for the moment.
// But I often want to take the encapsulation deeper to control not just changes to the variable but also to its contents.
// 上面是說，不只是要對存取對封裝，也要對內容進行封裝
// 可以 copy 一份再 return, 這樣 客戶端的修改就不會反過來影響到
// 自己（進而影響到其他 client 的使用）
// 除非本來就想要設定為這是一個大家都可以一起 共享的東西
// For this, I have a couple of options.
// The simplest one is to prevent any changes to the value.
// My favorite way to handle this is by modifying the getting function to return a copy of the data.

// defaultOwner.js


let defaultOwnerData = { firstName: 'Martin', lastName: 'Fowler' }

export function defaultOwner() {
  // I use this approach particularly often with lists.
  // If I return a copy of the data, any clients using it can change it, but that change isn’t reflected in the shared data.
  return Object.assign({}, defaultOwnerData)
}

export function setDefaultOwner(arg) {
  defaultOwnerData = arg
}


// 無關上面的東西，只是要讓上面的 export 不影響其他 module
export {}
