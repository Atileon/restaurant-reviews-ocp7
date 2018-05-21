//=========== Review Restaurants Project 7 Openclassrooms  ==============
import Restaurant from './Restaurant';
    const features =[
        {
            lat: 44
        }
    ];


  let map;
  let service;
  let infowindow;
  // Initialize the GoogleMap API
  function initMap(){
   
    // execute geolocation
    (navigator.geolocation)?
    navigator.geolocation.getCurrentPosition(theMap, errorMessage):
    alert("Your browser does not support Geolocation.");
    
    // you will decide what to do with the position passed as argument from the getCurrentPosition()method from Geolocation API using the following function 
    function theMap(position) {
        let latUser = position.coords.latitude;
        let lngUser = position.coords.longitude;
        
        let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(`${latUser},${lngUser}`);
         map = new google.maps.Map(document.getElementById('map'), {
            position: location,
            zoom: 14,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [ //bloody mary style, lol, it would be changed ...or not! :P
                {elementType: 'geometry', stylers: [{color: '#240100'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#371515'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#ff0000'}]},
                {
                  featureType: 'administrative.locality',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'geometry',
                  stylers: [{color: '#371515'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#ff0000'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{color: '#38414e'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#371515'}]
                },
                {
                  featureType: 'road',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#9ca5b3'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{color: '#746855'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#371515'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#f3d19c'}]
                },
                {
                  featureType: 'transit',
                  elementType: 'geometry',
                  stylers: [{color: '#2f3948'}]
                },
                {
                  featureType: 'transit.station',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{color: '#ff0000'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#515c6d'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.stroke',
                  stylers: [{color: '#ff0000'}]
                }
              ]
        });
        let marker = new google.maps.Marker({
            map: map,
            position: location,
            animation: google.maps.Animation.DROP,
            title: "You are here"
        });

        // ====================================
        let request = {
          location: location,
          radius: '3000',
          type: ['restaurant']
        };
      
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
      // ========================

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log(results);
          results.map((i)=> createMarker(i));
        }
      }
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: placeLoc
        });
        
        infowindow= new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });

      //  marker.setMap(map);
      }
      // =============
        map.setCenter(location);
      
      }
      


      // show error if location can't be found
      function errorMessage() {
        alert("Location can't be found");
      }
      
      
  }






function restaurantOnDom (name,address,stars){
 let obj = new Restaurant(name,address,stars);
 console.log(`${obj.name} has been created`);
 obj.drawIt();
}

function reqJSON(){
    // Love fetchAPI
    // We gotta request items from the json file and go through a then concatenations step by step 
    fetch('./js/restaurants.json')
    .then(result => result.json())//results parsed from json to objects
    .then(data => {
        console.log(data);
        // mapping the objects and executing the restaurant function which creates Objects to render on DOM
       data.map((item)=> {
           // Lets create objects
            restaurantOnDom(item.name,item.address,item.stars);
        });
    });//end of then concatenation
}
reqJSON();
