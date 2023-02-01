import { Router } from "express";
import { ProductManager } from "../services/products.services.fs.js";
import { createCart } from "../services/carts.services.mongo.js";
import { ProductsModel } from "../models/products.models.js";

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

const cart = await createCart();
const cartId = cart._id;
const productos = await ProductsModel.find();

router.get("/products", (req, res) => {
	console.log(typeof productos);
	res.render("products", { productos: productos });
});

export default router;
