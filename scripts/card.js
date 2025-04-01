export default class Card {
    constructor(cardData, templateSelector) {
      this._name = cardData.name;
      this._link = cardData.link;
      this._templateSelector = templateSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.grid__card')
        .cloneNode(true);
      
      return cardElement;
    }
  
    _setEventListeners() {
      // Adicionar ouvinte para os botões de like
      const likeUnclicked = this._element.querySelector('.button-heart-unliked');
      const likeClicked = this._element.querySelector('.button-heart-liked');
      
      likeUnclicked.addEventListener('click', () => {
        this._handleLikeClick(likeUnclicked, likeClicked);
      });
      
      likeClicked.addEventListener('click', () => {
        this._handleUnlikeClick(likeUnclicked, likeClicked);
      });
      
      // Adicionar ouvinte para o botão de deletar
      this._element.querySelector('.grid__card-delete')
        .addEventListener('click', this._handleDeleteClick.bind(this));
      
      // Adicionar ouvinte para a imagem (abrir em modal)
      this._cardImage.addEventListener('click', this._handleImageClick.bind(this));
    }
  
    _handleLikeClick(unlikedBtn, likedBtn) {
      unlikedBtn.style.display = 'none';
      likedBtn.style.display = 'block';
    }
  
    _handleUnlikeClick(unlikedBtn, likedBtn) {
      likedBtn.style.display = 'none';
      unlikedBtn.style.display = 'block';
    }
  
    _handleDeleteClick() {
      this._element.remove();
      this._element = null;
    }
  
    _handleImageClick() {
      const popupBigImage = document.querySelector('.popup__bigImage-container');
      const popupImage = document.querySelector('.popup__open-bigImage');
      const popupSubtitle = document.querySelector('.popup__subtitle-bigImage');
      
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupSubtitle.textContent = this._name;
      
      popupBigImage.classList.add('popup__active');
      document.addEventListener('keydown', this._handleEscapeClose);
    }
  
    _handleEscapeClose(evt) {
      if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup__active');
        if (openedPopup) {
          openedPopup.classList.remove('popup__active');
          document.removeEventListener('keydown', this._handleEscapeClose);
        }
      }
    }
  
    generateCard() {
      // Criar elemento do cartão a partir do template
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.grid__card-image');
      
      // Preencher o cartão com dados
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._element.querySelector('.grid__card-title').textContent = this._name;
      
      // Esconder o botão de like clicado inicialmente
      this._element.querySelector('.button-heart-liked').style.display = 'none';
      
      // Configurar os listeners de eventos
      this._setEventListeners();
      
      // Retornar o elemento do cartão
      return this._element;
    }
  }