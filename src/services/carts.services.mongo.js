import { CartsModel } from "../models/carts.models.js";

export async function getCart(cid) {
	try {
		const cart = await CartsModel.findById(cid).populate("products._id");
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

		for (let product of products) {
			if (product._id.toString() === pid) {
				product.quantity++;
				cart.save();
				return "Cantidad del producto incrementada";
			}
		}
		const product = {
			_id: pid,
			quantity: 1,
		};
		cart.products.push(product);
		cart.save();
		return "Producto agregado";
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function addProductsToCart(cid, arr) {
	try {
		for (const pid of arr) {
			await addProductToCart(cid, pid);
		}
		return "productos agregados correctamente";
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function updateQuantityOfProduct(cid, pid, quantity) {
	try {
		if (quantity === 0) {
			await deleteProductToCart(cid, pid);
		} else {
			await CartsModel.findByIdAndUpdate(
				cid,
				{ $set: { "products.$[element].quantity": quantity } },
				{ arrayFilters: [{ "element._id": pid }], new: true }
			);
			return "Cantidad de producto cambiada";
		}
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function deleteProductToCart(cid, pid) {
	try {
		await CartsModel.findByIdAndUpdate(
			cid,
			{ $pull: { products: { _id: pid } } },
			{ new: true }
		);
		return "Producto eliminado";
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function deleteAllProductsToCart(cid) {
	try {
		await CartsModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
		return "Carrito vaciado";
	} catch (error) {
		throw new Error(error.message);
	}
}
