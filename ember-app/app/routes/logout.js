import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service('user'),
  redirect(modal, transition) {
    // clear github token cookie
    this.get('userService').empty();
    // redirect
    this.transitionTo('index');
  }
});
