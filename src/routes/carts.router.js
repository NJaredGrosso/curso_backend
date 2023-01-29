import { Router } from "express";
const router = Router();
import * as CartsController from "../controllers/carts.controller.js";

//Usando MongoDB///////////////////////////////////////////////////////////////////////////////////////
router.post("/", CartsController.createCart);
router.get("/:cid", CartsController.getCart);
router.post("/:cid/product/:pid", CartsController.addProductToCart);
router.delete("/:cid/products/:pid");

//Usando File System //////////////////////////////////////////////////////////////////////////////////
import { CartsManager } from "../services/carts.services.fs.js";
const crm = new CartsManager();

router.post("/fs", (req, res) => {
	crm.makeCart();
});

router.get("/fs/:cid", (req, res) => {
	let cid = parseInt(req.params.cid);

	console.log(crm.getProductsOfCart(cid));
});

router.post("/fs/:cid/product/:pid", (req, res) => {
	let cid = parseInt(req.params.cid);
	let pid = parseInt(req.params.pid);

	crm.loadProductInCart(cid, pid);
});

export default router;
