import React from 'react';
import Realm from 'realm';
import { Book, BookSchema } from '../schemas/BookSchema';
import RealmContext from '../contexts/RealmContext';

const RealmProvider = ({
  children,
}: {
  children: React.ReactChildren | React.ReactChild;
}) => {
  const realm = new Realm({
    schema: [BookSchema],
    schemaVersion: 2,
    migration: (oldRealm, newRealm) => {
      if (oldRealm.schemaVersion < 2) {
        const oldObjects = oldRealm.objects<Book>('Book');
        const newObjects = newRealm.objects<Book>('Book');

        for (const objectIndex in oldObjects) {
          const oldObject = oldObjects[objectIndex];
          const newObject = newObjects[objectIndex];
          newObject._id = oldObject._id.toString();
        }
      }
    },
  });

  return (
    <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>
  );
};

export default RealmProvider;
