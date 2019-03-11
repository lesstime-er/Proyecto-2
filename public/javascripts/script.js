document.addEventListener('DOMContentLoaded', () => {

  console.log(window)

const ironhackMad = {
    lat: 40.392757,
    lng: -3.698256
  }

const map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  center:  ironhackMad

})

  console.  startMap = () => {

    map.addListener("click", function(e) {
      document.getElementById("latitude").value = e.latLng.lat();
      document.getElementById("longitude").value = e.latLng.lng();
    });

  const myMarker = new google.maps.Marker({
    position: ironhackMad,
    map: map,
    title: 'IronHack'
  })
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition((position) => {

      const myPosition = {
        lat: position.coords.latitude,
        lng:  position.coords.longitude
      }

      const myMarkerPosition = new google.maps.Marker({
        position: myPosition,
        map: map,
        title: "Aquí estoy yo!"
      })

      console.log("posición", myPosition)

    }, () => {
      console.log("Error en la geolocalización")
    })

  } else {
    console.log("Comprate un pc")
  }

  }
  








log('IronGenerator JS imported successfully!');

}, false);
