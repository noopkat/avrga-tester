import Ember from 'ember';

export default Ember.Route.extend({
  cookieMonster: Ember.inject.service('cookieMonster'),
  apiDomain: 'http://avrgat.noopkat.com',
  init: function() {
    this._super.apply(this, arguments);
    var self = this;

    // start listening for window messaging
    this.messageListen();
  },
  messageListen: function() {
    // listen for authentication success message
    window.addEventListener('message', () => {
      // boot out if it's not from where we're expecting
      if (event.origin !== this.apiDomain) { return; }

      // remove listener - we no longer need it
      window.removeEventListener('message');
      // create a cookie and store the github token
      this.get('cookieMonster').bake('api-token', event.data, 30);
      // redirect
      this.transitionTo('start');
    }, false);
  },
  actions: {
    popUpAuth: function() {
      // open remote auth url in a new window (hooray cross origin security)
      window.open(this.apiDomain, 'child', 'width=1000, height=700, location=no, menubar=no, scrollbars=no, status=no, toolbar=no');
    }
  }
});
