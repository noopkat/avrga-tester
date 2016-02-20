import Ember from 'ember';

export default Ember.Route.extend({
  reportService: Ember.inject.service('report-service'),
  actions: {
    gotoThanks: function() {
      this.transitionTo('thanks');
    }
  },
  model() {
    return this.get('reportService.report');
  }
});
