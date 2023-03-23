import ProductDTO, { ProductsDTO } from "./DTO.js";

export class ProductRepository {
	constructor(dao) {
		this.dao = dao;
	}

	async createProduct(data) {
		const product = await this.dao.createProduct(data);
		const productDTO = new ProductDTO(product);
		return productDTO;
	}

	async getProduct(pid) {
		const product = await this.dao.getProduct(pid);
		const productDTO = new ProductDTO(product);
		return productDTO;
	}

	async updateProduct(pid, data) {
		const product = await this.dao.updateProduct(pid, data);
		const productDTO = new ProductDTO(product);
		return productDTO;
	}

	async getProducts(limit, page, sort, query) {
		const products = await this.dao.getProducts(limit, page, sort, query);
		const productsDTO = new ProductsDTO(products);
		return productsDTO;
	}
}
