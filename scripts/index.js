// Importações dos arquivos externos
import Card from './card.js';
import FormValidator from './formValidator.js';
import Section from './section.js';
import Api from './api.js';
import { openPopup, closePopup } from './utils.js';
import './avatarUpdate.js';


// -----------------------------------------------------
// CONFIGURAÇÃO DA API
// -----------------------------------------------------
const token = 'd5a7c3b5-7db3-4a0a-b15e-29868a98a8e2'; // Substitua pelo seu token real

// Inicialização da API
const api = new Api({
  baseUrl: 'https://around-api.pt-br.tripleten-services.com/v1',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

// Exportar a instância da API para que outros módulos possam usá-la
export { api };

// O resto do seu código index.js continua aqui sem alterações...

// -----------------------------------------------------
// ELEMENTOS DO DOM
// -----------------------------------------------------
// Elementos do perfil
const modalProfile = document.querySelector(".container-profile");
const popupEditProfile = document.querySelector(".container-profile .input-profile");
const editButton = document.querySelector(".profile__button-edit");
const closeEditButton = document.querySelector(".container-profile .popup__close");
const profileNameInput = document.querySelector(".input__text-name");
const profileJobInput = document.querySelector(".input__text-job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// Elementos de adição de imagem
const modalImage = document.querySelector(".container-image");
const formImage = document.querySelector(".form-image");
const addImageButton = document.querySelector(".profile__button-add");
const closeAddButton = document.querySelectorAll(".popup__close");
const inputImageTitle = document.querySelector(".input__text-title");
const inputImageUrl = document.querySelector(".input__text-image");

// Elementos de visualização de imagem ampliada
const modalBigImage = document.querySelector(".popup__bigImage-container");
const openBigImage = document.querySelector(".popup__open-bigImage");
const subtitleBigImage = document.querySelector(".popup__subtitle-bigImage");
const closeBigImage = document.querySelector(".popup__buttonClose-bigImage");

// Elemento popup de confirmação
const confirmDeletePopup = document.querySelector('.popup__container_type_confirm');
const confirmDeleteButton = document.querySelector('.popup__confirm-button');

// Container para os cards
const cardsContainer = document.querySelector(".grid__content");

// -----------------------------------------------------
// VARIÁVEIS DE ESTADO
// -----------------------------------------------------
let currentUserId = null;
let cardToDelete = null;

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

// Inicializar validadores de formulário
const profileFormValidator = new FormValidator(validationConfig, popupEditProfile);
profileFormValidator.enableValidation();

const imageFormValidator = new FormValidator(validationConfig, formImage);
imageFormValidator.enableValidation();

// -----------------------------------------------------
// FUNÇÕES DO PERFIL
// -----------------------------------------------------
function appearEditPopUp() {
  // Preencher formulário com valores atuais
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileSubtitle.textContent;
  
  // Resetar a validação
  profileFormValidator.resetValidation();
  
  // Abrir o popup
  openPopup(modalProfile);
}

function closeEditPopUp() {
  closePopup(modalProfile);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  
  const saveButton = event.target.querySelector(".input__submit");
  const originalText = saveButton.textContent;
  saveButton.textContent = "Salvando...";
  
  api.updateUserInfo({
    name: profileNameInput.value,
    about: profileJobInput.value
  })
  .then(data => {
    // Atualizar a interface
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    closePopup(modalProfile);
  })
  .catch(error => {
    console.error("Erro ao atualizar perfil:", error);
  })
  .finally(() => {
    saveButton.textContent = originalText;
  });
}

// -----------------------------------------------------
// FUNÇÕES DE CARTÕES
// -----------------------------------------------------
function createCard(cardData) {
  // Verificar se existem os dados necessários
  if (!cardData || !cardData.name || !cardData.link) {
    console.error("Dados de cartão inválidos:", cardData);
    return null;
  }
  
  // Obter o elemento do template
  const cardTemplate = document.querySelector(".grid__template").content;
  const cardElement = cardTemplate.querySelector(".grid__card").cloneNode(true);
  
  // Preencher dados do cartão
  const cardTitle = cardElement.querySelector(".grid__card-title");
  const cardImage = cardElement.querySelector(".grid__card-image");
  const cardLikeButton = cardElement.querySelector(".button-heart-unliked");
  const cardLikedButton = cardElement.querySelector(".button-heart-liked");
  const cardDeleteButton = cardElement.querySelector(".grid__card-delete");
  
  // Definir conteúdo e atributos
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  
  // Armazenar ID do cartão para operações de API
  cardElement.dataset.id = cardData._id;
  
  // Verificar se o cartão é do usuário atual
  const isOwner = cardData.owner === currentUserId;
  
  // Mostrar/ocultar botão de exclusão
  if (!isOwner) {
    cardDeleteButton.style.display = 'none';
  }
  
  // Verificar se o cartão está curtido
  const isLiked = cardData.likes && Array.isArray(cardData.likes) && 
                  cardData.likes.some(userId => userId === currentUserId);
  
  // Configurar estado visual do botão de like
  if (isLiked) {
    cardLikedButton.style.display = "block";
    cardLikeButton.style.display = "none";
  } else {
    cardLikeButton.style.display = "block";
    cardLikedButton.style.display = "none";
  }
  
  // Adicionar event listeners
  // 1. Abrir imagem ampliada
  cardImage.addEventListener("click", () => {
    openBigImage.src = cardData.link;
    openBigImage.alt = cardData.name;
    subtitleBigImage.textContent = cardData.name;
    openPopup(modalBigImage);
  });
  
  // 2. Botão de like
  [cardLikeButton, cardLikedButton].forEach(button => {
    button.addEventListener("click", () => {
      const isCurrentlyLiked = cardLikedButton.style.display === "block";
      const likeAction = isCurrentlyLiked ? api.removeLike.bind(api) : api.addLike.bind(api);
      
      likeAction(cardData._id)
        .then(() => {
          // Alternar a visualização dos botões
          if (isCurrentlyLiked) {
            cardLikeButton.style.display = "block";
            cardLikedButton.style.display = "none";
          } else {
            cardLikedButton.style.display = "block";
            cardLikeButton.style.display = "none";
          }
        })
        .catch(error => {
          console.error(`Erro ao ${isCurrentlyLiked ? "remover" : "adicionar"} like:`, error);
        });
    });
  });
  
  // 3. Botão de excluir
  if (isOwner) {
    cardDeleteButton.addEventListener("click", () => {
      // Armazenar referência ao cartão para exclusão
      cardToDelete = cardElement;
      // Abrir popup de confirmação
      openPopup(confirmDeletePopup);
    });
  }
  
  return cardElement;
}

function handleConfirmDelete() {
  // Verificar se temos um cartão para excluir
  if (!cardToDelete) {
    closePopup(confirmDeletePopup);
    return;
  }
  
  const cardId = cardToDelete.dataset.id;
  const originalText = confirmDeleteButton.textContent;
  confirmDeleteButton.textContent = "Excluindo...";
  
  api.deleteCard(cardId)
    .then(() => {
      // Remover o cartão do DOM
      cardToDelete.remove();
      // Limpar referência
      cardToDelete = null;
      // Fechar popup
      closePopup(confirmDeletePopup);
    })
    .catch(error => {
      console.error("Erro ao excluir cartão:", error);
    })
    .finally(() => {
      confirmDeleteButton.textContent = originalText;
    });
}

// -----------------------------------------------------
// FUNÇÕES DO POPUP DE ADICIONAR CARTÃO
// -----------------------------------------------------
function appearAddPopUp() {
  // Resetar o formulário
  formImage.reset();
  imageFormValidator.resetValidation();
  openPopup(modalImage);
}

function closeAddPopUp() {
  closePopup(modalImage);
}

function handleAddCard(event) {
  event.preventDefault();
  
  const submitButton = event.target.querySelector(".input__submit");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Criando...";
  
  api.addCard({
    name: inputImageTitle.value,
    link: inputImageUrl.value
  })
  .then(newCard => {
    const cardElement = createCard(newCard);
    if (cardElement) {
      cardsContainer.prepend(cardElement);
    }
    closePopup(modalImage);
    formImage.reset();
  })
  .catch(error => {
    console.error("Erro ao adicionar cartão:", error);
  })
  .finally(() => {
    submitButton.textContent = originalText;
  });
}

// -----------------------------------------------------
// FUNÇÃO DE FECHAR POPUP DE IMAGEM AMPLIADA
// -----------------------------------------------------
function closeBigImagePopUp() {
  closePopup(modalBigImage);
}

// -----------------------------------------------------
// CARREGAR DADOS INICIAIS
// -----------------------------------------------------
api.getAppInfo()
  .then(([userData, initialCards]) => {
    // Armazenar ID do usuário
    currentUserId = userData._id;
    
    // Atualizar perfil
    profileTitle.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    
    // Renderizar cards
    initialCards.forEach(cardData => {
      const cardElement = createCard(cardData);
      if (cardElement) {
        cardsContainer.append(cardElement);
      }
    });
  })
  .catch(error => {
    console.error("Erro ao carregar dados iniciais:", error);
  });

// -----------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------
// Popups de perfil
editButton.addEventListener("click", appearEditPopUp);
closeEditButton.addEventListener("click", closeEditPopUp);
popupEditProfile.addEventListener("submit", handleProfileFormSubmit);

// Popup de adicionar cartão
addImageButton.addEventListener("click", appearAddPopUp);
formImage.addEventListener("submit", handleAddCard);

// Popup de confirmação de exclusão
confirmDeleteButton.addEventListener("click", handleConfirmDelete);

// Popup de imagem ampliada
closeBigImage.addEventListener("click", closeBigImagePopUp);

// Fechar popups clicando fora
modalProfile.addEventListener("click", (event) => {
  if (event.target === modalProfile) {
    closePopup(modalProfile);
  }
});

modalImage.addEventListener("click", (event) => {
  if (event.target === modalImage) {
    closePopup(modalImage);
  }
});

modalBigImage.addEventListener("click", (event) => {
  if (event.target === modalBigImage || event.target.classList.contains('popup__bigImage-card')) {
    closePopup(modalBigImage);
  }
});

confirmDeletePopup.addEventListener("click", (event) => {
  if (event.target === confirmDeletePopup) {
    closePopup(confirmDeletePopup);
  }
});

// Fechar todos os popups com a tecla Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopups = [modalProfile, modalImage, modalBigImage, confirmDeletePopup];
    openedPopups.forEach(popup => {
      if (popup.classList.contains("popup_opened")) {
        closePopup(popup);
      }
    });
  }
});

// Inicializar os botões de fechar em todos os popups
document.querySelectorAll(".popup__close").forEach(button => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup__container");
    if (popup) {
      closePopup(popup);
    }
  });
});