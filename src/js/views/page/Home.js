import { Carousel } from "../components/Carousel.js";
import { InfoCard } from "../components/InfoCard.js";
import { FoodCard } from "../components/FoodCard.js";
import { Navbar } from "../components/Navbar.js";

let Home = {
  render: async () => {
    return new Promise((resolve, reject) => {
      let promises = [Carousel.render(), InfoCard.render(), FoodCard.render()]

      Promise.all(promises).then(data => {
        resolve(data)
      })
    })
  },
  renderMenu: async () => {
    return new Promise((resolve, reject) => {
      Navbar.render().then(data => {
        resolve(data)
      })
    })
  },
  after_render: async () => {
    Carousel.after_render()
    FoodCard.after_render()
    Navbar.after_render()
  }
};

export { Home };
