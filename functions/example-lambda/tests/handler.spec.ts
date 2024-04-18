import sinon from "sinon";
import { DataSource, Repository } from "typeorm";
import { lambdaHandler } from "../handler";
import assert from "assert";
import { StatusCodes } from "http-status-codes";
import { afterEach, beforeEach, describe, it } from "node:test";

describe("test endpoint", () => {
  let sandbox: sinon.SinonSandbox;
  let userRepositoryStub: sinon.SinonStub;
  let dataSourceStub: sinon.SinonStub;
  let metadataStub: sinon.SinonStub;

  const data = [
    {
      id: "50ece88a-61ac-4435-8457-051693716276",
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
    },
    {
      id: "8eb91b5f-63ef-4ca8-9db4-3fa6f173f1ae",
      firstName: "Mark",
      lastName: "Smith",
      email: "mark@smith.com",
    }
  ];

  const pagination = {
    page: 1,
    limit: 3,
    total: 2,
    totalPages: 1
  };

  const params = {
      exampleParam: "example",
      page: "1",
      limit: "3",
  };

  beforeEach(() => {  
    sandbox = sinon.createSandbox();
    userRepositoryStub = sandbox.stub(Repository.prototype, "findAndCount").resolves([data, 2]);
    dataSourceStub = sandbox.stub(DataSource.prototype, "initialize").resolves();
    metadataStub = sandbox.stub(Repository.prototype, "metadata");
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("GET dev/users", () => {
    it("should return users", async () => {
      metadataStub.value({
        columns: [{ propertyName: "email", }, { propertyName: "firstName" }]
      });
      const filters  = {
        sort: {  email: "ASC" },
        filter: { firstName: "John" },
        search: "Doe",
      };

      const response = await lambdaHandler({ 
        queryStringParameters: { ...params,  ...filters }
      });

      const parsedResponse = JSON.parse(response.body);
      assert.equal(response.statusCode, StatusCodes.OK);
      assert.deepEqual(parsedResponse, { meta: { pagination, ...filters }, data });
    });

    it("shouldn't return filters if they are not available", async () => {
      metadataStub.value({
        columns: [{ propertyName: "id", }, { propertyName: "lastName" }]
      });

      const response = await lambdaHandler({
        queryStringParameters: { 
          ...params, 
          sort: { email: "ASC", id: "ASC" },
          filter: { firstName: "John", lastName: "Doe" },
        }
      });

      const parsedResponse = JSON.parse(response.body);
      assert.equal(response.statusCode, StatusCodes.OK);
      assert.deepEqual(parsedResponse, { meta: { pagination, sort: { id: "ASC" }, filter: { lastName: "Doe" }}, data });
    });
  });
});
