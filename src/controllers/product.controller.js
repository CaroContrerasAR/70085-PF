import ProductService from '../services/product.service.js'
const productService = new ProductService()

class ProductController{
    async getProducts(req,res){
        const {limit = 10, page = 1, sort = 1, query} = req.query
        try {
            const products = await productService.getProducts({limit, page, sort, query})
            res.status(200).json(products)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
    async getProductById(req, res){
        const id = req.params.pid
        try {
            const productById = await productService.getProductById(id)
            if(!productById) return res.status(404).send('Product not found')
            res.status(200).json(productById)            
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
    async addProduct(req, res){
        try {
            const product = await productService.addProduct(req.body)
            res.status(201).json(product)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
    async updateProduct(req, res){
        const id = req.params.pid
        try {
            const productById = await productService.updateProduct(id, req.body)
            if(!productById) return  res.status(404).send('Product not found')
            res.status(200).json({message:'Product Updated Successfully'})
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
    async deleteProduct(req, res){
        const id = req.params.pid
        try {
            const deleteProduct = await productService.deleteProduct(id)
            if(!deleteProduct) return  res.status(404).send('Product not found')
            res.status(200).json({messsage: 'Product Removed Correctly'})
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
}
export default ProductController