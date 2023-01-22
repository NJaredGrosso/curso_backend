import { Router } from "express";
const router = Router();

import { CartsManager } from "../services/carts.services.fs.js";
const crm = new CartsManager();

router.post("/", (req, res) => {
	crm.makeCart();
});

router.get("/:cid", (req, res) => {
	let cid = parseInt(req.params.cid);

	console.log(crm.getProductsOfCart(cid));
});

router.post("/:cid/product/:pid", (req, res) => {
	let cid = parseInt(req.params.cid);
	let pid = parseInt(req.params.pid);

	crm.loadProductInCart(cid, pid);
});

export default router;
