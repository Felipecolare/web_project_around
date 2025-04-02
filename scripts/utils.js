// utils.js - Funções de utilidade para manipulação de popups

/**
 * Abre um popup adicionando uma classe para exibição
 * @param {HTMLElement} popup - Elemento do popup a ser aberto
 */
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.style.display = "block";
  document.addEventListener('keydown', handleEscClose);
}

/**
 * Fecha um popup removendo a classe de exibição
 * @param {HTMLElement} popup - Elemento do popup a ser fechado
 */
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.style.display = "none";
  document.removeEventListener('keydown', handleEscClose);
}

/**
 * Manipulador de evento para fechar popups com a tecla Escape
 * @param {KeyboardEvent} evt - Evento de teclado
 */
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}