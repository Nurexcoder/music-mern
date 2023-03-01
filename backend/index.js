const express = require("express");
const connectDB = require("./config/db");
const cors=require("cors")
require("./config/firebase");
const authRouter = require("./router/auth");
const musicRouter = require("./router/music");

const app = express();
app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({ limit: "20mb", extended: true, parameterLimit: 500000 })
);
connectDB();

app.use("/auth", authRouter);
app.use("/music", musicRouter);
app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
