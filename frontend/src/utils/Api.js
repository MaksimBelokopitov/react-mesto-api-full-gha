import React from "react";
 
 class Api extends React.Component {
    constructor(props) {
        super(props);
        this._url = props.url;
        this._headers = props.headers;
    };

    _getRequest (url, options) {
        return fetch(url, options)
        .then((res) => {
            if(res.ok) {
                return res.json()
            }
            throw new Error('Что-то пошло не так...')
        });
    };

    getUserInfo(){
       return this._getRequest(`${this._url}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers
       })
    };

    getInitialCards(){
        return this._getRequest(`${this._url}/cards`, {
          method: 'GET',
          credentials: 'include',
          headers: this._headers
          })
      };

    getPageData(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    };
    
    setUserAvatar(link){
      return this._getRequest(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers, 
        body: JSON.stringify({
            avatar: link.avatar
          })
      });
    };

    setUserInfo(data){
      return this._getRequest(`${this._url}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers, 
        body: JSON.stringify({
          name: data.name,
          about: data.about
          })
        });
    };

    createNewCard(data){
        return this._getRequest(`${this._url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers, 
            body: JSON.stringify({
              name: data.name,
              link: data.link
              })
            }) ; 
    };

    deleteCard(data){
        return this._getRequest(`${this._url}/cards/${data}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: this._headers, 
          })  
    };

   changeLikeStatus(data, status){
    if(status) {
      return this._getRequest(`${this._url}/cards/${data}/likes`, {
          method: 'PUT',
          credentials: 'include',
          headers: this._headers, 
          })  
    }
    else{
      return this._getRequest(`${this._url}/cards/${data}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers, 
        })  
    };
    }
  }

 const api = new Api({ 
  url: 'https://api.mesta.nomoredomainsmonster.ru',
  credentials: 'include',
  headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  },
  });

  export default api
