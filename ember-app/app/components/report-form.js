import Ember from 'ember';
import uuid from 'npm:node-uuid';

export default Ember.Component.extend({
  reportService: Ember.inject.service('report-service'),
  cookieMonster: Ember.inject.service('cookieMonster'),
  isOk: false,
  wantsInvite: false,
  wantsAnon: false,
  reportNotes: '',
  isSubmitDisabled: Ember.computed('isOk', function() {
    return !this.get('isOk');
  }),
  anonChanged: Ember.observer('wantsAnon', function() {
    let uname;
    if (this.wantsAnon) {
      uname = uuid.v4();
    } else {
      uname = this.get('cookieMonster').eat('username');
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
        notes: this.get('reportNotes'),
        timestamp: Date.now()
      };

      var rkeys = this.get('reportService').report;
      for (var k in rkeys) {
        fullReport[k] = rkeys[k];
      }

      console.log('fullreport:', fullReport);

      this.postReport(fullReport).then(() => {
        this.sendAction('gotoThanks');
      }, (error) => {
        console.log('error!', error);
      });
    }
  }
});
