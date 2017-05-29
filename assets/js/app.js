function initMap() {
  var peru = {lat: -11.948372202418383, lng: -77.31399910000005};
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: peru
  });
  var marker = new google.maps.Marker({
    position: peru,
    map: map
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom:18
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }
}