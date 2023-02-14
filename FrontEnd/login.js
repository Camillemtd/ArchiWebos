
// bouton de retour vers la page dacceuil
const projet = document.querySelector('#projets');
projet.addEventListener('click', function(){
    location.href="index.html"
})



// Étape 2.2 : Authentification de l’utilisateur


function connexion() {
    const formulaireConnexion = document.querySelector('.formLogin');
    console.log(formulaireConnexion);
    formulaireConnexion.addEventListener('submit',async function(event){
        event.preventDefault();
    //
        const user = {
            email: event.target.querySelector('[name=email').value,
            password: event.target.querySelector('[name=password').value,
        };
    //envoie a l'api
    const result = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(user)
    });
    //on récupère la réponse
    const response =  await result.json();
    
    if(!result.ok){
        document.querySelector('.erreurLogin').style.visibility = 'visible';
        
        
    }else {
        
        
        localStorage.setItem('token', response.token);
        const token = localStorage.getItem('token');
        location.href='index.html';
        
    }
    
   
    });
    
    
    
   
}

connexion()






