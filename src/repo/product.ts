import product from "../models/product";
import { Pagination, ProductFilter } from "../interfaces/product";
import { isValidObjectId } from "mongoose";

const findOne = async (filter: ProductFilter) => {
  try {
    let prod = await product.findOne({ ...filter, deleted: false });
    if (!prod) return { success: false, message: "not found", data: {} };
    return { success: true, message: "found", data: prod["_doc"] };
  } catch (err) {
    console.log(err);
    return { success: false, message: "an error occurred", data: {} };
  }
};

const findMany = async (filter: ProductFilter, pagination: Pagination) => {
  try {
    let prod = await product
      .find(
        filter,
        {},
        { skip: pagination.skip || 0, limit: pagination.limit || undefined }
      )
      .sort({ createdAt: "asc" });

    if (!prod) return { success: false, message: "not found", data: {} };
    return { success: true, message: "found", data: prod };
  } catch (error) {
    console.log({ error });
    return { success: false, message: "an error occurred", data: {} };
  }
};

const updateOneById = async (id: string, data: ProductFilter) => {
  try {
    if (!isValidObjectId(id))
      return { success: false, message: "not a valid product id", data: {} };
    let prod = await findOne({ _id: id });
    if (!prod.success)
      return { success: false, message: "not found", data: {} };
    let upProd = await product.updateOne({ _id: id }, data, { new: true });
    if (!upProd) return { success: false, message: "not updated", data: {} };
    let updatedProd = await findOne({ _id: id });
    if (data.deleted) return { success: true, message: "deleted", data: {} };
    return { success: true, message: "updated", data: updatedProd.data };
  } catch (error) {
    console.log({ error });
  }
};

export { findOne, findMany, updateOneById };
