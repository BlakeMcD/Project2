//Search Photos Function 
function searchPhotos() {
    let clientId = "llmyDAM46Iyjezu-cd3FCEOJJepSNekA7Tg1STQTwKY";
    let query = document.getElementById("search").value;
    let url = "https://api.unsplash.com/search/photos?client_id="+clientId+"&query="+query;

    //make API request
    fetch(url)
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
        console.log(data);

         for (const photo of data.results.slice(0,15)) {

            const div = document.createElement('div');

            // const results = `
            // <img src="${photo.urls.regular}" class="galleryImage">
            // <ion-icon name="heart-outline" class="likeBtn"></ion-icon>
            // `;

            function getRandomInt(max) {
                return Math.ceil(Math.random() * max);
              }
            


            const results = `
            <img src="${photo.urls.regular}" class="image">
            `;


            // const results = `
            // <img src="${photo.urls.regular}" class="image rowSpan${rValue} columnSpan${cValue}">
            // `;

            div.innerHTML = results;
            div.className = "photos";


           document.querySelector('.imageGallery').append(div);

           let rValue = getRandomInt(3);
           let cValue = getRandomInt(3);

           div.classList.add(`rowSpan${rValue}`);
           div.classList.add(`columnSpan${cValue}`);
        }
        // //make previous and next buttons clickable
        // buttonsWork = true;
        
        // //reset counter to 1
        // //counter = 1;
    }) 
}