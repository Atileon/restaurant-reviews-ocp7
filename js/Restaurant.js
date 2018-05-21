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
export default Restaurant;