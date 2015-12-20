import Ember from 'ember';

export default Ember.Component.extend({
  reportService: Ember.inject.service('report-service'),
  cookieMonster: Ember.inject.service('cookieMonster'),
  isOk: false,
  wantsInvite: false,
  reportNotes: '',
  init: function() {
    this._super.apply(this, arguments);
  },
  postReport: function(report) {
    var self = this;

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
    sendReport: function() {
      console.log(this.get('isOk'), this.get('wantsInvite'), this.get('reportNotes'));

      var fullReport = {
        username: this.get('cookieMonster').eat('username'),
        notes: this.get('reportNotes'),
        timestamp: Date.now()
      };

      var rkeys = this.get('reportService').report;
      for (var k in rkeys) {
        fullReport[k] = rkeys[k];
      }

      console.log('fullreport:', fullReport);

      this.postReport(fullReport).then(() => {
        console.log('success');
      }, (error) => {
        console.log('error!', error);
      });

    }
  }
});
