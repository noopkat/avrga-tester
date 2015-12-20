import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  cookieMonster: Ember.inject.service('cookieMonster'),
  username: '',
  init: function() {
    this._super.apply(this, arguments);

    // if their username is set not in a cookie
    if (!this.username && !this.get('cookieMonster').eat('username')) {
      // ask github for their username
      this.getUser().then((result) => {
        this.set('username', result);
        // create username cookie with github username
        this.get('cookieMonster').bake('username', result, 30);
      }, () => {
        // if something went wrong, fill in name with nice fallback
        this.set('username', 'cool tester friend!');
      });
    } else {
      // if username is already in a cookie, set username prop only
      this.set('username', this.get('cookieMonster').eat('username'));
    }
  },
  getUser: function() {
    var self = this;

    //ask github api for tester's username
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        type: 'GET',
        url: `http://api.github.com/user?access_token=${self.get('cookieMonster').eat('api-token')}`,
        headers: { 'Accept': 'application/json' },
        success: function (data) {
          resolve(data.login);
        },
        error: function (request, textStatus, error) {
          reject(error);
        }
      });
    });
  }
});
