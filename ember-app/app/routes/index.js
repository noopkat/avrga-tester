import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service('user'),
  apiDomain: 'http://avrgat.noopkat.com',
  redirect() {
    var token  = this.get('userService').token;

    // if tester is logged in, bump them back to the start page
    if (token) {
      this.transitionTo('start');
    }
  },
  init: function() {
    this._super.apply(this, arguments);
    // start listening for window messaging
    this.messageListen();
  },
  messageListen: function() {
    var handler = this.get('messageAction');
    // listen for authentication success message
    window.addEventListener('message', handler.bind(this), false);
  },
  messageAction: function(event) {
    // boot out if it's not from where we're expecting
    if (event.origin !== this.get('apiDomain')) { return; }
    var handler = this.get('messageAction');
    // remove listener - we no longer need it
    window.removeEventListener('message', handler);
    // create a cookie and store the github token
    this.get('userService').createToken(event.data);
    // redirect
    this.transitionTo('start');
  },
  actions: {
    popUpAuth: function() {
      // open remote auth url in a new window (hooray cross origin security)
      window.open(this.apiDomain, 'child', 'width=1000, height=700, location=no, menubar=no, scrollbars=no, status=no, toolbar=no');
    }
  }
});
