function ctrl(service) {
    var list = this;
    var auth = '';
    var i=1;
    service.getAuthtoken().then(function(res) {
        auth = res;
        list_sponsor(auth);

    }).catch(function(err) {
        console.log('error auth: ' + err.data.errors);
    });

    function list_sponsor(auth) {
        service.sponsorList(auth).then(function(response) {
            list.sponsors = response;
        }).catch(function(err) {
            console.log('error: ' + err.data.errors);
        });
    }
    list.status = [];
    list.status.show = 0;
    list.actDect = function(id) {
        console.clear();
        service.sponsorAdStatus(id, auth).then(function(response) {
            list.status.show = 1;
            if (response.active) {
                list.status.msg = "Activated";
            } else {
                list.status.msg = "Deactivated";
            }

        }).catch(function(err) {
            console.log('error: ' + err);
        });

    }
    i++;
}

module.exports = ['SponsorAdsService', ctrl];