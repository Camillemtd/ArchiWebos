/*création d'un projet*/
let allposts = [];
let posts = [];
function createFigure(post) {
  const figure = document.createElement("figure");
  figure.id=post.id;
  const imageElement = document.createElement("img");
  imageElement.src = post.imageUrl;
  imageElement.crossOrigin = "anonymous";
  figure.appendChild(imageElement);
  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerText = post.title;
  figure.appendChild(figcaptionElement);
  return figure;
}
const gallery = document.querySelector(".gallery");

 async function fetchProjet() {
  /*récupération de l'API*/

  const r = await fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!r.ok === true) {
    throw new Error("Impossible de contacter le serveur");
  }
  posts = await r.json();
  allposts = posts;
  gallery.innerHTML = "";

  /*Parcours ma réponse et crée les projets*/

  for (let post of posts) {
    gallery.append(createFigure(post));
  }
}

fetchProjet();
export {fetchProjet}

/* bouton pour les objets */
const boutonObjetsFiltre = document.querySelector("#objets");
boutonObjetsFiltre.addEventListener("click", function () {
  backgroundBase();
  backgroundfiltre(boutonObjetsFiltre);
  const objetsFiltrer = allposts.filter(function (post) {
    return post.categoryId === 1;
  });
  console.log(objetsFiltrer);
  gallery.innerHTML = "";
  for (let objets of objetsFiltrer) {
    gallery.append(createFigure(objets));
  }
});

/*Bouton pour les appartements*/

const boutonAppartementFiltre = document.querySelector("#appartements");
boutonAppartementFiltre.addEventListener("click", function () {
  backgroundBase();
  backgroundfiltre(boutonAppartementFiltre);
  const appartementsFiltrer = allposts.filter(function (post) {

    console.log(typeof post.categoryId)
    
    return post.categoryId === 2;
    
  });
  console.log(appartementsFiltrer);
  gallery.innerHTML = "";
  for (let appartements of appartementsFiltrer) {
    gallery.append(createFigure(appartements));
  }
});

/*Bouton pour les hotels*/

const boutonHôtelFiltre = document.querySelector("#hôtels");
boutonHôtelFiltre.addEventListener("click", function () {
  backgroundBase();
  backgroundfiltre(boutonHôtelFiltre);
  const hotelFiltrer = allposts.filter(function (post) {
    return post.categoryId === 3;
  });
  console.log(hotelFiltrer);
  gallery.innerHTML = "";
  for (let hotel of hotelFiltrer) {
    gallery.append(createFigure(hotel));
  }
});

/*bouton tous*/

const boutonTous = document.querySelector("#tous");
boutonTous.addEventListener("click", function () {
  backgroundBase();
  backgroundfiltre(boutonTous);
  gallery.innerHTML = "";
  for (let post of posts) {
    gallery.append(createFigure(post));
  }
});

/*changement de backgroundfiltre*/
function backgroundfiltre(elem) {
  elem.style.background = "#1D6154";
  elem.style.color = "white";
}

function backgroundBase() {
  const buttonFilter = document.querySelectorAll(".buttonFilter");
  for (let button of buttonFilter) {
    button.style.background = "white";
    button.style.color = "#1D6154";
  }
}

const login = document.querySelector('#login');

login.addEventListener('click', function(){
    location.href="login.html";
});


// passage en mode édition 
if(localStorage.getItem('token')){
  document.querySelector('#login').innerText='logout'
  document.querySelector('.filtre').innerHTML=('');
  document.querySelector('#lienModal1').style.display= ('block');
  document.querySelector('.edition').style.visibility=('visible');
  document.querySelector('.modifierImg').style.visibility=('visible');
  document.querySelector('.modifierIntro').style.visibility=('visible')
  
}
document.querySelector('#login').addEventListener('click', function(){
  localStorage.removeItem('token');
})