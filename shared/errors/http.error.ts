import { AppError } from "./app.error";

export class HttpError extends AppError {
  public constructor(message: string, public status: number) {
    super(message);

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
