import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ICustomer } from '../types/customers/customer.interface';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { Role } from '../enums/role.enum';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isCustomer: () => boolean;
  isAdmin: () => boolean;
  retrieveLoggedInUser: () => ICustomer | null;
  userRole: Role | null;
  login: (
    accessToken: string,
    refreshToken: string,
    loggedInUser: ICustomer
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem(LocalStorageKey.REFRESH_TOKEN)
  );

  const [loggedInUser, setLoggedInUser] = useState<ICustomer | null>(
    localStorage.getItem(LocalStorageKey.LOGGED_IN_USER)
      ? JSON.parse(localStorage.getItem(LocalStorageKey.LOGGED_IN_USER) as string)
      : null
  );

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, accessToken);
    } else {
      localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
    }
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refreshToken);
    } else {
      localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);
    }
  }, [refreshToken]);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem(
        LocalStorageKey.LOGGED_IN_USER,
        JSON.stringify(loggedInUser)
      );
    } else {
      localStorage.removeItem(LocalStorageKey.LOGGED_IN_USER);
    }
  }, [loggedInUser]);

  const isCustomer = () => {
    return loggedInUser?.role === Role.CUSTOMER;
  };

  const isAdmin = () => {
    return loggedInUser?.role === Role.ADMIN;
  };

  const login = (
    newAccessToken: string,
    newRefreshToken: string,
    newLoggedInUser: ICustomer
  ) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setLoggedInUser(newLoggedInUser);
  };

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setLoggedInUser(null);
  }, []);

  const retrieveLoggedInUser = (): ICustomer | null => {
    const user = localStorage.getItem(LocalStorageKey.LOGGED_IN_USER);
    return user ? JSON.parse(user) as ICustomer : null;
  };

  const value = {
    accessToken,
    refreshToken,
    retrieveLoggedInUser,
    userRole: loggedInUser ? loggedInUser.role : null,
    isCustomer,
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthContext };
