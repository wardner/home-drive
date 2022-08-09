"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Utils_1 = require("../infrastructure/utils/Utils");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
exports.default = router.get("/:path?", async (req, res, next) => {
    try {
        const dirPath = (0, Utils_1.processPath)(req.params.path);
        const dir = await fs_1.default.promises.opendir(dirPath.absolutePath);
        const content = { files: [{}], directories: [{}] };
        for await (const dirent of dir) {
            if (dirent.isDirectory()) {
                content.directories.push(dirent.name);
            }
            else {
                content.files.push(dirent.name);
            }
        }
        content.directories.sort();
        content.files.sort();
        res.json({ path: dirPath.relativePath, content, success: true });
    }
    catch (error) {
        next(error);
    }
});
