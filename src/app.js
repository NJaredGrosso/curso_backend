import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import cookie from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import compression from "express-compression";
import errorHandler from "./middleware/errorHandler.js";
import CustomError from "./utils/customErrors.js";

dotenv.config();
const app = express();

//Imports Services
import { ProductManager } from "./services/productsDAO/products.fs.js";
const prm = new ProductManager();
import factory from "./services/factory.js";

app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(
	compression({
		brotli: { enabled: true, zlib: {} },
	})
);
app.use(
	session({
		store: new mongoStore({
			mongoUrl: process.env.MONGO_UR,
			options: {
				userNewUrlParser: true,
				useUnifiedTopology: true,
			},
		}),
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {},
	})
);

import passport from "passport";
app.use(passport.initialize());
app.use(passport.session());

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
	console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));

//Routes
import viewsRouter from "./routes/views.route.js";
app.use("/", viewsRouter);

import sessionRouter from "./routes/sessions.router.js";
app.use("/current", sessionRouter);

import productsRouter from "./routes/products.router.js";
app.use("/api/products", productsRouter);

import cartsRouter from "./routes/carts.router.js";
app.use("/api/carts", cartsRouter);

import messagesRouter from "./routes/messsages.router.js";
app.use("/api/messages", messagesRouter);

import UserRouter from "./routes/user.route.js";
app.use("/api/users", UserRouter);

import AuthRouter from "./routes/auth.router.js";
app.use("/api/auth", AuthRouter);

import PassportLocalRouter from "./routes/passportLocal.router.js";
app.use("/api/passportLocal", PassportLocalRouter);

import GithubRouter from "./routes/github.router.js";
app.use("/api/github", GithubRouter);

import MockingRouter from "./routes/mocking.router.js";
app.use("/mockingproducts", MockingRouter);

const socketServer = new Server(server);

let products;
let messages = await factory.message.getMessages();

socketServer.use((socket, next) => {
	const { handshake } = socket;
	const { session } = handshake;

	socket.session = session;
	next();
});

socketServer.on("connection", async (socket) => {
	console.log("Nueva conexión");
	products = prm.products;
	socket.emit("open", products);
	socket.emit("message", messages);

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

	socket.on("disconnect", () => {
		console.log("Cliente desconectado");
	});

	socket.on("newUser", (nombre) => {
		socket.broadcast.emit("newUser", nombre);
	});

	socket.on("message", (data) => {
		factory.message.createMessage(data);
		messages.push(data);
		socketServer.emit("message", messages);
	});

	socket.on("login", async (data) => {
		const email = data.email;
		const password = data.password;
		const login = await AuthServices.login(email, password);
		if (login) {
			console.log("inicio correcto");
			socket.emit("redirect");
		} else {
			socket.emit("datosIncorrectos");
		}
	});

	socket.on("register", async (data) => {
		const user = await factory.user.createUser(data);
		if (user) {
			socket.emit("RegCorrecto");
		} else {
			socket.emit("ErrorDeRegistro");
		}
	});
});
