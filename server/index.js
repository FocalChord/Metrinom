const express = require("express");
const loaders = require("./loaders");
const port = process.env.PORT || 3001;

const startServer = async () => {
    const app = express();
    await loaders(app);
    app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
