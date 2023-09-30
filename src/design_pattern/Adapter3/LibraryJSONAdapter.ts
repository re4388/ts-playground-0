import { LibraryAdapter } from './interface'
import { LibraryJSON } from './LibraryJSON'

export class LibraryJSONAdapter implements LibraryAdapter {
  private library: LibraryJSON;

  constructor(library: LibraryJSON) {
    this.library = library;
  }

  getBooks() {
    const books = this.library.getBooks();
    return JSON.parse(books);
  }
}
