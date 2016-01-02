import Ember from 'ember';

export default Ember.Component.extend({
  reportService: Ember.inject.service('report-service'),
  userService: Ember.inject.service('user'),
  isOk: false,
  wantsAnon: false,
  reportNotes: '',
  contactOk: false,
  isSubmitDisabled: Ember.computed('isOk', function() {
    return !this.get('isOk');
  }),
  anonChanged: Ember.observer('wantsAnon', function() {
    let uname;
    if (this.wantsAnon) {
      uname = "anonymous"
    } else {
      uname = this.get('userService').username;
    }
    this.get('reportService').set('report.username', uname);
  }),
  postReport: function(report) {
    // post report to report API endpoint
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        type: 'POST',
        url: 'http://avrgat.noopkat.com/report',
        data: report,
        success: function () {
          resolve();
        },
        error: function (request, textStatus, error) {
          reject(error);
        }
      });
    });
  },
  actions: {
    gotoThanks: function() {
      this.sendAction('gotoThanks');
    },
    sendReport: function() {
      var fullReport = {
        contactOk: this.get('contactOk'),
        notes: this.get('reportNotes'),
        timestamp: Date.now()
      };

      var rkeys = this.get('reportService').report;
      for (var k in rkeys) {
        fullReport[k] = rkeys[k];
      }

      this.postReport(fullReport).then(() => {
        this.sendAction('gotoThanks');
      }, (error) => {
        console.log('error!', error);
      });
    }
  }
});
