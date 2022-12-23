const socket = io();

let upProd = document.getElementById("uploadProduct");

let title = document.getElementById("title");
let description = document.getElementById("description");
let code = document.getElementById("code");
let price = document.getElementById("price");
let status = document.getElementById("status");
let stock = document.getElementById("stock");
let category = document.getElementById("category");
let thumbnails = document.getElementById("thumbnails");

let del = document.getElementById("delete");
let delId = document.getElementById("delId");

let productos = document.getElementById("productos");

socket.on("open", (products) => {
	let _newProducts = "";
	for (const product of products) {
		_newProducts += `${product.title} $${product.price} \n ${product.description} \n\n`;
	}
	productos.innerText = _newProducts;
});

upProd.addEventListener("click", (e) => {
	e.preventDefault();
	console.log("Producto cargado");

	const _title = title.value.trim();
	const _description = description.value.trim();
	const _code = code.value.trim();
	const _price = parseInt(price.value);
	const _status = status.value.trim() === "true";
	const _stock = parseInt(stock.value);
	const _category = category.value.trim();
	const _thumbnails = thumbnails.value.trim();

	socket.emit("newProduct", {
		_title,
		_description,
		_code,
		_price,
		_status,
		_stock,
		_category,
		_thumbnails,
	});
});

del.addEventListener("click", (a) => {
	a.preventDefault();
	console.log("producto eliminado");
	const _delId = parseInt(delId.value);
	socket.emit("deleteProduct", _delId);
});

socket.on("getProducts", (products) => {
	let _newProducts = "";
	for (const product of products) {
		_newProducts += `${product.title} $${product.price} \n ${product.description} \n\n`;
	}
	productos.innerText = _newProducts;
});
