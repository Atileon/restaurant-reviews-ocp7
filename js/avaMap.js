//=========== Review Restaurants Project 7 Openclassrooms  ==============

class Restaurant {
   constructor(name,address,stars){
      this.listCont = 'list-container';//Main list Container
      this.descrClass = 'risto-descr'; //Class for description container (name & address)
      this.itemClass = 'risto-item';// Class for the item
      this.nameClass = 'risto-title'; // class for the Restaurant name
      this.addrClass = 'risto-address'; // class for the Restaurant name
      this.starsClass = 'risto-stars';// class for the Restaurant stars

      //Properties to get on constructor from API data
      this.name = name;
      this.address = address;
      this.stars = stars;
   }
   drawIt(){
      // The container
      let cont = document.getElementById(this.listCont);
      let descrEl = document.createElement('div');
      descrEl.className = this.descrClass;

      // The Item Container
      let itemEl = document.createElement('div');
      itemEl.className = this.itemClass;
      // The restaurant's name element
      let nameEl = document.createElement('p');
      nameEl.className = this.nameClass;
      nameEl.textContent = `Restaurant: "${this.name}"`;
      // The address element
      let addressEl = document.createElement('p');
      addressEl.className = this.addrClass;
      addressEl.textContent = this.address;
      // The stars element
      let starsEl = document.createElement('div');
      starsEl.className = this.starsClass;
      starsEl.textContent = this.stars;
      
      // Appending elements created
      cont.appendChild(itemEl);
      itemEl.appendChild(descrEl);
      descrEl.appendChild(nameEl);
      descrEl.appendChild(addressEl);
      itemEl.appendChild(starsEl);
      
      
      console.log(`${this.name} has been Rendered On DOM`);
   }
   ristoMark(result){
      let pos = result.geometry.location;
      let markOpt = {
         map: map,
         opacity: 0.8,
         position: pos,
         animation: google.maps.Animation.DROP,
         title: result.name
      }
      let marker = new google.maps.Marker(markOpt);
   }
}


let map;
let geoCoder
let infowindow;
let service;
let search;

let userPos;

(navigator.geolocation)?navigator.geolocation.getCurrentPosition(initMap, errorMessage):alert("Your browser does not support Geolocation.");

// show error if location can't be found
function errorMessage() {
   alert("Location can't be found");
}

//This the main function 
function initMap(position){
   userPos= {
      lat: position.coords.latitude,
      lng: position.coords.longitude
   }
   geoCoder = new google.maps.Geocoder();
   //  Testing the search results into a input text
   // let inputSearch;
   // inputSearch = document.getElementById('searchPlace');
   // search = new google.maps.places.Autocomplete(inputSearch);
   // inputSearch.addEventListener('keyup',(e)=> {
   //    e.prenventDefault;
   //    console.log(inputSearch.value);
   //    let thePlace = search.getPlace();
   //       console.log(thePlace);
   // });

    var latlng = new google.maps.LatLng(userPos);
    var mapOptions = {
      zoom: 15,
      center: latlng,
      backgroundColor: '#0a0808',
      disableDefaultUI: true,
      styles:[
          {'elementType': 'geometry', 'stylers': [{color: '#443d35'}]},
          {'elementType': 'labels.text.stroke', 'stylers': [{color: '#000000'}]},
          {'elementType': 'labels.text.fill', 'stylers': [{color: '#ffffff'}]},
          {
            'featureType': 'administrative.locality',
            'elementType': 'all',
            'stylers': [{'visibility':'off'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#f26144'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#6f6457'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ffffff'}]
          },
      ]
    }
   // lets create the map
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
   // User marker
   let markOpt = {
      map: map,
      opacity: 0.7,
      position: userPos,
      animation: google.maps.Animation.BOUNCE,
      title: 'You are here!'
   }
   let marker = new google.maps.Marker(markOpt);

   // places service
   service = new google.maps.places.PlacesService(map);
   let nearbyReq = {
      location: latlng,
      radius: '1500',
      type: ['restaurant'],
      keyword: 'food',
      rankBy: google.maps.places.RankBy.PROMINENCE
   }
   service.nearbySearch(nearbyReq,toRestaurants);

}//End of main function

   function toRestaurants(results, status){
      if(status =='OK'){
         results.map(result=>{
            console.log(result);
            let newObj = new Restaurant(result.name,result.vicinity,result.rating);
            newObj.drawIt();
            newObj.ristoMark(result);
         });
      }
   }

  function codeAddress() {
    var address = document.getElementById('address').value;
    console.log(address);
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
         let response = results[0].geometry.location;
         map.panTo(response);
         // map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: response
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
      
   }