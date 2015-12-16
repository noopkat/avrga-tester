import Ember from 'ember';

export default Ember.Route.extend({
  cookieMonster: Ember.inject.service('cookieMonster'),
  redirect(modal, transition) {
    this.get('cookieMonster').burn('api-token');
    this.transitionTo('index');
  }
});
