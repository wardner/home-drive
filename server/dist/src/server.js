"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http_1 = __importDefault(require("http"));
require("reflect-metadata");
const Configuration_1 = require("../config/Configuration");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const upload_route_1 = __importDefault(require("./routes/upload.route"));
const content_route_1 = __importDefault(require("./routes/content.route"));
const dir_route_1 = __importDefault(require("./routes/dir.route"));
const download_route_1 = __importDefault(require("./routes/download.route"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.set("port", Configuration_1.Configuration.server.port);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.get("/", (_req, res) => res.status(200).send({ msg: "API Server of Home Drive Application" }));
app.use("/content", content_route_1.default);
app.use("/upload", upload_route_1.default);
app.use("/download", download_route_1.default);
app.use("/dir", dir_route_1.default);
const server = http_1.default.createServer(app);
exports.server = server;
try {
    server.listen(app.get("port"), () => {
        console.log("[API SERVER]: running on port", app.get("port"));
    });
}
catch (error) {
    console.log(error);
    process.exit();
}
