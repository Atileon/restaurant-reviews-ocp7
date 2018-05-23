//=========== Review Restaurants Project 7 Openclassrooms  ==============

class Restaurant {
   constructor(ristObject,markArr){
      this.listCont = 'list-container';//Main list Container
      this.descrClass = 'risto-descr'; //Class for description container (name & address)
      this.itemClass = 'risto-item';// Class for the item
      this.nameClass = 'risto-title'; // class for the Restaurant name
      this.addrClass = 'risto-address'; // class for the Restaurant name
      this.starsClass = 'risto-stars';// class for the Restaurant stars

      //Properties to get on constructor from API data
      this.ristObj = ristObject;
      this.name = this.ristObj.name;
      this.address = this.ristObj.vicinity;
      this.stars = this.ristObj.rating;
      this.id = this.ristObj.place_id;

      this.markArr = markArr;
      this.switchMarker = 0;
   }
   ristoItem(){
      // The container
      let cont = document.getElementById(this.listCont);
      let descrEl = document.createElement('div');
      descrEl.className = this.descrClass;

      // The Item Container
      let itemEl = document.createElement('div');
      itemEl.id = this.id;
      itemEl.className = this.itemClass;
      // The restaurant's name element
      let nameEl = document.createElement('p');
      nameEl.className = this.nameClass;
      nameEl.textContent = `"${this.name}"`;
      // The address element
      let addressEl = document.createElement('p');
      addressEl.className = this.addrClass;
      addressEl.textContent = this.address;
      // The stars element
      let starsEl = document.createElement('div');
      starsEl.className = this.starsClass;
      starsEl.textContent = (this.stars)?`${this.stars} \u2606`: 0;
      
      // Appending elements created
      cont.appendChild(itemEl);
      itemEl.appendChild(descrEl);
      descrEl.appendChild(nameEl);
      descrEl.appendChild(addressEl);
      itemEl.appendChild(starsEl);
      this.switchMarker = 0;
      itemEl.addEventListener('click',(e)=>{
        if(e.type==='click'){
          this.switchMarker++;
        }
        console.log(this.switchMarker);
          if(this.switchMarker === 1){
            this.ristoMark(true);
            itemEl.classList.add('selected');
          }else if(this.switchMarker === 2){
            itemEl.classList.remove('selected');
            this.markArr.map(mark => mark.setMap(null));
            this.markArr = []
            this.switchMarker = 0;
          }
          console.log(this.switchMarker);
        
      });
      // itemEl.addEventListener('')
      console.log(`${this.name} has been Rendered On DOM`);
   }
   
   ristoMark(bool){
      
      let pos = this.ristObj.geometry.location; 
      let content = {
        content: `
       <div>This place is called ${this.name}, and the rating of this is ${this.stars}</div>
      `};
      let info = new google.maps.InfoWindow(content);

      let markOpt = {
         map: map,
         icon: this.icon,
         opacity: 0.8,
         position: pos,
         animation: google.maps.Animation.DROP,
         title: this.name
      };
      let selEl = document.getElementById(this.id);
      let marker = new google.maps.Marker(markOpt);
      this.markArr.push(marker);
      console.log(this.markArr);
      (bool === true)? marker.setMap(map): '';
      (bool === false)?marker.setMap(null): '';
      marker.addListener('click',()=> {
        info.open(map,marker);
        
        
        console.log(selEl.id);
        if(this.id === selEl.id){
          // allItems.classList.remove('selected');
          selEl.classList.add('selected');
        }
      });
      map.addListener('click',() => {
        // this.ristoMark('off');
        this.markArr.map(mark => mark.setMap(null));
        this.markArr = [];
        this.switchMarker = 0;
        info.close();
        selEl.classList.remove('selected');
      });
   }
   
   
}//end Restaurant class


let map;
let geoCoder
let infowindow;
let servicePlace;
let search;
let ristoArr =[];
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
   // the infowindow object
  //  infowindow = new google.maps.InfoWindow({
  //    content: 'Content string to show'
  //  });
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

    let latlng = new google.maps.LatLng(userPos);
    let mapOptions = {
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

   // places servicePlace
   servicePlace = new google.maps.places.PlacesService(map);
   let nearbyReq = {
      location: latlng,
      radius: '1000',
      type: ['restaurant'],
      rankBy: google.maps.places.RankBy.PROMINENCE
   }
   //So, we search for restaurants near by user position and pass it on toRestaurants() function to create restaurant objects from the response of service

   servicePlace.nearbySearch(nearbyReq,toRestaurants);

}//End of main function

  //The following function aims to retrieve restaurants near to user location and pass one by one to get info and markers
   function toRestaurants(results, status){
     
     // This is the main if statement to verify Status of request and launch the entire app to create Restaurants objects and get details of each one
      if(status =='OK'){
        // So, We map the results to get details of each place
         results.map(result=>{
            // console.log(result);
            let reqDetails = {
              placeId: result.place_id,
            }
            servicePlace.getDetails(reqDetails,(place,status)=>{
              
              if(status=== google.maps.places.PlacesServiceStatus.OK) {
                console.log(place);
                let newRisto = new Restaurant(place,ristoArr);
                newRisto.ristoItem();
                // newRisto.ristoMark(false);
              }
            });

         });
         
      }
   }

   function showMarkers(){
     markOn();
   }
   function hideMarkers(){
     markOff();
   }

  // function codeAddress() {
  //   let address = document.getElementById('address').value;
  //   console.log(address);
  //   geocoder.geocode( { 'address': address}, function(results, status) {
  //     if (status == 'OK') {
  //        let response = results[0].geometry.location;
  //        map.panTo(response);
  //        // map.setCenter(results[0].geometry.location);
  //       let marker = new google.maps.Marker({
  //           map: map,
  //           position: response
  //       });
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
      
  //  }