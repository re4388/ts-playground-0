import { LibraryCSVAdapter } from './LibraryCSVAdapter'
import { LibraryCSV } from './LibraryCSV'
import { LibraryJSONAdapter } from './LibraryJSONAdapter'
import { LibraryJSON } from './LibraryJSON'

// // https://www.jmalvarez.dev/posts/adapter-pattern-typescript

let a1 = new LibraryCSVAdapter(new LibraryCSV())
let a2 = a1.getBooks()
console.log("=====> a2: ", a2);




let a11 = new LibraryJSONAdapter(new LibraryJSON())
let a22 = a11.getBooks()
console.log("=====> a22: ", a22);
