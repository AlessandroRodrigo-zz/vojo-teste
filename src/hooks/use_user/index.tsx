import React, { createContext, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    const storageUser = localStorage.getItem('@user');

    if (storageUser) {
      const formattedUser = JSON.parse(storageUser);
      setUser({ ...formattedUser });
    }
  }, []);

  useEffect(() => {
    const storageUser = localStorage.getItem('@user');

    if (storageUser !== JSON.stringify(user)) {
      localStorage.setItem('@user', JSON.stringify(user));
    }
  }, [user]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

const useUser = (): IUserContext => useContext(UserContext);

export { UserProvider, useUser };
