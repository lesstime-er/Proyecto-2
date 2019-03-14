document.addEventListener('DOMContentLoaded', () => {

    const ironhackMad = {
        lat: 40.392757,
        lng: -3.698256
    }

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: ironhackMad

    })

    startMap = () => {



        const myMarker = new google.maps.Marker({
            position: ironhackMad,
            map: map,
            title: 'Aqui estoy',
            draggable: true,
            animation: google.maps.Animation.DROP,
            icon: {
                url: "http://maps.google.com/mapfiles/kml/pal3/icon23.png "
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
                url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
            }else if(+hospital.time.split(" ")[0] === timeMin) {
                url = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
            

            
                
            } else {
                url = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
            }


            const center = {
                lat: hospital.location.latitude,
                lng: hospital.location.longitude
            }

            const infoReview = '<div class="reviewMarker">' + hospital.name +
                '   <a href="/">REVIEW USUARIOS</a>   '   +   '   <a href="/">REVIEW HOSPITALES</a>   ' +

                '</div>'

            var infowindow = new google.maps.InfoWindow({
                content: infoReview
            });

            const marker = new google.maps.Marker({

                position: center,
                map: map,
                title: `${hospital.name} \n Time: ${hospital.time}`,
                icon: {
                    url: url
                }


            })

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });



            markers.push(marker)
        })
    }

    startMap()
    placeHospitals(window.result)


    console.log('IronGenerator JS imported successfully!');

}, false);
