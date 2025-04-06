// Importações dos arquivos externos
import Card from './card.js';
import FormValidator from './formValidator.js';
import { openPopup, closePopup } from './utils.js';

// VARIABLES - Corrigido para corresponder exatamente ao HTML
const modalProfile = document.querySelector(".container-profile");
const saveProfile = document.querySelector(".input__submit-save");
const closeEditButton = document.querySelector(".container-profile .popup__close");
const popupEditProfile = document.querySelector(".container-profile .input-profile");
const editButton = document.querySelector(".profile__button-edit");
const modalImage = document.querySelector(".container-image");
const addImage = document.querySelector(".input__submit-add");
const closeAddButton = document.querySelectorAll(".popup__close");
const formImage = document.querySelector(".form-image"); // Corrigido para corresponder ao HTML
const addImageButton = document.querySelector(".profile__button-add");
const cards = document.querySelector(".grid__content");
const inputImageTitle = document.querySelector(".input__text-title");
const inputImageUrl = document.querySelector(".input__text-image");
const modalBigImage = document.querySelector(".popup__bigImage-container");
const openBigImage = document.querySelector(".popup__open-bigImage");
const subtitleBigImage = document.querySelector(".popup__subtitle-bigImage");
const closeBigImage = document.querySelector(".popup__buttonClose-bigImage"); // Corrigido para corresponder ao HTML

// OPEN POPUP - PROFILE EDIT
function appearEditPopUp() {
  // Preencher os campos do formulário com os valores atuais
  const name = document.querySelector(".profile__title");
  const job = document.querySelector(".profile__subtitle");
  const addName = document.querySelector(".input__text-name");
  const addJob = document.querySelector(".input__text-job");
  
  addName.value = name.textContent;
  addJob.value = job.textContent;
  
  // Resetar validação para o estado inicial correto
  profileFormValidator.resetValidation();
  
  // Substituindo pela função importada
  openPopup(modalProfile);
}

// Verificação se o botão existe antes de adicionar o evento
if (editButton) {
  editButton.addEventListener("click", appearEditPopUp);
} else {
  console.error("Botão de edição não encontrado no DOM");
}

// CLOSE POPUP - PROFILE EDIT
function closeEditPopUp() {
  closePopup(modalProfile);
}

// Adicionar evento apenas se o elemento existir
if (closeEditButton) {
  closeEditButton.addEventListener("click", closeEditPopUp);
} else {
  console.error("Botão de fechar edição não encontrado no DOM");
}

// Fechar ao clicar fora
modalProfile.addEventListener("click", function(event) {
  if (event.target === modalProfile) {
    closePopup(modalProfile);
  }
});

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
  // Não é necessário desabilitar o botão aqui, o FormValidator cuidará disso
  
  closePopup(modalProfile);
}

// Vincular o evento de submissão ao formulário de edição de perfil
if (popupEditProfile) {
  popupEditProfile.addEventListener('submit', addProfileInfo);
} else {
  console.error("Formulário de edição de perfil não encontrado no DOM");
}

// OPEN POPUP - ADD IMAGE
function appearAddPopUp() {
  openPopup(modalImage);
}

if (addImageButton) {
  addImageButton.addEventListener("click", appearAddPopUp);
} else {
  console.error("Botão de adicionar imagem não encontrado no DOM");
}

// CLOSE POPUP - ADD IMAGE
function closeAddPopUp() {
  closePopup(modalImage);
}

closeAddButton.forEach(button => {
  button.addEventListener("click", function() {
    const popup = button.closest(".popup__container");
    if (popup) {
      closePopup(popup);
    }
  });
});

modalImage.addEventListener("click", function(event) {
  if (event.target === modalImage) {
    closePopup(modalImage);
  }
});

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

// Modifique esta parte no arquivo index.js

// CLOSE POPUP BIG IMAGE
function closeBigImagePopUp() {
  closePopup(modalBigImage);
}

// Verificar se o elemento existe antes de adicionar o evento
if (closeBigImage) {
  closeBigImage.addEventListener("click", closeBigImagePopUp);
} else {
  console.error("Botão de fechar imagem grande não encontrado no DOM");
}

// Ajuste o event listener para fechar ao clicar fora da imagem
modalBigImage.addEventListener("click", function(event) {
  // Verifica se o clique foi diretamente no container do fundo (não na imagem ou nos elementos internos)
  if (event.target === modalBigImage || event.target.classList.contains('popup__bigImage-card')) {
    closePopup(modalBigImage);
  }
});

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
  if (addImage) {
    addImage.classList.add("formButton_disabled");
    addImage.setAttribute("disabled", true);
  }
  
  closePopup(modalImage);
}

if (formImage) {
  formImage.addEventListener('submit', addImageCard);
} else {
  console.error("Formulário de imagem não encontrado no DOM");
}

// Configuração de validação para os formulários
const validationConfig = {
  formSelector: '.popup__input, .form-image', // Corrigido para incluir ambos os formulários
  inputSelector: '.input__text',
  submitButtonSelector: '.input__submit',
  inactiveButtonClass: 'formButton_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClass: '.input__errorMessage'
};

// Inicializar validadores de formulário apenas se os elementos existirem
const profileFormValidator = popupEditProfile ? new FormValidator(validationConfig, popupEditProfile) : null;
if (profileFormValidator) {
  profileFormValidator.enableValidation();
}

const imageFormValidator = formImage ? new FormValidator(validationConfig, formImage) : null;
if (imageFormValidator) {
  imageFormValidator.enableValidation();
}

// Adicionar logging para debug
console.log('Botão de edição:', editButton);
console.log('Formulário de perfil:', popupEditProfile);
console.log('Botão de fechar perfil:', closeEditButton);
console.log('Botão de fechar imagem grande:', closeBigImage);