import { Navbar } from "./components/Navbar.js";
import { Home } from "./page/Home.js";
import { Category } from "./page/Category.js";
import { Foods } from "./page/Foods.js";
import { Error404 } from "./page/Error404.js";

import { Utils } from "../utils/RouteUtils.js";

const routes = {
    '/' : Home,
    '/category/:id' : Category,
    '/foods' : Foods
}

const router = async () => {
    const vertical = null || $('.menu-vertical')
    const content = null || $('.body__content')

    vertical.html(await Navbar.render())
    await Navbar.after_render()

    let request = Utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    page = (!location.pathname.split('/').slice(-1)[0]) ? page : Error404
    await page.render(request.id).then(view => {
        return content.html(view);
    })

    await page.after_render();
}

export { router }