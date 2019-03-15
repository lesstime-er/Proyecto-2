document.addEventListener('DOMContentLoaded', () => {

    const ironhackMad = {
        lat: 40.392757,
        lng: -3.698256
    }

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: ironhackMad,
        styles: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8ec3b9"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1a3646"
                }]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#4b6878"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#64779e"
                }]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#4b6878"
                }]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#334e87"
                }]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#023e58"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#283d6a"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#6f9ba5"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#023e58"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#3C7680"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#304a7d"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#98a5be"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#2c6675"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#255763"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#b0d5ce"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#023e58"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#98a5be"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#283d6a"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#3a4762"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#0e1626"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#4e6d70"
                }]
            }
        ]

    })

    startMap = () => {



        const myMarker = new google.maps.Marker({
            position: ironhackMad,
            map: map,
            title: 'Aqui estoy',
            draggable: true,
            animation: google.maps.Animation.DROP,
            icon: {
                url: "/images/icons8-address-48.png"
            }


        })

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition((position) => {

                const myPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
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

    placeHospitals = (hospitals) => {

        const markers = []

        hospitals.forEach(hospital => {
            if (!hospital.location) {
                return
            }

            let url;


            let timeMin = (Math.min(...(hospitals.map(hospital => +hospital.time.split(" ")[0]))))
            let timeMax = (Math.max(...(hospitals.map(hospital => +hospital.time.split(" ")[0]))))



            if (+hospital.time.split(" ")[0] === timeMax) {
                url = "/images/hospital-mas.png";
            } else if (+hospital.time.split(" ")[0] === timeMin) {
                url = "/images/hospital-signmenos-48.png";




            } else {
                url = "/images/icons8-hospital-3-48.png"
            }


            const center = {
                lat: hospital.location.latitude,
                lng: hospital.location.longitude
            }

            const infoReview =
                `<div class="reviewMarker"> ${hospital.name}  
              <br>
            <a href="/auth/Hospitalreviews/${hospital._id}">-REVIEWS-</a>
            </div>`

            var infowindow = new google.maps.InfoWindow({
                content: infoReview
            });

            const marker = new google.maps.Marker({

                position: center,
                map: map,
                title: `${hospital.name} \n Time: ${hospital.time}`,
                icon: {
                    url: url
                },


            })

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });



            markers.push(marker)
        })
    }

    startMap()
    placeHospitals(window.result)


    console.log('IronGenerator JS imported successfully!');

}, false);