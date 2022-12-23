import fs from "fs";

import { ProductManager } from "./productManager.js";
const prm = new ProductManager();

export class CartsManager {
	constructor() {
		this.path = "../archivosMemoria/carrito.json";
		this.carts = [];
		if (fs.existsSync(this.path)) {
			this.carts = JSON.parse(fs.readFileSync(this.path));
		}
	}

	makeCart() {
		const cart = {
			id: this.#getNewId(),
			products: [],
		};
		this.carts.push(cart);
		this.#updateCartsFile();
		console.log("CARRITO CREADO");
	}

	getProductsOfCart(cid) {
		let carts = JSON.parse(fs.readFileSync(this.path));
		let cart = carts.find((cart) => cart.id === cid);

		let products = cart["products"];
		return products;
	}

	loadProductInCart(cid, pid) {
		let carts = JSON.parse(fs.readFileSync(this.path));
		let cart = carts.find((cart) => cart.id === cid);
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

	#getNewId() {
		let newId = 0;
		this.carts.map((carrito) => {
			if (carrito.id > newId) newId = carrito.id;
		});
		return newId + 1;
	}
}
