import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  cookieMonster: Ember.inject.service('cookieMonster'),
  username: '',
  init: function() {
    this._super.apply(this, arguments);

    if (!this.username && !this.get('cookieMonster').eat('username')) {
      this.getUser().then((result) => {
        this.set('username', result);
        this.get('cookieMonster').bake('username', result, 30);
      }, () => {
        this.set('username', 'cool tester friend!');
      });
    } else {
      this.set('username', this.get('cookieMonster').eat('username'));
    }
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
