import { Router } from "express";
const router = Router();
import * as CartsController from "../controllers/carts.controller.js";

//Usando MongoDB///////////////////////////////////////////////////////////////////////////////////////
router.get("/:cid", CartsController.getCart);
router.post("/", CartsController.createCart);
router.post("/:cid/products/:pid", CartsController.addProductToCart);
router.put("/:cid", CartsController.addProductsToCart);
router.put("/:cid/products/:pid", CartsController.updateQuantityOfProduct);
router.delete("/:cid/products/:pid", CartsController.deleteProductToCart);
router.delete("/:cid", CartsController.deleteAllProductsToCart);

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
