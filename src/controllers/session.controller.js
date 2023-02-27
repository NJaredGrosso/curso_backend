import { getUser } from "../services/user.services.js";

export async function showUser(req, res) {
	try {
	} catch (error) {
		res.status(400).send(error.message);
	}
}
