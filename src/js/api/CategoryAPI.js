import { getAPIUrl } from "./APIUtils.js";

function getCategorys() {
  $.ajax({
    url: getAPIUrl("/categorys"),
    success: function( result ) {
      result.forEach(category => {
        $("#category").append(`<div class="option">${category.name}</div>`)
      });
    },
    error: function(err) {
      console.log('error')
    }
  });
}

export { getCategorys }