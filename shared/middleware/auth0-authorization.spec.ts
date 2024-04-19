import { HttpError } from "../errors/http.error";
import sinon from "sinon";
import { expect } from "chai";
import { StatusCodes } from "http-status-codes";
import { validateAccessToken } from "./auth0-authorization";
import { BearerToken } from "../tokens/bearer.token";

describe("Auth0 authorization", () => {
  let sandbox: sinon.SinonSandbox;
  let verifyJwtTokenStub: sinon.SinonStub;
  process.env.AUTH0_JWKS_URI = "URI";
  const requestProps = {
    context: {} as any,
    response: null,
    error: null,
    internal: {},
  };
  const invalidToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpvbTVfbWdpbjdxQzlVWjNIbkhQcCJ9.eyJpc3MiOiJodHRwczovL2RvbWFpbi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8dXNlcklkIiwiYXVkIjoiYXVkaWVuY2UiLCJpYXQiOjE3MTM1MTE1ODYsImV4cCI6MTcxMzU5Nzk4NiwiZ3R5IjoicGFzc3dvcmQiLCJhenAiOiJjbGllbnRPSWQifQ.ZFWEc6SxK1FaHfDQdwY6RUbk2ptxcsS6kBbCc_y-J3hpFC0BVFQ4q8OrWa0J4IfY_soyKGV-3jDOa1reWNVfg4XGEaNrMvME0W2yYgSGtCfz_5PRRGKo4b4JBXNULn6WrsF7L0yQRqIzngLdNvqT7jZhFVoxx6drCmt3wuk-kaIJStpYcWIJAwvIM8SktT4TcaXMr4oT2TPPCQdlniU_c29rp0FIcV1wdwqlT9c1bi41blxCmu0pfyHdqx7IBukFdoYcuO-nIWrziNQtc8mNHi24BznLrMYCC9JB2GipxpqLEAq_ehjYL268-jSM0KHQT7aMRwXFlMQ65bDoO0d65w";
  const validToken =
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpvbTVfbWdpbjdxQzlVWjNIbkhQcCJ9.eyJtZSI6eyJlbWFpbCI6InRlc3QuaW50ZWdyYXRpb25AdHNoLmlvIn0sImlzcyI6Imh0dHBzOi8vZG9tYWluLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHx1c2VySWQiLCJhdWQiOiJhdWRpZW5jZSIsImlhdCI6MTcxMzUxMTU4NiwiZXhwIjoxNzEzNTk3OTg2LCJndHkiOiJwYXNzd29yZCIsImF6cCI6ImNsaWVudE9JZCJ9.S2e5wyXfArW_0Z2SF0MsgAtUBM5lgnph4kCHDglPeMoWzK1wIGdJ4sqtBhR7Of8OU_lfEonX25uLmNmmYVLVz9GzfhtHZAosWM_NZM-ajRLTxqIfjVPR2Mw-FQL3bkhoc6z4YTXy8XIm7N2YqPIPy2HnMUWJeU8A8J6AVSoaUG3gpWc4HTQpMgq9LbT_TX39DT6Yj9vjZAipm3LQ_-mt4oV1NifacjD4JAwuqzPpMSaoOJiXkJqbs-PimQpEcyMVzNN5MQ2L_DxvK7U_5uukmiQTq3ZsBhIF_u7tJEOvajo8dIk5Zo43UZ5TFXecCzfkEVYO5RHc5wz1xWMf9hjd4g";

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    verifyJwtTokenStub = sandbox.stub(BearerToken, "verifyJwtToken");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should return unauthorized if there is no Authorization header", async () => {
    const event = {
      headers: {},
    } as any;

    try {
      await validateAccessToken().before!({ event, ...requestProps });
    } catch (error: any) {
      expect(error).to.be.instanceOf(HttpError);
      expect(error.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(JSON.parse(error.message).message).to.be.equal("Authorization Bearer token not found in headers");
    }
  });

  it("should return unauthorized if Authorization header is not valid", async () => {
    const event = {
      headers: {
        authorization: invalidToken,
      },
    } as any;

    try {
      await validateAccessToken().before!({ event, ...requestProps });
    } catch (error: any) {
      expect(error).to.be.instanceOf(HttpError);
      expect(error.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(JSON.parse(error.message).message).to.be.equal("Authorization Bearer token is not valid");
    }
  });

  it("should return unauthorized if token payload is not valid", async () => {
    const event = {
      headers: {
        authorization: `Bearer ${invalidToken}`,
      },
    } as any;

    try {
      await validateAccessToken().before!({ event, ...requestProps });
    } catch (error: any) {
      expect(error).to.be.instanceOf(HttpError);
      expect(error.status).to.be.equal(StatusCodes.BAD_REQUEST);
      expect(JSON.parse(error.message).errors).to.be.equal("Invalid Bearer token payload");
    }
  });

  it("should return unauthorized if user don't have access", async () => {
    verifyJwtTokenStub.resolves(false);
    const event = {
      headers: {
        authorization: validToken,
      },
    } as any;

    try {
      await validateAccessToken().before!({ event, ...requestProps });
    } catch (error: any) {
      expect(error).to.be.instanceOf(HttpError);
      expect(error.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(JSON.parse(error.message).message).to.be.equal("Access denied");
      sinon.assert.calledOnce(verifyJwtTokenStub);
    }
  });

  it("should return unauthorized if verification throws error", async () => {
    verifyJwtTokenStub.throws(Error);
    const event = {
      headers: {
        authorization: validToken,
      },
    } as any;

    try {
      await validateAccessToken().before!({ event, ...requestProps });
    } catch (error: any) {
      expect(error).to.be.instanceOf(HttpError);
      expect(error.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(JSON.parse(error.message).message).to.be.equal("Access denied");
      sinon.assert.calledOnce(verifyJwtTokenStub);
    }
  });

  it("should return undefined if authorization was correct", async () => {
    verifyJwtTokenStub.resolves(true);
    const event = {
      headers: {
        authorization: validToken,
      },
    } as any;

    expect(await validateAccessToken().before!({ event, ...requestProps })).to.be.undefined;
  });
});
