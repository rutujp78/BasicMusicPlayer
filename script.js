console.log("Welcome to Basic Music Player");

// Initaialize the Variables
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterPause = document.getElementById('masterPause');
let songitems = Array.from(document.getElementsByClassName('songitem'));
let backwardStep = document.getElementById('backwardStep');
let forwardStep = document.getElementById('forwardStep');

let songs = [
    {songName: "Cartoon - On", filePath: "song/Cartoon - On.mp3", coverPath: "cover/ncs.svg.png"},
    {songName: "JPB - Up Away", filePath: "song/JPB - Up Away.mp3", coverPath: "cover/ncs.svg.png"},
    {songName: "Syn Cole - Feel Good", filePath: "song/Syn Cole - Feel Good", coverPath: "cover/ncs.svg.png"},
    {songName: "Vexento - Masked Raver", filePath: "song/Vexento - Masked Raver.mp3", coverPath: "cover/ncs.svg.png"}
]

// Update songs index
songitems.forEach((element , i)=>{
    element.getElementsByClassName("songName")[0]. innerText = songs[i].songName;
})

// Listen to Events
masterPlay.addEventListener('click', ()=>{
    audioElement.play();
    document.getElementById('masterPlay').style.display="none";
    document.getElementById('masterPause').style.display="unset";
})
masterPause.addEventListener('click', ()=>{
    audioElement.pause();
    document.getElementById('masterPause').style.display="none";
    document.getElementById('masterPlay').style.display="unset";
})
    
// Time update
audioElement.addEventListener('timeupdate', ()=> {
    console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
    updateProgressBar();
})
    
// Custom input type="range"
function updateProgressBar(){
    myProgressBar.style.background =`linear-gradient(90deg, black ${progress}%, #ddd 0%)`;
}
    
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
    
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        document.getElementById("bottom").style.visibility="visible";
        index = parseInt(e.target.id);
        audioElement.src = `song/${songs[index].songName}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        document.getElementById('masterPlay').style.display="none";
        document.getElementById('masterPause').style.display="unset";
        //console.log(e);
    })
})

// Previous and next song
backwardStep.addEventListener('click', ()=>{
    index--;
    if(index<0){
        index=songs.length - 1;
    }
    audioElement.src= `song/${songs[index].songName}.mp3`;
    audioElement.play();
    document.getElementById('masterPlay').style.display="none";
    document.getElementById('masterPause').style.display="unset";
})

forwardStep.addEventListener('click', ()=>{
    index++;
    if (index> songs.length -1) {
        index= 0;
    }
    audioElement.src= `song/${songs[index].songName}.mp3`;
    audioElement.play();
    document.getElementById('masterPlay').style.display="none";
    document.getElementById('masterPause').style.display="unset";
})

//volume rocker
volRocker.addEventListener('change', ()=>{
    audioElement.volume = volRocker.value;
    if (audioElement.volume==0) {
        document.getElementById('volH').style.display="none";
        document.getElementById('volOff').style.display="unset";
    } else {
        document.getElementById('volOff').style.display="none";
        document.getElementById('volH').style.display="unset";
    }
})