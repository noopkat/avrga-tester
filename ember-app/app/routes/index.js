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
  init: function() {
    this._super.apply(this, arguments);
 
    // get socket for use
    var socket = this.get('socketService').socketFor('ws://localhost:7000/');

    // events
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', function(event) {}, this);
  },
 
  myOpenHandler: function(event) {
    console.log('On open event has been called: ' + JSON.stringify(event));
  },
 
  myMessageHandler: function(event) {
    console.log('Message:', JSON.parse(event.data));
  },

  model() {
    return boards;
  }
});
