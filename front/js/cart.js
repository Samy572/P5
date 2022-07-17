let items = document.querySelector('#cart__items');
let panierStorage = JSON.parse(localStorage.getItem('article'));

affichagePanier();

// Création de variable pour chaques éléments du panierStorage
function affichagePanier() {
	if (panierStorage == '') {
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
	let input = Array.from(document.querySelectorAll('.itemQuantity')).forEach(
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

// Partie regex formulaire

let formulaire = document.querySelector('.cart__order__form');
let validationFormulaire = document.querySelector('#order');
let btnCommander = document.getElementById('order'); 	
let prenomRegex = new RegExp('^[A-Z]{1}[a-z éèêûëïôö -]{2,20}$');
let nomRegex = new RegExp('^[A-Z]{3,25}$');
let adresseRegex = new RegExp('^[a-zA-Z0-9 \s]{1,5}[a-zA-Z \s]{3,30}$');
let villeRegex = new RegExp('^[A-Z]{1}[a-z]{2,25}$');
let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9]+[.]{1}[a-z]{2,5}$');
let testPrenom = prenomRegex.test(formulaire.firstName.value);
let testNom = nomRegex.test(formulaire.lastName.value);
let testAdresse = adresseRegex.test(formulaire.address.value);
let testVille = villeRegex.test(formulaire.city.value);
let testEmail = emailRegex.test(formulaire.email.value);

// if(prenomRegex === true){
// 	formulaire.addEventListener('click', () =>{
// 		console.log('hello');
// 	})
// }


function verificationPrenom() {
	formulaire.firstName.addEventListener('change', ()=>{
		
		let prenomErrorMsg = document.getElementById('firstNameErrorMsg');
		if (testPrenom) {
			prenomErrorMsg.innerText = '';
			formulaire.firstName.style.border = 'solid 3px green';
			btnCommander.disabled = false; 
			
		} else {
			prenomErrorMsg.innerText = 'Prénom invalide.';
			formulaire.firstName.style.border = 'solid 3px red';
			btnCommander.disabled = true; 
			
		}
	});

}

function verificationNom() {
	formulaire.lastName.addEventListener('change',() => {
		
		let nomErrorMsg = document.getElementById('lastNameErrorMsg');
	
		if (testNom) {
			nomErrorMsg.innerText = '';
			formulaire.lastName.style.border = 'solid 3px green';
			btnCommander.disabled = false; 
			
		} else {
			nomErrorMsg.innerText = 'Nom invalide, veuillez respecter la casse.';
			formulaire.lastName.style.border = 'solid 3px red';
			btnCommander.disabled = true; 
		}
	});

}

function verificationAdresse() {

	formulaire.address.addEventListener('change', ()=>{
		
		let adresseErrorMsg = document.getElementById('addressErrorMsg');
	
		if (testAdresse) {
			adresseErrorMsg.innerText = '';
			formulaire.address.style.border = 'solid 3px green';
			btnCommander.disabled = false; 
			
		} else {
			adresseErrorMsg.innerText = 'Adresse invalide.';
			formulaire.address.style.border = 'solid 3px red';
			btnCommander.disabled = true;  
		}
	});

}

function verificationVille() {
	formulaire.city.addEventListener('change', () => {
		
		let villeErrorMsg = document.getElementById('cityErrorMsg');
	
		if (testVille) {
			villeErrorMsg.innerText = '';
			formulaire.city.style.border = 'solid 3px green';
			btnCommander.disabled = false; 
			
		} else {
			villeErrorMsg.innerText = 'invalide.';
			formulaire.city.style.border = 'solid 3px red';
			btnCommander.disabled = true;  
		}
	});

}

function verificationEmail() {
	formulaire.email.addEventListener('change', () =>{
		
		let emailErrorMsg = document.getElementById('emailErrorMsg');
	
		if (testEmail) {
			emailErrorMsg.innerText = '';
			formulaire.email.style.border = 'solid 3px green';
			btnCommander.disabled = false; 
		} else {
			emailErrorMsg.innerText = 'email invalide.';
			formulaire.email.style.border = 'solid 3px red';
			btnCommander.disabled = true; 
		}
	});

}



verificationPrenom();
verificationNom();
verificationAdresse();
verificationVille();
verificationEmail();

// Envoie du formulaire 

btnCommander.addEventListener('submit', () =>{
let commandeClient = {
prenom : testPrenom,
nom : testNom, 
adresse : testAdresse,
ville : testVille, 
email : testEmail, 
};

})



// formulaire.addEventListener('submit', () =>{
// 	if (testPrenom == true && testNom == true && testAdresse == true && testVille == true && testEmail == true) {
// 		console.log("OK");
// 	}
// });


if (adresseRegex.test('12 rue du parc')) {
	console.log('valid');
} else {
	console.log('invalide');
}
