const router = require("express").Router();

const authRouter = require("./auth.router");

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Hallo! This is the authentication starter API___{v2}",
  });
});

router.use("/auth", authRouter);

module.exports = router;