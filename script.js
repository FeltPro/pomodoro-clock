const minutesSlot = document.getElementById('minutes-slot')
const secondsSlot = document.getElementById('seconds-slot')
const startStop = document.getElementById('start-stop')
const refresh = document.getElementById('refresh')
const alarm = document.getElementById("myAudio"); 
const timerLabel = document.getElementById("timer-label"); 

const breakDecrement = document.getElementById('break-decrement')
const breakIncrement = document.getElementById('break-increment')
const breakLengthSlot = document.getElementById('break-length')

const sessionDecrement = document.getElementById('session-decrement')
const sessionIncrement = document.getElementById('session-increment')
const sessionLengthSlot = document.getElementById('session-length')




let timerOn = 0
let sessionLength = 25
let breakLength = 5
let timeRemainingSession = 60 * sessionLength
let timeRemainingBreak = 60 * breakLength
let clearTheTimeout
let clearTheSecondTimeout
let sessionPeriod = false

startStop.addEventListener('click', playPause)
refresh.addEventListener('click', reset)

breakIncrement.addEventListener('click', ()=> {
    timerLabel.innerText = "Break"
    breakLength++
    timeRemainingBreak = timeRemainingBreak + 60
    breakLengthSlot.innerText = breakLength
    let mins = Math.floor(timeRemainingBreak / 60)
    let secs = timeRemainingBreak % 60
    secs < 10 ? secs = `0${secs}` : secs;
    
    minutesSlot.innerText = mins;
    secondsSlot.innerText = secs;
})

breakDecrement.addEventListener('click', () => {
    timerLabel.innerText = "Break"
    if (breakLength > 1 && timeRemainingBreak > 0) {
        breakLength--
        timeRemainingBreak = timeRemainingBreak - 60
    }
    breakLengthSlot.innerText = breakLength
    let mins = Math.floor(timeRemainingBreak / 60)
    let secs = timeRemainingBreak % 60
    secs < 10 ? secs = `0${secs}` : secs;
    
    minutesSlot.innerText = mins;
    secondsSlot.innerText = secs;
})

sessionIncrement.addEventListener('click', () => {
    timerLabel.innerText = "Session"
    sessionLength++
    timeRemainingSession = timeRemainingSession + 60
    sessionLengthSlot.innerText = sessionLength
    let mins = Math.floor(timeRemainingSession / 60)
    let secs = timeRemainingSession % 60
    secs < 10 ? secs = `0${secs}` : secs;
    
    minutesSlot.innerText = mins;
    secondsSlot.innerText = secs;
})

sessionDecrement.addEventListener('click', () => {
    timerLabel.innerText = "Session"
    if (sessionLength > 1 && timeRemainingSession > 0) {
        sessionLength--
        timeRemainingSession = timeRemainingSession - 60
    }
    sessionLengthSlot.innerText = sessionLength
    let mins = Math.floor(timeRemainingSession / 60)
    let secs = timeRemainingSession % 60
    secs < 10 ? secs = `0${secs}` : secs;
    
    minutesSlot.innerText = mins;
    secondsSlot.innerText = secs;
})


function resetBreak() {
    pause()
    timeRemainingSession = 60 * breakLength
    let mins = Math.floor(timeRemainingBreak / 60)
    let secs = timeRemainingBreak % 60
    secs < 10 ? secs = `0${secs}` : secs;
    
    minutesSlot.innerText = mins;
    secondsSlot.innerText = secs;
}

function reset() {
    pause()
    timerLabel.innerText = "Session"
    timeRemainingSession = 60 * sessionLength
    let mins = Math.floor(timeRemainingSession / 60)
    let secs = timeRemainingSession % 60
    secs < 10 ? secs = `0${secs}` : secs;
    
    minutesSlot.innerText = mins;
    secondsSlot.innerText = secs;
}

function playPause() {
    if (!timerOn) {
        timerLabel.innerText = "Session"
        timerOn = 1
        startStop.style.color = 'green'
        refresh.style.color = 'blue'
        sessionCountdown()
    } else {
        startStop.style.color = 'red'
        pause()
    }
}

function sessionCountdown() { 
console.log(sessionPeriod)
    if (sessionPeriod === false) {
        let mins = Math.floor(timeRemainingSession / 60)
        let secs = timeRemainingSession % 60
        secs < 10 ? secs = `0${secs}` : secs;
        
        minutesSlot.innerText = mins;
        secondsSlot.innerText = secs;
        timeRemainingSession--
        if (timeRemainingSession < 0) {
            sessionPeriod = true
            alarm.play()
            reset()
            breakCountdown()
        }
    }

    clearTheTimeout = setTimeout(sessionCountdown, 1000)
}

function breakCountdown() {
    timerLabel.innerText = "Break"

    let mins = Math.floor(timeRemainingBreak / 60)
    let secs = timeRemainingBreak % 60
    timeRemainingBreak = 60 * breakLength
    secs < 10 ? secs = `0${mins}` : secs;

    minutesSlot.innerText = mins;
    secondsSlot.innerText = secs;  
    timeRemainingBreak--
    console.log(timeRemainingBreak)
    if (timeRemainingBreak < 0) {
        sessionPeriod = false
        reset()
        timerLabel.innerText = "Session"
        sessionCountdown()
    }
    clearTheSecondTimeout = setTimeout(breakCountdown, 1000)
}

function pause() {
    clearTimeout(clearTheTimeout)
    clearTimeout(clearTheSecondTimeout)
    timerOn = 0
}