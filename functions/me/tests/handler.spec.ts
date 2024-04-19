import sinon from "sinon";
import { DataSource, Repository } from "typeorm";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { lambdaHandler } from "../handler";
import { expect } from "chai";

describe("GET /me", () => {
  let sandbox: sinon.SinonSandbox;
  let userRepositoryStub: sinon.SinonStub;
  const email = "john@doe.com";

  const profileModel =  {
    id: "50ece88a-61ac-4435-8457-051693716276",
    firstName: "John",
    lastName: "Doe",
    email,
  };

  const params = { email };

  beforeEach(() => {  
    sandbox = sinon.createSandbox();
    userRepositoryStub = sandbox.stub(Repository.prototype, "findOne");
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("GET dev/users", () => {
    it("should return logged profile data", async () => {
      userRepositoryStub.resolves(profileModel);
      const response = await lambdaHandler({ queryStringParameters: params });

      const parsedResponse = JSON.parse(response.body);
      expect(response.statusCode).to.equal(StatusCodes.OK);
      expect(parsedResponse.data).to.deep.equal(profileModel);
    });

    it("should return error when profile wasn't found in database", async () => {
      try {
        await lambdaHandler({ queryStringParameters: params });
      } catch(error: any) {
        expect(JSON.parse(error.message).message).to.be.equal(`User with email "${email}" does not exist`);
      }
    });
  });
});
