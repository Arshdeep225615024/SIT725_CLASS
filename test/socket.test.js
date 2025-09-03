const io = require("socket.io-client");
const { expect } = require("chai");
const server = require("../server"); // auto-starts server

describe("Socket.IO Server", function () {
  let clientSocket;

  this.timeout(5000);

  before((done) => {
    clientSocket = io("http://localhost:3004");
    clientSocket.on("connect", done);
  });

  after(() => {
    if (clientSocket.connected) clientSocket.disconnect();
    server.close(); // stop server after tests
  });

  it("should receive a number event from server", (done) => {
    clientSocket.on("number", (num) => {
      expect(num).to.be.a("number");
      done();
    });
  });
});