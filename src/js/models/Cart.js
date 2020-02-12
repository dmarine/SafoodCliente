import { setOrderData, deleteOrderData, setNewCartData } from "../utils/APIUtils.js"
import { toast } from "../views/components/Toast.js"

class Cart {
    constructor() {
        this.products = new Array()
        this.user_id = 0
    }
    
    setUserID(user_id){
        this.user_id = user_id
    }

    setProducts(products) {
        this.products = products
    }

    addProduct(food) {
        if (!this.foodExist(food)) {
            this.products.push(food)
            this.store(food) 
        }
        toast(`Se añadido un pedido al carrito`)
    }

    removeProduct(food) {
        this.products.splice(this.products.indexOf(food), 1)
        this.delete(food)
    }

    store(food) {
        if (this.user_id) {
            localStorage.clear()
            setOrderData(food)
        } else {
            if(!localStorage.getItem('productsList')) {
                window.localStorage.setItem('productsList', JSON.stringify(this.products))
            } else {
                window.localStorage.removeItem('productsList')
                window.localStorage.setItem('productsList', JSON.stringify(this.products))
            }
        }
    }

    delete(food) {
        if (this.user_id) {
            localStorage.clear()
            food.then(food => {
                deleteOrderData(food)
            })
        } else {
            if(!localStorage.getItem('productsList')) {
                window.localStorage.setItem('productsList', JSON.stringify(this.products))
            } else {
                window.localStorage.removeItem('productsList')
                window.localStorage.setItem('productsList', JSON.stringify(this.products))
            }
        }
    }

    process() {
        setNewCartData()
        this.products = new Array()
        toast(`Compra procesada`)
    }

    foodExist(food) {
        let exists = false
        if (this.products){
            let foodAdded = this.products.find(f => f.id == food.id)
            if(foodAdded) { 
                foodAdded.quantity++
                this.store(foodAdded)
                exists = true
            }
        }

        return exists
    }

    totalPrice() {
        let totalPrice = 0
        this.products.forEach(food => {
            totalPrice += (food.price * food.quantity)
        });
        return totalPrice
    }
}

export { Cart }