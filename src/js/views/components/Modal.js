import { addToCart } from "./Cart.js";
import { getImageUrl, getBasicData, getUserData, updateUserData } from "../../utils/APIUtils.js";
import { toast } from "./Toast.js";
import { confirmPassword } from "./Form.js";

function formAction() {
    $("#loginModalButton").click(function () {
        $("#modal").addClass("g--show")
        $("#loginModal").addClass("g--show")
        $("#registerModal").removeClass("g--show")
        $("#foodModal").removeClass("g--show")
        $("#userModal").removeClass("g--show")
    });
    $(".modal__header-close").click(function () {
        $("#modal").removeClass("g--show")
    });
    $("#registerButton").click(function () {
        $("#registerModal").addClass("g--show")
        $("#loginModal").removeClass("g--show")
    });
    $("#loginButton").click(function () {
        $("#registerModal").removeClass("g--show")
        $("#loginModal").addClass("g--show")
    });
    hideModalOnClick()
}

function showFoodModal(food) {
    showModal()
    $("#registerModal").removeClass("g--show")
    $("#loginModal").removeClass("g--show")
    $("#userModal").removeClass("g--show")
    $("#foodModal").addClass("g--show")
    $("#foodModal > .modal__body").html(`<div id="${food.id}" class="modal__content">
                                            <h2 class="modal__title">${food.name}</h2>
                                            <div class="modal__data">
                                                <img class="modal__image" src="${food.getImage()}"/>
                                                <p class="modal__text">${food.description}</p>
                                                <div class="l-options l-options--row l-options--center">
                                                ${
                                                    food.allergens.map(allergen => 
                                                        `<span class="badge">#${allergen.name}</span>`
                                                    ).join('\n')
                                                }
                                                </div>
                                            </div>
                                            <div class="modal__footer">
                                                <h2 class="modal__footer-price">Precio: ${food.price.toFixed(2)} €</h2>
                                                <input id="addToCart" type="button" class="button button--dark" value="Añadir a carrito">
                                            </div>
                                        </div>`)
    $('#addToCart').on("click", function() { addToCart(food) })
    hideModalOnClick()
}

function showUserModal() {
    showModal()
    $("#registerModal").removeClass("g--show")
    $("#loginModal").removeClass("g--show")
    $("#foodModal").removeClass("g--show")
    $("#userModal").addClass("g--show")
    hideModalOnClick()
}

function setUserModal(user) {
    let avatar = (user.avatar) ? `${getImageUrl('avatar', user.avatar)}` : `${getImageUrl('avatar', 'miss-avatar.png')}`
    $(".modal__header-avatar").attr("src", avatar)
    $("#profile-username").html(`${user.name}`)
    let allergens = getBasicData('allergens')
    let userAllergens = getUserData(Cookies.get('token'), 'allergens')
    Promise.all([allergens, userAllergens]).then(values => {
        let allergens = values[0]
        let userAllergens = values[1]

        $("#userModal > .modal__body").html(`<div class="modal__content">
                                                <div class="profile">
                                                    <div class="profile__section">
                                                        <h1 class="profile__title">Alergenos</h1>
                                                        <form id="userAllergens">
                                                        <div class="l-columns l-columns--3-columns l-columns--2-columns@mobile">
                                                        ${  allergens.map(allergen => 
                                                                `<label class="checkbox"><input class="checkbox__checkbox form-check" type="checkbox" name="${allergen.id}" ${ (userAllergens.find(allerg => allerg.id == allergen.id)) ? `checked` : `` }><div class="checkbox__check"></div><div class="checkbox__text checkbox__text--dark">${allergen.name}</div></label>`
                                                            ).join('\n') }
                                                        </div>
                                                        </form>
                                                    </div>
                                                    <div class="profile__section">
                                                        <form id="userInformation">
                                                            <h1 class="profile__title">Datos</h1>
                                                            <div class="profile__input">
                                                                <div class="profile__text">Nombre</div>
                                                                <input class="modal__text-box modal__text-box--whitout-outline" type="text" name="name" placeholder="Nombre" value="${user.name}">
                                                            </div>
                                                            <div class="profile__input">
                                                                <div class="profile__text">Email</div>
                                                                <input class="modal__text-box modal__text-box--whitout-outline" type="email" name="email" placeholder="Email" value="${user.email}" disabled>
                                                            </div>
                                                            <div class="profile__input">
                                                                <div class="profile__text">Dirección</div>
                                                                <input class="modal__text-box modal__text-box--whitout-outline" type="text" name="address" placeholder="Dirección" value="${(user.address) ? user.address : ``}">
                                                            </div>
                                                            <div class="profile__input">
                                                                <div class="profile__text">Cambiar contraseña</div>
                                                                <input class="modal__text-box modal__text-box--whitout-outline" type="password" name="password" placeholder="Nueva contraseña">
                                                                <input class="modal__text-box modal__text-box--whitout-outline" type="password" name="confirmPassword" placeholder="Confirmar nueva contraseña">
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <button id="updateUser" class="button button--dark button--modal">Guardar</button>
                                                </div>
                                            </div>`)
            $("#updateUser").on("click", function() {
                let form = $("#userInformation")
                let data = form.serializeJSON()
                if(confirmPassword(form)) {
                    data = Object.assign(data, {"allergens": $("#userAllergens").serializeJSON()})
                    updateUserData(data).then(value => {
                        location.reload()
                        toast('Información actualizada')
                    })
                } else {
                    toast('Confirma la contraseña', "error")
                }
            })
        })

        
}

function showModal() {
    $("#modal").addClass("g--show")
}

function hideModalOnClick() {
    window.onclick = function(event) { if(event.target.id === "modal") { $("#modal").removeClass("g--show") }}
}

function hideModal() {
    $("#modal").removeClass("g--show")
}

function removeLoginModal(){
    $("#loginModal").remove();
    $("#registerModal").remove();
    $("#modal").removeClass("g--show");
}

export { formAction, showFoodModal, hideModal, removeLoginModal, setUserModal, showUserModal }
