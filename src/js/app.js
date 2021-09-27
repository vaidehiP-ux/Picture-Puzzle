import '../scss/style.scss';
import PicturePuzzle from './PicturePuzzle';

//declarations
const IMAGE_INPUT = document.querySelector('#imageSrc');
const DIMENTION_INPUT = document.querySelector('#dimension');
const MODAL = document.querySelector('#success-modal');
let imageElement = document.getElementById('puzzle-wrapper');
let spanCount = document.querySelector(".countdown");

//initial settings
document.getElementById('countdown').style.display = 'none';
document.getElementById('game-result').style.display = 'none';
document.getElementById('instruction-text').innerHTML = "";
document.getElementById('timer').style.display = 'none';

//Timer declarations
var min = 0;
var sec = 0;
var msec = 0;
var elemMin = document.getElementById("min");
var elemSec = document.getElementById("sec");
var elemMsec = document.getElementById("msec");
var bStart = document.getElementById("start");
var bStop = document.getElementById("stop");
var bRestart = document.getElementById("restart");
var Interval;
let count = 3;

//Configuration Animated heading
const BAFFLE_HEADING = baffle('.baffle');
BAFFLE_HEADING.set({
  characters: '!/|~#.^+*$#%nwf',
  speed: 100
});
BAFFLE_HEADING.start();
BAFFLE_HEADING.reveal(2000);

//Outer container CSS
document.getElementById('container').style.backgroundImage="url(../assets/puzzle-background.jpeg)";
document.getElementById('container').style.backgroundRepeat="no-repeat";
document.getElementById('container').style.backgroundSize="cover";
document.getElementById('container').style.backgroundPosition= 'center';
let picturePuzzle = {};

//Event listners
IMAGE_INPUT.addEventListener('change', (event) => {
  if (document.getElementById("dimension").value === '') {
    alert("please add dimension to move forward");
  } else if (document.getElementById("imageSrc").value ==='') {
    alert("please add image source to move forward");
  }
});

DIMENTION_INPUT.addEventListener('change', (event) => {
  //clear puzzle before processing
  picturePuzzle = {};
  document.getElementById('puzzle-wrapper').innerHTML = "";
  const image = document.getElementById("imageSrc").value ;
  const dimm = document.getElementById("dimension").value;
   picturePuzzle = new PicturePuzzle(
    imageElement,
    image,
    900,
    dimm
  );
  displayImage(image);
});

//display image given by user
let displayImage = (imageSrc) => {
  clearInterval(Interval);
    	sec = "00";
    	msec = "00";
    	elemMsec.innerHTML = msec;
    	elemSec.innerHTML = sec;
  document.getElementById('display-image').innerHTML = "";
  let img = document.createElement('img');
  img.style.width = '300px';
  img.style.height = '200px';
  img.src = imageSrc;
  document.getElementById('display-image').appendChild(img);
  document.getElementById('countdown').style.display = 'block';
  document.getElementById('game-result').style.display = 'block';
  document.getElementById('instruction-text').innerHTML = "Resolve to following Image";

  let countable= setInterval(function (){
    spanCount.innerText = count
    if(count > 0){
      count -= 1;
    } else if(count <= 0){
      clearInterval(countable);
      document.getElementById('display-image').innerHTML = "";
      document.getElementById('countdown').style.display = 'none';
      document.getElementById('game-result').style.display = 'none';
      document.getElementById('instruction-text').innerHTML = "Game starts now!";
      document.getElementById('timer').style.display = 'block';
      clearInterval(Interval);
      Interval = setInterval(timer, 10);
    }
  }, 1000);
}

//Timer configurations
function timer () {
  msec++;
  if(msec <= 9){
    elemMsec.innerHTML = "0" + msec;
  }
  if(msec > 9){
    elemMsec.innerHTML = msec;
  }
  if (msec > 99) {
    console.log("sec");
    sec++;
    elemSec.innerHTML = "0" + sec;
    msec = 0;
    elemMsec.innerHTML = "0" + 0;
  }
  if(sec > 9){
    elemSec.innerHTML = sec;
  }
  if(sec > 59){
    console.log("min");
    min++;
    elemMin.innerHTML = "0" + min;
    sec = 0;
    elemSec.innerHTML = "0" + 0;
  }
  if(min > 9){
    elemMin.innerHTML = min;
  }
}

//Swap functionality
picturePuzzle.onSwap = function(movements){
  console.log(movements);
};

//MODAL style
MODAL.style.display = 'block';

//MODAL methods
export let  onFinished = () => {
  clearInterval(Interval);
  console.log("Show good job dialog");
  let msgText = document.getElementById('instruction-text');
  msgText.innerHTML = "Good job!";
  msgText.style.fontSize = "44px";
  msgText.style.color = "Acqa";
  setTimeout(() => {
    MODAL.classList.add('open');
  }, 500);
  MODAL.querySelector('.trigger').onclick = () => {
    msgText.innerHTML = "";
    msgText.style.fontSize = "24px";
    msgText.style.color = "white";
    MODAL.classList.remove('open');
  }
};