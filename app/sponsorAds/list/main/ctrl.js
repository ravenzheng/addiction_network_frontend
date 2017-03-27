function ctrl(SponsorService) {
  var list = this;

  list.totalAds = 0;
  list.totalPages = new Array();
  list.currentPage = 1;

  list.pageChanged = function (newPage) {
    list_sponsors(newPage);
    window.scrollTo(0, 100);
  };

  function list_sponsors(page) {
    SponsorService.sponsorList(page).then(function (response) {
      list.sponsor = response;

      list.totalPages = new Array(response.total_pages);
      for (var i = 1; i <= response.total_pages; i++) {
        list.totalPages.push(i);
      }
      list.currentPage = response.current_page;

    }).catch(function (err) {
      console.log('error: ' + err.data.errors);
    });
  }
  list_sponsors(1);
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
