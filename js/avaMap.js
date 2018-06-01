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
      //NOTE: When Object is created if on the response 
      //from API some value doesn't exists the object 
      //wouldn't be created and throw an Error on console 
      //because of undefined value
      this.ristObj = ristObject;
      this.photos = this.ristObj.photos;
      this.photo= (!this.photos)?'':this.ristObj.photos[0].getUrl({maxWidth:200,maxHeight:200});
      this.name = this.ristObj.name;
      this.address = this.ristObj.vicinity;
      this.stars = this.ristObj.rating;
      this.open = this.ristObj.opening_hours.open_now;
      this.toGoogle = this.ristObj.url;
      this.phone = this.ristObj.international_phone_number;
      this.website = this.ristObj.website;
      this.id = this.ristObj.place_id;
      //the global marker array
      this.markArr = markArr;
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

      console.log(`${this.name} has been Rendered On DOM`);
   }
   
   ristoMark(bool){
      let locMarkArr = this.markArr;
      let pos = this.ristObj.geometry.location; 
      let content = this.showDetails();
      let litleInfoOpen = (this.open)?'Open!':'Closed';
      let litleContent = {
        content:`
        <div class="litle-info">
          <h4 class="litle-name">${this.name}</h4>
          <div class="litle-desc">
            <div class="litle-img"><img src="${this.photo}"></img></div>
            <div class="litle-ratings"><p>${this.stars}\u2606</p><p><span class="litle-open">${litleInfoOpen}</span></p></div>
          </div>
        </div>
        `,
        maxWidth:200
      };
      let info = new google.maps.InfoWindow(content);
      let litleInfo = new google.maps.InfoWindow(litleContent);
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
      // console.log(this.markArr);
      (bool === true)? marker.setMap(map): '';
      (bool === false)?marker.setMap(null): '';
      marker.addListener('mouseover',()=>{
        litleInfo.open(map,marker);
      });
      marker.addListener('mouseout',()=>{
        litleInfo.close();
      });
      // marker/selEl listeners to open info window
      marker.addListener('click',()=> {
        litleInfo.close();
        info.open(map,marker);
        console.log(selEl.id);
        if(this.id === selEl.id){
          // allItems.classList.remove('selected');
          selEl.classList.add('selected');
        }
      });
      selEl.addEventListener('click',()=>{
        //when markers hidden this show the current marker
        marker.setMap(map);
        litleInfo.close();
        info.open(map,marker);
        console.log(selEl.id);
          if(this.id === selEl.id){
            selEl.classList.add('selected');
          }
        }
      );
      // map/selEl listeners to close info window
      map.addListener('click',() => {
        info.close();
        selEl.classList.remove('selected');
      });

      selEl.addEventListener('mouseleave', ()=>{
        info.close();
        selEl.classList.remove('selected');
        // console.log(this.markArr);
      });

   }
   
   showDetails(){
     let open = (this.open)?`We are open`:`Sorry, we are closed.`;
    let content = {
      content: `
      <div class="cont-detail">
      <h2>${this.name}</h2>
      <div class="details">
         <div class="photo">
            <img src=${this.photo} alt="${this.name}">
         </div>
         <div class="description-risto">
            <p>Rating: ${this.stars} \u2606 </p>
            <p>${open}</p>
            <p>${this.address}</p>
            <p>Call us: <a href="tel:${this.phone}">${this.phone}</a></p>
            <p> <a href="${this.website}" class="website" target="_blank">${this.website}</a> </p>
         </div>
        </div>
        <div class="link"><a href="${this.toGoogle}" target="_blank">view on googlemap</a></div>
       </div>
    `,
      maxWidth:500
    };
    return content;
   }
}//end Restaurant class


let map;
let geoCoder
let infowindow;
let litleInfo;
let service;
let search;
let ristoArray =[];
let markArray =[];
let reqArr=[];//array requests for details
let userPos;
let marksOnOff = true;
let divList = document.getElementById('list-container');
let sortEl = document.getElementById('ratingSel');
let btnMarks = document.getElementById('btnMarks');
let sortVal;
let morebtn = document.getElementById('more');
let getMore;


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
  //  geoCoder = new google.maps.Geocoder();
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
      zoom: 13,
      center: latlng,
      backgroundColor: '#0a0808',
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      gestureHandling: 'greedy',
      styles:[
        
          {'elementType': 'geometry', 'stylers': [{color: '#00272B'}]},
          {'elementType': 'labels.text.stroke', 'stylers': [{color: '#000000'}]},
          {'elementType': 'labels.text.fill', 'stylers': [{color: '#ffffff'}]},
          {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [{'visibility':'off'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#FF6663'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#000000'}]
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
   service = new google.maps.places.PlacesService(map);
   // Object request to pass on nearbySearch of service
   let nearbyReq = {
      location: latlng,
      radius: 3500,
      type: ['restaurant'],
      rankBy: google.maps.places.RankBy.PROMINENCE
   }
   // sort listener recalls the searchNear fn, thus refresh the search with rating value
  console.log(sortEl);
  sortEl.addEventListener('change',searchNear);
  btnMarks.addEventListener('click',btnMarkers);
  function btnMarkers(){
    console.log(markArray);
    
    (marksOnOff)?markArray.map(item => item.setMap(null)):markArray.map(item => item.setMap(map));
    // markArray=[];
    marksOnOff = !marksOnOff;
    // searchNear();
  }

   function searchNear(){
    sortVal = Number(sortEl.value);
    console.log(sortVal);
    markArray.map(item => item.setMap(null));
    markArray =[];
    divList.innerHTML= '';
    service.nearbySearch(nearbyReq,fromNearby);
  }
  // ^- service.nearbySearch(nearbyReq,fromNearby);
  searchNear();
   console.log(reqArr);
   // more results button listener
   morebtn.addEventListener('click',()=>{
     morebtn.disabled = true;
     (getMore)?getMore():'';
   });

  //This append the info legend on map
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push
(document.getElementById('legend'));

}//End of main function

  //The following function aims to retrieve restaurants near to user location and pass one by one to get info and markers
  


// TODO functions improvements
  function fromNearby(results,status,pagination){
    if(status === 'OK'){let response = results;
      //implement the sort on response
      //TODO> Filter functions
      console.log(sortVal);
      morebtn.disabled = !pagination.hasNextPage;
      getMore = pagination.hasNextPage && function(){
        pagination.nextPage();
      };
      console.log(getMore);

      response.filter((a)=> a.rating >= sortVal);
      // //Sorting response objects
      response.sort((a,b)=> a.rating-b.rating);
      //concatenate array.map method
      response.map(res => {
        // console.log(res);
        //request object literal to be passed on getDetails service
        let req = {
          placeId: res.place_id
        };
        service.getDetails(req,toRestaurants);
        reqArr.push(req);
      });
      
      
    return reqArr;
    }
  }
  console.log(reqArr);
  async function deployMarkers(val,obj){
    if(val === true){
      return obj.ristoMark(true);
    }else{
      return obj.ristoMark(false);
    }
  }


  // allMarkers = false;
  //Convert place details results into Restaurant Objects
  function toRestaurants(place,status){
    if(status=== 'OK') {
      let thePlace =  place;
      // console.log(place);
      //create Object
      let newRisto =  new Restaurant(thePlace,markArray);
      // ristoArray.push(newRisto);
      // console.log(ristoArray);
      // ristoArray.filter((a)=> a.stars===sortVal)
      // .sort((a,b)=>a.stars-b.stars);
      newRisto.ristoItem();
      newRisto.ristoMark(marksOnOff);

    }
      return ristoArray;
  }
  console.log(markArray)
// ============================================





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