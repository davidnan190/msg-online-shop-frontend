import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { Role } from '../enums/role.enum';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  userRole: Role | null;
  login: (accessToken: string, refreshToken: string, userRole: Role) => void;
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
  const [userRole, setUserRole] = useState<Role | null>(
    localStorage.getItem(LocalStorageKey.LOGGED_IN_USER_ROLE) as Role | null
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
    if (userRole) {
      localStorage.setItem(LocalStorageKey.LOGGED_IN_USER_ROLE, userRole);
    } else {
      localStorage.removeItem(LocalStorageKey.LOGGED_IN_USER_ROLE);
    }
  }, [userRole]);

  const login = (
    newAccessToken: string,
    newRefreshToken: string,
    newUserRole: Role
  ) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setUserRole(newUserRole);
  };

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserRole(null);
  }, []);


  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      userRole,
      login,
      logout,
    }),
    [accessToken, refreshToken, userRole, login, logout]
  );

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
