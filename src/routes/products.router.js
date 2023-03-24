import express from "express";
import * as ProductsController from "../controllers/products.controller.js";
import { adminAuth } from "../middleware/auth.middleware.js";

const route = express.Router();

//Usando MongoDB//////////////////////////////////////////////////////////////////////////////////////////////////////////////
route.get("/", ProductsController.getProducts);
route.get("/:pid", ProductsController.getProduct);
route.post("/", adminAuth, ProductsController.createProduct);
route.put("/:pid", adminAuth, ProductsController.updateProduct);
route.delete("/:pid", adminAuth, ProductsController.deleteProduct);

//Usando File System//////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ProductManager } from "../services/productsDAO/products.fs.js";
const prm = new ProductManager();

route.get("/fs", (req, res) => {
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

route.get("/fs/:pid", (req, res) => {
	let product = prm.getProductById(parseInt(req.params.pid));

	if (product != undefined) {
		return res.send(product);
	} else {
		return res.send("ERROR 404 \n Product not found");
	}
});

route.post("/fs", (req, res) => {
	//obtenemos el objeto
	let newProduct = req.body;

	//buscamos cada valor y lo asignamos a su variable
	let title = newProduct["title"];
	let description = newProduct["description"];
	let code = newProduct["code"];
	let price = newProduct["price"];
	let status = newProduct["status"];
	let stock = newProduct["stock"];
	let category = newProduct["category"];
	let thumbnails = newProduct["thumbnails"] || "";

	//Para despues cargarlo con la función
	prm.addProduct(
		title,
		description,
		code,
		price,
		status,
		stock,
		category,
		thumbnails
	);
});

route.put("/fs/:pid", (req, res) => {
	//obtenemos los req
	let object = req.body;
	let pid = parseInt(req.params.pid);

	//leemos que valores se quieren modificar
	let keys = Object.keys(object);

	//Los actualizamos
	keys.forEach((key) => {
		prm.updateProduct(pid, key, object[key]);
	});

	console.log("VALORES ACTUALIZADOS CORRECTAMENTE"); //Confirmamos por consola
});

route.delete("/fs/:pid", (req, res) => {
	let pid = parseInt(req.params.pid);
	prm.deleteProduct(pid);
	console.log("PRODUCTO ELIMINADO");
	return res.send(pid + " Borrado correctamente");
});

export default route;
