//import * as CartsServices from "../services/cartsDAO/carts.fs.js"
import * as CartsServices from "../services/cartsDAO/carts.mongo.js";
import { STATUS } from "../constants/constants.js";

export async function getCart(req, res) {
	try {
		const { cid } = req.params;
		const response = await CartsServices.getCart(cid);
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
export async function createCart(req, res) {
	try {
		const body = {
			products: [],
		};
		const response = await CartsServices.createCart(body);
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
export async function addProductToCart(req, res) {
	try {
		const { cid, pid } = req.params;
		const response = await CartsServices.addProductToCart(cid, pid);
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

export async function addProductsToCart(req, res) {
	try {
		const { cid } = req.params;
		const { body } = req;
		const response = await CartsServices.addProductsToCart(cid, body);
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

export async function updateQuantityOfProduct(req, res) {
	try {
		const { cid, pid } = req.params;
		const { body } = req;
		const quantity = body.quantity;
		const response = await CartsServices.updateQuantityOfProduct(
			cid,
			pid,
			quantity
		);
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

export async function deleteProductToCart(req, res) {
	try {
		const { cid, pid } = req.params;
		const response = await CartsServices.deleteProductToCart(cid, pid);
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

export async function deleteAllProductsToCart(req, res) {
	try {
		const { cid } = req.params;
		const response = await CartsServices.deleteAllProductsToCart(cid);
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
