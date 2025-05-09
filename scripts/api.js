// api.js - Classe para gerenciar as requisições à API

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Método auxiliar para verificar a resposta da API
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // se o servidor retornar um erro, rejeite a promessa
    return Promise.reject(`Erro: ${res.status}`);
  }

  // Obter informações do usuário do servidor
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  // Obter cards do servidor
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  // Atualizar informações do perfil no servidor
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse);
  }

  // Adicionar um novo card ao servidor
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse);
  }

  // Método para excluir um card
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  // Método para adicionar like a um card
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  // Método para remover like de um card
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  // Método para atualizar a foto de perfil
  updateProfilePicture(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse);
  }

  // Método para obter dados iniciais (perfil e cards) em uma única chamada
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}