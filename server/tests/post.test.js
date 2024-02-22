import mongoose from "mongoose";
import request from "supertest";
import "dotenv/config.js";
import app from "../app.js";
import { jest } from "@jest/globals";

//connecting to the database before each test
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

//removing the databse connection after each test
afterEach(async () => {
  await mongoose.disconnect();
});

//test case 1 : GET ALL Endpoint
describe("GET posts/display", () => {
  it("Should return all the posts exist", async () => {
    await request(app)
      .get("/api/posts/display")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

