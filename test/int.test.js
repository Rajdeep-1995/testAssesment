const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");

describe("cheking whether the server is up and working", () => {
  it("should return Http code 200", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.statusCode).to.equal(200);
  });
});

describe("getPosts with tags history and tech with with default sortBy id and direction asc", () => {
  it("should return all posts", async () => {
    const response = await request(app)
      .get("/api/posts")
      .query({ tags: "history,tech" });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.have.property("author");
    expect(response.body[0]).to.have.property("authorId");
    expect(response.body[0]).to.have.property("id");
    expect(response.body[0].id < response.body[response.body.length - 1].id).to
      .be.true;
    expect(response.body[0]).to.have.property("likes");
    expect(response.body[0]).to.have.property("reads");
    expect(response.body[0]).to.have.property("tags");
    expect(response.body[0]).to.have.property("popularity");
  });
});

describe("getPosts with tags history and tech with with sortBy likes and direction asc", () => {
  it("should return all posts", async () => {
    const response = await request(app)
      .get("/api/posts")
      .query({ tags: "history,tech", sortBy: "likes" });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.have.property("author");
    expect(response.body[0]).to.have.property("authorId");
    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("likes");
    expect(
      response.body[0].likes < response.body[response.body.length - 1].likes
    ).to.be.true;
    expect(response.body[0]).to.have.property("reads");
    expect(response.body[0]).to.have.property("tags");
    expect(response.body[0]).to.have.property("popularity");
  });
});

describe("getPosts with tags history and tech with with sortBy likes and direction desc", () => {
  it("should return all posts", async () => {
    const response = await request(app)
      .get("/api/posts")
      .query({ tags: "history,tech", sortBy: "likes" });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.have.property("author");
    expect(response.body[0]).to.have.property("authorId");
    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("likes");
    expect(
      response.body[0].likes < response.body[response.body.length - 1].likes
    ).to.be.true;
    expect(response.body[0]).to.have.property("reads");
    expect(response.body[0]).to.have.property("tags");
    expect(response.body[0]).to.have.property("popularity");
  });
});

describe("getPosts with only single tag science", () => {
  it("should return all posts", async () => {
    const response = await request(app)
      .get("/api/posts")
      .query({ tags: "science" });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.have.property("author");
    expect(response.body[0]).to.have.property("authorId");
    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("likes");
    expect(response.body[0]).to.have.property("reads");
    expect(response.body[0]).to.have.property("tags");
    expect(response.body[0]).to.have.property("popularity");
  });
});

describe("getPosts with tags history, tech and science", () => {
  it("should return all posts", async () => {
    const response = await request(app)
      .get("/api/posts")
      .query({ tags: "history,tech,science" });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.have.property("author");
    expect(response.body[0]).to.have.property("authorId");
    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("likes");
    expect(response.body[0]).to.have.property("reads");
    expect(response.body[0]).to.have.property("tags");
    expect(response.body[0]).to.have.property("popularity");
  });
});

describe("failed to get posts when the tags query is not provided", () => {
  it("should return Http code 400", async () => {
    const response = await request(app).get("/api/posts");
    expect(response.statusCode).to.equal(400);
  });
});

describe("failed to get posts when the sortBy query has invalid value", () => {
  it("should return Http code 400", async () => {
    const response = await request(app)
      .get("/api/posts")
      .query({ tags: "history,tech,science", sortBy: "invalid values" });
    expect(response.statusCode).to.equal(400);
  });
});

describe("failed to get posts when the direction query has invalid value", () => {
  it("should return Http code 400", async () => {
    const response = await request(app)
      .get("/api/posts")
      .query({ tags: "history,tech,science", sortBy: "invalid values" });
    expect(response.statusCode).to.equal(400);
  });
});

/*we can write the same test for
  all sortBy and direction just by changing some values and assersations.
  thank you*/
