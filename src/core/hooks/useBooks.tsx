import { useContext } from 'react';
import BooksContext from '../contexts/BooksContext';

const useBooks = () => useContext(BooksContext);

export default useBooks;
