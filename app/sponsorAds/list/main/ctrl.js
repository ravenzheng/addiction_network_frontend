function ctrl(SponsorService) {
  var list = this;
  function list_sponsors() {
    SponsorService.sponsorList().then(function (response) {
      list.sponsor = response;
    }).catch(function (err) {
      console.log('error: ' + err.data.errors);
    });
  }
  list_sponsors();

  list.actDect = function (id) {
    console.clear();
    SponsorService.updateStatus(id).then(function (response) {
      if (response.active) {
        list.active = response.active;
        $('#status-' + id).html("Deactivate");
      } else {
        list.active = response.active;
        $('#status-' + id).html("Activate");
      }

    }).catch(function (err) {
      console.log('error: ' + err);
    });
  }

}

module.exports = ['SponsorService', ctrl];