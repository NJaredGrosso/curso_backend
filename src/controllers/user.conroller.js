import factory from "../services/factory.js";

export async function createUser(req, res) {
	try {
		const data = req.body;
		const response = await factory.user.createUser(data);
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
		const user = await factory.user.getUser(email);
		if (user) {
			delete user.password;
			res.json({ user });
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
}
