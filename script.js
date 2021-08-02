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
            const button = document.createElement('button')


            function getRandomInt(max) {
                return Math.ceil(Math.random() * max);
            }
            
            const results = `
            <img src="${photo.urls.regular}" class="image">
            <button class="likeButton2">TEST2</button>
            `;


            div.innerHTML = results;
            div.className = "photos";
            button.innerText = "test"
            button.className = "likeButton"


           document.querySelector('.imageGallery').append(div);
           document.querySelector('.imageGallery').append(button);

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