import { getData } from "../utils/APIUtils.js";
import { Restaurant } from "../models/Restaurant.js";

function getRestaurants() {
  return getData('restaurants').then(result => {
    return result.map(r => new Restaurant(r.id, r.name, r.image, r.description));
  })
}

export { getRestaurants }