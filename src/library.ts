// TODO: імпортуй Book і типи
// import { Book } from "./book";
// import type { BookId } from "./types";
import { Book } from "./book";
import type { BookId } from "./types";

export class Library {
  // TODO: реалізуй колекцію книжок (Map або іншу структуру)
  items: Map<BookId, Book> = new Map();

  add(item: Book) {
    if (this.items.has(item.id)) {
      throw new Error("Item already exists");
    }
    this.items.set(item.id, item);
  }

  remove(id: BookId) {
    const book = this.getBookOrThrow(id);

    if (book.getStatus() === "borrowed") {
      throw new Error("Cannot remove borrowed item");
    }

    this.items.delete(id);
  }

  listAll(): Book[] {
    return Array.from(this.items.values());
  }

  listAvailable(): Book[] {
    return this.listAll().filter(
      (book) => book.getStatus() === "available"
    );
  }

  borrow(bookId: BookId, personName: string) {
    const book = this.getBookOrThrow(bookId);
    book.markBorrowed(personName);
  }
return(bookId: BookId) {
    const book = this.getBookOrThrow(bookId);
    book.markReturned();
  }

  getBookOrThrow(id: BookId): Book {
    const book = this.items.get(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }
}