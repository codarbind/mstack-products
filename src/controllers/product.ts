/** @format */

import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import product from "../models/product";
//import Product from "../interfaces/product";
import Product from "../models/product";
import * as productRepo from "../repo/product";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name, description, price } = req.body;
    let createdProduct = await new Product({ name, description, price }).save();
    if (!createdProduct)
      res
        .status(500)
        .send({ success: false, message: "product not created", data: {} });

    res.status(200).send({
      success: true,
      message: "product created",
      data: { ...createdProduct["_doc"] },
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      data: {},
    });
  }
};

const getOneProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { id } = req.query;
    console.log({ id });
    if (typeof id !== "string" || !isValidObjectId(id))
      return res.status(400).send({
        success: false,
        message: "failed - invalid id",
        data: {},
      });

    let getProd = await productRepo.findOne({ _id: id, deleted: false });
    if (!getProd.success) return res.status(404).send({ ...getProd });
    return res.status(200).send(getProd);
  } catch (err) {
    console.log({ err });
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      data: {},
    });
  }
};

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { id, limit, skip } = req.query;

  try {
    if (id && !isValidObjectId(id))
      return res.status(400).send({
        success: false,
        message: "invalid id used",
        data: {},
      });
    let retrievedProducts =
      typeof id === "string"
        ? await productRepo.findOne({ _id: id, deleted: false })
        : await productRepo.findMany(
            { deleted: false },
            { limit: Number(limit), skip: Number(skip) }
          );
    if (!retrievedProducts.success)
      return res.status(404).send({ ...retrievedProducts });
    return res.status(200).send({ ...retrievedProducts });
  } catch (err) {
    console.log({ err });
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      data: {},
    });
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { name, description, price, deleted } = req.body;
  let { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).send({
        success: false,
        message: "invalid id sent",
        data: {},
      });

    let upProd = await productRepo.updateOneById(id, {
      name,
      description,
      price,
      deleted,
    });
    console.log("ju ", upProd);

    if (!upProd) return res.status(400).send({ ...upProd });
    return res.status(200).send({ ...upProd });
  } catch (err) {
    console.log({ err });
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      data: {},
    });
  }
};

export { createProduct, getOneProductById, getAllProducts, updateProduct };
