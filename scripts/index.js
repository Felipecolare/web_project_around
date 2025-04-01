// EXISTING CODE FROM YOUR CURRENT INDEX.JS
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
  modalProfile.style.display = "block";
}
editButton.addEventListener("click", appearEditPopUp);
// CLOSE POPUP - PROFILE EDIT
function closeEditPopUp(event) {
  if (event.target == closeEditButton) {
    modalProfile.style.display = "none";
  }
  if (event.target == modalProfile) {
    modalProfile.style.display = "none";
  }
}
closeEditButton.addEventListener("click", closeEditPopUp);
modalProfile.addEventListener("click", closeEditPopUp);
function closeEditPopupWithEsc(event) {
  if (event.key == "Escape") {
    modalProfile.style.display = "none";
  }
}
document.addEventListener("keydown", closeEditPopupWithEsc);
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
  modalProfile.style.display = "none";
}
popupEditProfile.addEventListener("submit", addProfileInfo);
// OPEN POPUP - ADD IMAGE
function appearAddPopUp() {
  modalImage.style.display = "block";
}
addImageButton.addEventListener("click", appearAddPopUp);
// CLOSE POPUP - ADD IMAGE
function closeAddPopUp(event) {
  if (event.target == closeAddButton) {
    modalImage.style.display = "none";
  }
  if (event.target == modalImage) {
    modalImage.style.display = "none";
  }
}
closeAddButton.addEventListener("click", closeAddPopUp);
modalImage.addEventListener("click", closeAddPopUp);
function closeAddPopupWithEsc(event) {
  if (event.key == "Escape") {
    modalImage.style.display = "none";
  }
}
document.addEventListener("keydown", closeAddPopupWithEsc);
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
// CARDS IMAGE GRID
initialCards.forEach((card) => {
  const newCard = createCard(card);
  cards.prepend(newCard);
});
function createCard(card) {
  const cardTemplate = document.querySelector(".grid__template").content;
  const cardElement = cardTemplate.querySelector(".grid__card").cloneNode(true);
  cardElement.querySelector(".grid__card-title").textContent = card.name;
  cardElement.querySelector(".grid__card-image").setAttribute("src", card.link);
  cardElement.querySelector(".grid__card-image").setAttribute("alt", card.name);
  // HEART(LIKE) BUTTON
  cardElement.querySelectorAll(".grid__button-heart").forEach((buttonHeart) => {
    buttonHeart.addEventListener("click", (event) => {
      if (event.target.classList.contains("button-heart-unliked")) {
        cardElement.querySelector(".button-heart-liked").style.display =
          "block";
        cardElement.querySelector(".button-heart-unliked").style.display =
          "none";
      } else {
        cardElement.querySelector(".button-heart-unliked").style.display =
          "block";
        cardElement.querySelector(".button-heart-liked").style.display = "none";
      }
    });
  });
  // DELETE BUTTON
  cardElement
    .querySelector(".grid__card-delete")
    .addEventListener("click", (event) => {
      event.target.parentElement.remove();
    });
  // OPEN POPUP BIG IMAGE
  cardElement
    .querySelector(".grid__card-image")
    .addEventListener("click", (event) => {
      openBigImage.setAttribute("src", card.link);
      openBigImage.setAttribute("alt", card.name);
      subtitleBigImage.textContent = card.name;
      modalBigImage.style.display = "block";
    });
  return cardElement;
}
// CLOSE POPUP BIG IMAGE
function closeBigImagePopUp() {
  modalBigImage.style.display = "none";
}
closeBigImage.addEventListener("click", closeBigImagePopUp);
// ADD NEW CARD IMAGE
function addImageCard(event) {
  event.preventDefault();
  if (inputImageTitle.value != "" && inputImageUrl.value != "") {
    const newCard = createCard({
      name: inputImageTitle.value,
      link: inputImageUrl.value,
    });
    cards.prepend(newCard);
    inputImageTitle.value = "";
    inputImageUrl.value = "";
  }
  addImage.classList.add("formButton_disabled");
  addImage.setAttribute("disabled", true);
  modalImage.style.display = "none";
}

const formImage = document.querySelector('.form-image');

formImage.addEventListener('submit', addImageCard);

// NEW FEATURES FROM PASTE.TXT

// Card class for object-oriented implementation
class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector(".grid__card").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // Like button functionality
    this._element.querySelectorAll(".grid__button-heart").forEach((buttonHeart) => {
      buttonHeart.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("button-heart-unliked")) {
          this._element.querySelector(".button-heart-liked").style.display = "block";
          this._element.querySelector(".button-heart-unliked").style.display = "none";
        } else {
          this._element.querySelector(".button-heart-unliked").style.display = "block";
          this._element.querySelector(".button-heart-liked").style.display = "none";
        }
      });
    });

    // Delete button functionality
    this._element.querySelector(".grid__card-delete").addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });

    // Open large image popup
    this._element.querySelector(".grid__card-image").addEventListener("click", () => {
      openBigImage.setAttribute("src", this._link);
      openBigImage.setAttribute("alt", this._name);
      subtitleBigImage.textContent = this._name;
      openPopup(modalBigImage);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    // Set card content
    this._element.querySelector(".grid__card-title").textContent = this._name;
    const cardImage = this._element.querySelector(".grid__card-image");
    cardImage.setAttribute("src", this._link);
    cardImage.setAttribute("alt", this._name);
    
    return this._element;
  }
}

// Form validation class
class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`${this._errorClass}-${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('input__errorMessage_active');
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`${this._errorClass}-${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove('input__errorMessage_active');
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._toggleButtonState();
    
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    this._setEventListeners();
  }
}

// Utility functions for popups
function openPopup(popupElement) {
  popupElement.style.display = "block";
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popupElement) {
  popupElement.style.display = "none";
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup-container[style="display: block;"]');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function setupCloseButtons() {
  const closeButtons = document.querySelectorAll('.popup__close-button');
  closeButtons.forEach((button) => {
    const popup = button.closest('.popup-container');
    button.addEventListener('click', () => closePopup(popup));
  });
}

function setupOverlayCloseListeners() {
  const popups = document.querySelectorAll('.popup-container');
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target === popup) {
        closePopup(popup);
      }
    });
  });
}

// Initialize validation for existing forms
const validationConfig = {
  inputSelector: '.input__text',
  submitButtonSelector: '.input__submit',
  inactiveButtonClass: 'input__submit_inactive',
  inputErrorClass: 'input__text_type_error',
  errorClass: '.input__errorMessage'
};

// Initialize form validators if not already present
if (typeof profileFormValidator === 'undefined') {
  const profileFormValidator = new FormValidator(validationConfig, popupEditProfile);
  profileFormValidator.enableValidation();
}

if (typeof imageFormValidator === 'undefined') {
  const imageFormValidator = new FormValidator(validationConfig, formImage);
  imageFormValidator.enableValidation();
}

// Setup popup close functionality
setupCloseButtons();
setupOverlayCloseListeners();