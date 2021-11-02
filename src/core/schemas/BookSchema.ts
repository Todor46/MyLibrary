export const BookSchema = {
  name: 'Book',
  properties: {
    _id: 'int',
    title: 'string',
    author: 'string',
    read: 'bool',
    genre: 'string',
  },
  primaryKey: '_id',
};
