// Récupération de l'url
const confirmationParam  = new URLSearchParams(window.location.search);
// On récupère et on stocke le numéro de commande. 
const order = confirmationParam.get('orderId');


// Récupération de l'id et on écrit le numéro de commande et un texte de remerciement pour la commande effectuée. 
document.querySelector('#orderId').innerText = order + '\n\n Nous vous remercions pour votre commande.'; 
// On supprime les données du localstorage. 
localStorage.clear(); 