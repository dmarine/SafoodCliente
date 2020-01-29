import { addToCart } from "./Cart.js";

function formAction() {
    $("#loginModalButton").click(function () {
        $("#modal").addClass("l-modal--show")
        $("#loginModal").addClass("modal--show")
        $("#registerModal").removeClass("modal--show")
        $("#foodModal").removeClass("modal--show")
    });
    $(".modal__header-close").click(function () {
        $("#modal").removeClass("l-modal--show")
    });
    $("#registerButton").click(function () {
        $("#registerModal").addClass("modal--show")
        $("#loginModal").removeClass("modal--show")
    });
    $("#loginButton").click(function () {
        $("#registerModal").removeClass("modal--show")
        $("#loginModal").addClass("modal--show")
    });
    hideModalOnClick()
}

function showFoodModal(food) {
    showModal()
    $("#registerModal").removeClass("modal--show")
    $("#loginModal").removeClass("modal--show")
    $("#foodModal").addClass("modal--show")
    $("#foodModal > .modal__body").html(`<div id="${food.id}" class="modal__content">
                                            <h2 class="modal__title">${food.name}</h2>
                                            <div class="modal__data">
                                                <img src=${food.getImage()} />
                                                <p class="modal__body-text">${food.description}</p>
                                            </div>
                                            <div class="modal__footer">
                                                <h2 class="modal__footer-price">Precio: ${food.price}€"</h2>
                                                <input id="addToCart" type="button" class="button button--dark" value="Añadir a carrito">
                                            </div>
                                        </div>`)
    $('#addToCart').on("click", function() { addToCart(food) })
    hideModalOnClick()
}

function showModal() {
    $("#modal").addClass("l-modal--show")
}

function hideModalOnClick() {
    window.onclick = function(event) { if(event.target.id === "modal") { $("#modal").removeClass("l-modal--show") }}
}

function hideModal() {
    $("#modal").removeClass("l-modal--show")
}

function removeLoginModal(){
    $("#loginModal").remove();
    $("#registerModal").remove();
    $("#modal").removeClass("l-modal--show");

}

export { formAction, showFoodModal, hideModal, removeLoginModal }