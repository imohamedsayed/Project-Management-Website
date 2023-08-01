const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middleware/AuthMiddleware");
const dbURI = "mongodb://localhost:27017/todo";
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("App is running");
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo : ", err);
  });

app.set("view engine", "ejs");

// Middleware & static file

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [keys.session.key],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
// Bootstrap static files ..

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

/* 
    ---- >>>>> Controllers
*/

app.get("*", checkUser);

// Login & SignUp page
const authRouters = require("./routers/authRouters");
app.use(authRouters);

// Home & landing page
const homeRouters = require("./routers/homeRouters");
app.use(homeRouters);

// Projects
const projectRouters = require("./routers/projectRouters");
app.use(projectRouters);

// schedules
const scheduleRouters = require("./routers/schedulesRouter");
app.use(scheduleRouters);

// User
const userRouters = require("./routers/userRoutes");
app.use(userRouters);

// Cookies

// app.get("/set-cookie", (req, res) => {
//   res.cookie("user", false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
//   res.cookie("isEmployee", true);

//   res.send("cookies set successfully");
// });

// app.get("/read-cookie", (req, res) => {
//   res.json(req.cookies);
// });

app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found !" });
});
