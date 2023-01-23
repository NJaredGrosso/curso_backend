import { CartsModel } from "../models/carts.models.js";
import { getProduct } from "./products.services.mongo.js";

export async function getCart(cid) {
	try {
		const cart = await CartsModel.findById(cid);
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
		const product = await getProduct(pid);
		const carrito = await getCart(cid);
		const products = carrito.products;
		let exist = false;
		let quantity;
		for (const producto of products) {
			if (producto.code === product.code) {
				exist = true;
				quantity = producto.quantity + 1;
			}
		}
		const data = {
			title: product.title,
			price: product.price,
			quantity: 1,
			code: product.code,
		};
		if (exist) {
			const cart = await CartsModel.findOneAndUpdate(
				{ _id: cid, products: { $elemMatch: { code: product.code } } },
				{ $set: { "products.$.quantity": quantity } },
				{ new: true }
			);
			return cart;
		} else {
			const cart = await CartsModel.findByIdAndUpdate(
				cid,
				{ $push: { products: data } },
				{ new: true }
			);
			return cart;
		}
	} catch (error) {
		throw new Error(error.message);
	}
}
