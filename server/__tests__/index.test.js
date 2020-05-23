// REF: https://medium.com/@leolewan/writing-a-nodejs-api-fully-tested-with-jest-5d449361c8a7

const router = require("../routes");

jest.mock("../loaders/logger");
const loggerLoader = require("../loaders/logger");
jest.mock("../loaders/mongoose");
const mongooseLoader = require("../loaders/mongoose");
jest.mock("../loaders/passport");
const passportLoader = require("../loaders/passport");
jest.mock("../loaders/swagger");
const swaggerLoader = require("../loaders/swagger");

const useSpy = jest.fn();
const listenSpy = jest.fn();
const enableSpy = jest.fn();
const getSpy = jest.fn();

jest.doMock("express", () => {
    return () => ({
        listen: listenSpy,
        use: useSpy,
        enable: enableSpy,
        get: getSpy,
    });
});

describe("App should set up server configuration successfully", () => {
    test("App should set up all required loaders and routes", async () => {
        const startServer = require("../index");
        await startServer();

        expect(useSpy).toHaveBeenCalledWith(router);
        expect(loggerLoader).toHaveBeenCalled();
        expect(mongooseLoader).toHaveBeenCalled();
        expect(passportLoader).toHaveBeenCalled();
        expect(swaggerLoader).toHaveBeenCalled();
    });

    test("App should start listening for connections", async () => {
        const startServer = require("../index");
        await startServer();

        expect(listenSpy).toHaveBeenCalled();
    });
});
