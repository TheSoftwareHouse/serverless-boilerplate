import { StatusCodes } from "http-status-codes";
import { HttpError } from "./http.error";

export class NotFoundError extends HttpError {
  public constructor(message?: string) {
    super(StatusCodes.NOT_FOUND, message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
