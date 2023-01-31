const socket = io();
let addToCartButton = document.getElementById(addToCartButton);

let newUser = true;
let cart;
let cartId;

addToCartButton.addEventListener("click", (e) => {
	e.preventDefault();

	const parent = e.parent.parentNode;
	const parentId = parent.id;
	socket.emit("addProduct", parentId);
});
