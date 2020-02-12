import { Category } from "../models/Category.js";
import { Restaurant } from "../models/Restaurant.js";
import { Slide } from "../models/Slide.js";
import { Allergen } from "../models/Allergen.js";

import { toast } from "../views/components/Toast.js";
import { config } from "../config.js";

function getAPIUrl(request) {
  return `${config.API_URL}/api/${request}`
}

function getAPIAuthUrl(request) {
  return `${config.API_URL}/api/auth/${request}`
}

function getImageUrl(request, imageName) {
  return (request) ? `${config.API_URL}/images/${request}/${imageName}` : `${config.API_URL}/images/${imageName}`
}

export function getData(url) {
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

export function getBasicData(type) {
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
    case 'allergens':
      data = Allergen
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

export function getAuthData(form, type) {
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
          toast(errorText, "error")
          $(`#${type} > .modal__text-box`).addClass('modal__text-box--error')
        }
    })
  })
}

export function getUserData(token, action) {
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

export function updateUserData(data) {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: getAPIAuthUrl('update'),
        type: "PUT",
        data: data,
        headers: { 'Authorization': `Bearer ${Cookies.get('token')}`},
        success: function(result) {
          resolve(result)
        },
        error: function(err) {
          reject(err)
        }
    })
  })
}

export function setOrderData(food) {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: getAPIAuthUrl('orders'),
        type: "POST",
        data: {food_id: food.id, quantity: food.quantity},
        headers: { 'Authorization': `Bearer ${Cookies.get('token')}`},
        success: function(result) {
          resolve(result)
        },
        error: function(err) {
          reject(err)
        }
    })
  })
}

export function deleteOrderData(food) {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: getAPIAuthUrl('orders'),
        type: "DELETE",
        data: {food_id: food.id},
        headers: { 'Authorization': `Bearer ${Cookies.get('token')}`},
        success: function(result) {
          resolve(result)
        },
        error: function(err) {
          reject(err)
        }
    })
  })
}

export function getOrderData() {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: getAPIAuthUrl('orders'),
        type: "GET",
        headers: { 'Authorization': `Bearer ${Cookies.get('token')}`},
        success: function(result) {
          resolve(result)
        },
        error: function(err) {
          reject(err)
        }
    })
  })
}

export function getCartsUser() {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: getAPIAuthUrl('cart'),
        type: "GET",
        headers: { 'Authorization': `Bearer ${Cookies.get('token')}`},
        success: function(result) {
          resolve(result)
        },
        error: function(err) {
          reject(err)
        }
    })
  })
}

export function setNewCartData() {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: getAPIAuthUrl('cart'),
        type: "POST",
        headers: { 'Authorization': `Bearer ${Cookies.get('token')}`},
        success: function(result) {
          resolve(result)
        },
        error: function(err) {
          reject(err)
        }
    })
  })
}

export function updateAvatar(formData){
  return new Promise((resolve, reject) => {
    $.ajax({
      url: getAPIAuthUrl("update-avatar"),
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        headers: { 'Authorization': `Bearer ${Cookies.get('token')}`},
        success: function(result) {
          resolve(result)
        },
        error: function(err) {
          reject(err)
        }
    })
  })
}

export { getAPIUrl, getAPIAuthUrl, getImageUrl }