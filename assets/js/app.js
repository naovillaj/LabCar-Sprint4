function initMap() {
  var peru = {lat: -11.948372202418383, lng: -77.31399910000005};
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: peru
  });

  var marker;
  var functionLocalization = function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }

    map.setCenter(pos);
    map.setZoom(18);

    marker = new google.maps.Marker({
      position: pos,
      map: map
    });
  }

  var functionNotFounded = function(error) {
    alert("Encontramos un inconveniente para ver tu ubicación");
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(functionLocalization, functionNotFounded);
  }

  var originInput = document.getElementById("partida");
  var destinationInput = document.getElementById("destino");
  new google.maps.places.Autocomplete(originInput);
  new google.maps.places.Autocomplete(destinationInput);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
    directionsService.route({
      origin: originInput.value,
      destination: destinationInput.value,
      travelMode: 'DRIVING'
    },
    function(response, status){
      if(status === 'OK') {
        var distance = Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(",","."));
        var tariff = document.getElementById("pasaje");
        tariff.classList.remove("hide");

        var cost = distance * 1.75;
        tariff.innerHTML = "S/. " + parseInt(cost);
        directionsDisplay.setDirections(response);
        marker.setMap(null);
      } else {
        windows.alert("Se ha producido un error en su solicitud");
      }
    });
  }

  directionsDisplay.setMap(map);
  var traceRoute = function(){
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById("ruta").addEventListener("click", traceRoute);
}
