import express from 'express'
import verifyToken from '../../middlewares/auth.middleware.js'
import CartService from '../../services/cart.service.js'

const app= express()
const cartService = new CartService()

document.addEventListener('DOMContentLoaded', ()=>{
    const removeButtons = document.querySelectorAll('.btn-remove')
    removeButtons.forEach(button=>{
        button.addEventListener('click', (event)=>{
            const prodId = button.getAttribute('data-id')
            removedProductFromCart(prodId)
        })
    })

    function removedProductFromCart(prodId){
        const cartId = getCartIdFromLocalStorage()

        fetch(`/api/carts/${cartId}/products/${prodId}`,{
            method:'DELETE'
        })
        .then(response=>response.json())
        .then(data=>{
            alert(`Product ${prodId} removed from cart`)
            location.reload()
        })
        .catch(error=>{
            console.error(error)
            alert('Error deleting product from cart')
        })
    }

    function getCartIdFromLocalStorage(){
        return localStorage.getItem()
    }
})
