require("express-async-errors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect.js");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const V1_Router = require("./routes/index.js");
const responseUtilities = require("./shared/responceMiddlewares.js");
const { errorLogger, errorHandler } = require("./shared/errorMiddlewares.js");
const { UNKNOWN_ENDPOINT } = require("./errors/httpErrorCodes.js");

require("dotenv").config();
app.set("view engine", "ejs");
app.use(responseUtilities);
app.use(passport.initialize());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  session({
    secret: "s3Cur3",
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));



app.use("/api/v1", V1_Router);

//google cb
// app.use("/auth", auth);

// Admin and user routes.
// app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
// app.get("/basic", userAuth, (req, res) => res.send("User Route"));

http: app.use(errorLogger);
app.use(errorHandler);

app.use((req, res) => {
  // use custom helper function
  res.error(404, "Resource not found", UNKNOWN_ENDPOINT);
});

const PORT = process.env.PORT;

connectDB();
app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
