// https://www.jmalvarez.dev/posts/adapter-pattern-typescript

interface LibraryAdapter {
  getBooks(): { title: string; author: string }[];
}


class LibraryCSV {
  getBooks() {
    const books = [
      { title: "Book 1", author: "Author 1" },
      { title: "Book 2", author: "Author 2" },
      { title: "Book 3", author: "Author 3" },
    ];

    return (
      "title,author\r\n" +
      books.map((book) => `${book.title},${book.author}`).join("\r\n")
    );
  }
}

class LibraryCSVAdapter implements LibraryAdapter {
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



class LibraryJSON {
  getBooks() {
    const books = [
      { title: "Book 1", author: "Author 1" },
      { title: "Book 2", author: "Author 2" },
      { title: "Book 3", author: "Author 3" },
    ];

    return JSON.stringify(books);
  }
}



class LibraryJSONAdapter implements LibraryAdapter {
  private library: LibraryJSON;

  constructor(library: LibraryJSON) {
    this.library = library;
  }

  getBooks() {
    const books = this.library.getBooks();
    return JSON.parse(books);
  }
}
