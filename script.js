console.log("Spotify Clone Loaded");

// Initialize variables
let naatIndex = 0;
let audioElement = new Audio("naatk/1.mp3")
let masterPlay = document.getElementById('masterPlay')
let myRange = document.getElementById('myRange')
let gif = document.getElementById('gif');
let masternaatname = document.getElementById('masternaatname');
let naatItems = Array.from(document.getElementsByClassName('naatItem'))
let naat = [
    { naatName: "aine ke nazar", filepath: "naatk/1.mp3", coverPath: "image/1.jpg" },
    { naatName: "ek phole tha me", filepath: "naatk/2.mp3", coverPath: "image/2.jpg" },
    { naatName: "kun anta", filepath: "naatk/3.mp3", coverPath: "image/3.jpg" },
    { naatName: "mustafa", filepath: "naatk/4.mp3", coverPath: "image/4.jpg" },
    { naatName: "na koi", filepath: "naatk/5.mp3", coverPath: "image/5.jpg" },
    { naatName: "quran", filepath: "naatk/6.mp3", coverPath: "image/6.jpg" },
    { naatName: "rah matul", filepath: "naatk/7.mp3", coverPath: "image/7.jpg" },
    { naatName: "rahman", filepath: "naatk/8.mp3", coverPath: "image/8.jpg" },
]
naatItems.forEach((element, i) => {
    
    element.getElementsByTagName("img")[0].src = naat[i].coverPath;
    element.getElementsByClassName("naatName")[0].innerText = naat[i].naatName;

})

//audioElent.play();

//handling play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        document.querySelector('.naatinfo img').style.opacity = 1; // Show the image
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        document.querySelector('.naatinfo img').style.opacity = 0; // Hide the image
    }
})
//listening to events
audioElement.addEventListener('timeupdate', () => {
    console.log("Current time:", audioElement.currentTime);
    //update seekbar
    audioElement.addEventListener('timeupdate', () => {
        // calculate progress percentage
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

        // set the range input value
        myRange.value = progress;
    })
    myRange.addEventListener('change', () => {
        audioElement.currentTime = myRange.value * audioElement.duration / 100;

    })
    
})

//make all plays
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('naatItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');

    })
}
//handle click on naat items
Array.from(document.getElementsByClassName('naatItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        masternaatname.innerText = naat[naatIndex].naatName; // Update the master naat name
        gif.style.opacity = 1;
        naatindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = 'naatk/' + (naatindex + 1) + '.mp3';
        audioElement.currentTime = 0;
        audioElement.play(); 
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
})
//handle next click
document.getElementById('next').addEventListener('click', () => {
    if (naatIndex >= naat.length - 1) {
        naatIndex = 0;
    } else {
        naatIndex += 1;     
}
    audioElement.src = 'naatk/' + (naatIndex + 1) + '.mp3';masternaatname.innerText = naat[naatIndex].naatName; // Update the master naat name
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    makeAllPlays();
    document.getElementById(naatIndex).classList.remove('fa-play');
    document.getElementById(naatIndex).classList.add('fa-pause');
})

//handle previous click
document.getElementById('previous').addEventListener('click', () => {
    if (naatIndex <= 0) {
        naatIndex = naat.length - 1;
    } else {
        naatIndex -= 1;
    }
    audioElement.src = 'naatk/' + (naatIndex + 1) + '.mp3';
    masternaatname.innerText = naat[naatIndex].naatName; // Update the master naat name
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    makeAllPlays();
    document.getElementById(naatIndex).classList.remove('fa-play');
    document.getElementById(naatIndex).classList.add('fa-pause');
})

// Handle range input change
myRange.addEventListener('input', () => {
    audioElement.currentTime = myRange.value * audioElement.duration / 100;
})






