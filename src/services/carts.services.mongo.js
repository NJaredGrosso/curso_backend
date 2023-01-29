import { CartsModel } from "../models/carts.models.js";

export async function getCart(cid) {
	try {
		const cart = await CartsModel.findById(cid).populate("products.producto");
		return cart;
	} catch (error) {
		throw new Error(error.message);
	}
}
export async function createCart(data) {
	try {
		const cart = await CartsModel.create(data);
		return cart;
	} catch (error) {
		throw new Error(error.message);
	}
}
export async function addProductToCart(cid, pid) {
	try {
		const cart = await CartsModel.findById(cid);
		const products = cart.products;
		let exist = false;
		let quantity = 1;
		for (let product of products) {
			const productId = product.producto;
			if (productId === pid) {
				exist = true;
				quantity = product.quantity + 1;
			}
		}
		if (exist) {
			await CartsModel.findOneAndUpdate(
				{ _id: cid, products: { $elemMatch: { producto: pid } } },
				{ $set: { "products.$.quantity": quantity } },
				{ new: true }
			);
			return "Cantidad incrementada";
		} else {
			cart.products.push({ producto: pid, quantity: quantity });
			cart.save();
			return "Producto agregado";
		}
	} catch (error) {
		throw new Error(error.message);
	}
}
