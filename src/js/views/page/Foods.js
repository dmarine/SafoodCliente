import { FoodCard } from "../components/FoodCard.js";

let Foods = {
  render: async () => {
    return new Promise((resolve, reject) => {
        resolve(FoodCard.render())
    })
  },
  after_render: async () => {
    FoodCard.after_render()
  }
};

export { Foods }