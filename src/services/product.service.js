import ProductRepository from '../repositories/product.repository.js'
const productRepository = new ProductRepository()

class ProductService{
    async addProduct(productData){
        return await productRepository.addProduct(productData)
    }
    async getProductById(id){
        return await productRepository.getProductById(id)
    }
    async getProducts(options){
        return await productRepository.getProducts(options)
    }
    async updateProduct(id, productData){
        return await productRepository.updateProduct(id, productData)
    }
    async deleteProduct(id){
        return await productRepository.deleteProduct(id)
    }
}

export default ProductService