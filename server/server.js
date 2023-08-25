require("dotenv").config();

const express = require("express");

const cors = require("cors");

const {errorLogger, errorHandler} = require('./src/middlewares/errorHandling');

const auth = require("./src/routes/auth");
const posts = require("./src/routes/posts");
const profile = require("./src/routes/profile");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// app.use(express.static('./public'))
app.use("/static", express.static("public"));

app.use("/auth", auth);
app.use("/api/v1/posts", posts);
app.use("/api/v1/profile", profile);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
