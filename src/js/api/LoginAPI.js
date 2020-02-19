import { getImageUrl, getAuthData, getUserData, setOrderData } from "../utils/APIUtils.js";
import { hideModal, removeLoginModal, setUserModal, showUserModal } from "../views/components/Modal.js";
import { toast } from "../views/components/Toast.js";
import { checkForm } from "../views/components/Form.js";
import { cart } from "../views/components/Cart.js";
import { getOrderFoods } from "./OrderAPI.js";
import { config } from "../config.js";

function formAuthAction() {
    let loginForm = $('#login')
    let registerForm = $('#register')
    
    $('#loginSumit').on("click", function() { loginForm.submit() })
    $('#registerSumit').on("click", function() { registerForm.submit() })

    loginForm.on("submit", function(event) {
        event.preventDefault()
        getAuthData(loginForm, 'login').then(token => {
            login(token)
        })
    });

    registerForm.on("submit", function(event) {
        event.preventDefault()

        if(checkForm(registerForm)) {
            getAuthData(registerForm, 'register').then(token => {
                login(token)
            })
        } else {
            $(`#register > .modal__text-box`).addClass('modal__text-box--error')
            toast("Error al registrarse: Compruebe los campos", "error")
        }
    });
}

function login(token) {
    Cookies.set('token', token.access_token, { expires: (150.12 / token.expires_in) })
    Cookies.set('token', token.access_token, { domain: config.ADMIN_URL })
    removeLoginModal()
    hideModal()
    isLogin()

    window.location = `${location.origin}${location.pathname}#/`
    toast(`Bienvenido ${token.user.name}`)
}

function logout(token) {
    if(Cookies.get('token')) {
        getUserData(token, 'logout')
        Cookies.remove('token')
        Cookies.remove('token', { domain: config.ADMIN_URL })
        window.location = `${location.origin}${location.pathname}#/`
        location.reload()
        toast(`Has deslogeado correctamente`)
    }
}

function isLogin() {
    let token = Cookies.get('token')
    if(token) { getUserData(token, 'me').then(user => {
        let avatar = (user.avatar) ? `${getImageUrl('avatar', user.avatar)}` : `${getImageUrl('avatar', 'miss-avatar.png')}`
        
        $('#user').html(user.name)
        $('#avatar').attr('src', avatar)
        $('#loginModalButton').unbind('click')
        $('#loginModalButton').parent().prop('id', 'userAction')
        $('#loginModalButton').children().removeAttr('id')
        $('#loginModalButton').removeAttr('id')

        if(user.role) { $("#userAction").children(".dropdown__menu").prepend(`<a class="dropdown__item" href="${config.ADMIN_URL}">Admin</a>`) }
        $('#userAction').on('click', function(event) {
            event.stopPropagation()
            
            $("#cart").next().removeClass("g--show")
            $("#cart").next().next().removeClass("g--show")

            let dropdown = $(this)
            if(!dropdown.children().hasClass("g--show")) {
                dropdown.children(".dropdown__menu").addClass("g--show")
                dropdown.children(".dropdown__menu-arrow").addClass("g--show")
            } else {
                dropdown.children(".dropdown__menu").removeClass("g--show")
                dropdown.children(".dropdown__menu-arrow").removeClass("g--show")
            }
        })

        cart.setUserID(user.id)

        let cartInLS = JSON.parse(localStorage.getItem('productsList'))
        if(cartInLS) {
            cartInLS.forEach(food => {
                setOrderData(food)
            })
            localStorage.clear()
        }
        
        getOrderFoods().then(foods => {
            if(foods.length > 0) {
                Promise.all(foods).then(food => {
                    cart.setProducts(food)
                })
            }
        })

        setUserModal(user)
        $('#profile').on('click', function() {
            $("#userAction").children(".dropdown__menu").removeClass("g--show")
            $("#userAction").children(".dropdown__menu-arrow").removeClass("g--show")
            showUserModal()
        })
    })}
}

export { formAuthAction, isLogin, logout }
