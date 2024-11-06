import {Router} from 'express'
import ProductController from '../controllers/product.controller.js'
import passport from 'passport'

const router = Router()
const productController = new ProductController()

router.get('/',passport.authenticate('current',{session:false}),productController.getProducts)
router.get('/:pid', productController.getProductById)
router.post('/', productController.addProduct) //create
router.put('/:pid', productController.updateProduct)
router.delete('/:pid', productController.deleteProduct)

export default router