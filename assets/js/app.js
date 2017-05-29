function initMap() {
  var peru = {lat: -11.948372202418383, lng: -77.31399910000005};
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: peru
  });
  var marker = new google.maps.Marker({
    position: peru,
    map: map
  });
}