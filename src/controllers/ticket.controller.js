import factory from "../services/factory.js";
import { STATUS } from "../constants/constants.js";

export async function createTicket(req, res) {
	try {
		const { email, cart } = req.session.current;
		const carrito = await factory.carts.getCart(cart);
		const products = carrito.products;
		products.forEach((product) => {
			let sobrante;
			if (product.quantity > product._id.stock) {
				sobrante = product.quantity - product._id.stock;
				product.quantity = product._id.stock;
			} else {
				sobrante = 0;
			}
			factory.carts.updateQuantityOfProduct(cart, product._id._id, sobrante);
			factory.products.updateProduct(product._id, {
				stock: product._id.stock - product.quantity,
			});
		});
		const data = {
			products: products,
		};
		const newCart = await factory.carts.createCart(data);
		const response = await factory.tickets.createTicket(newCart._id, email);
		await factory.carts.deleteCart(newCart._id);
		const sobrantes = await factory.carts.getCart(cart);
		let cantPurchease = [];
		sobrantes.products.forEach((product) => {
			cantPurchease.push(product._id._id);
		});

		res.status(200).json({
			ticket: response,
			cantPurchase: cantPurchease,
			status: STATUS.SUCCES,
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
			status: STATUS.FAIL,
		});
	}
}
