import { Router } from "express";
const router = Router();
import * as CartsController from "../controllers/carts.controller.js";
import * as TicketController from "../controllers/ticket.controller.js";
import { userAuth } from "../middleware/auth.middleware.js";

//Usando MongoDB///////////////////////////////////////////////////////////////////////////////////////
router.get("/:cid", CartsController.getCart);
router.get("/:cid/purchease", TicketController.createTicket);
router.post("/", CartsController.createCart);
router.post("/:cid/products/:pid", userAuth, CartsController.addProductToCart);
router.put("/:cid", userAuth, CartsController.addProductsToCart);
router.put(
	"/:cid/products/:pid",
	userAuth,
	CartsController.updateQuantityOfProduct
);
router.delete("/:cid/products/:pid", CartsController.deleteProductToCart);
router.delete("/:cid", CartsController.deleteAllProductsToCart);

//Usando File System //////////////////////////////////////////////////////////////////////////////////
import { CartsManager } from "../services/cartsDAO/carts.fs.js";
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
