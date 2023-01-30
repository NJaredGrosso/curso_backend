import {
	createCart,
	addProductToCart,
} from "../../services/carts.services.mongo.js";

let addToCartButton = socument.getElementById("addToCartButton");

let newUser = true;
let cart;
let cartId;

addToCartButton.addEventListener("click", (e) => {
	e.preventDefault();
	if (newUser) {
		cart = createCart();
		cartId = cart._id;
		newUser = false;
	} else {
		cartId = cart._id;
	}
	const parent = event.parent.parentNode;
	const parentId = parent.id;
	addProductToCart(cartId, parentId);
});
