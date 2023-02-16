/** @format */

import { Document } from "mongoose";

export default interface Product extends Document {
  name: string;
  description: string;
  price: number;
  deleted: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt: string;
}

export interface ProductFilter {
  name?: string;
  description?: string;
  price?: number;
  deleted?: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  skip?: number;
  limit?: number;
}
