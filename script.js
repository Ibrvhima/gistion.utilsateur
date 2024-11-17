"use strict";

// Sélection des éléments du formulaire et du tableau
const formularEl = document.querySelector(".formulaire");
const firstNameEl = document.querySelector(".fname");
const lastNameEl = document.querySelector(".lname");
const emailEl = document.querySelector(".email");
const contactEl = document.querySelector(".contact");
const userTableEl = document.querySelector(".userTable");

const noUserMessageEl = document.getElementById("noUserMessage");

let number = 1;
const users = [];
let editingRow = null;

function capitalizeWords(input) {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Fonction pour mettre à jour les numéros de la table
function updateTableNumbers() {
  const rows = userTableEl.querySelectorAll("tr");
  let updatedNumber = 1;
  rows.forEach((row) => {
    row.children[0].textContent = updatedNumber;
    updatedNumber++;
  });
  number = updatedNumber; // Met à jour le numéro global
}


// Fonction pour vérifier si le tableau est vide
function checkIfTableEmpty() {
  const rows = userTableEl.querySelectorAll("tr").length;
  if (rows === 0) {
    noUserMessageEl.style.display = "block"; // Affiche le message
  } else {
    noUserMessageEl.style.display = "none"; // Cache le message
  }
}

// Appeler la fonction au démarrage pour s'assurer que le message est visible si nécessaire
checkIfTableEmpty();

// L'evenement de soumission de formulaire
formularEl.addEventListener("submit", function (e) {
  e.preventDefault();

  // Récupération des valeurs des champs
  const firstNameValue = capitalizeWords(firstNameEl.value.trim());
  const lastNameValue = capitalizeWords(lastNameEl.value.trim());
  const emailValue = emailEl.value.trim().toLowerCase();
  const contactValue = contactEl.value;

  const validInput = /^[a-zA-Z\s]+$/;

  // Validation des champs texte uniquement
  if (!validInput.test(firstNameValue))
    return alert("Erreur : entrez un nom  correct 🙄");
  if (!validInput.test(lastNameValue))
    return alert("Erreur : entrez un prenom correct 🙄");


  const contactPattern = /^\d{9}$/;
  if (!contactPattern.test(contactValue)) {
    alert("Erreur : le numéro de téléphone doit contenir exactement 9 chiffres.");
    return; 
  }


  if (editingRow) {
    // Mise à jour de la ligne existante
    editingRow.children[1].textContent = firstNameValue;
    editingRow.children[2].textContent = lastNameValue;
    editingRow.children[3].textContent = emailValue;
    editingRow.children[4].textContent = contactValue;

    // Réinitialiser le mode édition
    editingRow = null;
    formularEl.reset();
    return;
  }

  // Création d'une nouvelle ligne dans le tableau
  const newLine = document.createElement("tr");
  newLine.innerHTML = `
    <td>${number}</td>
    <td>${firstNameValue}</td>
    <td>${lastNameValue}</td>
    <td>${emailValue}</td>
    <td>${contactValue}</td>
    <td><button class="update"><ion-icon name="pencil-sharp"></ion-icon></button> <button class="delete"><ion-icon name="trash-sharp"></ion-icon></button></td>`;

  // Ajout de la ligne au tableau
  userTableEl.appendChild(newLine);
  
  users.push({ number, firstNameValue, lastNameValue, emailValue, contactValue });
  number++;
  checkIfTableEmpty();

  console.log(users);

  // Optionnel : Réinitialiser le formulaire après soumission
  formularEl.reset();
});

// Gestion des clics sur le tableau
userTableEl.addEventListener("click", function (e) {
  const button = e.target.closest("button"); 

  if (!button) return;
  if (e.target.classList.contains("delete")) {
    // Suppression de la ligne
    const row = e.target.closest("tr");
    row.remove();

    checkIfTableEmpty();
    updateTableNumbers();
  } else if (e.target.classList.contains("update")) {
    // Mise à jour de la ligne
    const row = e.target.closest("tr");

    // Récupérer les valeurs actuelles
    const firstName = row.children[1].textContent.trim();
    const lastName = row.children[2].textContent.trim();
    const email = row.children[3].textContent.trim();
    const phone = row.children[4].textContent.trim();

    // Remplir les champs du formulaire
    firstNameEl.value = firstName;
    lastNameEl.value = lastName;
    emailEl.value = email;
    contactEl.value = phone;
//modification de la ligne en cours
    editingRow = row;
    // Supprimer la ligne en cours
    //row.remove();
    checkIfTableEmpty();

  }
});


