import { FoodCard } from "../components/FoodCard.js";

let Category = {
  render: async (idCategory) => {
    return new Promise((resolve, reject) => {
        resolve(FoodCard.render(idCategory))
    })
  },
  after_render: async () => {
    FoodCard.after_render()
  }
};

export { Category }