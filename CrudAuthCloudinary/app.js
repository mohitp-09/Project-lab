const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.config");
const userRoutes = require('./routers/user.router');
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("running on 3000....");
});
