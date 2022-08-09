"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveFile = exports.processPath = void 0;
const Configuration_1 = require("../../../config/Configuration");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const slash = process.platform === 'win32' ? '\\' : '/';
const processPath = (urlPath) => {
    const relativePath = urlPath ? urlPath.replace(/--/g, slash) : slash;
    const absolutePath = path_1.default.join(Configuration_1.Configuration.database.storage, relativePath);
    return { relativePath, absolutePath };
};
exports.processPath = processPath;
const moveFile = (file, storagePath) => {
    const filePath = path_1.default.join(storagePath, file.name);
    return new Promise((resolve, reject) => {
        fs_1.default.promises.access(filePath)
            .then(() => reject(new Error(`File ${file.name} already exists`)))
            .catch(() => file.mv(filePath, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        }));
    });
};
exports.moveFile = moveFile;
