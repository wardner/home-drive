"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: '.env'
});
exports.Configuration = {
    server: {
        port: parseInt(process.env.PORT),
        prefixRoutes: process.env.PREFIX_ROUTES,
    },
    database: {
        storage: process.env.HOME_CLOUD_STORAGE || 'notfound'
    }
};
