import { getImageUrl } from "../utils/APIUtils.js"

class Slide {
    constructor(id, name) {
        this.id = id
        this.name = name
    }

    getImage() {
        return `${getImageUrl("slider", this.name)}`
    }
}

export { Slide }