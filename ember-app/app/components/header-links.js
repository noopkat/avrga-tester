import Ember from 'ember';

export default Ember.Component.extend({
  userService: Ember.inject.service('user'),
  isLoggedIn: Ember.computed.oneWay('userService.isLoggedIn'),
  hideStartOverLink: false
});
