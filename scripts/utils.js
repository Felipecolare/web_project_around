// Funções de utilidade para manipulação de popups

export function openPopup(popupElement) {
    popupElement.classList.add('popup__active');
    document.addEventListener('keydown', handleEscClose);
  }
  
  export function closePopup(popupElement) {
    popupElement.classList.remove('popup__active');
    document.removeEventListener('keydown', handleEscClose);
  }
  
  // Handler para fechamento do popup com ESC
  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup__active');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }
  
  // Handler para fechamento do popup ao clicar fora
  export function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup__container') || 
        evt.target.classList.contains('popup__bigImage-container')) {
      closePopup(evt.target);
    }
  }
  
  // Configurar eventos de fechamento para todos os botões de fechar
  export function setupCloseButtons() {
    // Botões de fechar do popup de perfil
    const profileCloseBtn = document.querySelector('.popup__close');
    const profileCloseButtonDrag = document.querySelector('.button-closeProfile');
    const profileContainer = document.querySelector('.container-profile');
  
    profileCloseBtn.addEventListener('click', () => {
      closePopup(profileContainer);
    });
  
    profileCloseButtonDrag.addEventListener('click', () => {
      closePopup(profileContainer);
    });
  
    // Botões de fechar do popup de imagem
    const imageCloseBtn = document.querySelectorAll('.popup__close')[1];
    const imageCloseButtonDrag = document.querySelector('.button-closeImage');
    const imageContainer = document.querySelector('.container-image');
  
    imageCloseBtn.addEventListener('click', () => {
      closePopup(imageContainer);
    });
  
    imageCloseButtonDrag.addEventListener('click', () => {
      closePopup(imageContainer);
    });
  
    // Botão de fechar do popup de imagem grande
    const bigImageCloseBtn = document.querySelector('.popoup__buttonClose-bigImage');
    const bigImageContainer = document.querySelector('.popup__bigImage-container');
  
    bigImageCloseBtn.addEventListener('click', () => {
      closePopup(bigImageContainer);
    });
  }
  
  // Configurar fechamento de popups ao clicar no overlay
  export function setupOverlayCloseListeners() {
    const popups = document.querySelectorAll('.popup__container, .popup__bigImage-container');
    popups.forEach((popup) => {
      popup.addEventListener('mousedown', handleOverlayClose);
    });
  }