import { createContext } from 'react';
import { Book } from '../schemas/BookSchema';

interface BooksContext {
  books: Book[];
}

const BooksContext = createContext<BooksContext>({ books: [] });

export default BooksContext;
