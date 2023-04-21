import { UserModel } from "../../models/users.models.js";
import bcrypt from "bcrypt";

class userService {
	async getUser(email) {
		try {
			const user = await UserModel.find({ email }).lean();
			return user[0];
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createUser(data) {
		try {
			const userExist = await this.getUser(data.email);
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

	async updateUser(email, data) {
		try {
			if (data.password) {
				data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
			}
			const updatedUser = await UserModel.findOneAndUpdate({ email }, data, {
				new: true,
			});
			return updatedUser;
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
export default new userService();
