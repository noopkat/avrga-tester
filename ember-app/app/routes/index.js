import Ember from 'ember';

export default Ember.Route.extend({
  cookieMonster: Ember.inject.service('cookieMonster'),
  apiDomain: 'http://avrgat.noopkat.com',
  init: function() {
    this._super.apply(this, arguments);
    var self = this;

    this.messageListen();
  },
  messageListen: function() {
    window.addEventListener('message', () => {
      if (event.origin !== this.apiDomain) { return; }

      window.removeEventListener('message');
      this.get('cookieMonster').bake('api-token', event.data, 30);
      this.transitionTo('start');
    }, false);
  },
  actions: {
    popUpAuth: function() {
      window.open(this.apiDomain, 'child', 'width=1000, height=700, location=no, menubar=no, scrollbars=no, status=no, toolbar=no');
    }
  }
});
