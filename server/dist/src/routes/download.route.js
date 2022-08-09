"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Utils_1 = require("../infrastructure/utils/Utils");
const mime_types_1 = __importDefault(require("mime-types"));
const router = (0, express_1.Router)();
exports.default = router.get("/:path", async (req, res, next) => {
    try {
        const file = (0, Utils_1.processPath)(req.params.path).absolutePath;
        const mimetype = mime_types_1.default.lookup(file);
        console.log(mimetype);
        res.setHeader("Content-Disposition", `attachment; filename=${file}`);
        res.setHeader("Content-Type", mimetype);
        res.download(file);
    }
    catch (err) {
        next(err);
    }
});
