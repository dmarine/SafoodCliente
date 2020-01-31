import { Cart } from "../../models/Cart.js"
import { getFood } from "../../api/FoodAPI.js";

let cart = new Cart()

async function addToCart(food) {
    let cartInLS = localStorage.getItem('productsList')
    if (!cart.user_id && cartInLS) { cart.setProducts(JSON.parse(cartInLS)) }
    cart.addProduct(food);
}

function showCart() {
    $("#cart").click(function() {
        $('#userAction').children(".dropdown__menu").removeClass("g--show")
        $('#userAction').children(".dropdown__menu-arrow").removeClass("g--show")

        let dropdown = $(this).parent()
        dropdown.children(".dropdown__menu").html(`
        ${
            cart.products.map(food =>
                `<div id="${food.id}" class="cart__item">
                    <span class="cart__item-number">${food.quantity}x</span> ${food.name}
                    <div class="cart__item-price">${food.price.toFixed(2)}€</div>
                    <i class="fas fa-times cart__item-remove"></i>
                </div>`
            ).join('\n')
        }
            <div class="cart__total">Total<span class="cart__total-price">${cart.totalPrice().toFixed(2)}€</span></div>
            <button id="processCart" class="button button--light button--width">Comprar</button>
        `)

        if(cart.totalPrice() <= 0) { dropdown.children(".dropdown__menu").children(".button").prop("disabled", true) }
        if(!dropdown.children().hasClass("g--show")) {
            dropdown.children(".dropdown__menu").addClass("g--show")
            dropdown.children(".dropdown__menu-arrow").addClass("g--show")
        } else {
            dropdown.children(".dropdown__menu").removeClass("g--show")
            dropdown.children(".dropdown__menu-arrow").removeClass("g--show")
        }

        $(".cart__item-remove").on("click", function() {
            let cartItem = $(this).parent()
            cartItem.remove()
            cart.removeProduct(getFood(cartItem.attr('id')))
            $(".cart__total-price").html(`${cart.totalPrice().toFixed(2)}€`)
            if(cart.totalPrice() <= 0) { dropdown.children(".dropdown__menu").children(".button").prop("disabled", true) }
         })

         $("#processCart").on("click", function() {
            dropdown.children(".dropdown__menu").removeClass("g--show")
            dropdown.children(".dropdown__menu-arrow").removeClass("g--show")
            cart.process()
         })
     })
     hideDropdownOnClick()
}

function hideDropdownOnClick() {
    $("#userAction, #cart, .dropdown__menu, .dropdown__menu-arrow").on("click", function (event) {
        event.stopPropagation()
    })
    
    $(document).on("click", function () {
        $(".dropdown__menu").removeClass("g--show")
        $(".dropdown__menu-arrow").removeClass("g--show")
    })
}

export { addToCart, showCart, cart }