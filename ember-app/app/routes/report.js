import Ember from 'ember';

export default Ember.Route.extend({
  reportService: Ember.inject.service('report-service'),
  cookieMonster: Ember.inject.service('cookieMonster'),
  actions: {
    gotoThanks: function() {
      this.transitionTo('thanks');
    }
  }
});
