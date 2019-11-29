import express from "express";
import bodyParser from "body-Parser";
import userRouter from "./router/userRouter";

const app = express();
const port = process.env.PORT || 8090;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PUTCH, GET");
    res.status(200).json({});
  }
  next();
});
app.use("/faceapp/api", userRouter);
app.get("/*", (req, res) => {
  res.status(404).json({
      status: 404,
      message: 'you are trying to access wrong path'
  });
});
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
