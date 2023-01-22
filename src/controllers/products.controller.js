import * as ProductsServices from "../services/products.services.js";
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
export async function getProduct(req, res) {}
export async function createProduct(req, res) {
	try {
		const { body } = req;
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
export async function updateProduct(req, res) {}
export async function deleteProduct(req, res) {}
