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
import loggerMiddleware from "./middleware/logger.middleware.js";
import { createTransport } from "nodemailer";
import pkg from "jsonwebtoken";
const Jwt = pkg;

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

app.use(loggerMiddleware);

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

import logger from "./utils/logger.js";
app.get("/loggerTest", (req, res) => {
	logger.debug("Logger debug test");
	logger.http("Logger http test");
	logger.info("Logger info test");
	logger.warning("Logger warnign test");
	logger.error("Logger error test");
	logger.fatal("Logger fatal test");
});

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
	logger.debug("Nueva conexión");
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
		logger.debug("Cliente desconectado");
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
			logger.debug("inicio correcto");
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

	//Password Recovery

	socket.on("recPass", async (mail) => {
		const token = Jwt.sign(
			{ email: process.env.USER_GMAIL },
			process.env.SECRET,
			{ expiresIn: "1h" }
		);

		const recoveryLink = `http://localhost:4000/recovery/?token=${token}`;

		const mailOptions = {
			from: process.env.USER_GMAIL,
			to: mail,
			html: `<h1>Recuperación de contraseña</h1> <p>Haz solicitado un cambio de contraseña, pulsa el boton para continuar</p> <button><a href='${recoveryLink}' > Recuperar contraseña</a></button>`,
			subject: "Cambio de contraseña",
		};
		const transportGmail = createTransport({
			service: "gmail",
			port: 587,
			auth: {
				user: process.env.USER_GMAIL,
				pass: process.env.PASS_GMAIL,
			},
		});
		async function sendEmail() {
			try {
				const response = await transportGmail.sendMail(mailOptions);
				logger.debug(response);
				logger.info(token);
			} catch (error) {
				throw new Error(error.message);
			}
		}
		sendEmail();
	});

	socket.on("newPass", async (data) => {
		const email = data.email;
		const newPass = data.newPass;
		const update = {
			password: newPass,
		};
		factory.user.updateUser(email, update);
	});
});
