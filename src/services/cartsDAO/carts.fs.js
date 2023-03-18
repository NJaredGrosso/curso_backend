import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import cartsDTO from "./DTO.js";

import { ProductManager } from "../productsDAO/products.fs.js";
const prm = new ProductManager();

export class CartsManager {
	constructor() {
		this.path = "../archivosMemoria/carrito.json";
		this.carts = [];
		if (fs.existsSync(this.path)) {
			this.carts = JSON.parse(fs.readFileSync(this.path));
		}
	}

	async getCart(cid) {
		try {
			const carts = JSON.parse(fs.readFileSync(this.path));
			const cart = carts.find((cart) => cart.id === cid);
			const response = new cartsDTO(cart);
			return response;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createCart(data) {
		try {
			const cart = {
				id: uuidv4(),
				products: data.products,
			};
			this.carts.push(cart);
			this.#updateCartsFile();
			return cart;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async addProductToCart(cid, pid) {
		try {
			let cart = await this.getCart(cid);
			let products = cart["products"];

			let product = products.find((producto) => producto.product === pid);

			if (product["product"] === pid) {
				product["quantity"] = product["quantity"] + 1;
				console.log("PRODUCTO EXISTENTE, SE INCREMENTÓ LA CANTIDAD");
			} else {
				product = { product: pid, quantity: 1 };
				products.push(product);
				console.log("NUEVO PRODUCTO CARGADO");
			}
			cart["products"] = products;

			this.#deleteCart(cid);
			this.carts.push(cart);
			this.#updateCartsFile();
			return "Cantidad del producto incrementada";
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async addProductsToCart(cid, arr) {
		try {
			for (const pid of arr) {
				await addProductToCart(cid, pid);
			}
			return "productos agregados correctamente";
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateQuantityOfProduct(cid, pid, quantity) {
		try {
			if (quantity === 0) {
				await deleteProductToCart(cid, pid);
			} else {
				let cart = await this.getCart(cid);
				let prodToMdify = null;
				cart.products.forEach((product, index) => {
					if (product.id === pid) {
						prodToMdify = product;
					}
				});
				if (prodToMdify) {
					prodToMdify.quantity = quantity;
				}
				this.#deleteCart(cid);
				this.carts.push(cart);
				this.#updateCartsFile();
				return "Cantidad de producto cambiada";
			}
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async deleteProductToCart(cid, pid) {
		try {
			let cart = await this.getCart(cid);
			let products = cart["products"];

			let product = products.find((producto) => producto.product === pid);
			if (product["product"] === pid) {
				const newProducts = products.filter((producto) => producto != product);
				cart.products = newProducts;
				this.#deleteCart(cid);
				this.carts.push(cart);
				this.#updateCartsFile();
				return "Producto eliminado";
			} else {
				return "Ese carrito no contiene ese producto";
			}
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async deleteAllProductsToCart(cid) {
		try {
			let cart = await this.getCart(cid);
			cart.products = [];
			this.#deleteCart(cid);
			this.carts.push(cart);
			this.#updateCartsFile();
			return "Carrito vaciado";
		} catch (error) {
			throw new Error(error.message);
		}
	}

	#deleteCart(cid) {
		this.carts = this.carts.filter((carrito) => carrito.id != cid);
		this.#updateCartsFile();
	}

	#updateCartsFile() {
		if (fs.existsSync(this.path)) {
			fs.unlinkSync(this.path);
			fs.writeFileSync(this.path, JSON.stringify(this.carts));
		} else {
			fs.writeFileSync(this.path, JSON.stringify(this.carts));
		}
	}
}
