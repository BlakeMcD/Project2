
//DECLARE VARIABLES
let buttonsWork = false;
let imagesHeaderExists = false;
const imageGallery = document.querySelector('.imageGallery');
const image = document.querySelector('.image');
const container = document.getElementById("container");
let favouriteClicked = false;
let translate = 0;
let scrollAmount = 10;
let imgID = 0;

//favouritesDataStructure
const favouritePhotos = []; 


//SEARCH PHOTOS FUNCTION
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

        for (const photo of data.results.slice(0,30)) {
            //create an element
            const div = document.createElement('div');
            //give it the right innerhtml and classname;
            const results = `
            <img src="${photo.urls.regular}" class="image" id="${photo.id}">
            <icon class="likeIcon"><i class="far fa-heart"></i></icon>
            `;

            div.innerHTML = results;
            div.className = "photos";
        
            //append the image
            document.querySelector('.imageGallery').append(div);

            let rValue = getRandomInt(3);
            let cValue = getRandomInt(3);

            div.classList.add(`rowSpan${rValue}`);
            div.classList.add(`columnSpan${cValue}`);

        }

        //make like buttons clickable
        buttonsWork = true;

        //Set Opacity of Images to 1
        const imagesHeader = document.getElementById("imagesHeader");
        imagesHeader.style.opacity = 1;

        // container.style.border = "1%";
        container.classList.remove("hidden");
    }) 
}

//generate a random value for the rowSpan and columnSpan for CSS
function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

//CLICK ON HEART
imageGallery.addEventListener('click',(event) => {
    if (event.target.classList.contains("fa-heart")) {
        if (event.target.classList.contains("far")) { //clicks on like button
            event.target.classList.replace("far", "fas");
            const photo = event.target.parentNode.parentNode.querySelector('img');
            // console.log(photo); //test

            //ORIGINAL CODE
            let photoClone = photo.cloneNode(true);
            photoClone.classList.add("favouritePhoto")
            // photoClone.dataList.add(imgID)
            photoClone.id = photo.id;
            document.querySelector('#slideShow').append(photoClone); 

            favouriteClicked = true;

            // //EXPERIMENTAL CODE - add photo to array
            // let newPhoto = {
            //     name: 'img'+imgID,
            //     imageUrl: photoClone.src,
            //     unliked: false,
            // }
            // imgID += 1;
            // const add = favouritePhotos.push(newPhoto)
            // console.log(favouritePhotos)

            // const newPhotoResults = `
            // <img src="${newPhoto.imageUrl}" class="image">
            // <icon class="likeIcon"><i class="far fa-heart"></i></icon>
            // <div>
            //     <button class="testButton">Test Button</button>
            // </div>
            // `;

            // const newdiv = document.createElement('div')
            // newdiv.innerHTML = newPhotoResults;
            // newdiv.className = "favePhotos";

            // document.querySelector('#slideShow2').append(newdiv); 

            // //MORE EXPERIMENTAL CODE

            // //delete everything in slideshow three
            // const slideshow3 = document.querySelector('#slideshow3')
            // slideshow3.innerHTML='';
            
            
            // replenishPhotos = () => {
            //     for (img of favouritePhotos)
            //     {
            //         const newPhotoResultsArray = `
            //         <img src="${img.imageUrl}" class="image">
            //         <icon class="likeIcon"><i class="far fa-heart"></i></icon>
            //         `;

            //         const newdiv2 = document.createElement('div')
            //         newdiv2.innerHTML = newPhotoResultsArray;
            //         newdiv2.className = "favePhotos";

            //         document.querySelector('#slideShow3').append(newdiv2); 
            //     }
            // }
        } else { //dislikes the image
            
            event.target.classList.replace("fas", "far");  
            // slideShow.querySelector(event.target.parentNode.parentNode)
            //console.log(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.)
            let relevantPhoto= event.target.parentNode.parentNode.getElementsByClassName("image");
            let finalID = relevantPhoto[0].id;
            console.log(relevantPhoto)
            console.log(finalID)

            // let targetPhoto = document.getElementsByClassName("favouritesClass")
            let targetPhoto = document.getElementById(`${finalID}`)
            console.log(targetPhoto)
            targetPhoto.remove();

            // let targetPhoto = document.getElementById().getElementsByClassName('#slideShow')
            // console.log(image.children)
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
const size = 20;

let holdInterval;

//HOLD DOWN NEXT BUTTON
const mouseHoldDownRight = function() {
    holdInterval = setInterval(() => {
        // if (translate > 0) {
            counter++;
            console.log(counter)

            translate -= scrollAmount;
            slideShow.style.transform = 'translateX(' + (translate) +'px)'
            console.log(slideShow.style.transform);
            prevBtn.style.color = '#664684'
            // }     
    }, 15)
}

nextBtn.addEventListener('mousedown',()=>{
    mouseHoldDownRight();
})

nextBtn.addEventListener('mouseup',()=>{
    clearInterval(holdInterval)
})

//HOLD DOWN PREV BUTTON
const mouseHoldDownLeft = function() {
    holdInterval = setInterval(() => {
        if (translate < 0) {
        counter--;
        console.log(counter)
        translate += scrollAmount;
        slideShow.style.transform = 'translateX(' + (translate) +'px)'
        console.log(slideShow.style.transform);
        // prevBtn.style.color = '#664684'
        }
        else {
        prevBtn.style.color = '#d4cadf'
        }
    }, 15)
}

prevBtn.addEventListener('mousedown',()=>{
    mouseHoldDownLeft();
})

prevBtn.addEventListener('mouseup',()=>{
    clearInterval(holdInterval)
})




