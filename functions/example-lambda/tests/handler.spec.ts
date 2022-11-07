import request from "supertest";

describe("test endpoint", () => {
  const server = request("http://localhost:1337/");

  describe("Test obligatory query parameter", () => {
    it("GET `dev/?exampleParam=test` returns 200", () => {
      return server.get("dev/").query("exampleParam=test").expect(200);
    });

    it("GET `dev` returns bad request", () => {
      return server.get("dev/").expect(400);
    });

    it("GET 'any' returns not found", () => {
      return server.get("any").expect(404);
    });
  });
});
