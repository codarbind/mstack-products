"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeOutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: true,
};
const MONGO = {
    url: process.env.DB_URL,
    options: MONGO_OPTIONS,
};
const config = { mongo: MONGO };
exports.default = config;
//# sourceMappingURL=dbconfig.js.map