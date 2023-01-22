import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { ProductManager } from "./productManager.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.route.js";

dotenv.config();
const app = express();
const prm = new ProductManager();

app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
	console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));

const socketServer = new Server(server);

let products;

socketServer.on("connection", (socket) => {
	console.log("Nueva conexión");
	products = prm.products;
	socket.emit("open", products);

	socket.on("newProduct", (data) => {
		prm.addProduct(
			data._title,
			data._description,
			data._code,
			data._price,
			data._status,
			data._stock,
			data._category,
			data._thumbnails
		);
		products = prm.products;
		socket.emit("getProducts", products);
	});

	socket.on("deleteProduct", (delId) => {
		prm.deleteProduct(delId);
		products = prm.products;
		socket.emit("getProducts", products);
	});
});
