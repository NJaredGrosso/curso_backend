import * as CartsServices from "../services/carts.services.mongo.js";
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
		const { cid } = req.params;
		const { pid } = req.params;
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
