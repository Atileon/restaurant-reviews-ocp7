// This is the main class to create Restaurant objects on the list

class Restaurant {
  constructor(ristObject,markArr){
     this.listCont = 'list-container';//Main list Container
     this.descrClass = 'risto-descr'; //Class for description container (name & address)
     this.itemClass = 'risto-item';// Class for the item
     this.nameClass = 'risto-title'; // class for the Restaurant name
     this.addrClass = 'risto-address'; // class for the Restaurant name
     this.starsClass = 'risto-stars';// class for the Restaurant stars

     //Properties to get on constructor from API data
     //NOTE: When Object is created if on the response from API some value doesn't exists the object wouldn't be created and throw an Error on console because of value undefined
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
     //state to switch restaurant map marker on/off 
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
     //Switch on/off the markers when item on list is clicked
     this.switchMarker = 0;
     itemEl.addEventListener('click',(e)=>{
       if(e.type==='click'){
         this.switchMarker++;
       }
       // console.log(this.switchMarker);
         if(this.switchMarker === 1){
           this.ristoMark(true);
           itemEl.classList.add('selected');
         }else if(this.switchMarker === 2){
           itemEl.classList.remove('selected');
           //set null on setMap() method for every marker on array
           this.markArr.map(mark => mark.setMap(null));
           //thus, clear the markers array to reset
           this.markArr = []
           this.switchMarker = 0;
         }
         // console.log(this.switchMarker);
       
     });
     // itemEl.addEventListener('')
     console.log(`${this.name} has been Rendered On DOM`);
  }
  
  ristoMark(bool){
     
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
     console.log(this.markArr);
     (bool === true)? marker.setMap(map): '';
     (bool === false)?marker.setMap(null): '';
     marker.addListener('mouseover',()=>{
       litleInfo.open(map,marker);
     });
     marker.addListener('mouseout',()=>{
       litleInfo.close();
     });
     marker.addListener('click',()=> {
       litleInfo.close();
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

export default Restaurant;