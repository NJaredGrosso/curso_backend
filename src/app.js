import express from "express";
const app = express();

import { ProductManager } from "./productManager.js";
const prm = new ProductManager();

app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {
	let limit = req.query.limit;
	let products = prm.getProducts();

	if (limit > -1) {
		let productsLimited = [];
		for (let cuenta = 0; cuenta < limit; cuenta++) {
			productsLimited.push(prm.products[cuenta]);
		}
		return res.send(productsLimited);
	} else {
		return res.send(products);
	}
});

app.get("/products/:pid", (req, res) => {
	let product = prm.getProductById(parseInt(req.params.pid));

	if (product != undefined) {
		return res.send(product);
	} else {
		return res.send("ERROR 404 \n Product not found");
	}
});

app.listen(8080, () => console.log("¡Servidor arriba en puerto 8080!"));
