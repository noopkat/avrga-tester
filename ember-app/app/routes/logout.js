import Ember from 'ember';

export default Ember.Route.extend({
  cookieMonster: Ember.inject.service('cookieMonster'),
  redirect(modal, transition) {
    // clear github token cookie
    this.get('cookieMonster').burn('api-token');
    // redirect
    this.transitionTo('index');
  }
});
