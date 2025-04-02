// Card.js - Classe para criação e gerenciamento de cards
import { openPopup } from './utils.js';

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector(".grid__card").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // Like button functionality
    this._element.querySelectorAll(".grid__button-heart").forEach((buttonHeart) => {
      buttonHeart.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("button-heart-unliked")) {
          this._element.querySelector(".button-heart-liked").style.display = "block";
          this._element.querySelector(".button-heart-unliked").style.display = "none";
        } else {
          this._element.querySelector(".button-heart-unliked").style.display = "block";
          this._element.querySelector(".button-heart-liked").style.display = "none";
        }
      });
    });

    // Delete button functionality
    this._element.querySelector(".grid__card-delete").addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });

    // Open large image popup
    const modalBigImage = document.querySelector(".popup__bigImage-container");
    const openBigImage = document.querySelector(".popup__open-bigImage");
    const subtitleBigImage = document.querySelector(".popup__subtitle-bigImage");
    
    this._element.querySelector(".grid__card-image").addEventListener("click", () => {
      openBigImage.setAttribute("src", this._link);
      openBigImage.setAttribute("alt", this._name);
      subtitleBigImage.textContent = this._name;
      openPopup(modalBigImage);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    // Set card content
    this._element.querySelector(".grid__card-title").textContent = this._name;
    const cardImage = this._element.querySelector(".grid__card-image");
    cardImage.setAttribute("src", this._link);
    cardImage.setAttribute("alt", this._name);
    
    return this._element;
  }
}