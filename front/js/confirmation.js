
const confirmationParam  = new URLSearchParams(window.location.search);
const order = confirmationParam.get('orderId');

// Récupération de l'id et on écrit le numéro de commande
document.querySelector('#orderId').innerText = order; 
localStorage.clear(); 