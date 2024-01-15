export const BASE_URL = 'https://api.mesta.nomoredomainsmonster.ru';

function getRequest(url, options) {
  return fetch(url, options)
  .then((res) => {
      if(res.ok) {
          return res.json()
      }
      throw new Error('Что-то пошло не так...')
  });
}

export const register = (password, email) => {
  return getRequest(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
};

export const authorize = (email, password) => {
  return getRequest(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((data) => {
    localStorage.setItem('jwt', data.token)
      return data;
    })
  };

  export const checkToken =(token) => {
    console.log(token);
    return getRequest(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Autorization': token
      },
    })
  };
  
