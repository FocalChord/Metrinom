const express = require("express");
const loaders = require("./loaders");
const port = process.env.PORT || 3001;

const startServer = async () => {
    const app = express();
    await loaders(app);
    app.listen(port, () => console.log(`Server running on port ${port}`));
};

<<<<<<< HEAD
startServer();
=======
app.get("/", (req, res) => {
    res.send("Hello Worldsss");
});

const user = require("./src/routing/user-routing");

app.use("/user", user);

app.listen(port, () => console.log(`Server running on port ${port}`));
>>>>>>> added get ALL method for users
