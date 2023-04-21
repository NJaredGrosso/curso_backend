import { Router } from "express";
import dotenv from "dotenv";
import { ProductManager } from "../services/productsDAO/products.fs.js";
import productsService from "../services/productsDAO/products.mongo.js";
import cartServices from "../services/cartsDAO/carts.mongo.js";
import { userAuth } from "../middleware/auth.middleware.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";

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

router.get("/products", userAuth, async (req, res) => {
	let limit = req.query.limit || 10;
	let page = Number(req.query.page) || 1;
	let sort = req.query.sort;
	let query = req.query.query;
	const respuesta = await productsService.getProducts(limit, page, sort, query);
	const productos = respuesta.payload;
	res.render("products", { productos });
});

router.get("/carts/:cid", userAuth, async (req, res) => {
	const { cid } = req.params;
	const cart = await cartServices.getCart(cid);
	const products = cart.products;
	res.render("cart", { products });
});

function checkToken(token, secret) {
	try {
		const decoded = jwt.verify(token, secret);
		const now = Math.floor(Date.now() / 1000);
		if (decoded.exp < now) {
			//El token expiró
			return false;
		} else {
			//El token no ha expirado
			return decoded;
		}
	} catch (error) {
		return false;
	}
}

router.get("/recovery", async (req, res) => {
	const { token } = req.query || false;
	const secret = process.env.SECRET;
	const expired = checkToken(token, secret);
	if (expired) {
		const email = expired.email;
		res.render("changePass", { email });
	} else {
		res.render("recoveryFail", {});
	}
});

export default router;
