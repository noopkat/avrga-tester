import Ember from 'ember';

var boards = [
 { 
    human: 'Uno',
    machine: 'uno'
  }, 
  {
    human: 'Mega',
    machine: 'mega'
  }, 
  {
    human: 'Leonardo',
    machine: 'leonardo'
  },
  {
    human: 'Micro',
    machine: 'micro'
  },
  {
    human: 'Nano',
    machine: 'nano'
  },
  {
    human: 'Pro Mini',
    machine: 'pro-mini'
  },
  {   
    human: 'Duemilanove 168',
    machine: 'duemilanove168'
  },
  {
    human: 'Blend Micro',
    machine: 'blend-micro'
  },
  {
    human: 'tinyduino',
    machine: 'tinyduino'
  },
  {
    human: 'SparkFun Pro Micro',
    machine: 'sf-pro-micro'
  },
  {
    human: 'QDuino',
    machine: 'qduino'
  },
  {
    human: 'Pinoccio',
    machine: 'pinoccio'
  },
  {
    human: 'IMUDuino',
    machine: 'imuduino'
  }];

export default Ember.Route.extend({
  socketService: Ember.inject.service('websockets'),
  redirect(modal, transition) {
    var token  = this.cookie.getCookie('api-token');

    if (!token) {
      console.log('transitioning...');
      this.transitionTo('index');
    }
  },
  username: 'nobody',
  init: function() {
    this._super.apply(this, arguments);
 
    // get socket for use
    var socket = this.get('socketService').socketFor('ws://localhost:7000/');

    console.log(this.cookie.getCookie('api-token'));
    this.getUser().then((result) => { console.log(result); this.set('username', result); console.log(this.username) });

    // events
    socket.on('open', this.openHandler, this);
    socket.on('message', this.messageHandler, this);
    socket.on('close', function() {}, this);
  },
  openHandler: function(event) {
    console.log('On open event has been called: ' + JSON.stringify(event));
  },
  messageHandler: function(event) {
    console.log('Message:', JSON.parse(event.data));
  },
  getUser: function() {
    var self = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        type: 'GET',
        url: 'http://api.github.com/user?access_token='+ self.cookie.getCookie('api-token'),
        headers: { 'Accept': 'application/json' },
        success: function (data) {
          resolve(data.login);
        },
        error: function (request, textStatus, error) {
          console.log(error);
          reject(error);
        }
      });
    });
  },
  model() {
    return boards;
  }
});
