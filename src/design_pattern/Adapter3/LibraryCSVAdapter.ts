import { LibraryAdapter } from './interface'
import { LibraryCSV } from './LibraryCSV'

export class LibraryCSVAdapter implements LibraryAdapter {
  private library: LibraryCSV;

  constructor(library: LibraryCSV) {
    this.library = library;
  }

  getBooks() {
    const books = this.library.getBooks();
    const booksArray = books.split("\r\n");
    const booksData = booksArray.slice(1);

    return booksData.map((book) => {
      const bookData = book.split(",");
      return {
        title: bookData[0],
        author: bookData[1],
      };
    });
  }
}
