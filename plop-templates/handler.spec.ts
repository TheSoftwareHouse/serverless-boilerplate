import request from "supertest";

describe("test endpoint", () => {
    const server = request("http://localhost:1337/dev");

    describe("Test obligatory query parameter", () => {
        it("GET /?exampleParam=test returns 200", () => {
            return server.get("?exampleParam=test").expect(200);
        });

        it("GET / returns bad request", () => {
            return server.get("").expect(400);
        });

        it("GET /any returns not found", () => {
            return server.get("/any").expect(404);
        });
    })
});
