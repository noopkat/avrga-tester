import Ember from 'ember';

export default Ember.Component.extend({
  socketService: Ember.inject.service('websockets'),
  boardChoice: '',
  buttonClass: 'starttest',
  buttonText: 'Start the test!',
  error: null,
  removeError: Ember.observer('boardChoice', function() {
    if (this.get('boardChoice')) {
      this.set('error', '');
    }
  }),
  actions: {
    startTest: function() {
      // if tester did not choose a board
      if (!this.get('boardChoice')) {
        this.set('error', 'Oops! Please select a board first.');
        return;
      }
      this.set('buttonClass', 'grey');
      this.set('buttonText', 'Running test...');
      // get socket
      var socket = this.get('socketService').socketFor(`ws://${window.location.host}`);
      // send the board choice through to the backend server
      socket.send(this.get('boardChoice'));
    },
    boardChange: function(selection, value) {
      this.set('boardChoice', value);
    }
  }
});
