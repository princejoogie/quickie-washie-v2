class AppLogger {
  log(...args: any[]) {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    console.log(...args);
  }

  error(...args: any[]) {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    console.error(...args);
  }
}

const Logger = new AppLogger();

export default Logger;
