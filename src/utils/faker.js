import { faker } from "@faker-js/faker";

function generateProduct() {
	return {
		id: faker.database.mongodbObjectId(),
		title: faker.commerce.product(),
		description: faker.commerce.productDescription(),
		code: faker.random.alphaNumeric(6),
		price: faker.commerce.price(),
		status: faker.datatype.boolean(),
		stock: faker.random.numeric(2),
		category: faker.commerce.productAdjective(),
		thumbnails: faker.image.image(),
	};
}

export default generateProduct;
