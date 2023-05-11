import { fetchProjet } from "./index.js";
let modal = null;
let modal1 = document.querySelector("#modal1");
let modal2 = document.querySelector("#modal2");
//fonctoin pour ouvrir et fermer la modal 1
function openModal1(e) {
  e.preventDefault();
  modal1.style.display = null;
  modal1.removeAttribute("aria-hidden");
  modal1.setAttribute("aria-modal", "true");
  modal1.addEventListener("click", closeModal1);
  modal1
    .querySelector("#js-modal-close1")
    .addEventListener("click", closeModal1);
  modal1
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
}

const closeModal1 = function (e) {
  e.preventDefault();

  // on retarde le display none pour mettre une animation pendant le close
  window.setTimeout(function () {
    modal1.style.display = "none";
  }, 500);
  modal1.setAttribute("aria-hidden", "true");
  modal1.removeAttribute("aria-modal");
  modal1.removeEventListener("click", closeModal1);
  modal1
    .querySelector("#js-modal-close1")
    .removeEventListener("click", closeModal1);
  modal1
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
};

//fonction pour ouvrir et fermer la modal2
const openModal2 = function (e) {
  e.preventDefault();
  modal2.style.display = null;
  modal2.removeAttribute("aria-hidden");
  modal2.setAttribute("aria-modal", "true");
  modal2.addEventListener("click", closeModal2);
  modal2
    .querySelector("#js-modal-close2")
    .addEventListener("click", closeModal2);
  modal2
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal2 = function (e) {
  e.preventDefault();
  const modal2 = document.querySelector("#modal2");
  // on retarde le display none pour mettre une animation pendant le close
  window.setTimeout(function () {
    modal2.style.display = "none";
  }, 500);
  modal2.setAttribute("aria-hidden", "true");
  modal2.removeAttribute("aria-modal");
  modal2.removeEventListener("click", closeModal2);
  modal2
    .querySelector("#js-modal-close2")
    .removeEventListener("click", closeModal2);
  modal2
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
};

// fonction pour stopper la propagation de la function closemodal
const stopPropagation = function (e) {
  e.stopPropagation();
};
document.querySelector("#lienModal1").addEventListener("click", openModal1);
const buttonModal = document.querySelector(".buttonModal");
buttonModal.addEventListener("click", openModal2);
buttonModal.addEventListener("click", closeModal1);
const buttonReturn = document.querySelector("#js-modal-return");
buttonReturn.addEventListener("click", openModal1);
buttonReturn.addEventListener("click", closeModal2);

// fermer la modal avec la touche Echape
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal1(e);
  }
});

// modal
// appel de lapi pour afficher les projets

let allposts = [];
let posts = [];
function createFigure(post) {
  const figure = document.createElement("figure");
  figure.className = "figureModal";
  figure.id = post.id;
  const logoTrash = document.createElement("i");
  logoTrash.className = "fa-solid fa-trash-can";
  logoTrash.id = post.id;
  figure.append(logoTrash);
  logoTrash.addEventListener("click", deleted);
  const imageElement = document.createElement("img");
  imageElement.src = post.imageUrl;
  imageElement.className = "imageModal";
  imageElement.crossOrigin = "anonymous";
  figure.appendChild(imageElement);
  const edit = document.createElement("p");
  edit.innerText = "éditer";
  figure.appendChild(edit);
  return figure;
}

async function fetchProjetModal() {
  /*récupération de l'API*/
  const galleryModal = document.querySelector(".galleryModal");
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

  /*Parcours ma réponse et crée les projets*/

  for (let post of posts) {
    galleryModal.append(createFigure(post));
  }
}
fetchProjetModal();

// afficher l'image upload
let labelImage = document.querySelector(".labelModal2");
let img = document.querySelector(".imageModal2");
let description = document.querySelector('.descriptionInput')
const uploadImg = document.querySelector("#image");
uploadImg.addEventListener("change", preview);
function preview() {
  const file = this.files[0];
  const file_reader = new FileReader();
  file_reader.readAsDataURL(file);
  file_reader.addEventListener("load", function (e) {
    img.src = e.target.result;
    img.style.visibility = "visible";
    labelImage.style.visibility = "hidden";
    description.style.visibility='hidden'
  });
}

// delete Project
let token = localStorage.getItem("token");
function deleted(e) {
  e.preventDefault();
  const id = e.target.id;
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      document.querySelector(".galleryModal").innerHTML = "";
      fetchProjetModal();
      document.querySelector(".gallery").innerHTML = "";
      fetchProjet();
    }
  });
}

// Ajout des projets
const title = document.querySelector("#title");
const categorie = document.querySelector("#category");
const image = document.querySelector("#image");
let formPost = document.querySelector(".formPost");
let buttonValider = document.querySelector(".buttonValider");
let message = document.querySelector(".messageError");

// validation input file 
function validateImageFiles(input) {
  const allowedExtensions = /(\.png|\.jpeg)$/i;
  const maxFileSize = 4 * 1024 * 1024; // 4 Mo

  const files = input.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const extension = file.name.match(/\.[0-9a-z]+$/i)[0];

    if (!allowedExtensions.test(extension)) {
      return false; // L'extension du fichier n'est pas autorisée
    }

    if (file.size > maxFileSize) {
      return false; // La taille du fichier est supérieure à la limite
    }
  }

  return true; // Tous les fichiers sont valides
}
let valideInput = document.querySelector('.valideFile')

formPost.addEventListener("change", () => {
  if (
    title.value.length > 0 &&
    image.value.length > 0 &&
    categorie.value.length > 0
  ) {
    buttonValider.style.pointerEvents = "initial";
    buttonValider.style.background = "#1D6154";
  }
});

formPost.addEventListener("submit", (event) => {
  event.preventDefault();
  if(validateImageFiles(image)){
    valideInput.style.visibility='hidden'
  if (
    !title.value.length > 0 &&
    !image.value.length > 0 &&
    !categorie.value.length > 0
  ) {
    message.style.visibility = "visible";
  }
  const formData = new FormData(formPost);
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    redirect: "manual",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      // si le projet est envoyé je rappel mes fonction qui affiche les differents projets
      document.querySelector(".galleryModal").innerHTML = "";
      fetchProjetModal();
      document.querySelector(".gallery").innerHTML = "";
      fetchProjet();
      // je remet mon formulaire à 0 pour pouvoir remettre un autre projet si souhaité
      formPost.reset();
      img.style.visibility = "hidden";
      labelImage.style.visibility = "visible";
      description.style.visibility="visible";
      //message pour savoir si le projet a bien était crée
      const validaion = document.querySelector(".validation");
      validaion.classList.add("succes");
      validaion.style.visibility = "visible";
      message.style.visibility = "hidden";
      setTimeout(() => {
        validaion.style.visibility = "hidden";
        validaion.classList.remove("succes");
      }, 2000);
    }
  });
}else {
  valideInput.style.visibility='visible'
}
});
