import React, { createContext, useContext, useState } from 'react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { IUser } from 'src/entities/User';

interface IUserContext {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

const UserContext = createContext<IUserContext>({
  user: { username: '', email: '' },
  setUser: () => {
    return;
  },
});

const UserProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = useState<IUser>({ username: '', email: '' });

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
