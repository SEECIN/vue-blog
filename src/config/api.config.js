export default {
  'register': {
    url: 'admin/register',
    method: 'POST',
    rsaKey: 'password',
    setToken: true
  },
  'avatar': {
    url: '/upload/user',
    method: 'POST'
  },
  'getUserInfo': {
    url: '/user',
    method: 'GET',
  },
  'putUserInfo': {
    url: '/user',
    method: 'PUT',
  },
  'index': {
    url: '/index',
    method: 'GET',
    noMessage: true
  },
  'login': {
    url: 'admin/login',
    method: 'POST',
    rsaKey: 'password',
    setToken: true
  },
  'pubKey': {
    url: '/keys',
    method: 'GET'
  },
  'articles': {
    url: '/api/rest/articles',
    method: 'GET'
  },
  'postComment': {
    url: '/api/rest/comments',
    method: 'POST'
  },
  'postColumn': {
    url: '/api/rest/columns',
    method: 'POST'
  },
  'postArticle': {
    url: '/api/rest/articles',
    method: 'POST'
  },
  'getArticleById': {
    rest: true,
    url: '/api/rest/articles/:id',
    method: 'GET'
  },
  'column': {
    url: '/api/rest/columns',
    method: 'GET'
  },
  'articleLikes': {
    url: '/likes/:id',
    method: 'POST',
    rest: true
  }
}