import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    gotoThanks: function() {
      this.transitionTo('thanks');
    }
  }
});
