import { MessagesModel } from "../../models/messages.models.js";

export async function getMessages() {
	try {
		const messages = await MessagesModel.find();
		return messages;
	} catch (error) {
		throw new Error(error.message);
	}
}
export async function createMessage(data) {
	try {
		const message = await MessagesModel.create(data);
		return message;
	} catch (error) {
		throw new Error(error.message);
	}
}
