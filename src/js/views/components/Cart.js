let cart = new Array()

function addToCart(food) {
    cart.push(food)
    let c = localStorage.getItem('cart')
    if (c == null) { window.localStorage.setItem('cart', JSON.stringify(cart)) } 
        else { window.localStorage.removeItem('cart')
               window.localStorage.setItem('cart', JSON.stringify(cart)) }
}

function showCart() {
    $("#cart").click(function() { console.log(JSON.parse(localStorage.getItem('cart'))) })
}

export { addToCart, showCart }