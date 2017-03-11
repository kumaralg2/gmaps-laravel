
var map;
var myLatLng;
$(document).ready(function () {
    geoLocationInit();
    function geoLocationInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, fail);
        } else {
            alert("Browser not supported");
        }
    }

    function success(position) {
        var latval = position.coords.latitude;
        var lngval = position.coords.longitude;
        myLatLng = new google.maps.LatLng(latval, lngval);
        console.log(latval);
        console.log(lngval);
        console.log(myLatLng);
        createMap(myLatLng);
        nearbySearch(myLatLng, "school")
    }

    function fail() {
        alert("it fails");
    }

    function createMap(myLatLng) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 16
        });
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map
        });
    };
    function nearbySearch(myLatLng, type) {
        var request = {
            location: myLatLng,
            radius: '500',
            types: [type]
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    latlng = place.geometry.location;
                    icn = place.icon;
                    name = place.name;
                    createMarker(latlng, icn, name);
                }
                console.log(results);
            }
        }
    }

    //Create a Marker
    function createMarker(latLng, icon, name) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: {
                url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
                anchor: new google.maps.Point(10, 10),
                scaledSize: new google.maps.Size(10, 17)
            },
            title: name
        });

    }



});
