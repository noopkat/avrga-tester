import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});


Router.map(function() {
  this.route('start');
  this.route('logout');
  this.route('about');
  this.route('help');
  this.route('report');
  this.route('thanks');
  this.route('privacy');
});

export default Router;
