//=========== Review Restaurants Project 7 Openclassrooms  ==============
const testRest = [
   {
      name: 'da luigi',
      stars: 5,
      address: 'via Da immettere',
   },
   {
      name: 'da Mario',
      stars: 3,
      address: 'via Da immettere',
   },
   {
      name: 'da Pietro',
      stars: 3,
      address: 'via Da immettere',
   },
   {
      name: 'da Oscar',
      stars: 3,
      address: 'via Da immettere',
   },
   {
      name: 'da Leopoldo',
      stars: 3,
      address: 'via Da immettere',
   },
   {
      name: 'da Craco',
      stars: 3,
      address: 'via Da immettere',
   }
];
console.log(testRest);


const API_KEY = '';

const GeoLocUrl= `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`;

const param = {
   method: 'POST',
}
let coords = [];
// API REQUEST GEOLOCATION
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        console.log(myObj.location.lat);
        coords.push(myObj);
    }
};
xmlhttp.open('POST',GeoLocUrl, true);
xmlhttp.send();

console.log(coords);
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
      
      
      console.log(`${this.name} has been created`);
   }
}
const elements = [];

function restaurant (name,address,stars,bool){
 let obj = new Restaurant(name,address,stars);
 elements.push(obj);
 console.log('element created');
//  (bool)? obj.drawIt(): null;
}
console.log(elements);
testRest.map(obj => {
   restaurant(obj.name,obj.address,obj.stars,true);
});
elements.map(obj => obj.drawIt());