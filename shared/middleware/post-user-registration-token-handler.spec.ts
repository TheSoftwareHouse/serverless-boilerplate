import { postUserRegistrationTokenHandler } from "./post-user-registration-token-handler";
import { HttpError } from "../errors/http.error";
import { expect } from "chai";
import { StatusCodes } from "http-status-codes";

describe("Post user registration token handler", () => {
  process.env.POST_USER_REGISTRATION_TOKEN = "token";
  const requestProps = {
    context: {} as any,
    response: null,
    error: null,
    internal: {},
  };

  it("should return unauthorized if token does not exist in header", async () => {
    const event = {
      headers: {},
    } as any;

    try {
      await postUserRegistrationTokenHandler().before!({ event, ...requestProps });
    } catch (error: any) {
      expect(error).to.be.instanceOf(HttpError);
      expect(error.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(JSON.parse(error.message).message).to.be.equal("Token not found in headers");
    }
  });

  it("should return unauthorized if token is not valid", async () => {
    const event = {
      headers: {
        "x-auth-token": "wrongToken",
      },
    } as any;

    try {
      await postUserRegistrationTokenHandler().before!({ event, ...requestProps });
    } catch (error: any) {
      expect(error).to.be.instanceOf(HttpError);
      expect(error.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(JSON.parse(error.message).message).to.be.equal("Wrong authorization token");
    }
  });

  it("should return undefined if token is valid", async () => {
    const event = {
      headers: {
        "x-auth-token": "token",
      },
    } as any;

    expect(await postUserRegistrationTokenHandler().before!({ event, ...requestProps })).to.be.undefined;
  });
});
