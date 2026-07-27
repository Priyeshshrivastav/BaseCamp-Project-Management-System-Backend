const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ApiError = require("./utils/ap-error");

const app = express();

// basic configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("public"));
app.use(cookieParser());

// require routes
const healthCheckrouter = require("./Routers/healthcheck.routers");
const authRouter = require("./Routers/AuthRoutes");
const projectRouter = require("./Routers/project.routes");
const taskRouter = require("./Routers/task.routes");
const noteRouter = require("./Routers/note.routes");

app.use("/api/v1/healthcheck", healthCheckrouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/notes", noteRouter);

app.get("/", (req, res) => {
  res.send({ message: "hello from app.js" });
});

// global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errors: err.errors || [],
    data: null,
  });
});

module.exports = app;







module.exports=app