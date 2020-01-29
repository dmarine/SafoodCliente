import { Carousel } from "../components/Carousel.js";
import { InfoCard } from "../components/InfoCard.js";
import { FoodCard } from "../components/FoodCard.js";

let Home = {
  render: async () => {
    return new Promise((resolve, reject) => {
      let promises = [Carousel.render(), InfoCard.render(), FoodCard.render()]

      Promise.all(promises).then(data => {
        resolve(data)
      })
    })
  },
  after_render: async () => {
    Carousel.after_render()
    FoodCard.after_render()
  }
};

export { Home };
