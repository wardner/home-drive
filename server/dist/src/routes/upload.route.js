"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Utils_1 = require("../infrastructure/utils/Utils");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const router = (0, express_1.Router)();
router.use((0, express_fileupload_1.default)());
exports.default = router.post('/:path?', async (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({
            success: false,
            message: 'No files were uploaded'
        });
    }
    const dirPath = (0, Utils_1.processPath)(req.params.path);
    let files = req.files.file;
    if (!Array.isArray(files)) {
        files = [files];
    }
    try {
        for (const file of files) {
            await (0, Utils_1.moveFile)(file, dirPath.absolutePath);
        }
    }
    catch (error) {
        if (error) {
            return next(error);
        }
        return res.status(400).json({
            success: false,
            message: error,
            path: dirPath.relativePath
        });
    }
    res.status(200).json({
        success: true,
        message: 'Files successfully uploaded',
        path: dirPath.relativePath
    });
});
