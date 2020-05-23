const fetch = require("node-fetch");
const express = require("express");
const passport = require("passport");
const authenticateSpy = jest.spyOn(passport, "authenticate");
const authRouter = require("../../routes/auth");

let app;
let server;

beforeAll(async (done) => {
    app = express();
    app.use("/auth", authRouter);
    server = app.listen(3001, () => done());
});

afterAll((done) => {
    server.close(async () => {
        done();
    });
});

beforeEach(() => {
    // authenticateSpy.mockClear();
});

test("GET /auth/spotify", async () => {
    const resp = await fetch("http://localhost:3001/auth/spotify");
    console.log(resp);
    // expect(authenticateSpy).toHaveBeenCalledTimes(1);
});

// test("GET /spotify/callback", )
