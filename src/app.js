import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import cookie from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";

//Imports Services
import { ProductManager } from "./services/productsDAO/products.fs.js";
import factory from "./services/factory.js";

//Imports Routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.route.js";
import messagesRouter from "./routes/messsages.router.js";
import UserRouter from "./routes/user.route.js";
import AuthRouter from "./routes/auth.router.js";
import passport from "passport";
import PassportLocalRouter from "./routes/passportLocal.router.js";
import GithubRouter from "./routes/github.router.js";

dotenv.config();
const app = express();
const prm = new ProductManager();

app.engine("handlebars", engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
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
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/passportLocal", PassportLocalRouter);
app.use("/api/github", GithubRouter);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
	console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));

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
	let cart;
	if (!cart) {
		cart = await factory.carts.createCart();
	}
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

	socket.on("addProduct", async (pid) => {
		const cid = cart._id;
		await factory.carts.addProductToCart(cid, pid);
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
