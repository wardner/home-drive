"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Utils_1 = require("../infrastructure/utils/Utils");
const router = (0, express_1.Router)();
exports.default = router.post('/:path?', async (req, res, next) => {
    const dirPath = (0, Utils_1.processPath)(req.params.path);
    const name = req.body.name;
    if (!name) {
        return res.status(400).json({
            success: false,
            message: "No name was specified"
        });
    }
    try {
        await fs_1.default.promises.mkdir(path_1.default.join(dirPath.absolutePath, name));
    }
    catch (error) {
        return next(error);
    }
    res.status(200).json({
        success: true,
        message: 'Directory created'
    });
});
