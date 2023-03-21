import * as UserServices from "../services/userDAO/user.mongo.js";

export async function createUser(req, res) {
	try {
		const data = req.body;
		const response = await UserServices.createUser(data);
		if (response) {
			res.status(201).json({ user: response });
		} else {
			res.status(400).send("Usuario ya existente");
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
}

export async function getUser(req, res) {
	try {
		const { email } = req.params;
		const user = await UserServices.getUser(email);
		if (user) {
			delete user.password;
			res.json({ user });
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
}
