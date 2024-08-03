import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  clearCredentials,
  setCredentials,
} from '../store/authCredentialsSlice';

import { IAuthContextType } from '../types/contexts/auth-context-type.interface';
import { ICustomer } from '../types/customers/customer.interface';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { Role } from '../enums/role.enum';
import { useDispatch } from 'react-redux';

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem(LocalStorageKey.REFRESH_TOKEN)
  );

  const [loggedInUserId, setLoggedInId] = useState<string | null>(
    localStorage.getItem(LocalStorageKey.LOGGED_IN_USER_ID)
      ? (localStorage.getItem(LocalStorageKey.LOGGED_IN_USER_ID) as string)
      : null
  );

  const [userRole, setUserRole] = useState<string | null>(
    localStorage.getItem(LocalStorageKey.LOGGED_IN_USER_ROLE) as string
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
    if (loggedInUserId) {
      localStorage.setItem(LocalStorageKey.LOGGED_IN_USER_ID, loggedInUserId);
    } else {
      localStorage.removeItem(LocalStorageKey.LOGGED_IN_USER_ID);
    }
  }, [loggedInUserId]);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem(LocalStorageKey.LOGGED_IN_USER_ROLE, userRole);
    } else {
      localStorage.removeItem(LocalStorageKey.LOGGED_IN_USER_ROLE);
    }
  }, [loggedInUserId]);

  const isCustomer = () => {
    return userRole === Role.CUSTOMER;
  };

  const isAdmin = () => {
    return userRole === Role.ADMIN;
  };

  const login = (
    newAccessToken: string,
    newRefreshToken: string,
    newLoggedInUser: ICustomer
  ) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setLoggedInId(newLoggedInUser.id);
    console.log('ID ' + newLoggedInUser.id);
    setUserRole(newLoggedInUser.role);

    dispatch(
      setCredentials({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      })
    );
  };

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setLoggedInId(null);
    setUserRole(null);
    dispatch(clearCredentials());
  }, [dispatch]);

  const value = {
    accessToken,
    refreshToken,
    loggedInUserId,
    userRole,
    isCustomer,
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = (): IAuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthContext };
