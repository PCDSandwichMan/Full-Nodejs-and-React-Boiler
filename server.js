const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const config = require("./utils/config");
const helmet = require("helmet");
const path = require("path");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// - Sets for prod (specified before for morgan set before routes)
if (process.env.NODE_ENV === "production") {
  app.disable("x-powered-by");
  app.use(compression());
  app.use(morgan("common"));
}

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Route Imports

const database = mongoose.connection;

database.on("error", err => console.log(err));

database.once("open", () => {
  // Route Setup

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }

  // Route 404 Fallback
  app.use((req, res, next) => {
    if (req.accepts("json")) {
      res.status(404).json({ error: "this route could not be found" });
    }
    next();
  });

  // Server Connection
  app.listen(config.PORT, () =>
    console.log(`app listening on PORT: ${config.PORT}`)
  );
});
