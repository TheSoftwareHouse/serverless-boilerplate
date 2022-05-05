import request from "supertest";

describe("test endpoint", () => {
  const server = request("http://localhost:1337/");

  describe("Test `dev` endpoint", () => {
    it("GET `dev` returns 200", () => {
      return server.get("dev").expect(200);
    });
  });
});
