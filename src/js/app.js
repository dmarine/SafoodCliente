import '../../node_modules/jquery/dist/jquery.js';
import { getCarousel } from "./api/CarrouselAPI.js";
import { getCategorys } from "./api/CategoryAPI.js";

$(document).ready(function() {
  getCategorys();
  getCarousel();
});