import Ember from 'ember';

export default Ember.Component.extend({
  reportService: Ember.inject.service('report-service'),
  userService: Ember.inject.service('user'),
  isOk: false,
  wantsAnon: false,
  reportNotes: '',
  contactOk: false,
  errorString: '',
  isSubmitDisabled: Ember.computed('isOk', function() {
    return !this.get('isOk');
  }),
  anonChanged: Ember.observer('wantsAnon', function() {
    let uname;
    if (this.wantsAnon) {
      uname = 'anonymous';
    } else {
      uname = this.get('userService').username;
    }
    this.get('reportService').set('report.username', uname);
  }),
  postReport: function(report) {
    this.set('errorString', '');
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
          reject(error, textStatus);
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
        this.set('errorString', `Oops! Something went wrong when trying to submit the report. ${error}`);
      });
    }
  }
});
