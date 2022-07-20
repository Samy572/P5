let items = document.getElementById('items');
affichageDesproduits();

// Récupération de l'api
function affichageDesproduits() {
	fetch('http://localhost:3000/api/products')
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			// Boucle pour afficher les éléments de l'api.
			data.forEach((element) => {
				items.innerHTML += `<a href="./product.html?_id=${element._id}">
        <article>
          <img src="${element.imageUrl}" alt="${element.altTxt}">
          <h3 class="productName">${element.name}</h3>
          <p class="productDescription">${element.description}</p>
        </article>
      </a>`;
			});
		})
		.catch(
			(erreur) =>
				(items.innerText = "l'erreur suivante est survenue : " + erreur)
		);
}
