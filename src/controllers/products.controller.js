import * as ProductsServices from "../services/products.services.mongo.js";
import { STATUS } from "../constants/constants.js";

export async function getProducts(req, res) {
	try {
		const response = await ProductsServices.getProducts();
		res.json({
			user: response,
			status: STATUS.SUCCES,
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
			status: STATUS.FAIL,
		});
	}
}
export async function getProduct(req, res) {
	try {
		const { pid } = req.params;
		const response = await ProductsServices.getProduct(pid);
		res.status(200).json({
			user: response,
			status: STATUS.SUCCES,
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
			status: STATUS.FAIL,
		});
	}
}
export async function createProduct(req, res) {
	try {
		const body = req.body;
		const response = await ProductsServices.createProduct(body);
		res.status(201).json({
			user: response,
			status: STATUS.SUCCES,
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
			status: STATUS.FAIL,
		});
	}
}
export async function updateProduct(req, res) {
	try {
		const { pid } = req.params;
		const { body } = req;
		const response = await ProductsServices.updateProduct(pid, body);
		res.status(200).json({
			user: response,
			status: STATUS.SUCCES,
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
			status: STATUS.FAIL,
		});
	}
}
export async function deleteProduct(req, res) {
	try {
		const { pid } = req.params;
		await ProductsServices.deleteProduct(pid);
		res.status(200).json({
			message: "Usuario borrado correctamente",
			status: STATUS.SUCCES,
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
			status: STATUS.FAIL,
		});
	}
}
