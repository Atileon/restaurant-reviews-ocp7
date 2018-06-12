// ==================== THE RESTAURANT CLASS ===================
//  The Restaurant object is created from the Google Api Response
class Restaurant {
  constructor(ristObject, markArr) {
    this.listCont = "list-container"; //Main list Container
    this.descrClass = "risto-descr"; //Class for description container (name & address)
    this.itemClass = "risto-item"; // Class for the item
    this.nameClass = "risto-title"; // class for the Restaurant name
    this.addrClass = "risto-address"; // class for the Restaurant name
    this.starsClass = "risto-stars"; // class for the Restaurant stars

    //Properties to get on constructor from API data
    //NOTE: When Object is created if on the response
    //from API some value doesn't exists the object
    //wouldn't be created and throw an Error on console
    //because of undefined value
    this.ristObj = ristObject;
    this.reviews = this.ristObj.reviews;
    this.photos = this.ristObj.photos;
    this.fakePhoto = "./img/food.jpg";
    this.photo = !this.photos
      ? this.fakePhoto
      : this.ristObj.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
    this.name = this.ristObj.name;
    this.address = this.ristObj.vicinity;
    this.stars = this.ristObj.rating;
    this.open = !this.ristObj.opening_hours.open_now ? false : true;
    this.toGoogle = this.ristObj.url;
    this.phone = this.ristObj.international_phone_number;
    this.website = this.ristObj.website;
    this.id = this.ristObj.place_id;
    this.location = this.ristObj.geometry.location;
    //the global marker array
    this.markArr = markArr;
  }

  ristoItem() {
    // The container
    let cont = document.getElementById(this.listCont);
    let descrEl = document.createElement("div");
    descrEl.className = this.descrClass;

    // The Item Container
    let itemEl = document.createElement("div");
    itemEl.id = this.id;
    itemEl.className = this.itemClass;
    itemEl.dataset.rating = this.stars;
    // The restaurant's name element
    let nameEl = document.createElement("p");
    nameEl.className = this.nameClass;
    nameEl.textContent = `"${this.name}"`;
    // The address element
    let addressEl = document.createElement("p");
    addressEl.className = this.addrClass;
    addressEl.textContent = this.address;
    // The stars element
    let starsEl = document.createElement("div");
    starsEl.className = this.starsClass;
    starsEl.textContent = this.stars ? `${this.stars} \u2606` : 0;

    // Appending elements created
    cont.appendChild(itemEl);
    itemEl.appendChild(descrEl);
    descrEl.appendChild(nameEl);
    descrEl.appendChild(addressEl);
    itemEl.appendChild(starsEl);

    console.log(`${this.name} has been Rendered On DOM`);
  }

  ristoMark(bool) {
    //   test
    let svEl = document.getElementById("streetViewContainer");
    let pos = this.ristObj.geometry.location;
    let content = this.showDetails();
    let litleInfoOpen = this.open ? "Open!" : "Closed";
    let litleContent = {
      content: `
         <div class="litle-info">
           <h4 class="litle-name">${this.name}</h4>
           <div class="litle-desc">
             <div class="litle-img"><img src="${this.photo}"></img></div>
             <div class="litle-ratings"><p>${
               this.stars
             }\u2606</p><p><span class="litle-open">${litleInfoOpen}</span></p></div>
           </div>
         </div>
         `,
      maxWidth: 200
    };
    let info = new google.maps.InfoWindow(content);
    let litleInfo = new google.maps.InfoWindow(litleContent);
    let markImg = {
      url: "./img/mark46x64.png",
      size: new google.maps.Size(46, 64),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 64)
    };
    let markOpt = {
      map: map,
      icon: markImg,
      opacity: 0.8,
      position: pos,
      animation: google.maps.Animation.DROP,
      title: this.name
    };
    let reviews = document.getElementById("reviews");
    let selEl = document.getElementById(this.id);
    let marker = new google.maps.Marker(markOpt);
    this.markArr.push(marker);
    // console.log(this.markArr);
    bool === true ? marker.setMap(map) : "";
    bool === false ? marker.setMap(null) : "";
    marker.addListener("mouseover", () => {
      litleInfo.open(map, marker);
    });
    marker.addListener("mouseout", () => {
      litleInfo.close();
    });
    // marker/selEl listeners to open info window
    marker.addListener("click", () => {
      map.panTo(this.location);
      reviews.innerHTML = "";
      this.showReviews();
      litleInfo.close();
      info.open(map, marker);
      console.log(selEl.id);
      if (this.id === selEl.id) {
        // allItems.classList.remove('selected');
        selEl.classList.add("selected");
      }
    });
    selEl.addEventListener("click", () => {
      map.panTo(this.location);
      this.showStreetView();
      svEl.classList.add("showSV");
      reviews.innerHTML = "";
      this.showReviews();
      // console.log(this.showReviews());
      //when markers hidden this show the current marker
      marker.setMap(map);
      litleInfo.open(map, marker);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      console.log(selEl.id);
      if (this.id === selEl.id) {
        selEl.classList.add("selected");
      }
    });
    // map/selEl listeners to close info window
    map.addListener("click", () => {
      svEl.classList.remove("showSV");
      info.close();
      selEl.classList.remove("selected");
    });
    map.addListener("mouseout", () => {
      info.close();
    });

    selEl.addEventListener("mouseleave", () => {
      litleInfo.close();
      marker.setAnimation(null);
      selEl.classList.remove("selected");
      // console.log(this.markArr);
    });
  }
  showReviews() {
    let reviews = this.reviews;
    console.log(reviews);
    let revDiv = document.getElementById("reviews");
    let titleDiv = document.createElement("h3");
    titleDiv.classList.add("rev-title");
    titleDiv.textContent = `"${this.name}" reviews:`;
    revDiv.appendChild(titleDiv);

    reviews.map((rev, i) => {
      let author = rev.author_name;
      let authPhoto = rev.profile_photo_url;
      let rating = rev.rating;
      let revDate = rev.relative_time_description;
      let revBody = rev.text;
      // console.log(
      //   `the author was ${author} with a rate of ${rating} on date ${revDate} saying that ${revBody}`
      // );

      let revContainer = document.createElement("div");
      revContainer.classList.add("rev-container", `rev-${i}`);

      //Create 2 divs to separate the author photo and the content
      let leftDiv = document.createElement("div");
      leftDiv.classList.add("left-div");
      let rightDiv = document.createElement("div");
      rightDiv.classList.add("right-div");
      //Create img element (Left)
      let authImg = document.createElement("img");
      authImg.classList.add("auth-img");
      authImg.src = authPhoto;
      //Author name (Left)
      let authName = document.createElement("p");
      authName.classList.add("auth-name");
      authName.textContent = author;
      //Author Rate (Left)
      let authRate = document.createElement("p");
      authRate.classList.add("auth-rate");
      authRate.textContent = `Rated this place: ${rating} \u2606`;
      //Date review (Right)
      let authDate = document.createElement("p");
      authDate.classList.add("rev-date");
      authDate.textContent = revDate;
      //Review body (Right)
      let txtBody = document.createElement("p");
      txtBody.classList.add("rev-body");
      txtBody.textContent = revBody;
      //Appending elements
      //left div
      leftDiv.appendChild(authImg);
      leftDiv.appendChild(authName);
      leftDiv.appendChild(authRate);
      //right div
      rightDiv.appendChild(authDate);
      rightDiv.appendChild(txtBody);
      //left and right on review container
      revContainer.appendChild(leftDiv);
      revContainer.appendChild(rightDiv);
      //Thus, the review into the reviews container
      revDiv.appendChild(revContainer);
    });
  }

  showDetails() {
    let open = this.open ? `We are open` : `Sorry, we are closed.`;
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
             <p> <a href="${this.website}" class="website" target="_blank">${
        this.website
      }</a> </p>
          </div>
         </div>
         <div class="link"><a href="${
           this.toGoogle
         }" target="_blank">view on googlemap</a></div>
        </div>
     `,
      maxWidth: 500
    };
    return content;
  }
  showStreetView() {
    let fenway = { lat: 42.345573, lng: -71.098326 };
    let svEl = document.getElementById("streetViewContainer");
    let svOpt = {
      position: this.location,
      pov: {
        heading: 0,
        pitch: 0
      }
    };
    svEl.innerHTML = "";
    let panorama = new google.maps.StreetViewPanorama(svEl, svOpt);
    map.setStreetView(panorama);
  }
} //end Restaurant class
