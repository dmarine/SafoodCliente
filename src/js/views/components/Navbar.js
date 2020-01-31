import { getBasicData, getUserData } from "../../utils/APIUtils.js"
import { FoodCard } from "./FoodCard.js"

function onMobile() {
    $("#menu").on("click", function() {
        let menu = $(".menu")
        
        if(!menu.hasClass("g--show@mobile")) {
            menu.addClass("g--show@mobile")
        } else {
            menu.removeClass("g--show@mobile")
        }
    })
}

async function filterNavbar(idCategory) {
    let allergenFilter = []
    Navbar.allergens.then(allergens => {
        $("#menuAllergens").children().children(".checkbox__checkbox:checked").each(function() {
            allergenFilter.push(allergens.filter(allergen => allergen.id == this.id)[0])
        })
    })
    await FoodCard.render(idCategory, allergenFilter).then(view => {
        $('.body__content').html(view)
    })
    await FoodCard.after_render()
}

let Navbar = {
    categories: getBasicData('categories'),
    allergens: getBasicData('allergens'),
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
    renderFilters: async () => {
        let token = Cookies.get('token')
        let userAllergens = (token) ? getUserData(token, 'allergens') : null
        
        return new Promise((resolve, reject) => {
            Promise.all([Navbar.allergens, userAllergens]).then(values => {
                let allergens = values[0]
                let userAllergens = values[1]

                resolve(`<div class="menu-vertical__section">
                            <h1 class="menu-vertical__section-title">Alergenos</h1>
                            <div class="l-options" id="menuAllergens">
                            ${
                                allergens.map(allergen =>
                                    `<label class="checkbox"><input id="${allergen.id}" class="checkbox__checkbox" type="checkbox" ${(userAllergens) ? (userAllergens.find(allerg => allerg.id == allergen.id)) ? `checked` : `` : ``}><div class="checkbox__check"></div><div class="checkbox__text">${allergen.name}</div></label>`
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
    },
    after_renderFilters: async (idCategory) => {
        Promise.all([Navbar.allergens, idCategory]).then(values => {
            let allergens = values[0]
            let idCategory = values[1]
            allergens.map(allergen => {
                $("#menuAllergens").children().children(`#${allergen.id}`).on("click", function() {
                    filterNavbar(idCategory)
                });
            })
        })
        filterNavbar(idCategory)
    }
}

export { Navbar, onMobile, filterNavbar }