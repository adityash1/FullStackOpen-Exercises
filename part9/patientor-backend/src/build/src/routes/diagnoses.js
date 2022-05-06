"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
const diagnoseRouter = require("express").Router();
diagnoseRouter.get("/", (_req, res) => {
    res.send(diagnoseService_1.default.getDiagnoses());
});
exports.default = diagnoseRouter;
