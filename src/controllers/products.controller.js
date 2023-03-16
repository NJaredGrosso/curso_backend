//import * as ProductsServices from "../services/productsDTO/products.fs.js";
import * as ProductsServices from "../services/productsDTO/products.mongo.js";
import { STATUS } from "../constants/constants.js";

export async function getProducts(req, res) {
	try {
		let limit = req.query.limit || 10;
		let page = Number(req.query.page) || 1;
		let sort = req.query.sort;
		let query = req.query.query;

		const response = await ProductsServices.getProducts(
			limit,
			page,
			sort,
			query
		);
		res.json({
			query,
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
