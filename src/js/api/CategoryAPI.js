import { getData } from "../utils/APIUtils.js";
import { Category } from "../models/Category.js";

function getCategories() {
  return getData('categories').then(result => {
    return result.map(c => new Category(c.id, c.name));
  })
}

export { getCategories }
