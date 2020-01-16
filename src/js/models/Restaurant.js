import { getImageUrl } from "../utils/APIUtils.js"

class Restaurant {
    constructor(id, name, image, description) {
        this.id = id
        this.name = name
        this.image = image
        this.description = description
    }

    getImage() {
        return `${getImageUrl("food", this.image)}`
    }
}

export { Restaurant }