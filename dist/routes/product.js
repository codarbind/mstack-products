"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const router = (0, express_1.Router)();
router.post("/add", product_1.createProduct);
router.get("/", product_1.getOneProductById);
router.get("/all", product_1.getAllProducts);
router.patch("/:id", product_1.updateProduct);
module.exports = { router };
//# sourceMappingURL=product.js.map