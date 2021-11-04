export const BookSchema = {
  name: 'Book',
  properties: {
    _id: 'string',
    title: 'string',
    author: 'string',
    read: 'bool',
    genre: 'string',
  },
  primaryKey: '_id',
};

export interface Book extends Realm.Object {
  _id: string;
  title: string;
  author: string;
  read: boolean;
  genre: Genre;
}

export type Genre =
  | 'Classic'
  | 'Comic Book'
  | 'Mystery'
  | 'Fantasy'
  | 'Horror'
  | 'Romance'
  | 'Science Fiction';
