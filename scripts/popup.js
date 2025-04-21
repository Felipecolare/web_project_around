// Popup.js - Classe base para gerenciar popups

export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popup.classList.add('popup_opened');
      this._popup.style.display = "block";
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      this._popup.style.display = "none";
      document.removeEventListener('keydown', this._handleEscClose);
    }
  
    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  
    setEventListeners() {
      // Fechar ao clicar no botão de fechar
      this._popup.querySelector('.popup__close').addEventListener('click', () => {
        this.close();
      });
  
      // Fechar ao clicar na área sombreada
      this._popup.addEventListener('click', (evt) => {
        if (evt.target === this._popup || evt.target.classList.contains('popup__card')) {
          this.close();
        }
      });
    }
  }