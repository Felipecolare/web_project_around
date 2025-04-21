// Section.js - Classe responsável por renderizar uma lista de elementos na página

export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    // Renderiza todos os elementos iniciais
    renderItems() {
      this._items.forEach(item => {
        this._renderer(item);
      });
    }
  
    // Adiciona um elemento DOM ao container
    addItem(element) {
      this._container.prepend(element);
    }
  }