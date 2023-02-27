import { UserModel } from "../models/users.models.js";
import bcrypt from "bcrypt";

export async function createUser(data) {
	try {
		const userExist = await getUser(data.email);
		if (userExist) {
			throw new Error("El usuario ya existe");
		} else {
			data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
			const user = await UserModel.create(data);
			return user;
		}
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getUser(email) {
	try {
		const user = await UserModel.find({ email }).lean();
		return user[0];
	} catch (error) {
		throw new Error(error.message);
	}
}
