// utils.js - Funções utilitárias para manipulação do DOM e gerenciamento de popups

// Função para abrir um popup 
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  popupElement.style.display = "block";
  // Adicionar event listener para fechar com Escape
  document.addEventListener('keydown', handleEscClose);
}

// Função para fechar um popup
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  popupElement.style.display = "none";
  // Remover event listener para evitar vazamento de memória
  document.removeEventListener('keydown', handleEscClose);
}

// Função para lidar com fechamento por Escape
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}