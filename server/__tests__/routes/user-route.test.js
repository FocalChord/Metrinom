const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const express = require("express");
const userRoute = require("../../routes/user-route");
const User = require("../../models/user");
const mockingoose = require("mockingoose").default;

const USER_OBJ = [
    {
        spotifyUserId: "Dinith123",
        displayName: "Dinith",
        profilePic: "image.png",
        friends: ["Hong"],
        isPrivate: true,
        accessToken: "abc123",
        refreshToken: "xyz789",
    },
];

beforeAll(async (done) => {
    mockingoose(User).toReturn(USER_OBJ, "findOne");
    mockingoose(User).toReturn(USER_OBJ, "findOneAndUpdate");
    app = express();
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
    app.use("/user", userRoute);
    server = app.listen(3001, () => done());
});

afterAll((done) => {
    server.close(async () => {
        done();
    });
});

test("GET /user/:id", async () => {
    const resp = await fetch("http://localhost:3001/user/Dinith123");
    const respJson = await resp.json();

    delete respJson[0]._id;

    expect(resp.status).toBe(200);
    expect(respJson).toEqual(expect.arrayContaining(USER_OBJ));
});

test("PUT /user", async () => {
    const resp = await fetch("http://localhost:3001/user", {
        method: "PUT",
        body: JSON.stringify({
            spotifyUserId: "Dinith123",
            displayName: "Nisarag",
            profilePic: "image.png",
            friends: ["Hong"],
            isPrivate: true,
            accessToken: "abc123",
            refreshToken: "xyz789",
        }),
        headers: { "Content-Type": "application/json" },
    });
    const respJson = await resp.json();

    delete respJson[0]._id;

    expect(resp.status).toBe(200);
    expect(respJson).toEqual(expect.arrayContaining(USER_OBJ));
});
