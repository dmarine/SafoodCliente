import "./vendor/jquery.min.js";
import "./vendor/jquery.serializejson.min.js";
import "./vendor/js.cookie.js";

import { router } from "./views/Route.js";
import { formAction } from "./views/components/Modal.js";
import { formAuthAction, isLogin } from './api/LoginAPI.js';
import { showCart } from "./views/components/Cart.js";
import { onMobile } from "./views/components/Navbar.js";
import { search } from "./views/components/SearchBar.js";

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

$(document).ready(function() {
    formAction()
    formAuthAction()
    isLogin()
    showCart()
    onMobile()
    search()
});