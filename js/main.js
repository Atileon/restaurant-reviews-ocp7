//=========== Review Restaurants Project 7 Openclassrooms  ==============

  // Initialize the GoogleMap API
  function initMap(){
    let latUser;
    let lngUser;

    // you will decide what to do with the position passed as argument from the getCurrentPosition()method from Geolocation API using the following function 
    function theMap(position) {
        let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       console.log(location);
        let map = new google.maps.Map(document.getElementById('map'), {
            position: location,
            zoom: 12,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
      
        let marker = new google.maps.Marker({
            map: map,
            position: location,
            animation: google.maps.Animation.DROP,
            title: "This is your location"
        });
      
        map.setCenter(location);
      }
      // show error if location can't be found
    function errorMessage() {
        alert("Location can't be found");
      }
      // execute geolocation
    (navigator.geolocation)?
    navigator.geolocation.getCurrentPosition(theMap, errorMessage):
    alert("Your browser does not support Geolocation.");
      
  }



// This is the main class to create Restaurant objects on the list
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
