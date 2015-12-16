import Ember from 'ember';

export default Ember.Route.extend({
  redirect(modal, transition) {
    this.cookie.removeCookie('api-token');
    this.transitionTo('index');
  }
});
