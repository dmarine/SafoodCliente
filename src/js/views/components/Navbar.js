import { getBasicData } from "../../utils/APIUtils.js"

let Navbar = {
    categories: getBasicData('categories'),
    render: async () => {
        return new Promise((resolve, reject) => {
            Navbar.categories.then(categories => {
                resolve(`<div class="menu-vertical__section">
                    <h1 class="menu-vertical__section-title">Tipos de comida</h1>
                    <div class="l-options" id="menuCategories">
                    ${
                        categories.map(category =>
                            `<div id="${category.name}" class="option">${category.name}</div>`
                        ).join('\n')
                    }
                    </div>
                </div>`)
            })
        })
    },
    after_render: async () => {
        Navbar.categories.then(categories => {
            categories.map(category => {
                $("#menuCategories").children(`#${category.name}`).on("click", function() {
                    window.location = `${location.origin}${location.pathname}#/category/${category.id}`
                });
            })
        })
    }
}

export { Navbar }