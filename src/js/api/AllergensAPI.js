import { getData, getUserData } from "../utils/APIUtils.js";
import { Allergen } from "../models/Allergen.js";


function getAllergens() {
    return getData('allergens').then(result => {
        return result.map(r => new Allergen(r.id, r.name));
      })
}

function getFoodAllergens(id) {
  return getData(`foods/${id}/allergens`).then(result => {
      return result.map(r => new Allergen(r.id, r.name));
    })
}

function getUserAllergens() {
  return getUserData(Cookies.get('token'), 'allergens').then(result => {
      return result.map(r => new Allergen(r.id, r.name));
  })
}

export { getAllergens, getFoodAllergens, getUserAllergens }