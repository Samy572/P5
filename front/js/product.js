// Récupération des id et des classes dans le html
const picture = document.querySelector('.item__img');
const title = document.querySelector('#title');
let price = document.getElementById('price');
const description = document.getElementById('description'); 
const option = document.getElementsByTagName('<option>');
let color = document.getElementById('colors')
let addToCart = document.getElementById("addToCart");
let quantité = document.getElementById("quantity")
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


	


//Ajout du produit au panier
function ajoutProduit() {
    //Paramètres du produit
    let panier = {
        id : _id,
        couleur : color.value,
        quantité : parseInt(quantity.value), 
    };
    let panierStorage = [];
    //Alerte error couleur quantité. 
    if (panier.couleur == "" || panier.quantité <= 0 || panier.quantité > 100) {
        alert("Veuillez choisir une couleur et le nombre d'article.");
        
    }
    //Vérification  produit dans le panier si la couleur et l'id et la même on additionne les quantités 
    if (localStorage.getItem("article")) {
        panierStorage = JSON.parse(localStorage.getItem("article"));
        for (i in panierStorage) {
            if (panierStorage[i].id === panier.id && panierStorage[i].couleur === panier.couleur) {
                panierStorage[i].quantité = parseInt(panierStorage[i].quantité) + parseInt(panier.quantité);
                localStorage.setItem("article", JSON.stringify(panierStorage));
				alert("Article ajouté au panier."); 
                return
            }
        };
    };
    if (panier.couleur !== "" && panier.quantité > 0 && panier.quantité <= 100) {
        panierStorage.push(panier);
        localStorage.setItem("article", JSON.stringify(panierStorage))
		alert("Article ajouté au panier."); 
		
    }
}

addToCart.addEventListener("click", ajoutProduit);