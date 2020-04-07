import { Server, Request } from "./chain_of_responsibility";

describe("Chain of Responsibility", () => {
  it("should handle request properly", () => {
    const server = new Server();
    const request: Request = {
      permission: true,
      message: "xxxx",
    };

    // expect(server.handleRequest(request));
  });
});
