import Ember from 'ember';

export default Ember.Service.extend({
  report: null,
  init() {
    this._super(...arguments);
    this.set('report', {});
  },
  create(message) {
    console.log('service report:', message);
    this.set('report', message);
  },
  empty() {
    this.set('report', {});
  }
});
