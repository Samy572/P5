// Récupération des id et des classes dans le html
const picture = document.querySelector('.item__img');
const title = document.querySelector('#title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const color = document.querySelector('#colors');
const option = document.getElementsByTagName('<option>');
const btn = document.querySelector('#addToCart');
const quantity = document.querySelector('#quantity');

// récuperer l'id de l'url
const myId = window.location.search;
console.log(myId);
const urlParams = new URLSearchParams(myId);

const _id = urlParams.get('_id');
// Afficher l'id du produit
console.log(_id);

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
				element.colors.forEach((col) => {
					color.innerHTML += `<option value="${col}"> ${col}</option>`;
				});
				price.textContent = `${element.price}`
				
			}
		
		});
	});

	