import factory from "../services/factory.js";
import { STATUS } from "../constants/constants.js";

export async function getCart(req, res) {
	try {
		const { cid } = req.params;
		const response = await factory.carts.getCart(cid);
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
		const response = await factory.carts.createCart(body);
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
		const response = await factory.carts.addProductToCart(cid, pid);
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
		const response = await factory.carts.addProductsToCart(cid, body);
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
		const response = await factory.carts.updateQuantityOfProduct(
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
		const response = await factory.carts.deleteProductToCart(cid, pid);
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
		const response = await factory.carts.deleteAllProductsToCart(cid);
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
