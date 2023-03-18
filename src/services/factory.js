import config from "../config/config.js";
import { PERSISTENCIA } from "../constants/constants.js";

let factory;
switch (config.persistencia) {
	case PERSISTENCIA.MONGO:
		await import("../config/db.js");
		console.log("Persistencia en Mongo");
		const { default: cartsMongo } = await import("./cartsDAO/carts.mongo.js");
		const { default: productsMongo } = await import(
			"./productsDAO/products.mongo.js"
		);
		const { default: userMongo } = await import("./userDAO/user.mongo.js");
		const { default: messageMongo } = await import(
			"./messagesDAO/messages.mongo.js"
		);
		factory = {
			user: userMongo,
			carts: cartsMongo,
			products: productsMongo,
			message: messageMongo,
		};
		break;

	case PERSISTENCIA.FILE:
		console.log("Persistencia en FileSystem");
		const { default: cartsFile } = await import("./cartsDAO/carts.fs.js");
		const { default: productsFile } = await import(
			"./productsDAO/products.fs.js"
		);
		const { default: userFile } = await import("./userDAO/user.fs.js");
		const { default: messageFile } = await import(
			"./messagesDAO/messages.fs.js"
		);
		factory = {
			user: userFile,
			carts: cartsFile,
			products: productsFile,
			message: messageFile,
		};
		break;
}

export default factory;
