import Ember from 'ember';

export default Ember.Component.extend({
  reportService: Ember.inject.service('report-service'),
  report: null,
  init: function() {
    this._super.apply(this, arguments);
    this.set('report', this.get('reportService').report);
  }
});
