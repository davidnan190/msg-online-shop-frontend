import React, { ReactNode, createContext, useContext } from 'react';

import { ILogger } from '../types/logger/logger.interface';

const LoggerContext = createContext<ILogger | undefined>(undefined);

interface LoggerProviderProps {
  children: ReactNode;
}

export const LoggerProvider: React.FC<LoggerProviderProps> = ({ children }) => {
  const logger: ILogger = {
    info: (message, context) => {
      console.info(`[INFO]: ${message}`, context);
    },
    debug: (message, context) => {
      console.debug(`[DEBUG] : ${message}`, context);
    },
    warn: (message, context) => {
      console.warn(`[WARN] : ${message}`, context);
    },
    error: (message, context) => {
      console.error(`[ERROR] : ${message}`, context);
    },
  };

  return (
    <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
  );
};

export const useLogger = (): ILogger => {
  const context = useContext(LoggerContext);
  if (context === undefined) {
    throw new Error('useLogger should  be used within a LoggerProvider');
  }
  return context;
};
