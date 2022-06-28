// Récupération des id et des classes dans le html
const picture = document.querySelector('.item__img');
const title = document.querySelector('#title');
let price = document.getElementById('price');
const description = document.getElementById('description');
const color = document.querySelector('#colors');
const option = document.getElementsByTagName('<option>');
const button = document.getElementById('addToCart');
let quantity = document.querySelector('#quantity');

// récuperer l'id de l'url
const myId = window.location.search;
console.log(myId);
const urlParams = new URLSearchParams(myId);

const _id = urlParams.get('_id');
// Afficher l'id du produit
console.log(_id);

// Récupération de l'api plus boucle pour écrire du html

fetch('http://localhost:3000/api/products' + '?' + _id)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		data.forEach((element) => {
			if (_id === element._id) {
				picture.innerHTML = `<img src="${element.imageUrl}" alt="${element.altTxt}">`;
				title.innerText = `${element.name}`;
				price.innerText = `${element.price}`;
				description.innerText = `${element.description}`;
				price = `${element.price}`;
				element.colors.forEach((col) => {
					color.innerHTML += `<option value="${col}"> ${col}</option>`;
				});
			}
		});
	});

// Event sur le clique du boutton

button.addEventListener('click', () => {
	if (quantity.value >= 1 && quantity.value <= 100 && color.value != '') {
		// création du panier avec les valeur id, color quantité et prix si l'utilisateur à bien remplis les conditions (couleur / quantité).
		let panier = {
			id: _id,
			couleur: color.value,
			quantité: parseInt(quantity.value),
			prix: parseInt(price * quantity.value),
		};
		alert('Article ajouté au panier.');
		// variable de stockage de données
		let panierStorage = [];

		// Si on a des élement dans notre local storage on ajoute les articles dans panierStorage
		if (localStorage.getItem('article') !== null) {
			panierStorage = JSON.parse(localStorage.getItem('article'));
			console.log(panierStorage);
			panierStorage.forEach((element) => {
				console.log(element);
				if (element.id === panier.id && element.couleur === panier.couleur) {
					console.log('Mise à jour des quantité');
					element.quantité += panier.quantité;
				} else {
					panierStorage.push(panier);
				}
			});
		} else {
			panierStorage.push(panier);
		}
		// panierStorage.push(panier);

		localStorage.setItem('article', JSON.stringify(panierStorage));
	} else {
		alert("Veuillez choisir une couleur et le nombre d'article.");
	}
});
