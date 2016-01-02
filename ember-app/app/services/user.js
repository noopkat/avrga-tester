import Ember from 'ember';

export default Ember.Service.extend({
  cookieMonster: Ember.inject.service('cookieMonster'),
  isLoggedIn: null,
  token: '',
  username: '',
  init() {
    this._super(...arguments);
    var u = this.get('cookieMonster').eat('username');
    var t = this.get('cookieMonster').eat('api-token');
    if (u) {
      this.set('username', u);
      this.set('isLoggedIn', true);
    }
    if (t) {
      this.set('token', t);
      this.set('isLoggedIn', true);
    }
  },
  createToken(token) {
    this.get('cookieMonster').bake('api-token', token, 60);
    this.set('token', token);
    this.set('isLoggedIn', true);
  },
  createUsername(username) {
    this.get('cookieMonster').bake('username', username, 60);
    this.set('username', username);
    this.set('isLoggedIn', true);
  },
  empty() {
    this.set('username', '');
    this.set('token', '');
    this.get('cookieMonster').burn('api-token');
    this.get('cookieMonster').burn('username');
    this.set('isLoggedIn', false);
  }
});
