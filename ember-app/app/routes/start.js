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
    human: 'RedBear Blend Micro',
    machine: 'blend-micro'
  },
  {
    human: 'Tinyduino',
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
  reportService: Ember.inject.service('report-service'),
  socketService: Ember.inject.service('websockets'),
  cookieMonster: Ember.inject.service('cookieMonster'),
  redirect() {
    var token  = this.get('cookieMonster').eat('api-token');

    // if tester is not logged in, bump them back to sign in page
    if (!token) {
      this.transitionTo('index');
    }
  },
  init: function() {
    this._super.apply(this, arguments);
 
    // get socket for use
    var socket = this.get('socketService').socketFor('ws://localhost:7000/');

    // events
    socket.on('message', this.messageHandler, this);
  },
  messageHandler: function(event) {
    var message = JSON.parse(event.data);

    // if we got a report
    if (message.type === 'report') {
      // create new report in service
      this.get('reportService').create(message);
      // redirect
      this.transitionTo('report');
    }
  },
  model() {
    return boards;
  }
});
