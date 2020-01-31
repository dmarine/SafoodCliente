import { getFoods } from "../../api/FoodAPI.js"
import { showFoodModal } from "../../views/components/Modal.js"
import { Error404 } from "../page/Error404.js"
import { getUserAllergens } from "../../api/AllergensAPI.js"

let FoodCard = {
    foods: getFoods(),
    userAllergens: (Cookies.get("token") ? getUserAllergens() : null),
    render: async (idCategory, allergens, searchText) => {
      return new Promise((resolve, reject) => {
        FoodCard.foods.then(foods => {
          Promise.all(foods).then(foods => {
            let view = `<div id="cardFoods" class="l-columns l-columns--margin l-columns--3-columns l-columns--2-columns@tablet l-columns--1-columns@mobile">
                        ${ foods.map(food => {
                            let foodAllergens = []
                            let hasCategory = false
                            let search = false
                            if(allergens) { foodAllergens = allergens.filter(allergenUser => food.allergens.filter(allergenFood => (allergenUser.id == allergenFood.id)).length > 0) }
                            if(idCategory) { hasCategory = (food.category.id != idCategory) }
                            if(searchText) { search = !(food.name.toLowerCase().indexOf(searchText) > -1) }
                            return `<div class="card ${((foodAllergens.length > 0) || hasCategory || search ) ? `g--hide` : ``}"  id="${food.id}-card"><img src="${food.getImage()}" class="card__image"><div class="card__body"><h1 class="card__title">${food.name}</h1><p class="card__text">${food.description.substring(0, 100)+"..."}</p></div><div class="card__footer"><span class="badge">#${food.restaurant.name}</span><span class="badge">#${food.category.name}</span></div></div>` 
                          }).join('\n')
                        }
                        </div>`
            resolve(view)
          })
        })
      })
    },
    after_render: async () => {
        FoodCard.foods.then(foods => {
            Promise.all(foods).then(food => {
                let childrenCardFoods = $("#cardFoods").children()
                if(childrenCardFoods.length == 0) { Error404.render().then(view => $('.body__content').append(view)) }
                childrenCardFoods.each(function() {
                    let f = food.find(f => f.id == this.id.match(/(\d+)/g)[0])
                    $(`#${f.id}-card`).on("click", function(){ 
                        showFoodModal(f)
                    })
                })
            })
        })       
    }
}
  
 export { FoodCard }