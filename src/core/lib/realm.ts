import Realm from 'realm';
import { BookSchema } from '../schemas/BookSchema';

export default new Realm({
  schema: [BookSchema],
  deleteRealmIfMigrationNeeded: true,
});
