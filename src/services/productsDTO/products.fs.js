import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export class ProductManager {
	constructor() {
		this.path = "archivosMemoria/products.json";
		this.products = [];
		if (fs.existsSync(this.path)) {
			this.products = JSON.parse(fs.readFileSync(this.path));
		}
	}

	async createProduct(data) {
		try {
			const producto = {
				//Asignamos los values a las keys
				id: uuidv4(),
				title: data.title,
				description: data.description,
				code: data.code,
				price: data.price,
				status: data.status,
				stock: data.stock,
				category: data.category,
				thumbnails: data.thumbnails,
			};

			let valores = Object.values(producto);
			if (!valores.includes(undefined)) {
				//Y que tampoco se repita el code
				let codes = this.products.map((producto) => {
					return producto.code;
				});
				if (!codes.includes(producto.code)) {
					this.products.push(producto);
					this.#updateProductsFile();
					return producto;
				} else throw new Error("Codigo de producto ya utilizado"); //Notificamos si el code ya esta en uso
			} else throw new Error("falta un valor, no se cargara el producto"); //Notificamos si faltan values
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getProducts() {
		try {
			let productos = JSON.parse(fs.readFileSync(this.path));
			return productos;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getProduct(pid) {
		let productos = await this.getProducts();
		let product = productos.find((producto) => producto.id === pid);
		return product;
	}

	updateProduct(pid, key, newValue) {
		let producto = this.products.find((producto) => producto.id === pid); //Ubicamos el producto filtrando por id
		producto[key] = newValue; //cambiamos el value solicitado
		this.deleteProduct(pid); //reemplazamos el producto viejo por el actualizado
		this.products.push(producto);
		this.#updateProductsFile(); //Actualizamos los archivos de memoria
		console.log("Valor Actualizado"); //Confirmamos por consola
	}

	async deleteProduct(pid) {
		try {
			this.products = this.products.filter(
				//Filtramos la lista quitando el objeto que contiene el Id que se solisito eliminar
				(producto) => producto.id != pid
			);
			this.#updateProductsFile(); //Actualizamos los archivos de memoria //Confirmamos por consola
		} catch (error) {
			throw new Error(error.message);
		}
	}

	#updateProductsFile() {
		if (fs.existsSync(this.path)) {
			fs.unlinkSync(this.path);
			fs.writeFileSync(this.path, JSON.stringify(this.products));
		} else {
			fs.writeFileSync(this.path, JSON.stringify(this.products));
		}
	}
}
