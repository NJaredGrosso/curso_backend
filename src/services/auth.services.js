import * as UserServices from "./user.services.js";

export async function login(email, password) {
	try {
		const user = await UserServices.getUser(email);
		if (!user) {
			return false;
		} else {
			if (password === user.password) {
				return true;
			} else {
				return false;
			}
		}
	} catch (error) {
		throw new Error(error.message);
	}
}
