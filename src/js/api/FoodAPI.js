import { getData } from "../utils/APIUtils.js";
import { getCategories } from "./CategoryAPI.js";
import { getRestaurants } from "./RestaurantAPI.js";
import { Food } from "../models/Food.js";

function getFoods(idCategory) {
  let url = (!idCategory) ? `foods` : `foods/${idCategory}`

  return getData(url).then(result => {
    let categories = getCategories()
    let restaurants = getRestaurants()

    return result.map(f => Promise.all([categories, restaurants]).then(function(values) { 
                              let category = values[0].find(c => c.id === f.category_id)
                              let restaurant = values[1].find(r => r.id === f.restaurant_id)
                              return new Food(f.id, f.name, category,  restaurant, f.image, f.description, f.price)
                            }));
  })
}

export { getFoods }