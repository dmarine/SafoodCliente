import { Category } from "../models/Category.js";
import { Restaurant } from "../models/Restaurant.js";
import { Slide } from "../models/Slide.js";

let url = "http://localhost:8000"

function getAPIUrl(request) {
  return `${url}/api/${request}`
}

function getAPIAuthUrl(request) {
  return `${url}/api/auth/${request}`
}

function getImageUrl(request, imageName) {
  return (request) ? `${url}/images/${request}/${imageName}` : `${url}/images/${imageName}`
}

function getData(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: getAPIUrl(url),
      type: 'GET',
      success: function(result) {
        resolve(result);
      },
      error: function(err) {
        console.log('error');
        reject(err);
      }
    });
  });
}

function getBasicData(type) {
  let data = null
  switch (type) {
    case 'categories':
      data = Category
      break;
    case 'restaurants':
      data = Restaurant
      break;
    case 'carousel':
      data = Slide
      break;
  }
  
  return getData(type).then(result => {
    return result.map(value => {
                let ob = new data
                for (let element in value){
                  ob[element] = value[element]
                }

                return ob
            })
  })
}

function getAuthData(form, type) {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: getAPIAuthUrl(type),
        type: "POST",
        data: form.serializeJSON(),
        success: function(result) {
          resolve(result)
        },
        error: function(err) {
          let errorText = (type == 'login') ? 'Email o contraseña incorrecto' : 'Error al registrarse'
          let errorTextInHTML = ($(`#${type} > .modal__text-box--error`).length == 0)

          $(`#${type} > .modal__text-box`).addClass('modal__text-box--error')
          if(errorTextInHTML) { $(`#${type}`).append(`<div class="modal__text modal__text--error">${err.statusText}: ${errorText}</div>`) }
        }
    })
  })
}

function getUserData(token, action) {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: getAPIAuthUrl(action),
        type: "POST",
        headers: { 'Authorization': `Bearer ${token}`},
        success: function(result) {
          resolve(result)
        },
        error: function(err) {
          reject(err)
        }
    })
  })
}

export { getAPIUrl, getAPIAuthUrl, getImageUrl, getData, getBasicData, getAuthData, getUserData }