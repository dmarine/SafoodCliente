import { getImageUrl, getAuthData, getUserData } from "../utils/APIUtils.js";
import { hideModal, removeLoginModal } from "../views/components/Modal.js";
import { toast } from "../views/components/Toast.js";

function formAuthAction() {
    let loginForm = $('#login');
    let registerForm = $('#register');
    
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

        getAuthData(registerForm, 'register').then(token => {
            login(token)
        })
    });
}

function login(token) {
    Cookies.set('token', token.access_token, { expires: token.expires_in })
    hideModal()
    isLogin()
    toast(`Bienvenido ${token.user.name}`)
    removeLoginModal()
}

function logout(token) {
    getUserData(token, 'logout')
    Cookies.remove('token')
    toast(`Has deslogeado`)
    location.reload();
}

function isLogin() {
    let token = Cookies.get('token')
    if(token) { getUserData(token, 'me').then(user => {
        let avatar = (user.avatar) ? `${getImageUrl('avatar', user.avatar)}` : `${getImageUrl('avatar', 'miss-avatar.png')}`
        
        $('#user').html(user.name);
        $('#avatar').attr('src', avatar)
        $('#loginModalButton').unbind('click');
        $('#loginModalButton').prop('id', 'userAction');
        $('#userAction').on('click', function() {
            logout(token)
        })
    })}
}

export { formAuthAction, isLogin }