const expressLoader = require("./express");
const loggerLoader = require("./logger");
const mongooseLoader = require("./mongoose");
const passportLoader = require("./passport");
const swaggerLoader = require("./swagger");

module.exports = async (app) => {
    loggerLoader(app);
    await mongooseLoader();
    passportLoader(app);
    expressLoader(app);
    swaggerLoader(app);
};
