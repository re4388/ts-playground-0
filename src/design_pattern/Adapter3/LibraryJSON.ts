export class LibraryJSON {
  getBooks() {
    const books = [
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
      { title: 'Book 3', author: 'Author 3' }
    ]

    return JSON.stringify(books)
  }
}
