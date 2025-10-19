const express = require("express");
const app = express();
const userRouter = require("./Routes/user");
const { loginUser, registerUser } = require("./Controllers/login");
const db = require("./db/db");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", registerUser);
app.post("/login", loginUser);

app.set("view engine", "ejs");

app.use("/", userRouter);

app.listen(3000, () => {
  console.log("Mongocart Feature server is running on port 3000");
});
