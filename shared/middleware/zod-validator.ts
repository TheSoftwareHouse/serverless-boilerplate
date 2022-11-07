import { MiddlewareObj } from "@middy/core";
import { ZodSchema } from "zod";
import { HttpError } from "../errors/http.error";
import { StatusCodes } from "http-status-codes";

export const zodValidator = <T>(schema: ZodSchema<T>): Required<Pick<MiddlewareObj<any, any>, "before">> => ({
  before: async (request) => {
    if (!schema) return;

    try {
      await schema.parseAsync(request.event);
    } catch (error) {
      throw new HttpError(error as string, StatusCodes.BAD_REQUEST);
    }
  },
});
