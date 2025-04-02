// EXISTING CODE FROM YOUR CURRENT INDEX.JS
// Importações dos arquivos externos
import Card from './card.js';
import FormValidator from './formValidator.js';
import { openPopup, closePopup } from './utils.js';

// VARIABLES
const modalProfile = document.querySelector(".container-profile");
const saveProfile = document.querySelector(".input__submit-save");
const closeEditButton = document.querySelector(".button-closeProfile");
const popupEditProfile = document.querySelector(".input-profile");
const editButton = document.querySelector(".profile__button-edit");
const modalImage = document.querySelector(".container-image");
const addImage = document.querySelector(".input__submit-add");
const closeAddButton = document.querySelector(".button-closeImage");
const popupAddImage = document.querySelector(".input-image");
const addImageButton = document.querySelector(".profile__button-add");
const cards = document.querySelector(".grid__content");
const inputImageTitle = document.querySelector(".input__text-title");
const inputImageUrl = document.querySelector(".input__text-image");
const modalBigImage = document.querySelector(".popup__bigImage-container");
const openBigImage = document.querySelector(".popup__open-bigImage");
const subtitleBigImage = document.querySelector(".popup__subtitle-bigImage");
const closeBigImage = document.querySelector(".popoup__buttonClose-bigImage");
// OPEN POPUP - PROFILE EDIT
function appearEditPopUp() {
  // Substituindo pela função importada
  openPopup(modalProfile);
}
editButton.addEventListener("click", appearEditPopUp);
// CLOSE POPUP - PROFILE EDIT
function closeEditPopUp(event) {
  if (event.target == closeEditButton) {
    // Substituindo pela função importada
    closePopup(modalProfile);
  }
  if (event.target == modalProfile) {
    // Substituindo pela função importada
    closePopup(modalProfile);
  }
}
closeEditButton.addEventListener("click", closeEditPopUp);
modalProfile.addEventListener("click", closeEditPopUp);
// Remoção da função closeEditPopupWithEsc pois já está em utils.js

// GET PROFILE INFOS FROM INPUT
function addProfileInfo(event) {
  event.preventDefault();
  const name = document.querySelector(".profile__title");
  const job = document.querySelector(".profile__subtitle");
  const addName = document.querySelector(".input__text-name");
  const addJob = document.querySelector(".input__text-job");
  name.textContent = addName.value;
  job.textContent = addJob.value;
  popupEditProfile.reset();
  saveProfile.classList.add("formButton_disabled");
  saveProfile.setAttribute("disabled", true);
  // Substituindo pela função importada
  closePopup(modalProfile);
}
popupEditProfile.addEventListener("submit", addProfileInfo);
// OPEN POPUP - ADD IMAGE
function appearAddPopUp() {
  // Substituindo pela função importada
  openPopup(modalImage);
}
addImageButton.addEventListener("click", appearAddPopUp);
// CLOSE POPUP - ADD IMAGE
function closeAddPopUp(event) {
  if (event.target == closeAddButton) {
    // Substituindo pela função importada
    closePopup(modalImage);
  }
  if (event.target == modalImage) {
    // Substituindo pela função importada
    closePopup(modalImage);
  }
}
closeAddButton.addEventListener("click", closeAddPopUp);
modalImage.addEventListener("click", closeAddPopUp);
// Remoção da função closeAddPopupWithEsc pois já está em utils.js

// INITIAL IMAGES - GRID CARD
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// CARDS IMAGE GRID - Alterado para usar a classe Card importada
initialCards.forEach((cardData) => {
  const card = new Card(cardData, ".grid__template");
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
});

// Removida a função createCard pois agora utilizamos a classe Card

// CLOSE POPUP BIG IMAGE
function closeBigImagePopUp() {
  // Substituindo pela função importada
  closePopup(modalBigImage);
}
closeBigImage.addEventListener("click", closeBigImagePopUp);

// ADD NEW CARD IMAGE
function addImageCard(event) {
  event.preventDefault();
  if (inputImageTitle.value != "" && inputImageUrl.value != "") {
    // Usado a classe Card em vez da função createCard
    const cardData = {
      name: inputImageTitle.value,
      link: inputImageUrl.value,
    };
    const card = new Card(cardData, ".grid__template");
    const cardElement = card.generateCard();
    cards.prepend(cardElement);
    
    inputImageTitle.value = "";
    inputImageUrl.value = "";
  }
  addImage.classList.add("formButton_disabled");
  addImage.setAttribute("disabled", true);
  // Substituindo pela função importada
  closePopup(modalImage);
}

const formImage = document.querySelector('.form-image');

formImage.addEventListener('submit', addImageCard);

// Configuração de validação para os formulários
const validationConfig = {
  formSelector: '.popup__input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__submit',
  inactiveButtonClass: 'formButton_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClass: '.input__errorMessage'
};

// Inicializar validadores de formulário
const profileFormValidator = new FormValidator(validationConfig, popupEditProfile);
profileFormValidator.enableValidation();

const imageFormValidator = new FormValidator(validationConfig, formImage);
imageFormValidator.enableValidation();

// Removidas as declarações redundantes de classes Card e FormValidator
// Removidas as funções de utilidade que agora são importadas de utils.js