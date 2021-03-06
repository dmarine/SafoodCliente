import { FoodCard } from "../components/FoodCard.js";
import { Navbar } from "../components/Navbar.js";

let Category = {
  render: async (idCategory) => {
    return new Promise((resolve, reject) => {
        resolve(FoodCard.render(idCategory))
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
  after_render: async (idCategory) => {
    FoodCard.after_render()
    Navbar.after_render()
    Navbar.after_renderFilters(idCategory)
  }
};

export { Category }