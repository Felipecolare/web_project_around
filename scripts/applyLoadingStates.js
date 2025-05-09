// applyLoadingStates.js - Aplica os estados de carregamento a todos os formulários existentes
import { applyLoadingState } from './loadingStates.js';
import { api } from './index.js'; // Importa a instância da API do index.js

// Aguardar o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
  // 1. Formulário de edição de perfil
  const profileForm = document.querySelector('.input-profile');
  if (profileForm) {
    applyLoadingState(profileForm, function(event, form, hideLoadingCallback) {
      // Obter valores dos campos
      const nameInput = form.querySelector('.input__text-name');
      const jobInput = form.querySelector('.input__text-job');
      
      // Verificar se temos acesso à API
      if (typeof api !== 'undefined' && api.updateUserInfo) {
        // Enviar dados para a API
        api.updateUserInfo({
          name: nameInput.value,
          about: jobInput.value
        })
        .then(data => {
          // Atualizar a interface com os dados recebidos
          const profileTitle = document.querySelector('.profile__title');
          const profileSubtitle = document.querySelector('.profile__subtitle');
          
          if (profileTitle) profileTitle.textContent = data.name;
          if (profileSubtitle) profileSubtitle.textContent = data.about;
          
          // Fechar o popup
          const modalProfile = document.querySelector('.container-profile');
          if (modalProfile) {
            modalProfile.classList.remove('popup_opened');
            modalProfile.style.display = 'none';
          }
        })
        .catch(err => {
          console.error("Erro ao atualizar perfil:", err);
        })
        .finally(() => {
          // Esconder o estado de carregamento
          hideLoadingCallback();
          // Resetar o formulário
          form.reset();
        });
      } else {
        // Simular um atraso se não tivermos acesso à API
        setTimeout(() => {
          hideLoadingCallback();
          
          // Fechar o popup
          const modalProfile = document.querySelector('.container-profile');
          if (modalProfile) {
            modalProfile.classList.remove('popup_opened');
            modalProfile.style.display = 'none';
          }
        }, 1000);
      }
    }, 'Salvando...');
  }
  
  // 2. Formulário de adição de imagem/cartão
  const cardForm = document.querySelector('.form-image');
  if (cardForm) {
    applyLoadingState(cardForm, function(event, form, hideLoadingCallback) {
      // Obter valores dos campos
      const titleInput = form.querySelector('.input__text-title');
      const imageUrlInput = form.querySelector('.input__text-image');
      
      // Verificar se temos acesso à API
      if (typeof api !== 'undefined' && api.addCard) {
        // Enviar dados para a API
        api.addCard({
          name: titleInput.value,
          link: imageUrlInput.value
        })
        .then(newCardData => {
          // Criar um novo card com os dados (Esta parte depende da implementação específica)
          // e adicionar à página
          
          // Fechar o popup
          const modalImage = document.querySelector('.container-image');
          if (modalImage) {
            modalImage.classList.remove('popup_opened');
            modalImage.style.display = 'none';
          }
        })
        .catch(err => {
          console.error("Erro ao adicionar cartão:", err);
        })
        .finally(() => {
          // Esconder o estado de carregamento
          hideLoadingCallback();
          // Resetar o formulário
          form.reset();
        });
      } else {
        // Simular um atraso se não tivermos acesso à API
        setTimeout(() => {
          hideLoadingCallback();
          
          // Fechar o popup
          const modalImage = document.querySelector('.container-image');
          if (modalImage) {
            modalImage.classList.remove('popup_opened');
            modalImage.style.display = 'none';
          }
        }, 1000);
      }
    }, 'Criando...');
  }
  
  // 3. Formulário de atualização da foto de perfil
  const avatarForm = document.querySelector('.input-avatar');
  if (avatarForm) {
    applyLoadingState(avatarForm, function(event, form, hideLoadingCallback) {
      // Obter valor do campo
      const avatarUrlInput = form.querySelector('.input__text-avatar');
      
      // Verificar se temos acesso à API
      if (typeof api !== 'undefined' && api.updateProfilePicture) {
        // Enviar dados para a API
        api.updateProfilePicture(avatarUrlInput.value)
        .then(data => {
          // Atualizar a imagem do perfil na página
          const profileImage = document.querySelector('.profile__image');
          if (profileImage && data.avatar) {
            profileImage.src = data.avatar;
          }
          
          // Fechar o popup
          const modalAvatar = document.querySelector('.container-avatar');
          if (modalAvatar) {
            modalAvatar.classList.remove('popup_opened');
            modalAvatar.style.display = 'none';
          }
        })
        .catch(err => {
          console.error("Erro ao atualizar foto de perfil:", err);
        })
        .finally(() => {
          // Esconder o estado de carregamento
          hideLoadingCallback();
          // Resetar o formulário
          form.reset();
        });
      } else {
        // Simular um atraso se não tivermos acesso à API
        setTimeout(() => {
          hideLoadingCallback();
          
          // Fechar o popup
          const modalAvatar = document.querySelector('.container-avatar');
          if (modalAvatar) {
            modalAvatar.classList.remove('popup_opened');
            modalAvatar.style.display = 'none';
          }
        }, 1000);
      }
    }, 'Salvando...');
  }
});