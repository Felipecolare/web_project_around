// Card.js - Classe para criação e gerenciamento de cards
import { openPopup } from './utils.js';

export default class Card {
  constructor(data, templateSelector, handleCardClick = null) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.querySelector(".grid__card-image").addEventListener("click", () => {
      if (this._handleCardClick) {
        // Usa o callback se fornecido
        this._handleCardClick(this._name, this._link);
      } else {
        // Comportamento original se não tiver callback
        const modalBigImage = document.querySelector(".popup__bigImage-container");
        const openBigImage = document.querySelector(".popup__open-bigImage");
        const subtitleBigImage = document.querySelector(".popup__subtitle-bigImage");
        
        openBigImage.setAttribute("src", this._link);
        openBigImage.setAttribute("alt", this._name);
        subtitleBigImage.textContent = this._name;
        openPopup(modalBigImage);
      }
    });
  }

  // Adicionando método para verificar se uma imagem carrega corretamente
  _checkImageLoading(imageElement) {
    return new Promise((resolve, reject) => {
      // Ouvinte para quando a imagem carregar com sucesso
      imageElement.addEventListener('load', () => {
        resolve(true);
      });
      
      // Ouvinte para quando houver erro no carregamento
      imageElement.addEventListener('error', () => {
        console.error(`Erro ao carregar imagem: ${this._link}`);
        // Definir uma imagem de fallback ou placeholder
        imageElement.src = "./images/image-placeholder.jpg";
        // Ou usar uma URL genérica de placeholder se não tiver uma imagem local
        // imageElement.src = "https://via.placeholder.com/282";
        resolve(false);
      });
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    // Set card content
    this._element.querySelector(".grid__card-title").textContent = this._name;
    const cardImage = this._element.querySelector(".grid__card-image");
    
    // Verificar se a URL da imagem está vazia ou é inválida
    if (!this._link || this._link.trim() === "") {
      cardImage.src = "./images/image-placeholder.jpg"; // Use uma imagem de placeholder
      // Ou usar uma URL genérica de placeholder se não tiver uma imagem local
      // cardImage.src = "https://via.placeholder.com/282";
    } else {
      // Configurar a imagem e verificar se carrega
      cardImage.src = this._link;
      this._checkImageLoading(cardImage);
    }
    
    cardImage.alt = this._name;
    
    return this._element;
  }
}