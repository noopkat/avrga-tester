import Ember from 'ember';

export default Ember.Component.extend({
  socketService: Ember.inject.service('websockets'),
  boardChoice: '',
  actions: {
    startTest: function() {
      if (!this.boardChoice) {
        return alert('please select a board');
      }
      console.log('boardChoice', this.get('boardChoice'));
      var socket = this.get('socketService').socketFor('ws://localhost:7000/');
      socket.send(this.get('boardChoice'));
    },
    boardChange: function(selection, value) {
      this.set('boardChoice', value);
    }
  }
});
