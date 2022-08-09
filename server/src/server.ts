import http, { Server } from "http";
import "reflect-metadata";
import { Configuration as config } from "../config/Configuration";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import uploadRoute from "./routes/upload.route";
import contentRoute from "./routes/content.route";
import dirRoute from "./routes/dir.route";
import downloadRoute from "./routes/download.route";

//Express Application
const app: Application = express();

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.set("port", config.server.port);
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.get("/", (_req, res) =>
  res.status(200).send({ msg: "API Server of Home Drive Application" })
);

// Routes
app.use("/content", contentRoute);
app.use("/upload", uploadRoute);
app.use("/download", downloadRoute);
app.use("/dir", dirRoute);

// HTTP Server
const server: Server = http.createServer(app);

try {
  //Launch App and Connected to Database
  server.listen(app.get("port"), () => {
    console.log("[API SERVER]: running on port", app.get("port"));
  });
} catch (error) {
  console.log(error);
  process.exit();
}

export { server };
