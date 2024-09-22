const timerLable=document.querySelector('#timer-label');
const timeLeft=document.querySelector("#time-left");
const startBtn=document.querySelector("#start_stop")
const resetBtn=document.querySelector("#reset");
const breakIncBtn=document.querySelector("#break-increment");
const breakDecBtn=document.querySelector("#break-decrement");
const sessionIncBtn=document.querySelector("#session-increment");
const sessionDecBtn=document.querySelector("#session-decrement");
const breakLength=document.querySelector("#break-length")
const sessionLength=document.querySelector("#session-length");

let sessionInterval;
let breakInterval;
let seconds=0;

let sesLen=25;
let brkLen=5;

function updateChange(element,value){
    element.innerHTML=value;
}

function isRunning(){
    if(sessionInterval || breakInterval) return true;
}
function incrementBreak(){
    if(isRunning) return;
    if(brkLen<59){
      brkLen++;
      updateChange(breakLength,brkLen);
    }
}

function decrementBreak(){
    if(isRunning) return;
    if(brkLen>1){
    brkLen--;
    updateChange(breakLength,brkLen);
    }
}

function incrementSession(){
    if(isRunning) return;
    if(sesLen<59){
    sesLen++;
    updateChange(sessionLength,sesLen);
    }
}

function decrementSession(){
    if(isRunning) return;
    if(sesLen>1)
    sesLen--;
    updateChange(sessionLength,sesLen);
}

function startBreak(){
     clearInterval(sessionInterval);
     seconds=0,sesLen=25,brkLen=5;
     updateChange(timerLable,'Break Started');
     breakInterval=setInterval(()=>{
        if(brkLen==0&&seconds==0){
            startSession();
        }
        if(brkLen>1&&seconds==0){
            brkLen--;
            seconds=60;
        }
        let value=`<span>${brkLen}</span><span>:</span><span>${seconds>9?seconds:"0"+seconds}</span>`;
        updateChange(timeLeft,value);
        },1000);
}

function startSession(){
     clearInterval(breakInterval);
     seconds=0,sesLen=25,brkLen=5;
     updateChange(timerLable,'Session');
     sessionInterval=setInterval(()=>{
        if(sesLen==0&&seconds==0){
            startBreak();
        }
        if(seconds==0){
            sesLen--;
            seconds=60;
        }
        console.log(sesLen,seconds);
        seconds--;
        let value=`<span>${sesLen}</span><span>:</span><span>${seconds>10?seconds:"0"+seconds}</span>`;
        updateChange(timeLeft,value);
        },1000);
}

function startClock(){
    if(sessionInterval||breakInterval) return;
    startSession();
}

function resetClock(){
    clearInterval(sessionInterval);
    clearInterval(breakInterval);
    sesLen=25;
    brkLen=5;
    let value=`<span>25</span><span>:</span><span>00</span>`;
    updateChange(timerLable,'Session');
    updateChange(timeLeft,value);
    updateChange(sessionLength,sesLen);
    updateChange(breakLength,brkLen);
}

breakIncBtn.addEventListener('click',incrementBreak);
breakDecBtn.addEventListener('click',decrementBreak);
sessionIncBtn.addEventListener('click',incrementSession);
sessionDecBtn.addEventListener('click',decrementSession);
startBtn.addEventListener('click',startClock);
resetBtn.addEventListener('click',resetClock);