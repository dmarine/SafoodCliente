import { getData, getBasicData } from "../utils/APIUtils.js";
import { getFoodAllergens } from "./AllergensAPI.js";
import { Food } from "../models/Food.js";

function getFoods(idCategory) {
  let url = (!idCategory) ? `foods` : `foods/${idCategory}`

  return getData(url).then(result => {
    let categories = getBasicData('categories')
    let restaurants = getBasicData('restaurants')

    return result.map(f => {
      return new Promise((resolve, reject) => {
        Promise.all([categories, restaurants]).then(function(values) { 
          let category = values[0].find(c => c.id === f.category_id)
          let restaurant = values[1].find(r => r.id === f.restaurant_id)
  
          getFoodAllergens(f.id).then(allergens => {
            resolve(new Food(f.id, f.name, category,  restaurant, f.image, f.description, f.price, allergens))
          })
        })
      })
    })
  })
}

function getFood(id) {
  return getData(`foods/${id}`).then(food => {
    let categories = getBasicData('categories')
    let restaurants = getBasicData('restaurants')

    return Promise.all([categories, restaurants, food]).then(function(values) { 
            let category = values[0].find(c => c.id === food.category_id)
            let restaurant = values[1].find(r => r.id === food.restaurant_id)
            return new Food(food.id, food.name, category,  restaurant, food.image, food.description, food.price)
          });
  })
}

function getRandomFood() {
  return getData("food/random").then(food => {
    let categories = getBasicData('categories')
    let restaurants = getBasicData('restaurants')
    let allergens = getFoodAllergens(food.id);

    return Promise.all([categories, restaurants, allergens, food]).then(function(values) { 
            let category = values[0].find(c => c.id === food.category_id)
            let restaurant = values[1].find(r => r.id === food.restaurant_id)
            let allergens = values[2]
            return new Food(food.id, food.name, category,  restaurant, food.image, food.description, food.price, allergens)
          });
  })
}

export { getFoods, getFood, getRandomFood }