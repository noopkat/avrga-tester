import Ember from 'ember';

export default Ember.Component.extend({
  reportService: Ember.inject.service('report-service'),
  report: null,
  init: function() {
    this._super.apply(this, arguments);
    // get report from service
    this.set('report', this.get('reportService').report);
  }
});
