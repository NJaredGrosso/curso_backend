import { Router } from "express";
import { ProductManager } from "../services/productsDAO/products.fs.js";
import { getProducts } from "../services/productsDAO/products.mongo.js";
import { getCart } from "../services/cartsDAO/carts.mongo.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();
const prm = new ProductManager();

let products = prm.products;

router.get("/", (req, res) => {
	res.render("regAndLogin");
});

router.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts", {
		products,
	});
});

router.get("/products", auth, async (req, res) => {
	let limit = req.query.limit || 10;
	let page = Number(req.query.page) || 1;
	let sort = req.query.sort;
	let query = req.query.query;
	const respuesta = await getProducts(limit, page, sort, query);
	const productos = respuesta.payload;
	res.render("products", { productos });
});

router.get("/carts/:cid", auth, async (req, res) => {
	const { cid } = req.params;
	const cart = await getCart(cid);
	const products = cart.products;
	res.render("cart", { products });
});

export default router;
