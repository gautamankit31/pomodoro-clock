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
const audio = document.getElementById('session-audio');

let sessionInterval;
let breakInterval;
let sesLen=25;
let brkLen=5;

let originalSesLen=sesLen;
let originalBrkLen=brkLen;

let sessionCounter=0;
const totalSessions=4;

function updateChange(element,value){
    element.innerHTML=value;
}

function isRunning(){
    if(sessionInterval || breakInterval) {
        console.log("session still exists");
        return true;
    }
    return false;
}
function incrementBreak(){
    if(isRunning()) return;
    if(brkLen<59){
      brkLen++;
      originalBrkLen = brkLen;
      updateChange(breakLength,brkLen);
    }
}

function decrementBreak(){
    if(isRunning()) return;
    if(brkLen>1){
    brkLen--;
    originalBrkLen = brkLen;
    updateChange(breakLength,brkLen);
    }
}

function incrementSession(){
    if(isRunning()) return;
    if(sesLen<59){
    sesLen++;
    originalSesLen = sesLen;
    let value=`<span>${sesLen}</span><span>:</span><span>00</span>`;
    updateChange(timeLeft,value);
    updateChange(sessionLength,sesLen);
    }
}

function decrementSession(){
    if(isRunning()) return;
    if(sesLen>1){
    sesLen--;
    originalSesLen = sesLen;
    let value=`<span>${sesLen}</span><span>:</span><span>00</span>`;
    updateChange(timeLeft,value);
    updateChange(sessionLength,sesLen);
    }
}

function startBreak(){
     clearInterval(sessionInterval);
     let seconds=0;
     brkLen=originalBrkLen;
     updateChange(timerLable,'Break Started');
     audio.currentTime=0;
     audio.play();
    //console.log(seconds,brkLen);

     breakInterval=setInterval(()=>{
        if(brkLen==0&&seconds==0){
            sessionCounter++;
            console.log(sessionCounter);
            if(sessionCounter>=totalSessions){
                resetClock();
            }
            else{
            clearInterval(breakInterval);

            startSession();
            }
        }
        else if(brkLen>0 && seconds<=0){
            brkLen--;
            seconds=60;
        }
        if(seconds>0){
        seconds--;
        let value=`<span>${brkLen}</span><span>:</span><span>${seconds>9?seconds:"0"+seconds}</span>`;
        updateChange(timeLeft,value);
        }
        },100);
}

function startSession(){
     clearInterval(breakInterval);
     let seconds=0;
     sesLen=originalSesLen;
     updateChange(timerLable,'Session');
     audio.currentTime=0;
     audio.play();
    //console.log(seconds,sesLen);

     sessionInterval=setInterval(()=>{
        if(sesLen==0&&seconds==0){
            startBreak();
        }
        else if(sesLen>0 && seconds<=0){
            sesLen--;
            seconds=60;
        }
        if(seconds>0){
        seconds--;
        let value=`<span>${sesLen}</span><span>:</span><span>${seconds>9?seconds:"0"+seconds}</span>`;
        updateChange(timeLeft,value);
        }
        },100);
}

function startClock(){
    if(isRunning()) return;
    sessionCounter=0;
    startSession();
}

function resetClock(){
    //console.log("reset");
    clearInterval(sessionInterval);
    clearInterval(breakInterval);
    sessionInterval=null;
    breakInterval=null;
    sesLen=25;
    brkLen=5;
    sessionCounter=0;
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