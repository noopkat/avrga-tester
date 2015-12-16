import Ember from 'ember';

export default Ember.Route.extend({
  init: function() {
    this._super.apply(this, arguments);
    var self = this;

    window.addEventListener("message", (event) => {
      if (event.origin !== "http://avrgat.noopkat.com") {
        console.log(event.origin);
        return;
      }
      console.log('got message!', event.data);

      var cookie = this.get('cookie');

      cookie.setCookie('api-token', event.data)
        .then(this.transitionTo('start'));

    }, false);
  },
  actions: {
    popUpAuth: function() {
      window.open('http://avrgat.noopkat.com', 'child', "width=1000, height=700, location=no, menubar=no, scrollbars=no, status=no, toolbar=no");
    }
  }
});
