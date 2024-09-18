//getting the element by the id we gave it on our html and attaching it to a variable so we can reuse it
const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');

// stopwatch variables
let minutes = 0;
let seconds = 0;
let milliseconds= 0;
let interval;

//we want our button to do something when we click on it
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click',pauseTimer);
resetButton.addEventListener('click',resetTimer);

//we create the functions for the individual timer

function startTimer(){
interval= setInterval(updateTimer,10);
 startButton.disable = true;
}
function stopTimer(){
    clearInterval(interval)

    addtoLapList();

    resetTimerData();
    startButton.disable = false;

}
function pauseTimer(){
    clearInterval(interval);
    startButton.disable = false

}
function resetTimer(){
  clearInterval(interval);
  resetTimerData();
  startButton.disable = false
}

// we then create the function to update our Timer
function updateTimer(){
    milliseconds++;
    if (milliseconds == 1000){ ////1000 milliseconds = 1 seconds
        milliseconds = 0;
        seconds++;
        if (seconds === 60){
            seconds = 0;
            minutes++;
        }
    }
    displayTimer();
}

// updates the value of the labels
function displayTimer(){
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}
//to display our time in two units
function padTime(time){
return time.toString().padStart(2,'0')
}
// we want to write the function for rest time
function resetTimerData(){
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}

function addtoLapList(){
   const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}` 
   const listItem = document.createElement('li')
   listItem.innerHTML = `<span>Lap${lapList.childElementCount + 1}:</span>${lapTime}`
     lapList.appendChild(listItem);
}