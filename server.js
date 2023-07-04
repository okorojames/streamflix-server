const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const db = require("./config/db-config");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/auth-route");

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/user", router);

// app listening to express
app.listen(PORT, () => {
  db.connectDB();
});
