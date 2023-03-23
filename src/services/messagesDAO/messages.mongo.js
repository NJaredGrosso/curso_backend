import { MessagesModel } from "../../models/messages.models.js";

class messagesService {
	async getMessages() {
		try {
			const messages = await MessagesModel.find();
			return messages;
		} catch (error) {
			throw new Error(error.message);
		}
	}
	async createMessage(data) {
		try {
			const message = await MessagesModel.create(data);
			return message;
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
export default new messagesService();
