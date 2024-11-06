import {Server} from 'socket.io'
import ProductRepository from '../repositories/product.repository.js';
const manager = new ProductRepository()
//const io = new Server(httpServer)

class SocketManager{
    constructor(httpServer){
        this.io = new Server(httpServer)
        this.initEvents()
    }
    async initEvents(){
        this.io.on("connection",async(Server)=>{
            console.log("A customer logged in");
            Server.emit("products", await manager.getProducts({})) 
                
            Server.on("deleteProduct", async(id)=>{
                if(id){
                    await manager.deleteProduct(id)
                    Server.emit("products",await manager.getProducts({}))//io.sockets.emit
                } else {
                    console.error('Product ID is undefined')
                }
                
            })

            Server.on("addProduct", async (product) => {
                // Verificación básica de campos necesarios
                if (!product || typeof product !== 'object') {
                    console.error('Invalid product data');
                    return;
                }
            
                // Validar que todos los campos requeridos están presentes y no están vacíos
                const { title, description, code, price, stock, category, thumbnail } = product;
            
                if (!title || typeof title !== 'string' || title.trim() === '') {
                    console.error('Product title is required and must be a non-empty string');
                    return;
                }
            
                if (!description || typeof description !== 'string' || description.trim() === '') {
                    console.error('Product description is required and must be a non-empty string');
                    return;
                }
            
                if (!code || typeof code !== 'string' || code.trim() === '') {
                    console.error('Product code is required and must be a non-empty string');
                    return;
                }
            
                if (isNaN(price) || price <= 0) {
                    console.error('Product price is required and must be a positive number');
                    return;
                }
            
                if (isNaN(stock) || stock < 0) {
                    console.error('Product stock is required and must be a non-negative integer');
                    return;
                }
            
                if (!category || typeof category !== 'string' || category.trim() === '') {
                    console.error('Product category is required and must be a non-empty string');
                    return;
                }
            
                // `thumbnail` es opcional y puede ser una cadena vacía o una URL válida
                if (typeof thumbnail !== 'string') {
                    console.error('Product thumbnail must be a string');
                    return;
                }
            
                // Agregar el producto
                try {
                    await manager.addProduct(product);
                    Server.sockets.emit("products", await manager.getProducts({}));
                } catch (error) {
                    console.error('Error adding product:', error);
                }
            });
        })
    }
}

export default SocketManager