import { getData } from "../utils/APIUtils.js";
import { Slide } from "../models/Slide.js";

function getSliders() {
  return getData('carousel').then(result => {
    return result.map((s) => new Slide(s.id, s.name));
  })
}

export { getSliders }