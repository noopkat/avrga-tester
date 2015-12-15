import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    popUpAuth: function() {
      let childWindow = window.open('http://avrgat.noopkat.com', 'child', "width=500, height=500, location=no, menubar=no, scrollbars=no, status=no, toolbar=no");
    }
  }
});
