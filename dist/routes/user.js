"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/login", (req, res) => {
    console.log("log in");
    res.send("ji");
});
module.exports = { router };
//# sourceMappingURL=user.js.map