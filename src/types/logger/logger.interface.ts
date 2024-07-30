import { ILogMessageContext } from './log-message-context';

export interface ILogger {
  info: (message: string, context?: ILogMessageContext) => void;
  debug: (message: string, context?: ILogMessageContext) => void;
  warn: (message: string, context?: ILogMessageContext) => void;
  error: (message: string, context?: ILogMessageContext) => void;
}
