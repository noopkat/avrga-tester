import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  cookieMonster: Ember.inject.service('cookieMonster'),
  username: '',
  init: function() {
    this._super.apply(this, arguments);
    this.getUser().then((result) => { console.log(result); this.set('username', result); console.log(this.username) });
  },
  getUser: function() {
    var self = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        type: 'GET',
        url: 'http://api.github.com/user?access_token='+ self.get('cookieMonster').eat('api-token'),
        headers: { 'Accept': 'application/json' },
        success: function (data) {
          resolve(data.login);
        },
        error: function (request, textStatus, error) {
          console.log(error);
          reject(error);
        }
      });
    });
  }
});
