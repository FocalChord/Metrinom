const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");
const passportLoader = require("./passport");

module.exports = async (app) => {
    await mongooseLoader();
    passportLoader(app);
    expressLoader(app);
};
