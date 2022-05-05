import { HttpError } from "./http.error";

export class NotFoundError extends HttpError {
  public constructor(message: string) {
    super(message, 404);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
