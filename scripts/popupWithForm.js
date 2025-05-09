// PopupWithForm.js - Classe para popups com formulários, estende a classe Popup

import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('form');
    this._inputList = Array.from(this._form.querySelectorAll('.input__text'));
    this._submitButton = this._form.querySelector('.input__submit');
  }

  _getInputValues() {
    // Cria um objeto com os valores de todos os campos
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.id] = input.value;
    });
    return formValues;
  }

  open() {
    super.open();
    // Garantir que o formulário esteja em um estado consistente
    if (this._submitButton) {
      this._submitButton.removeAttribute('disabled');
    }
  }

  setEventListeners() {
    super.setEventListeners();
    
    // Adicionar handler para o envio do formulário
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      // Salvar o texto original do botão
      const originalText = this._submitButton ? this._submitButton.textContent : '';
      
      // Alterar o texto para indicar que está processando
      if (this._submitButton) {
        this._submitButton.textContent = originalText.includes('Salvar') ? 'Salvando...' : 'Criando...';
      }
      
      // Chamar o callback com os valores do formulário
      this._submitCallback(this._getInputValues())
        .then(() => {
          this.close();
        })
        .finally(() => {
          // Restaurar o texto original do botão
          if (this._submitButton) {
            this._submitButton.textContent = originalText;
          }
        });
    });
  }

  close() {
    super.close();
    // Resetar o formulário ao fechar
    this._form.reset();
  }
}