require("dotenv").config();
const express = require("express");
const app = express();
const tasks = require("./routers/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Connect to DB ...");
    app.listen(port, console.log(`Server is listening on ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
