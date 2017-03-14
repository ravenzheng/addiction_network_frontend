function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = [], tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params.push({k: decodeURIComponent(tokens[1]), v: decodeURIComponent(tokens[2])});
    }

    return params;
}

function getParameterByName(name, url) {
    if (window.location.href.indexOf("srch-keyword") > -1) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}

function getarrayValue(url) {
    if (window.location.href.indexOf("catg") > -1) {
        var str = decodeURIComponent(url);
        var match = str.match(/[^=&?]+\s*=\s*[^&#]*/g);
        var obj = {};
        for (var i = match.length; i--; ) {
            var spl = match[i].split("=");
            var name = spl[0].replace("[]", "");
            var value = spl[1];
            obj[name] = obj[name] || [];
            obj[name].push(value);
        }
        return obj["catg"].join(",");
    }
}
function ctrl($scope, $routeParams, service) {
    var id = $routeParams.id;
    var url = window.location.href;
    if (window.location.href.indexOf("srch-keyword") > -1) {
        $scope.hide_map = "hide";
    } else {
        $scope.hide_map = "show";
    }
    var mapState = null;
    var zipcode = getParameterByName('zip');
    var miles = getParameterByName('distance');
    if (window.location.href.indexOf("mapState") > -1) {
        var tempState = url.split("mapState=");
        var mapState = tempState[1];
    }
    var cat = getarrayValue(url);
    if (mapState == null) {
        var final_data = {
            'zipcode': zipcode,
            'miles': miles,
            'categories': cat
        }
    } else {
        var final_data = {
            state: mapState
        }
        $scope.hide_map = "hide";
    }
    service.queryBySearch(final_data).then(function (result) {
        //result.address = result.address_line_1 + result.address_line_1;
        $scope.search_by_filter = result;
    }).catch(function (err) {
        console.log(err);
    });
}

module.exports = ['$scope', '$routeParams', 'TreatmentcenterMapService', ctrl];
