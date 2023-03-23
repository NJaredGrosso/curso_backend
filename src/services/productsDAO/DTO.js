export default class ProductDTO {
	constructor(product) {
		this.id = product._id || product.id;
		this.title = product.title;
		this.description = product.description;
		this.code = product.code;
		this.price = product.price;
		this.status = product.status;
		this.stock = product.stock;
		this.category = product.category;
		this.thumbnails = product.thumbnails;
	}
}

export class ProductsDTO {
	constructor(respuesta) {
		this.status = respuesta.status;
		this.payload = respuesta.payload;
		this.totalPages = respuesta.totalPages;
		this.prevPage = respuesta.prevPage;
		this.nextPage = respuesta.nextPage;
		this.hasPrevPage = respuesta.hasPrevPage;
		this.hasNextPage = respuesta.hasNextPage;
	}
}
