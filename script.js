var bell = new Audio('https://orangefreesounds.com/wp-content/uploads/2014/11/Gong-sound.mp3')
var beethoven = new Audio('https://play.publicradio.org/web/o/minnesota/classical/programs/free-downloads/2020/03/26/daily_download_20200326_128.mp3?dlt=ycdd')

const minutesSlot = document.getElementById('minutes-slot')
const secondsSlot = document.getElementById('seconds-slot')
const startStop = document.getElementById('start-stop')
const refresh = document.getElementById('refresh')
const timerLabel = document.getElementById("timer-label"); 
const volControl = document.getElementById("vol-control"); 

const breakDecrement = document.getElementById('break-decrement')
const breakIncrement = document.getElementById('break-increment')
const breakLengthSlot = document.getElementById('break-length')

const sessionDecrement = document.getElementById('session-decrement')
const sessionIncrement = document.getElementById('session-increment')
const sessionLengthSlot = document.getElementById('session-length')

const timerContainer = document.querySelector('.timer-container')
const volumeXmark = document.querySelector('.fa-volume-xmark')
const volHigh = document.querySelector('.fa-volume-high')

let timerOn = 0
let sessionLength = 25
let breakLength = 5
let timeRemainingSession = 60 * sessionLength
let timeRemainingBreak = 60 * breakLength
let clearTheTimeout
let clearTheSecondTimeout
let sessionPeriod = false
let musicToggle = 0

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

function playPause() {
    if (!timerOn) {
        timerLabel.innerText = "Session"
        timerOn = 1
        audioToggle()
        startStop.style.color = 'green'
        refresh.style.color = 'blue'
        sessionCountdown()
    } else {
        startStop.style.color = 'red'
        pause()
    }
}

function reset() {
    beethoven.pause()
    pause()
    timerLabel.innerText = "Session"
    timeRemainingSession = 60 * sessionLength
    let mins = Math.floor(timeRemainingSession / 60)
    let secs = timeRemainingSession % 60
    secs < 10 ? secs = `0${secs}` : secs;
    
    minutesSlot.innerText = mins;
    secondsSlot.innerText = secs;
    beethoven.pause()
}


function sessionCountdown() { 
        timerContainer.style.backgroundColor = "orange"
        let mins = Math.floor(timeRemainingSession / 60)
        let secs = timeRemainingSession % 60
        secs < 10 ? secs = `0${secs}` : secs;
        
        minutesSlot.innerText = mins;
        secondsSlot.innerText = secs;
        timeRemainingSession--
        console.log(timeRemainingSession)
        if (timeRemainingSession <= -1) {
            timeRemainingBreak = 60 * breakLength
            beethoven.pause()
            bell.play()
            breakCountdown()
            return
        }
    clearTheTimeout = setTimeout(sessionCountdown, 1000)
}

function breakCountdown() {
    timerContainer.style.backgroundColor = "green"
    timerLabel.innerText = "Break"
    let mins = Math.floor(timeRemainingBreak / 60)
    let secs = timeRemainingBreak % 60

    secs < 10 ? secs = `0${secs}` : secs;

    minutesSlot.innerText = mins;
    secondsSlot.innerText = secs;  
    timeRemainingBreak--
    console.log(timeRemainingBreak)
    if (timeRemainingBreak < -1) {
        timeRemainingSession = 60 * sessionLength
        bell.play()
        timerLabel.innerText = "Session"
        sessionCountdown()
        return
    }
    clearTheSecondTimeout = setTimeout(breakCountdown, 1000)
}

function pause() {
    clearTimeout(clearTheTimeout)
    clearTimeout(clearTheSecondTimeout)
    timerOn = 0
    beethoven.pause()

}

function audioToggle() {
    if (!musicToggle && timerOn) {
        (musicToggle = 1)
        volHigh.style.color = "green"
        beethoven.play()
    } else if (musicToggle) {
        volumeXmark.style.color = "red"
        beethoven.pause()
        musicToggle = 0
    }
}

volControl.addEventListener('click', ()=> {
    audioToggle()
    volumeXmark.classList.toggle('hide')
    volHigh.classList.toggle('hide')
}) 