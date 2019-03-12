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
            title: 'Aqui estoy'
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
            const center = {
                lat: hospital.location.latitude,
                lng: hospital.location.longitude
            }

            const marker = new google.maps.Marker({
                position: center,
                map: map,
                title: `${hospital.name} \n Time: ${hospital.time}`,
                  
            })
            markers.push(marker)
        })
    }

    startMap()
    placeHospitals(window.result)


    console.log('IronGenerator JS imported successfully!');

}, false);

