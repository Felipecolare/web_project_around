// popupWithConfirmation.js - Classe para popups de confirmação, estende a classe Popup

import Popup from './popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmCallback) {
    super(popupSelector);
    this._confirmCallback = confirmCallback;
    this._confirmButton = this._popup.querySelector('.popup__confirm-button');
    this._cardId = null;
    this._cardElement = null;
  }

  setCardData(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    
    // Adicionar handler para o botão de confirmação
    this._confirmButton.addEventListener('click', () => {
      if (this._cardId && this._cardElement) {
        this._confirmCallback(this._cardId, this._cardElement);
      }
    });
  }
}