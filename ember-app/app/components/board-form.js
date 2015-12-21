import Ember from 'ember';

export default Ember.Component.extend({
  socketService: Ember.inject.service('websockets'),
  boardChoice: '',
  buttonClass: 'starttest',
  buttonText: 'Start the test!',
  actions: {
    startTest: function() {
      // if tester did not choose a board
      if (!this.boardChoice) {
        // todo: replace this silly alert with a helpful UI error
        return alert('please select a board');
      }
      this.set('buttonClass', 'grey');
      this.set('buttonText', 'Running test...');
      // get socket
      var socket = this.get('socketService').socketFor('ws://localhost:7000/');
      // send the board choice through to the backend server
      socket.send(this.get('boardChoice'));
    },
    boardChange: function(selection, value) {
      this.set('boardChoice', value);
    }
  }
});
