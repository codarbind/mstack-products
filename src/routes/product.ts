/** @format */

import { Router } from "express";
import {
  createProduct,
  getOneProductById,
  getAllProducts,
  updateProduct,
} from "../controllers/product";

const router = Router();

router.post("/add", createProduct);
router.get("/", getOneProductById);
router.get("/all", getAllProducts);
router.patch("/:id", updateProduct);

module.exports = { router };
