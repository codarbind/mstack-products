/** @format */

import Product from "../interfaces/product";
import mongoose, { Schema } from "mongoose";

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    deleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Product>("Product", ProductSchema);
