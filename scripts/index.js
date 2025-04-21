// Importações dos arquivos externos
import Card from './card.js';
import FormValidator from './formValidator.js';
import Section from './section.js';
import Popup from './popup.js';
import PopupWithImage from './popupWithImage.js';
import PopupWithForm from './popupWithForm.js';
import UserInfo from './userInfo.js';
import { openPopup, closePopup } from './utils.js';

// -----------------------------------------------------
// DADOS INICIAIS
// -------------------------------------

// Elementos do perfil
const modalProfile = document.querySelector(".container-profile");
const popupEditProfile = document.querySelector(".container-profile .input-profile");
const editButton = document.querySelector(".profile__button-edit");
const closeEditButton = document.querySelector(".container-profile .popup__close");
const saveProfile = document.querySelector(".input__submit-save");

// Elementos de adição de imagem
const modalImage = document.querySelector(".container-image");
const formImage = document.querySelector(".form-image");
const addImageButton = document.querySelector(".profile__button-add");
const addImage = document.querySelector(".input__submit-add");
const closeAddButton = document.querySelectorAll(".popup__close");
const inputImageTitle = document.querySelector(".input__text-title");
const inputImageUrl = document.querySelector(".input__text-image");

// Elementos de visualização de imagem ampliada
const modalBigImage = document.querySelector(".popup__bigImage-container");
const openBigImage = document.querySelector(".popup__open-bigImage");
const subtitleBigImage = document.querySelector(".popup__subtitle-bigImage");
const closeBigImage = document.querySelector(".popup__buttonClose-bigImage");

// Container para os cards
const cards = document.querySelector(".grid__content");

// -----------------------------------------------------
// FUNCIONALIDADE DO PERFIL
// -----------------------------------------------------

// Abrir popup de edição de perfil
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
  
  // Abrir o popup
  openPopup(modalProfile);
}

// Fechar popup de edição de perfil
function closeEditPopUp() {
  closePopup(modalProfile);
}

// Salvar informações do perfil
function addProfileInfo(event) {
  event.preventDefault();
  const name = document.querySelector(".profile__title");
  const job = document.querySelector(".profile__subtitle");
  const addName = document.querySelector(".input__text-name");
  const addJob = document.querySelector(".input__text-job");
  
  name.textContent = addName.value;
  job.textContent = addJob.value;
  
  popupEditProfile.reset();
  
  closePopup(modalProfile);
}

// -----------------------------------------------------
// FUNCIONALIDADE DE ADICIONAR IMAGEM
// -----------------------------------------------------

// Abrir popup de adicionar imagem
function appearAddPopUp() {
  // Resetar o formulário antes de abrir o popup
  if (formImage) {
    formImage.reset();
    if (imageFormValidator) {
      imageFormValidator.resetValidation();
    }
  }
  openPopup(modalImage);
}

// Fechar popup de adicionar imagem
function closeAddPopUp() {
  closePopup(modalImage);
}

// Adicionar nova imagem
function addImageCard(event) {
  event.preventDefault();
  
  // Verificar se ambos os campos estão preenchidos
  if (inputImageTitle.value.trim() !== "" && inputImageUrl.value.trim() !== "") {
    // Criar objeto com os dados do card
    const cardData = {
      name: inputImageTitle.value,
      link: inputImageUrl.value,
    };
    
    try {
      // Criar uma nova instância de Card
      const card = new Card(cardData, ".grid__template");
      const cardElement = card.generateCard();
      
      // Adicionar o card ao início da lista
      cards.prepend(cardElement);
      
      // Resetar o formulário
      formImage.reset();
      
      // Desabilitar o botão depois de adicionar
      if (addImage) {
        addImage.classList.add("formButton_disabled");
        addImage.setAttribute("disabled", true);
      }
      
      // Fechar o popup
      closePopup(modalImage);
    } catch (error) {
      console.error("Erro ao criar card:", error);
    }
  }
}

// -----------------------------------------------------
// FUNCIONALIDADE DE IMAGEM AMPLIADA
// -----------------------------------------------------

// Fechar popup de imagem ampliada
function closeBigImagePopUp() {
  closePopup(modalBigImage);
}

// -----------------------------------------------------
// DADOS INICIAIS
// -----------------------------------------------------

// Carregamento inicial de imagens
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

// -----------------------------------------------------
// CONFIGURAÇÃO DE VALIDAÇÃO
// -----------------------------------------------------

const validationConfig = {
  formSelector: '.popup__input, .form-image',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__submit',
  inactiveButtonClass: 'formButton_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClass: '.input__errorMessage'
};

// -----------------------------------------------------
// INICIALIZAÇÃO
// -----------------------------------------------------

// Inicializar validadores de formulário
const profileFormValidator = popupEditProfile ? new FormValidator(validationConfig, popupEditProfile) : null;
if (profileFormValidator) {
  profileFormValidator.enableValidation();
}

const imageFormValidator = formImage ? new FormValidator(validationConfig, formImage) : null;
if (imageFormValidator) {
  imageFormValidator.enableValidation();
}

// Adicionar os cards iniciais
initialCards.forEach((cardData) => {
  const card = new Card(cardData, ".grid__template");
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
});

// -----------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------

// Event listeners para o perfil
if (editButton) {
  editButton.addEventListener("click", appearEditPopUp);
} else {
  console.error("Botão de edição não encontrado no DOM");
}

if (closeEditButton) {
  closeEditButton.addEventListener("click", closeEditPopUp);
} else {
  console.error("Botão de fechar edição não encontrado no DOM");
}

if (popupEditProfile) {
  popupEditProfile.addEventListener('submit', addProfileInfo);
} else {
  console.error("Formulário de edição de perfil não encontrado no DOM");
}

modalProfile.addEventListener("click", function(event) {
  if (event.target === modalProfile) {
    closePopup(modalProfile);
  }
});

// Event listeners para adicionar imagem
if (addImageButton) {
  addImageButton.addEventListener("click", appearAddPopUp);
} else {
  console.error("Botão de adicionar imagem não encontrado no DOM");
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

if (formImage) {
  formImage.addEventListener('submit', addImageCard);
} else {
  console.error("Formulário de imagem não encontrado no DOM");
}

// Event listeners para imagem ampliada
if (closeBigImage) {
  closeBigImage.addEventListener("click", closeBigImagePopUp);
} else {
  console.error("Botão de fechar imagem grande não encontrado no DOM");
}

modalBigImage.addEventListener("click", function(event) {
  if (event.target === modalBigImage || event.target.classList.contains('popup__bigImage-card')) {
    closePopup(modalBigImage);
  }
});

// Logging para debug
console.log('Botão de edição:', editButton);
console.log('Formulário de perfil:', popupEditProfile);
console.log('Botão de fechar perfil:', closeEditButton);
console.log('Botão de fechar imagem grande:', closeBigImage);