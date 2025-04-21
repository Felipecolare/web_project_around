// PopupWithImage.js - Classe para popups de imagem, estende a classe Popup

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__open-bigImage');
    this._caption = this._popup.querySelector('.popup__subtitle-bigImage');
  }

  open(name, link) {
    // Configurar a imagem e legenda antes de abrir
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    
    // Chamar o método da classe pai para abrir o popup
    super.open();
  }
}