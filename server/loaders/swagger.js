const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const setUpSwagger = (app) => {
    // Swagger set up
    const options = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "Metronom API Documentation",
                description: "API definitions for Metronom",
            },
            contact: {
                name: "Swagger",
            },
            servers: [
                {
                    url: "http://localhost:3001/",
                },
            ],
        },
        apis: ["./routes/*.js", "./models/*.js"],
    };
    const swaggerDocs = swaggerJsdoc(options);
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
};

module.exports = setUpSwagger;
