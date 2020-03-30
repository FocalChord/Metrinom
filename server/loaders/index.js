const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");
const passportLoader = require("./passport");
const swaggerLoader = require("./swagger");

module.exports = async (app) => {
    await mongooseLoader();
    passportLoader(app);
    expressLoader(app);
    swaggerLoader(app);
};
