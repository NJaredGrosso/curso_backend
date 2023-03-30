import { STATUS } from "../constants/constants.js";
import generateProduct from "../utils/faker.js";

export async function get100Products(req, res) {
	try {
		let products = [];
		for (let i = 0; i <= 100; i++) {
			let product = generateProduct();
			products.push(product);
		}
		res.json({
			products: products,
			status: STATUS.SUCCES,
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
			status: STATUS.FAIL,
		});
	}
}
