let items = document.querySelector('#cart__items');
console.log(items);
let panierStorage = JSON.parse(localStorage.getItem('article'));
let deleteItem = document.getElementsByClassName('deleteItem');

// Création de variable pour chaques éléments du panierStorage
function affichagePanier() {
	if (panierStorage == null) {
		document.querySelector('h1').innerHTML = 'Votre panier est vide.';
	} else {
		// Boucle pour créer des variables pour chaques données dans l'api
		fetch('http://localhost:3000/api/products')
			.then((response) => response.json())
			.then((data) => {
				let panierStorage = JSON.parse(localStorage.getItem('article'));
				// Boucle sur l'api pour récupérer les données nécéssaires
				for (const variable of data) {
					let img = variable.imageUrl;
					let price = variable.price;
					let name = variable.name;
					let alt = variable.altTxt;
					let id = variable._id;

					// Boucle pour récupérer les éléments du panier storage et on les ajoutent.
					for (const element of panierStorage) {
						if (element.id === id) {
							console.log(element);
							items.innerHTML += `<article class="cart__item" data-id="${element.id}" data-color="${element.couleur}">
                <div class="cart__item__img">
                  <img src="${img}" alt="${alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${name}</h2>
                    <p>${element.couleur}</p>
                    <p>${price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1"  max="100" value="${element.quantité}">
                    </div>
                    <div class="cart__item__content__settings__delete"> 
                      <p class="deleteItem" data-delete ="${element.id}">Supprimer</p>
                    </div> 
                  </div>
                </div>
              </article>`;
						}
					}
				}
			});
	}
}

affichagePanier();

function quantitéPrixTotal() {
	// Partie quantité
	let totalQuantity = document.getElementById('totalQuantity'); // Récupération de l'id
	let total = 0; // Initialisation du total à 0

	panierStorage.forEach((element) => {
		// Total 0 + la quantité stocké dans le locale storage
		total += element.quantité;
		console.log(total);
	});
	totalQuantity.innerText = total; // quantité retranscrite

	// Partie prix

	let totalPrice = document.getElementById('totalPrice');
	let prix = document.querySelectorAll('.cart_item_content_description :nth-child(2)');
	
}

quantitéPrixTotal();
