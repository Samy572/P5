// récupération de la section items
let items = document.getElementById('items');

// Récupération de l'api
fetch('http://localhost:3000/api/products')
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		// Boucle pour créer du html dans notre index et afficher les éléments choisi de l'api
		data.forEach((element) => {
			items.innerHTML += `<a href="./product.html?_id=${element._id}">
        <article>
          <img src="${element.imageUrl}" alt="${element.altTxt}">
          <h3 class="productName">${element.name}</h3>
          <p class="productDescription">${element.description}</p>
        </article>
      </a>`;
		});
	});
