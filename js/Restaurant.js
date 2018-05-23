// This is the main class to create Restaurant objects on the list
class Restaurant {
  constructor(ristObject){
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
     
     itemEl.addEventListener('mouseenter',()=>{
       console.log(itemEl.dataset.placeId);
     });
     console.log(`${this.name} has been Rendered On DOM`);
  }
  
  ristoMark(){
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
     }
     let selEl = document.getElementById(this.id);
     let marker = new google.maps.Marker(markOpt);
     marker.setMap(map);
     marker.addListener('click',()=> {
       info.open(map,marker);
       
       
       console.log(selEl.id);
       if(this.id === selEl.id){
         // allItems.classList.remove('selected');
         selEl.classList.add('selected');
       }
     });
     map.addListener('click',() => {
       
       info.close();
       selEl.classList.remove('selected');
     });

     

  }
  
  
}
export default Restaurant;