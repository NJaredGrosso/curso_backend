import { CartsModel } from "../../models/carts.models.js";

class cartsService {
	async getCart(cid) {
		try {
			const cart = await CartsModel.findById(cid)
				.populate("products._id")
				.lean();
			return cart;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createCart(data) {
		try {
			const cart = await CartsModel.create(data);
			return cart;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async deleteCart(cid) {
		try {
			await CartsModel.deleteOne({ _id: cid });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async addProductToCart(cid, pid) {
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

	async addProductsToCart(cid, arr) {
		try {
			for (const pid of arr) {
				await this.addProductToCart(cid, pid);
			}
			return "productos agregados correctamente";
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateQuantityOfProduct(cid, pid, quantity) {
		try {
			if (quantity === 0) {
				await this.deleteProductToCart(cid, pid);
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

	async deleteProductToCart(cid, pid) {
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

	async deleteAllProductsToCart(cid) {
		try {
			await CartsModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
			return "Carrito vaciado";
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
export default new cartsService();
