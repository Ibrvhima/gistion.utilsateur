const formularEl = document.querySelector(".formulaire");
const firstNameEl = document.querySelector(".fname");
const lastNameEl = document.querySelector(".lname");
const emailEl = document.querySelector(".email");
const contactEl = document.querySelector(".contact");
const userTableEl = document.querySelector(".userTable");
const noUserMessageEl = document.getElementById("noUserMessage");

const moonIcon = document.getElementById("moon-icon");
const sunIcon = document.getElementById("sun-icon");

let number = 1;
const users = [];
let editingRow = null;

function capitalizeWords(input) {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function updateTableNumbers() {
  const rows = userTableEl.querySelectorAll("tr");
  let updatedNumber = 1;
  rows.forEach((row) => {
    row.children[0].textContent = updatedNumber;
    updatedNumber++;
  });
  number = updatedNumber;
}

function checkIfTableEmpty() {
  const rows = userTableEl.querySelectorAll("tr").length;
  if (rows === 0) {
    noUserMessageEl.style.display = "block";
  } else {
    noUserMessageEl.style.display = "none";
  }
}

checkIfTableEmpty();

formularEl.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstNameValue = capitalizeWords(firstNameEl.value.trim());
  const lastNameValue = capitalizeWords(lastNameEl.value.trim());
  const emailValue = emailEl.value.trim().toLowerCase();
  const contactValue = contactEl.value;

  const validInput = /^[a-zA-Z\s]+$/;

  if (!validInput.test(firstNameValue))
    return alert("Erreur : entrez un nom correct 🙄");
  if (!validInput.test(lastNameValue))
    return alert("Erreur : entrez un prénom correct 🙄");

  const contactPattern = /^\d{9}$/;
  if (!contactPattern.test(contactValue)) {
    alert(
      "Erreur : le numéro de téléphone doit contenir exactement 9 chiffres."
    );
    return;
  }

  if (editingRow) {
    editingRow.children[1].textContent = firstNameValue;
    editingRow.children[2].textContent = lastNameValue;
    editingRow.children[3].textContent = emailValue;
    editingRow.children[4].textContent = contactValue;

    editingRow = null;
    formularEl.reset();
    return;
  }

  const newLine = document.createElement("tr");
  newLine.innerHTML = `
    <td>${number}</td>
    <td>${firstNameValue}</td>
    <td>${lastNameValue}</td>
    <td>${emailValue}</td>
    <td>${contactValue}</td>
    <td><button class="update btn btn-warning btn-sm">Mettre à jour</button> 
        <button class="delete btn btn-danger btn-sm ">Supprimer</button></td>`;

  userTableEl.appendChild(newLine);

  users.push({
    number,
    firstNameValue,
    lastNameValue,
    emailValue,
    contactValue,
  });
  number++;
  checkIfTableEmpty();

  console.log(users);

  formularEl.reset();
  firstNameEl.focus();
});

userTableEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const row = e.target.closest("tr");
    row.remove();

    checkIfTableEmpty();
    updateTableNumbers();
  } else if (e.target.classList.contains("update")) {
    const row = e.target.closest("tr");

    const firstName = row.children[1].textContent.trim();
    const lastName = row.children[2].textContent.trim();
    const email = row.children[3].textContent.trim();
    const phone = row.children[4].textContent.trim();

    firstNameEl.value = firstName;
    lastNameEl.value = lastName;
    emailEl.value = email;
    contactEl.value = phone;

    editingRow = row;
    checkIfTableEmpty();
  }
});

moonIcon.addEventListener("click", () => {
  document.body.classList.add("dark");
  moonIcon.classList.add("hidden");
  sunIcon.classList.remove("hidden");
});

sunIcon.addEventListener("click", () => {
  document.body.classList.remove("dark");
  sunIcon.classList.add("hidden");
  moonIcon.classList.remove("hidden");
});
