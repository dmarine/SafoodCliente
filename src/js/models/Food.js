import { getImageUrl } from "../utils/APIUtils.js"

class Food {
    constructor(id, name, category, restaurant, image, description, price, quantity = null, allergens = null) {
        this.id = id
        this.name = name
        this.category = category
        this.restaurant = restaurant
        this.image = image
        this.description = description
        this.price = price
        this.allergens = allergens;
        
        if (quantity == null) { this.quantity = 1; }
            else { this.quantity = quantity; }
    }

    getImage() {
        return `${getImageUrl("food", this.image)}`
    }
}

export { Food }