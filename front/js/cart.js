let items = document.querySelector('#cart__items');
let panierStorage = JSON.parse(localStorage.getItem('article'));

affichagePanier();

// Création de variable pour chaques éléments du panierStorage
function affichagePanier() {
	if (panierStorage === null) {
		document.querySelector('h1').innerText = 'Votre panier est vide.';
	} else {
		// Boucle pour créer des variables pour chaques données dans l'api
		fetch('http://localhost:3000/api/products')
			.then((response) => response.json())
			.then((data) => {
				let panierStorage = JSON.parse(localStorage.getItem('article'));
				console.log(panierStorage);
				// Boucle sur l'api pour récupérer les données nécéssaires
				for (const variable of data) {
					let img = variable.imageUrl;
					let price = parseInt(variable.price);
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
                      <p class="deleteItem">Supprimer</p>
                    </div> 
                  </div>
                </div>
              </article>`;
						}
					}
				}
				totalQttPrix();
				supprimerProduit();
				changeQtt();
			});
	}
}

// Fonction total quantité et prix
function totalQttPrix() {
	// Récupération de l'id
	let totalQuantity = document.getElementById('totalQuantity');
	let total = 0; // Initialisation du total à 0

	panierStorage.forEach((element) => {
		// Total 0 + la quantité stocké dans le locale storage
		total += element.quantité;
	});
	totalQuantity.innerText = total; // quantité retranscrite

	let cartItem = document.querySelectorAll('.cart__item');
	// Initialisation du prix à 0
	let totalPrix = 0;
	// récupération de l'id totalPrice
	let totalPrice = document.getElementById('totalPrice');
	// Boucle dans cart item pour récupérer les prix et la quantité
	for (let i = 0; i < cartItem.length; i++) {
		let prix = document.querySelectorAll(
			'.cart__item__content__description :nth-child(3)'
		)[i].innerText;
		let qtt = document.querySelectorAll('.itemQuantity')[i].value;
		totalPrix += parseInt(prix) * qtt; // notre prix total
	}
	totalPrice.innerText = totalPrix; //retranscription du prix
}

//fonction pour la suppression des articles au clique.

function supprimerProduit() {
	let deleteItem = document.querySelectorAll('.deleteItem');

	// Boucle au clique sur deleteItem
	for (let i = 0; i < deleteItem.length; i++) {
		deleteItem[i].addEventListener('click', () => {
			//'Élement à supprimer en fonction de son id et sa couleur
			let removeId = panierStorage[i].id;
			let removeColor = panierStorage[i].couleur;
			// Création d'un nouveau tableau si la condition est bien remplie
			panierStorage = panierStorage.filter(
				(el) => el.id !== removeId || el.couleur !== removeColor
			);
			localStorage.setItem('article', JSON.stringify(panierStorage));
			alert('Produit supprimé.');
			location.reload();
		});
	}
}

// Fonction pour changer la quantité de manière dynamique.

function changeQtt() {
	let input = Array.from(document.querySelectorAll('input')).forEach(
		(element) => {
			element.addEventListener('change', (e) => {
				// panierStorage.quantité
				const idProduit =
					e.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
						'data-id'
					);
				const nouvelleQte = parseInt(e.target.value);
				const majProduit = panierStorage.map((element) => {
					if (element.id === idProduit) {
						element.quantité = nouvelleQte;
					}
					return element;
				});
				console.log(majProduit);
				localStorage.setItem('article', JSON.stringify(majProduit));
				location.reload();
			});
		}
	);
}

// Les [] correspondent au caracteres qu'on peut utiliser les {} correspondent au nombre de caractere que l'on peut utiliser.
//const validationMail = new RegExp('[a-z]{3}[A-Z]{1}[0-9]{3}')

//if (validationMail.test(term)) {
// console.log("Valid");
// } else {
// 	console.log("Invalid");
// 	error += 'Invalid email';
// }
