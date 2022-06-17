// Récupération des id
const picture = document.getElementsByClassName('item_img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const color = document.getElementById('colors');

// récuperer l'id de l'url
const myId = window.location.search;
console.log(myId);
const urlParams = new URLSearchParams(myId);

const _id = urlParams.get('_id');
console.log(_id);
