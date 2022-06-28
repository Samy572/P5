let items = document.querySelector('#cart__items');
let panierVide = document.querySelector('.cart__item__content__description');
console.log(items);
let panierStorage = JSON.parse(localStorage.getItem('article'));
let deleteItem = document.querySelector('deleteItem');

// Création de variable pour chaques éléments du panierStorage

if (panierStorage === null || undefined) {
	console.log('Votre panier est vide.');
} else {
	fetch('http://localhost:3000/api/products')
		.then((response) => response.json())
		.then((data) => {
			let panierStorage = JSON.parse(localStorage.getItem('article'));
			for (const variable of data) {
				let img = variable.imageUrl;
				let price = variable.price;
				let name = variable.name;
				let alt = variable.altTxt;
				let id = variable._id;
        // Boucle pour récupérer les éléments du panier storage
				for (const element of panierStorage) {
					if (element.id === id) {
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantité}">
                    </div>
                    <div class="cart__item__content__settings__delete"> 
                      <p class="deleteItem">Supprimer</p>
                    </div> 
                  </div>
                </div>
              </article>`;
					}
				}
			}
		});
}
