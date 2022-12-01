const fs = require("fs");

class ProductManager {
	constructor() {
		this.path = "./archivosMemoria/products.json";
		this.products = [];
		if (fs.existsSync(this.path)) {
			this.products = JSON.parse(fs.readFileSync(this.path));
		}
	}

	addProduct(title, description, price, thumbnail, code, stock) {
		const producto = {
			//Asignamos los values a las keys
			id: this.#getNewId(),
			title: title,
			description: description,
			price: price,
			thumbnail: thumbnail,
			code: code,
			stock: stock,
		};

		let valores = Object.values(producto);
		if (!valores.includes(undefined)) {
			//Y que tampoco se repita el code
			let codes = this.products.map((producto) => {
				return producto.code;
			});
			if (!codes.includes(code)) {
				this.products.push(producto);
				console.log("Producto cargado"); //Si todo esta bien se carga el producto
				this.#updateProductsFile();
			} else console.error("Codigo ya utilizado, pruebe otro"); //Notificamos si el code ya esta en uso
		} else console.error("falta un valor, no se cargara el producto"); //Notificamos si faltan values
	}

	#getNewId() {
		let newId = 0;
		this.products.map((producto) => {
			if (producto.id > newId) newId = producto.id;
		});
		return newId + 1;
	}
	#updateProductsFile() {
		if (fs.existsSync(this.path)) {
			fs.unlinkSync(this.path);
			fs.writeFileSync(this.path, JSON.stringify(this.products));
		} else {
			fs.writeFileSync(this.path, JSON.stringify(this.products));
		}
	}

	getProducts() {
		console.log("Todos los productos:");
		for (const producto of this.products) {
			console.log(producto);
		}
	}

	getProductById(productId) {
		console.log(
			"Este es el producto que buscas:",
			this.products.find((producto) => producto.id === productId)
		);
	}

	updateProduct(productId, key, newValue) {
		let producto = this.products.find((producto) => producto.id === productId); //Ubicamos el producto filtrando por id
		producto[key] = newValue; //cambiamos el value solicitado
		this.deleteProduct(productId); //reemplazamos el producto viejo por el actualizado
		this.products.push(producto);
		this.#updateProductsFile(); //Actualizamos los archivos de memoria
		console.log("Producto Actualizado"); //Confirmamos por consola
	}

	deleteProduct(productId) {
		this.products = this.products.filter(
			//Filtramos la lista quitando el objeto que contiene el Id que se solisito eliminar
			(producto) => producto.id != productId
		);
		this.#updateProductsFile(); //Actualizamos los archivos de memoria
		console.log("Producto eliminado"); //Confirmamos por consola
	}
}

const productManager = new ProductManager();

//Proceso de Testing-----------------------------------------------------------------------------------------------------------------

productManager.getProducts();

productManager.addProduct(
	"producto prueba",
	"Este es un producto prueba",
	200,
	"Sin Imagen",
	"abc123",
	25
);

productManager.getProducts();

productManager.updateProduct(1, "price", 400);

productManager.getProductById(1)

productManager.deleteProduct(1);

productManager.getProducts();
