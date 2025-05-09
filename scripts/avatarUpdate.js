// avatarUpdate.js - Script para gerenciar a atualização da foto do perfil
import { openPopup, closePopup } from './utils.js';
import FormValidator from './formValidator.js';

// Configuração da validação
const validationConfig = {
  formSelector: '.popup__input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__submit',
  inactiveButtonClass: 'formButton_disabled',
  inputErrorClass: 'input__text_type_error',
  errorClass: '.input__errorMessage'
};

// Função para adicionar overlay de edição à foto do perfil
function setupProfileImageEdit() {
  // Obtendo o container da imagem de perfil
  const profileImageContainer = document.querySelector('.profile__card-image');
  
  if (!profileImageContainer) {
    console.error('Container de imagem de perfil não encontrado');
    return;
  }
  
  // Criando o overlay de edição
  const editOverlay = document.createElement('div');
  editOverlay.classList.add('profile__image-edit-overlay');
  
  // Adicionando texto ao overlay
  const editText = document.createElement('span');
  editText.classList.add('profile__image-edit-text');
  editText.textContent = 'Alterar a foto do perfil';
  
  // Adicionando o texto ao overlay e o overlay ao container
  editOverlay.appendChild(editText);
  profileImageContainer.appendChild(editOverlay);
  
  // Adicionando event listener para abrir o popup de edição de avatar
  profileImageContainer.addEventListener('click', openAvatarPopup);
}

// Função para abrir o popup de edição de avatar
function openAvatarPopup() {
  const avatarPopup = document.querySelector('.container-avatar');
  const avatarForm = document.querySelector('.input-avatar');
  const avatarInput = document.querySelector('.input__text-avatar');
  
  // Resetar o formulário
  if (avatarForm) {
    avatarForm.reset();
  }
  
  // Resetar a validação
  if (avatarFormValidator) {
    avatarFormValidator.resetValidation();
  }
  
  // Abrir o popup
  openPopup(avatarPopup);
}

// Função para processar a atualização da foto do perfil
function updateProfileAvatar(event) {
  event.preventDefault();
  
  const avatarInput = document.querySelector('.input__text-avatar');
  const avatarUrl = avatarInput.value;
  const submitButton = event.target.querySelector('.input__submit-avatar');
  const originalText = submitButton.textContent;
  
  // Atualizar o botão para indicar carregamento
  submitButton.textContent = 'Salvando...';
  
  // Obter o token de autenticação definido no index.js
  // Assumindo que ele está disponível globalmente ou podemos obtê-lo
  const token = 'd5a7c3b5-7db3-4a0a-b15e-29868a98a8e2'; // Use o mesmo token do seu index.js
  
  // Enviar solicitação de atualização para a API
  fetch('https://around-api.pt-br.tripleten-services.com/v1/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Atualizar a imagem do perfil na página
    const profileImage = document.querySelector('.profile__image');
    if (profileImage) {
      profileImage.src = data.avatar;
    }
    
    // Fechar o popup
    const avatarPopup = document.querySelector('.container-avatar');
    closePopup(avatarPopup);
  })
  .catch(error => {
    console.error('Erro ao atualizar a foto do perfil:', error);
  })
  .finally(() => {
    // Restaurar o texto original do botão
    submitButton.textContent = originalText;
  });
}

// Inicializar o validador de formulário para o popup de avatar
const avatarForm = document.querySelector('.input-avatar');
const avatarFormValidator = avatarForm ? new FormValidator(validationConfig, avatarForm) : null;

if (avatarFormValidator) {
  avatarFormValidator.enableValidation();
}

// Adicionar event listener para o envio do formulário
const avatarFormElement = document.querySelector('.input-avatar');
if (avatarFormElement) {
  avatarFormElement.addEventListener('submit', updateProfileAvatar);
}

// Adicionar event listener para fechar o popup
const closeAvatarButton = document.querySelector('.container-avatar .popup__close');
if (closeAvatarButton) {
  closeAvatarButton.addEventListener('click', () => {
    const avatarPopup = document.querySelector('.container-avatar');
    closePopup(avatarPopup);
  });
}

// Adicionar event listener para fechar o popup ao clicar fora
const avatarPopup = document.querySelector('.container-avatar');
if (avatarPopup) {
  avatarPopup.addEventListener('click', event => {
    if (event.target === avatarPopup) {
      closePopup(avatarPopup);
    }
  });
}

// Inicializar o overlay de edição quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', setupProfileImageEdit);

// Também exportar as funções para uso em outros módulos se necessário
export { setupProfileImageEdit, openAvatarPopup, updateProfileAvatar };