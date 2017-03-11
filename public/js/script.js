
$(document).ready(function () {
    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 16
    });
    //Create a Marker
    function createMarker(latLng, icon) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: {
                url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
                anchor: new google.maps.Point(10, 10),
                scaledSize: new google.maps.Size(10, 17)
            },
            title: 'location'
        });

    }
    var request = {
        location: pyrmont,
        radius: '500',
        types: ['store']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                latlng = place.geometry.location;
                icn = place.icon;
                createMarker(latlng, icn);
            }
            console.log(results);
        }
    }


});
