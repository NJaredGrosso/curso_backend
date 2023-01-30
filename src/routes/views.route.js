import { Router } from "express";
import { ProductManager } from "../services/products.services.fs.js";
import { getProducts } from "../services/products.services.mongo.js";
import { createCart } from "../services/carts.services.mongo.js";

const router = Router();
const prm = new ProductManager();

let products = prm.products;

router.get("/", (req, res) => {
	res.render("home", {
		products,
	});
});

router.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts", {
		products,
	});
});

const productos = await getProducts();
const cart = await createCart();
const cartId = cart._id;

router.get("/products", (req, res) => {
	res.render("products", { productos, cartId });
});

export default router;
