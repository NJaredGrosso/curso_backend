import { Router } from "express";
const router = Router();
import { ProductManager } from "../productManager.js";
const prm = new ProductManager();

router.get("/", (req, res) => {
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

router.get("/:pid", (req, res) => {
	let product = prm.getProductById(parseInt(req.params.pid));

	if (product != undefined) {
		return res.send(product);
	} else {
		return res.send("ERROR 404 \n Product not found");
	}
});

router.post("/", (req, res) => {
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

router.put("/:pid", (req, res) => {
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

router.delete("/:pid", (req, res) => {
	let pid = parseInt(req.params.pid);

	prm.deleteProduct(pid);
	console.log("PRODUCTO ELIMINADO");
});

export default router;
