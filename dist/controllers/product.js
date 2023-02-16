"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.getAllProducts = exports.getOneProductById = exports.createProduct = void 0;
const mongoose_1 = require("mongoose");
//import Product from "../interfaces/product";
const product_1 = __importDefault(require("../models/product"));
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, description, price } = req.body;
        let createdProduct = yield new product_1.default({ name, description, price }).save();
        console.log({ createdProduct });
        console.log({ jso: JSON.stringify(createdProduct) });
        if (!createdProduct)
            res
                .status(500)
                .send({ success: false, message: "product not created", data: {} });
        res.status(200).send({
            success: true,
            message: "product created",
            data: Object.assign({}, createdProduct),
        });
    }
    catch (err) {
        console.log({ err });
        return res.status(500).send({
            success: false,
            message: "something went wrong",
            data: {},
        });
    }
});
exports.createProduct = createProduct;
const getOneProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.query;
        if (!(0, mongoose_1.isValidObjectId)(id))
            return res.status(400).send({
                success: false,
                message: "invalid id",
                data: {},
            });
        let retrievedProduct = yield product_1.default.findById({ id, deleted: false });
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
            data: Object.assign({}, retrievedProduct),
        });
    }
    catch (err) {
        console.log({ err });
        return res.status(500).send({
            success: false,
            message: "something went wrong",
            data: {},
        });
    }
});
exports.getOneProductById = getOneProductById;
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.query;
    try {
        if (!(0, mongoose_1.isValidObjectId)(id))
            return res.status(400).send({
                success: false,
                message: "invalid id",
                data: {},
            });
        let retrievedProducts = id
            ? yield product_1.default.findById({ id, deleted: false })
            : yield product_1.default.find({ deleted: false });
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
            data: Object.assign({}, retrievedProducts),
        });
    }
    catch (err) {
        console.log({ err });
        return res.status(500).send({
            success: false,
            message: "something went wrong",
            data: {},
        });
    }
});
exports.getAllProducts = getAllProducts;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, description, price, deleted } = req.body;
    let { id } = req.params;
    try {
        if (!(0, mongoose_1.isValidObjectId)(id))
            return res.status(400).send({
                success: false,
                message: "invalid id",
                data: {},
            });
        let updatedProduct = yield product_1.default.updateOne({ id, deleted: false }, { name, description, price, deleted });
        if (!updatedProduct)
            res
                .status(500)
                .send({ success: false, message: "product not updated", data: {} });
        res.status(200).send({
            success: true,
            message: "product updated",
            data: Object.assign({}, updatedProduct),
        });
    }
    catch (err) {
        console.log({ err });
        return res.status(500).send({
            success: false,
            message: "something went wrong",
            data: {},
        });
    }
});
exports.updateProduct = updateProduct;
//# sourceMappingURL=product.js.map