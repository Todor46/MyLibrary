import React from 'react';
import RealmContext from '../contexts/RealmContext';

const RealmProvider = ({
  realm,
  children,
}: {
  realm: Realm | null;
  children: React.ReactChildren | React.ReactChild;
}) => {
  return (
    <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>
  );
};

export default RealmProvider;
