var phrases = [
    "Hello, and welcome back!",
    "Back to the sleep",
    "Greetings!",
    "Hello! How are you?",
    "Mmmm I'm tired, splep",
    "Hello dear",
    "Sleeping is cool",
    "Please, don't you sleep",
    "Ah yes, cannoli",
    "General Kenobi"
];

var startButton = document.querySelector('.start-clock');
var resetButton = document.querySelector('.restart-clock'); 

var myClock = document.querySelector('.clock');
var myCounter = document.querySelector('.tomato-counter');

var arrowDown = document.querySelector('.arrow-down');
var navBar = document.querySelector('.navbar');
var texts = document.querySelector('.phrases');

const burger = document.querySelector('.burger');
const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const nav = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');

const options = { threshold: 0.7 };
const fisrtHalf = 1000;
const secondHalf = 500;

const audio = new Audio('bell-counter.wav');
let observer = new IntersectionObserver(bgChanger, options);

var startingTime = 25;
var sec = startingTime * 60;

var timer;
var half = 0;
var tempText = "";

var hasAlreadyClicked = false;
var isInFullScreen = false;
var isNavBarActive = false;

var toogleFullScreen;
var activeFullScreen;

sections.forEach(element => {
    observer.observe(element);
});

document.body.classList.add('bg-active-0');
document.body.classList.add('bg-active-1');
document.body.classList.add('bg-active-2');
document.body.classList.add('bg-active-3');

function genPhrase()
{
    texts.innerText = phrases[Math.floor((Math.random() * phrases.length - 1)) + 1];
    tempText = texts.innerHTML;
}

function bgChanger(enteries)
{   
    enteries.forEach(entry => {
        const className = entry.target.className;

        if (entry.isIntersecting)
        {
            if (String(className).localeCompare("main-part") === 0)
            {   
                document.body.classList.remove("bg-active-1");
                document.body.classList.remove("bg-active-2");
                document.body.classList.remove("bg-active-3");
            }

            if (String(className).localeCompare("what-is-it") === 0)
            {
                document.body.classList.add("bg-active-1");
                document.body.classList.remove("bg-active-2");
                document.body.classList.remove("bg-active-3");
            }

            if (String(className).localeCompare("about-me") === 0)
            {
                document.body.classList.add("bg-active-2");
                document.body.classList.remove("bg-active-3");
                document.body.classList.remove("bg-active-1");
            } 

            if (String(className).localeCompare("github") === 0)
            {
                document.body.classList.add("bg-active-3");
                document.body.classList.remove("bg-active-2");
                document.body.classList.remove("bg-active-1");
            }
        }
    });
}

function updateTimer() 
{
    sec--;
    
    if (sec >= 0)
    {
        const minutes = Math.floor(sec / 60);
        var seconds = sec % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;
        myClock.innerHTML = `${minutes}:${seconds}`;

        if (sec === fisrtHalf && half === 0)
        {   
            document.body.classList.remove('start');
            document.body.classList.add('first-half');
            half++;
        }

        else if (sec === secondHalf && half === 1)
        {
            document.body.classList.remove('first-half');
            document.body.classList.add('second-half');
        }
    }

    else
    {
        audio.play();

        /* Reset to the default preset */
        document.body.classList.remove('start');
        document.body.classList.remove('resume-overflow');
        navBar.classList.remove('hide-nav');
        document.body.classList.remove('first-half');
        document.body.classList.remove('second-half');
        texts.classList.remove('hide-text');
        arrowDown.classList.remove('hide-arrow');

        texts.classList.add('resume-text');
        navBar.classList.add('resume-nav');
        arrowDown.classList.add('arrown-down');
        document.body.classList.add('bg-active-0');

        startingTime = 25;
        sec = startingTime * 60;

        myClock.innerHTML = "25:00";
        startButton.value = "Start";
        hasAlreadyClicked = false;

        clearInterval(timer);

        if ((window.innerHeight == screen.height) && isInFullScreen == true) // Check if browser is in fullscreen mode
        {
            toogleFullScreen = setInterval(() => {
                if (document.exitFullscreen) 
                {
                    document.exitFullscreen();
                    clearInterval(toogleFullScreen);
                } 
                else if (document.mozCancelFullScreen) 
                {
                    document.mozCancelFullScreen(); 
                    clearInterval(toogleFullScreen); 
                } 
                else if (document.webkitExitFullscreen) 
                {
                    document.webkitExitFullscreen();
                    clearInterval(toogleFullScreen);
                } 
                
                else if (document.msExitFullscreen) 
                {
                    document.msExitFullscreen();
                    clearInterval(toogleFullScreen);
                }
            }, 1300);
        }
    }
}

/* Buttons' Functions */ 
startButton.addEventListener('click', () => {

    if (String(startButton.value).localeCompare("Resume") !== 0)
    {
        startButton.value = "Pause";

        /* Setting the fullscreen mode of the browser*/
        if ((window.innerHeight != screen.height) && isInFullScreen == false) // Check if browser is not in fullscreen mode
        {
            activeFullScreen = setInterval(() => {
                if (document.documentElement.requestFullscreen) 
                {
                    document.documentElement.requestFullscreen();
                    clearInterval(activeFullScreen);
                } 
                else if (document.documentElement.mozRequestFullScreen) /* Firefox */ 
                { 
                    document.documentElement.mozRequestFullScreen();
                    clearInterval(activeFullScreen);
                } 
                else if (document.documentElement.webkitRequestFullscreen) /* Chrome, Safari & Opera */
                { 
                    document.documentElement.webkitRequestFullscreen();
                    clearInterval(activeFullScreen);
                } 
                else if (document.documentElement.msRequestFullscreen) /* IE/Edge */
                { 
                    document.documentElement.msRequestFullscreen();
                    clearInterval(activeFullScreen);
                }
        
            }, 1300);
        }
    
        document.body.classList.add('start');
        navBar.classList.add('hide-nav');
        texts.classList.add('hide-text');
        arrowDown.classList.add('hide-arrow');
        
        navBar.classList.remove('resume-nav');
        arrowDown.classList.remove('arrown-down');
        document.body.classList.remove('bg-active-0');
    
        texts.innerHTML = "";
    
        if (hasAlreadyClicked == false)
        {   
            myCounter.innerText = parseInt(myCounter.innerText) + 1;
            hasAlreadyClicked = true; 
    
            if (sec >= 0)
            {   
                timer = setInterval(updateTimer, 1000);
            }
        }
    
        else
        {
            startButton.value = "Resume";
            clearInterval(timer);
        }
    }

    else
    {
        startButton.value = "Pause";
        if (sec >= 0)
        {   
            timer = setInterval(updateTimer, 1000);
        }
    }
});

resetButton.addEventListener('click', () => {
    if (hasAlreadyClicked == true)
    {
        document.body.classList.remove('start');
        document.body.classList.remove('resume-overflow');
        navBar.classList.remove('hide-nav');
        document.body.classList.remove('first-half');
        document.body.classList.remove('second-half');
        texts.classList.remove('hide-text');
        arrowDown.classList.remove('hide-arrow');
    
        texts.classList.add('resume-text');
        navBar.classList.add('resume-nav');
        arrowDown.classList.add('arrown-down');
        document.body.classList.add('bg-active-0');
        
        sec = startingTime * 60;
        startingTime = 25;
    
        myClock.innerHTML = "25:00";
        startButton.value = "Start";
        
        half = 0;
        texts.innerHTML = tempText;
        
        if ((window.innerHeight == screen.height) && isInFullScreen == true) // Check if browser is in fullscreen mode
        {
            toogleFullScreen = setInterval(() => {
                if (document.exitFullscreen) 
                {
                    document.exitFullscreen();
                    clearInterval(toogleFullScreen);
                } 
                else if (document.mozCancelFullScreen) 
                {
                    document.mozCancelFullScreen(); 
                    clearInterval(toogleFullScreen); 
                } 
                else if (document.webkitExitFullscreen) 
                {
                    document.webkitExitFullscreen();
                    clearInterval(toogleFullScreen);
                } 
                
                else if (document.msExitFullscreen) 
                {
                    document.msExitFullscreen();
                    clearInterval(toogleFullScreen);
                }
            }, 1300);
        }
        
        if ( (parseInt(myCounter.innerText) - 1) <= 0 )
        {
            myCounter.innerText = 0;
        }
    
        else
        {
            myCounter.innerText = parseInt(myCounter.innerText) - 1;
        }
    
        hasAlreadyClicked = false;
        clearInterval(timer);
    }
});

genPhrase();

/* Checking if the user activeted the fullscreen mode manually */
document.addEventListener("fullscreenchange", () => {
    isInFullScreen = (document.fullscreen)? true : false;
}, false);

document.addEventListener("mozfullscreenchange", () => {        
    isInFullScreen = (document.mozFullScreen)? true : false; /* Firefox */
}, false);

document.addEventListener("webkitfullscreenchange", () => {     
    isInFullScreen = (document.webkitIsFullScreen)? true : false; /* Chrome, Safari & Opera */
}, false);

document.addEventListener("msfullscreenchange", () => {         
    isInFullScreen = (document.msFullscreenElement) ? true : false; /* IE/Edge */
}, false);

/* Active the navigation bar*/
burger.addEventListener('click', () => {
    if (!isNavBarActive)
    {   
        nav.classList.remove('nav-disable');
        nav.classList.add('nav-active');

        isNavBarActive = true;
    }

    else
    {
        nav.classList.remove('nav-active');
        nav.classList.add('nav-disable');

        isNavBarActive = false;
    }
});

/* Changing color of the menù */
burger.addEventListener('mouseover', () => {
    burger.style.background = "#044280";
    burger.style.transition = "0.2s ease-in-out";

    line1.style.background = "white";
    line2.style.background = "white";
});

/* Changing to the default color the menù */
burger.addEventListener('mouseout', () => {
    burger.style.background = "white";
    line1.style.background = "#044280";
    line2.style.background = "#044280";
});

/* Disable the navigation bar on scroll */
window.addEventListener('scroll', () => {
    nav.classList.remove('nav-active');
    nav.classList.add('nav-disable');
});
