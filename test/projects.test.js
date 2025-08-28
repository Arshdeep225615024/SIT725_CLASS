const chai = require("chai");
const expect = chai.expect;
const request = require("request");

const baseUrl = "http://localhost:3004/api/projects";

describe("Projects API Tests", function () {

  it("should return status 200 and JSON structure", function (done) {
    request(baseUrl, function (error, response, body) {
      expect(response.statusCode).to.equal(200);

      const res = JSON.parse(body);
      expect(res).to.have.property("statusCode").equal(200);
      expect(res).to.have.property("data");
      expect(res).to.have.property("message");
      done();
    });
  });

  it("should return an array in data field", function (done) {
    request(baseUrl, function (error, response, body) {
      const res = JSON.parse(body);
      expect(res.data).to.be.an("array");
      done();
    });
  });

  it("should handle empty DB without errors", function (done) {
    request(baseUrl, function (error, response, body) {
      const res = JSON.parse(body);
      if (res.data.length === 0) {
        expect(res.message).to.equal("Success");
      }
      done();
    });
  });

  it("each project should have required fields", function (done) {
    request(baseUrl, function (error, response, body) {
      const res = JSON.parse(body);

      if (res.data.length > 0) {
        const project = res.data[0];
        expect(project).to.have.property("title");
        expect(project).to.have.property("image");
        expect(project).to.have.property("link");
        expect(project).to.have.property("description");
      }
      done();
    });
  });

});