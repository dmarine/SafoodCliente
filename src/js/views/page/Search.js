import { FoodCard } from "../components/FoodCard.js";
import { Navbar } from "../components/Navbar.js";

let Search = {
  render: async (searchText) => {
    return new Promise((resolve, reject) => {
        resolve(FoodCard.render(null, null, searchText))
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
    Navbar.after_render()
    Navbar.after_renderFilters()
  }
};

export { Search }