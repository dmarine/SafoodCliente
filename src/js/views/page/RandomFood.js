import { FoodCard } from "../components/FoodCard.js";
import { Navbar } from "../components/Navbar.js";
import { showFoodModal } from "../components/Modal.js";
import { getRandomFood } from "../../api/FoodAPI.js";

let RandomFood = {
  render: async () => {
    return new Promise((resolve, reject) => {
        resolve(FoodCard.render())
    })
  },
  renderMenu: async () => {
    return new Promise((resolve, reject) => {
      let promises = [Navbar.render(), Navbar.renderFilters()]

      Promise.all(promises).then(data => {
        resolve(data)
      })
    })
  },
  after_render: async () => {
    FoodCard.after_render()
    getRandomFood().then(food => {
        showFoodModal(food)
    })
    Navbar.after_render()
    Navbar.after_renderFilters()
  }
};

export { RandomFood }