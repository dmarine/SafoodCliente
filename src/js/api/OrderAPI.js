import { getOrderData, getBasicData } from "../utils/APIUtils.js";
import { getFoodAllergens } from "./AllergensAPI.js";
import { Food } from "../models/Food.js";

function getOrderFoods(idCategory) {
  let url = (!idCategory) ? `foods` : `foods/${idCategory}`

  return getOrderData('orders').then(result => {
    let categories = getBasicData('categories')
    let restaurants = getBasicData('restaurants')

    return result.map(f => {
      return new Promise((resolve, reject) => {
        Promise.all([categories, restaurants]).then(function(values) { 
          let category = values[0].find(c => c.id === f.category_id)
          let restaurant = values[1].find(r => r.id === f.restaurant_id)
  
          getFoodAllergens(f.id).then(allergens => {
            resolve(new Food(f.id, f.name, category,  restaurant, f.image, f.description, f.price, allergens, f.quantity))
          })
        })
      })
    })
  })
}

export { getOrderFoods }