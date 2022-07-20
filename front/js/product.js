// Récupération des id et des classes dans le html
const picture = document.querySelector('.item__img');
const title = document.querySelector('#title');
let price = document.getElementById('price');
const description = document.getElementById('description');
const option = document.getElementsByTagName('<option>');
let color = document.getElementById('colors');
let addToCart = document.getElementById('addToCart');
let quantité = document.getElementById('quantity');

// récupereration de l'id de l'url avec ?
const myId = window.location.search;

// On extrait l'id
const urlParams = new URLSearchParams(myId);

// on stocke l'id dans notre variable.
const _id = urlParams.get('_id');

afficherProduitSelectionné(); 
addToCart.addEventListener('click', ajoutProduit);

// Récupération de l'api plus boucle pour afficher les éléments de l'api.
function afficherProduitSelectionné() {
fetch('http://localhost:3000/api/products' + myId)
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
				// boucle pour récupérer les options des couleurs.
				element.colors.forEach((col) => {
					console.log(element.colors);
					color.innerHTML += `<option value="${col}"> ${col}</option>`;
				});
			}
		});
	}).catch(
		(erreur) =>
			(title.innerText = "l'erreur suivante est survenue : " + erreur)
	);
}
//Ajout du produit au panier
function ajoutProduit() {
	//Paramètres du produit panier temporaire avant push
	let panier = {
		id: _id,
		couleur: color.value,
		quantité: parseInt(quantité.value),
	};
	let panierStorage = [];
	//Alerte error couleur quantité.
	if (panier.couleur == '' || panier.quantité <= 0 || panier.quantité > 100) {
		alert("Veuillez choisir une couleur et le nombre d'article.");
	}
	//Vérification si il y a des produit dans le panier si la couleur et l'id et la même on additionne les quantités
	if (localStorage.getItem('article')) {
		panierStorage = JSON.parse(localStorage.getItem('article'));
		// Boucle des elements dans notre localstorage
		for (el in panierStorage) {
			if (
				panierStorage[el].id === panier.id &&
				panierStorage[el].couleur === panier.couleur
			) {
				panierStorage[el].quantité =
					panierStorage[el].quantité + panier.quantité;
				// transformation de l'objet js en json.
				localStorage.setItem('article', JSON.stringify(panierStorage));
				alert('Article ajouté à votre panier.');
				return el; 
			}
		}
	}
	// Verification de la condition et push du panier dans le panierStorage et transformation de l'objet js en json.
	if (panier.couleur !== '' && panier.quantité >= 0 && panier.quantité <= 100) {
		// on pousse le panier dans le localstorage
		panierStorage.push(panier);
		localStorage.setItem('article', JSON.stringify(panierStorage));
		// Alerte d'ajout des produits au localstorage
		alert('Article ajouté au panier.');
	}
}
// appel de la fonnction ajoutProduit au clique ajouter au panier.

