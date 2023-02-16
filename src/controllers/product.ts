/** @format */

import { NextFunction, Request, Response } from "express";
import mongoose, { isValidObjectId } from "mongoose";
//import Product from "../interfaces/product";
import Product from "../models/product";

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
      data: { ...createdProduct['_doc']},
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
    let {id} = req.query;
    if (!isValidObjectId(id))
      return res.status(400).send({
        success: false,
        message: "invalid id",
        data: {},
      });
    let retrievedProduct = await Product.findById({ _id:id, deleted: false });
    console.log({ retrievedProduct });
    if (!retrievedProduct)
      return res.status(404).send({
        success: false,
        message: "product not found",
        data: {},
      });
    return res.status(200).send({
      success: true,
      message: "product found",
      data: { ...retrievedProduct['_doc'] },
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

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id = req.query;
  try {
    if (!isValidObjectId(id))
      return res.status(400).send({
        success: false,
        message: "invalid id",
        data: {},
      });
    let retrievedProducts = id
      ? await Product.findById({ id, deleted: false })
      : await Product.find({ deleted: false });
    console.log({ retrievedProducts });
    if (!retrievedProducts)
      return res.status(404).send({
        success: false,
        message: "product not found",
        data: {},
      });
    return res.status(200).send({
      success: true,
      message: "products found",
      data: { ...retrievedProducts },
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
        message: "invalid id",
        data: {},
      });
    let updatedProduct = await Product.updateOne(
      { id, deleted: false },
      { name, description, price, deleted }
    );
    if (!updatedProduct)
      res
        .status(500)
        .send({ success: false, message: "product not updated", data: {} });
    res.status(200).send({
      success: true,
      message: "product updated",
      data: { ...updatedProduct },
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

export { createProduct, getOneProductById, getAllProducts, updateProduct };
