import { Navbar } from "./components/Navbar.js";
import { Home } from "./page/Home.js";
import { Category } from "./page/Category.js";
import { Foods } from "./page/Foods.js";
import { RandomFood } from "./page/RandomFood.js";
import { Search } from "./page/Search.js";
import { Logout } from "./page/Logout.js";
import { Error404 } from "./page/Error404.js";

import { Utils } from "../utils/RouteUtils.js";

const routes = {
    '/' : Home,
    '/category/:id' : Category,
    '/foods' : Foods,
    '/random-food' : RandomFood,
    '/search' : Search,
    '/logout' : Logout
}

const router = async () => {
    const vertical = null || $('.menu-vertical')
    const content = null || $('.body__content')    

    let request = Utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    page = (!location.pathname.split('/').slice(-1)[0]) ? page : Error404

    await Promise.all([page.render(request.id), page.renderMenu()]).then(values => {
        let view = values[0]
        let menu = values[1]

        content.html(view)
        vertical.html(menu)
    })

    await page.after_render(request.id)
}

export { router }