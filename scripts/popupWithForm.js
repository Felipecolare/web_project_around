// PopupWithForm.js - Classe para popups com formulários, estende a classe Popup

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('form');
    this._inputList = Array.from(this._form.querySelectorAll('.input__text'));
  }

  _getInputValues() {
    // Cria um objeto com os valores de todos os campos
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.id] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    
    // Adicionar handler para o envio do formulário
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    // Resetar o formulário ao fechar
    this._form.reset();
  }
}