export class AppError extends Error {
  public constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, AppError.captureStackTrace);
  }
}
