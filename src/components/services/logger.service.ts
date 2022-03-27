type LogTypes = 'log' | 'info' | 'warn' | 'error';

class LoggerService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private addLog(type: LogTypes, ...args: any[]): void {
    // eslint-disable-next-line no-console
    console[type](...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public log(...args: any[]): void {
    this.addLog('log', ...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public error(...args: any[]): void {
    this.addLog('error', ...args);
  }
}

export const loggerService = new LoggerService();
