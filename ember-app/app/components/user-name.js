import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  userService: Ember.inject.service('user'),
  username: Ember.computed.oneWay('userService.username'),
  init: function() {
    this._super.apply(this, arguments);
    console.log(this.get('username'));
    // if their username is set not in a cookie
    if (!this.get('username')) {
      // ask github for their username
      this.getUser().then((result) => {
        // create username  with github username
        this.get('userService').createUsername(result);
      }, () => {
        // if something went wrong, fill in name with nice fallback
        this.get('userService').createUsername('cool tester friend');
      });
    }
  },
  getUser: function() {
    var self = this;

    //ask github api for tester's username
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        type: 'GET',
        url: `http://api.github.com/user?access_token=${self.get('userService').token}`,
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
