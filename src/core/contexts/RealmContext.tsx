import { createContext } from 'react';

const RealmContext = createContext<null | Realm>(null);

export default RealmContext;
