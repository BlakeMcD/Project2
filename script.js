//let and const
let buttonsWork = false;
let imagesHeaderExists = false;
const imageGallery = document.querySelector('.imageGallery');
const image = document.querySelector('.image');
const container = document.getElementById("container");
// container.style.padding = 0;
let favouriteClicked = false;

//Slideshow
// let slideshowCounter = 0;
// let slideshowImages = [];
// let slidshowCreated = false;

// if (Array.isArray(emptyArray) && emptyArray.length)
// {
//     slideshowCreate = true;
// }



//Search Photos Function 
function searchPhotos() {
    let clientId = "llmyDAM46Iyjezu-cd3FCEOJJepSNekA7Tg1STQTwKY";
    let query = document.getElementById("search").value;
    let url = "https://api.unsplash.com/search/photos?client_id="+clientId+"&query="+query;

    //remove previous search results (if they exists)
    imageGallery.innerHTML = "";

    //make API request
    fetch(url)
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
        console.log(data);

         for (const photo of data.results.slice(0,15)) {

            const div = document.createElement('div');


            function getRandomInt(max) {
                return Math.ceil(Math.random() * max);
            }
            
            const results = `
            <img src="${photo.urls.regular}" class="image">
            <icon class="likeIcon"><i class="far fa-heart" class="heartOutline" ></i></icon>
            `;


            div.innerHTML = results;
            div.className = "photos";


           document.querySelector('.imageGallery').append(div);

           let rValue = getRandomInt(3);
           let cValue = getRandomInt(3);

           div.classList.add(`rowSpan${rValue}`);
           div.classList.add(`columnSpan${cValue}`);

        }

        //make like buttons clickable
        buttonsWork = true;


        
        // //reset counter to 1
        // //counter = 1;

        //Set Opacity of Images to 1
        const imagesHeader = document.getElementById("imagesHeader");
        imagesHeader.style.opacity = 1;
        //padding of images

        // container.style.border = "1%";
        container.classList.remove("hidden");
        

    }) 
}




// const likeIcon = document.querySelector('.far');
// const likeButton = document.getElementByClass('.likeIcon');

    imageGallery.addEventListener('click',(event) => {
        // console.log(event.target.classList)
        // console.log(event.target.class);
        if (event.target.classList.contains("fa-heart")) {
            if (event.target.classList.contains("far")) { //clicks on like button
                event.target.classList.replace("far", "fas");
                //what is everything that it has to do? 
                //create the Favourites Section
                //prepare the slideshow
                //push the pic into the slideshow
                const photo = event.target.parentNode.parentNode.querySelector('img');
                console.log(photo); //test

                let photoClone = photo.cloneNode(true);
                // photoClone.classList.remove("image")
                // photoClone.classList.add(`favouritePhoto <icon class="likeIcon"><i class="far fa-heart" class="heartOutline" >`)
                photoClone.classList.add("favouritePhoto")
                document.querySelector('#slideShow').append(photoClone); 

                favouriteClicked = true;


            //     const results = `
            // <img src="${photo.urls.regular}" class="image">
            // <icon class="likeIcon"><i class="far fa-heart" class="heartOutline" ></i></icon>
            // `;


            // div.innerHTML = results;
            // div.className = "photos";

            } else {
                event.target.classList.replace("fas", "far");  //dislikes the image
            }
        } 
    })


//SLIDESHOW

const slideShow = document.querySelector('#slideShow')
const showShowImages = document.querySelectorAll('#slideShow img')

//buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 1;
const size = 24;

slideShow.style.transform = 'translateX(' + (-size) +'px)'

    nextBtn.addEventListener('click',()=>{
        slideShow.style.transition = "transform 0.4s ease-in-out"
        counter++;
        console.log(counter)
        slideShow.style.transform = 'translateX(' + (-size) +'px)'
    })


