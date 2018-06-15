//=========== Review Restaurants Project 7 Openclassrooms  ==============
//   Once upon a time The class Restaurant was here 
// ================================
let idNum= 301;//id new Restaurant
let map;// the map
let geoCoder;// API service
let infowindow;//Info card on map
let litleInfo;//Little info card on map
let placeService;//Place Service 
let search;//Autocomplete service on search

let markArray = [];//Array for markers
// let revArr = [];
let userPos;// The user's position
let markersOnMap = true;
let divList = document.getElementById("list-container");
let sortEl = document.getElementById("ratingSel");
let btnMarks = document.getElementById("btnMarks");
let sortVal = 0;
let btnAsc = document.getElementById("ASC");
let btnDesc = document.getElementById("DESC");
let ASC = true;
let DESC = false;
let morebtn = document.getElementById("more");
let getMore;

let nearbyReq;

navigator.geolocation
  ? navigator.geolocation.getCurrentPosition(initMap, errorMessage)
  : alert("Your browser does not support Geolocation.");

// show error if location can't be found
function errorMessage() {
  alert("Location can't be found");
}

//This the main function
function initMap(position) {
  userPos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  //Geocoder service active
  geoCoder = new google.maps.Geocoder();
  //  The search results into a input text
  let inputSearch;
  inputSearch = document.getElementById('searchFor');
  let autoOpt = {
   types: ['geocode']
  };
  search = new google.maps.places.Autocomplete(inputSearch, autoOpt);
  //Input search handler
  search.addListener('place_changed',()=> {
     console.log(inputSearch.value);
     let thePlace = search.getPlace();
     console.log(thePlace);
     let resPos = thePlace.geometry.location;
        map.panTo(resPos);
        searchOnChange();
  });

  let latlng = new google.maps.LatLng(userPos);
  let mapOptions = {
    zoom: 15,
    center: latlng,
    backgroundColor: "#0a0808",
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    gestureHandling: "greedy",
    styles: [
      //style of map
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#212121"
          }
        ]
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#212121"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            color: "#400000"
          }
        ]
      },
      {
        featureType: "administrative.country",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#000000"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#bdbdbd"
          }
        ]
      },
      {
        featureType: "administrative.province",
        elementType: "geometry",
        stylers: [
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "landscape.man_made",
        stylers: [
          {
            color: "#ff8000"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "landscape.man_made",
        elementType: "labels",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            saturation: -15
          },
          {
            lightness: -35
          }
        ]
      },
      {
        featureType: "landscape.natural.landcover",
        elementType: "geometry",
        stylers: [
          {
            color: "#400000"
          }
        ]
      },
      {
        featureType: "landscape.natural.landcover",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "landscape.natural.terrain",
        elementType: "geometry",
        stylers: [
          {
            color: "#800000"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "landscape.natural.terrain",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#008000"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#000000"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#2c2c2c"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8a8a8a"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#a84726"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#000000"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#cdcdcd"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.local",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#7d7d7d"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000"
          }
        ]
      }
    ] //end style of map
  };
  // lets create the map
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  // User marker
  let userIcon = {
    url: "./img/hungry50.png",
    size: new google.maps.Size(64, 64),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 64)
  };
  let markOpt = {
    map: map,
    icon: userIcon,
    opacity: 1,
    position: userPos,
    animation: google.maps.Animation.BOUNCE,
    title: "You are here! hungry!!"
  };
  let marker = new google.maps.Marker(markOpt);

  // places servicePlace
  placeService = new google.maps.places.PlacesService(map);
  // Object request to pass on nearbySearch of service
  nearbyReq = {
    location: latlng,
    radius: 2000,
    type: ["restaurant"],
    rankBy: google.maps.places.RankBy.PROMINENCE
  };

  map.addListener("dragend", searchOnChange);
  function searchOnChange() {
    sortVal = Number(sortEl.value);
    markArray.map(item => item.setMap(null));
    markArray =[];
    divList.innerHTML= '';
    let coordMove = map.getCenter();
    console.log(coordMove);
    let moveReq = {
      location: coordMove,
      radius: 2500,
      type: ["restaurant"],
      rankBy: google.maps.places.RankBy.PROMINENCE
    };
    placeService.nearbySearch(moveReq, fromNearby);
  }
  function sortRestaurants(){
     sortVal = Number(sortEl.value);
     if(sortVal=== 7){
        console.log('favourites!!!!!!!!!!!!!!!!');
        callJson();
     }
     searchOnChange();
  }
  // sort listener recalls the searchNear fn, thus refresh the search with rating value
  // console.log(sortEl);
  sortEl.addEventListener("change", sortRestaurants);
  btnAsc.addEventListener("click", e => {
    e.preventDefault();
    ASC = !ASC;
    ASC
      ? (btnAsc.textContent = "ASC \u2191")
      : (btnAsc.textContent = "DESC \u2193");
    ASC ? btnAsc.classList.add("on") : btnAsc.classList.remove("on");
    sortDamn();
  });
  btnMarks.addEventListener("click", btnMarkers);
  function btnMarkers() {
    // console.log(markArray);
    //switch markers on/off(true/false)
    markersOnMap = !markersOnMap;
    //Iteration on the array of markers
    markersOnMap
      ? markArray.map(item => item.setMap(map))
      : markArray.map(item => item.setMap(null));
   //set button classes for style
    markersOnMap
      ? btnMarks.classList.add("mark-on")
      : btnMarks.classList.remove("mark-on");
   //set name of button when state changes
    markersOnMap
      ? (btnMarks.textContent = "Marks: ON")
      : (btnMarks.textContent = "Marks: OFF");
    console.log(markersOnMap);
  }

  function searchNear() {
    sortVal = Number(sortEl.value);
   //  console.log(sortVal);
    markArray.map(item => item.setMap(null));
    markArray = [];
    divList.innerHTML = "";
    placeService.nearbySearch(nearbyReq, fromNearby);
  }
  // ^- service.nearbySearch(nearbyReq,fromNearby);
  searchNear();
  // more results button listener
  morebtn.addEventListener("click", () => {
    morebtn.disabled = true;
    getMore ? getMore() : "";
    sortDamn();
  });

  //This append the info legend on map
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
    document.getElementById("legend")
  );

  //Local function to sort
  function sortDamn() {
    let elementsDOM = document.getElementsByClassName("risto-item");
    let arrDOM = Array.from(elementsDOM);
    console.log(arrDOM);
    console.log(elementsDOM);
    divList.innerHTML = "";
    arrDOM.sort(compare);
    // arrDOM.filter();
    arrDOM.map(item => divList.appendChild(item));
  }

  function compare(a, b) {
    //  console.log(ASC);
    //  console.log(DESC);
    if (!ASC) {
      return b.dataset.rating - a.dataset.rating;
    }
    return a.dataset.rating - b.dataset.rating;
  }
  sortDamn();

  // ====GEOCODER===

  map.addListener("dblclick", e => {
    console.log(e);
    idNum += 1;
    open=true;
    toggleForm();
    let coords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    latlngAdd = new google.maps.LatLng(coords);
    console.log(latlngAdd);
    // TODO: GEOCODE COORDS AND ADDRESS IMPLEMENT ON FORM DIRECTLY
    geoCoder.geocode({ location: latlngAdd }, coordsGeocode);

    return latlngAdd;
  });

} //End of main function

// TODO functions improvements
function fromNearby(results, status, pagination) {
  if (status === "OK") {
    let response = results;
    //implement the sort on response

   //  console.log(sortVal);
    morebtn.disabled = !pagination.hasNextPage;
    !morebtn.disabled
      ? (morebtn.textContent = "There's More Restaurants!")
      : (morebtn.textContent = "No More Restaurants by now");
    getMore =
      pagination.hasNextPage &&
      function() {
        pagination.nextPage();
      };
    // console.log(getMore);
    // // response.filter((a)=> a.rating > sortVal );
    // response.sort((a,b)=> a.rating-b.rating);
    response.map((res, key) => {
      // console.log(res);
      // console.log(key);
      //request object literal to be passed on getDetails service
      if (res.rating <= sortVal+0.9 && res.rating >= sortVal||sortVal === 6) {
        let req = {
          placeId: res.place_id
        };
        placeService.getDetails(req, toRestaurants);
      
      }
    });
    
  }
}


//Convert place details results into Restaurant Objects
function toRestaurants(place, status) {
  if (status === "OK") {
    let thePlace = place;
   //  console.log(place);
    //create Object
    let newRisto = new Restaurant(thePlace, markArray);

    newRisto.ristoItem();
    newRisto.ristoMark(markersOnMap);
  }

}

// ============================================

let latlngAdd;
console.log(latlngAdd);
let addrr;

//From geocode service
function coordsGeocode(results, status) {
  if (status === "OK") {
    let response = results;
    console.log(response);
    addrr = response[0].formatted_address;
    t1.value = addrr;
  }
  return addrr;
}

// ================= The Form To Add Restaurant ==========
let formContainer = document.getElementById("formContainer");
let formIt = document.getElementById('theForm')
let sendIt = document.getElementById("sendIt");
let closeIt = document.getElementById("closeIt");
let closeBtnForm = document.getElementById("closeForm");
//open form: boolean
let open = false;
closeBtnForm.onclick = closeForm;

function closeForm(){
   open=false;
   toggleForm();
   formIt.reset();
}

let validInput = false;
let formBtn = false;

let t1 = document.getElementById("t1");
let t2 = document.getElementById("t2");
let t3 = document.getElementById("t3");
let t4 = document.getElementById("t4");
let t5 = document.getElementById("t5");
//event handlers and callbacks
// t1.oninput = validateInput;
t2.oninput = validateInput;
// t3.oninput = validateInput;
t4.oninput = validateInput;
t5.oninput = validateInput;
//button submit event handler
sendIt.onclick = fromSubmit;
let inputsVals = document.querySelectorAll("#theForm input, #theForm textarea");
//toggle on off the Form
function toggleForm() {
   //submit button disabled on form
  sendIt.disabled = true;
  //
  open ? formContainer.classList.add("showIT") : formContainer.classList.remove("showIT");
  open
    ? (closeBtnForm.textContent = "  CANCEL   ")
    : (closeBtnForm.textContent = "I'll be back..");
//   formIt.reset();
}
//Input validation
function validateInput(){
   if(t2.value&&t4.value&&t5.value){
      validInput = true;
   }
   validateForm();
   return validInput = false;
}
//Form validation function
function validateForm() {
//   console.log(validInput);
  validInput ? (sendIt.disabled = false) : (sendIt.disabled = true);
}
//from submit form function
function fromSubmit(e) {
  e.preventDefault();
  let address = addrr;
  let pos = latlngAdd;

  
   let idNewR = `risto-${idNum}`;
   console.log(idNewR);
  let objOne = {
   place_id: idNewR,
    geometry: {
      location: pos
    },
    reviews: [
      {
        author_name: t4.value,
        profile_photo_url: "./img/photo_profile.jpg",
        rating: t3.value,
        text: t5.value
      }
    ],
    name: t2.value,
    vicinity: address,
    rating: t3.value,
    opening_hours: {
      open_now: true
    },
    url: "#",
    international_phone_number: 777777777,
    website: "#"
  };
  localStorage.setItem("objectOne", JSON.stringify(objOne));
  let see = JSON.parse(localStorage.getItem("objectOne"));
  console.log(see);
  let newRest = new Restaurant(objOne, markArray);
  newRest.ristoItem();
  newRest.ristoMark(markersOnMap);
  formIt.reset();
  sendIt.disabled = true;
}

function callJson(){
   fetch('./rests.json')
   .then(response => response.json())
   .then(data => {
      console.log(data);
      data.map( item =>{
         let newRisto = new Restaurant(item, markArray);
    newRisto.ristoItem();
    newRisto.ristoMark(markersOnMap);
      });
      
   })
   .catch(error => console.log('error is', error));
}
