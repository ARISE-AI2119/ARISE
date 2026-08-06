/* ============================================
   ARISE OS v3.0
   PROJECT NEBULA
   SCRIPT.JS
   PART 3A
============================================ */

const input=document.getElementById("user-input");

const chatBox=document.getElementById("chat-box");

const sendBtn=document.getElementById("send-btn");

const voiceBtn=document.getElementById("voice-btn");

const attachBtn=document.getElementById("attach-btn");

const mouseLight=document.querySelector(".mouse-light");

const welcome=document.querySelector(".welcome");

/* ===========================
        Mouse Glow
=========================== */

document.addEventListener("mousemove",(e)=>{

    if(!mouseLight) return;

    mouseLight.style.left=e.clientX+"px";

    mouseLight.style.top=e.clientY+"px";

});

/* ===========================
      Auto Resize Input
=========================== */

input.addEventListener("input",()=>{

    input.style.height="60px";

    input.style.height=input.scrollHeight+"px";

});

/* ===========================
      Enter = Send
=========================== */

input.addEventListener("keydown",(event)=>{

    if(event.key==="Enter" && !event.shiftKey){

        event.preventDefault();

        sendMessage();

        setStatus(
    "🟡 PROCESSING...",
    "#FFD95E"
);

    }

});

/* ===========================
      Escape HTML
=========================== */

function escapeHtml(text){

    const div=document.createElement("div");

    div.innerText=text;

    return div.innerHTML;

}

/* ===========================
     Remove Welcome Screen
=========================== */

function removeWelcome(){

    if(welcome){

        welcome.style.opacity="0";

        welcome.style.transform="translateY(-30px)";

        setTimeout(()=>{

            welcome.remove();

        },400);

    }

}

/* ===========================
      Scroll Bottom
=========================== */

function scrollBottom(){

    chatBox.scrollTo({

        top:chatBox.scrollHeight,

        behavior:"smooth"

    });

}

/* ===========================
     Create Bubble
=========================== */

function createBubble(type,text){

    const bubble=document.createElement("div");

    bubble.className="message "+type;

    bubble.innerHTML=text;

    chatBox.appendChild(bubble);

    scrollBottom();

    return bubble;

}

/* ===========================
    Thinking Messages
=========================== */

const thinkingStates=[

"🧠 Accessing Memory...",

"🌐 Connecting Knowledge Matrix...",

"⚡ Running Neural Engine...",

"🤖 Generating Response...",

"💡 Finalizing Answer..."

];

/* ===========================
    Typing Indicator
=========================== */

let thinkingInterval=null;
let progressInterval = null;

function showThinking(){

    let index = 0;

    chatBox.innerHTML += `
        <div id="thinking-box" class="message ai">
            <b>🤖 ARISE</b><br><br>
            <div id="thinking-text">${thinkingStates[index]}</div>

<div class="thinking-progress">
    <div id="thinking-bar"></div>
</div>

<div id="thinking-percent">
    Initializing...
</div>
        </div>
    `;

    scrollBottom();

    thinkingInterval = setInterval(() => {

        index++;

        if(index >= thinkingStates.length){
            index = 0;
        }

        const thinkingText = document.getElementById("thinking-text");

        if(thinkingText){
            thinkingText.innerHTML = thinkingStates[index];
        }

    },1000);

    let progress = 0;

progressInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 2;

    if (progress > 97) {
        progress = 97;
    }

    const bar = document.getElementById("thinking-bar");
    const percent = document.getElementById("thinking-percent");

    if (bar) {
        bar.style.width = progress + "%";
    }

    if (percent) {
        percent.innerHTML = "Neural Processing " + progress + "%";
    }

},250);

}

/* ===========================
 Remove Thinking
=========================== */

function removeThinking(){

    clearInterval(thinkingInterval);
    clearInterval(progressInterval);

    const bubble=document.getElementById("thinkingBubble");

    if(bubble){

        bubble.remove();

    }

}

/* ===========================
 Button States
=========================== */

function lockUI(){

    sendBtn.disabled=true;

    sendBtn.innerHTML="⌛";

    voiceBtn.disabled=true;

    attachBtn.disabled=true;

}

function unlockUI(){

    sendBtn.disabled=false;

    sendBtn.innerHTML="➜";

    voiceBtn.disabled=false;

    attachBtn.disabled=false;

}
/* ============================================
   PROJECT NEBULA
   SCRIPT.JS
   PART 3B
============================================ */
// ===============================
// ARISE Thinking Engine
// ===============================

async function sendMessage(){

    const message=input.value.trim();

    if(message==="") return;

    removeWelcome();

    createBubble(

        "user",

        escapeHtml(message)

    );

    input.value="";

    input.style.height="60px";

    lockUI();

    showThinking();

    try{

        const response=await fetch("/chat",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                message:message

            })

        });

        const data=await response.json();

        removeThinking();

        setStatus(
    "🟢 ONLINE",
    "#00FFB3"
);

        const aiBubble=createBubble(

            "ai",

            "<b>🤖 ARISE</b><br><br><span class='typing'></span>"

        );

        const typingElement=aiBubble.querySelector(".typing");

        typeWriter(

            typingElement,

            data.reply

        );

    }

    catch(error){

        removeThinking();

        createBubble(

            "ai",

            `
            <b>🤖 ARISE</b>

            <br><br>

            ❌ Connection Failed.

            <br><br>

            Please try again.
            `

        );

    }

    unlockUI();

}

/* ===========================
      Typewriter Engine
=========================== */

function typeWriter(

    element,

    text

){

    let i=0;

    element.innerHTML="";

    const timer=setInterval(()=>{

        if(i>=text.length){

            clearInterval(timer);

            scrollBottom();

            return;

        }

        element.innerHTML+=escapeHtml(

            text.charAt(i)

        );

        i++;

        scrollBottom();

    },15);

}

/* ===========================
      Fake Loading Bar
=========================== */

function fakeProgress(){

    let width=0;

    const bar=document.getElementById(

        "progressBar"

    );

    if(!bar) return;

    const timer=setInterval(()=>{

        width+=2;

        bar.style.width=width+"%";

        if(width>=100){

            clearInterval(timer);

        }

    },30);

}

/* ===========================
    Welcome Animation
=========================== */

window.addEventListener(

"load",

()=>{

    document.body.style.opacity="1";

});
/* ============================================
   PROJECT NEBULA
   SCRIPT.JS
   PART 3C
============================================ */

/* ===========================
        AI CORE ENGINE
=========================== */

const aiCore=document.querySelector(".ai-core");

let coreRotation=0;

function animateCore(){

    if(!aiCore) return;

    coreRotation+=0.2;

    aiCore.style.transform=

    `translateX(-50%) rotate(${coreRotation}deg)`;

    requestAnimationFrame(animateCore);

}

animateCore();

/* ===========================
      BUTTON HOVER GLOW
=========================== */

const buttons=document.querySelectorAll("button");

buttons.forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.boxShadow=

        "0 0 30px rgba(0,229,255,.55)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.boxShadow="";

    });

});

/* ===========================
        INPUT GLOW
=========================== */

input.addEventListener("focus",()=>{

    input.style.boxShadow=

    "0 0 30px rgba(0,229,255,.35)";

});

input.addEventListener("blur",()=>{

    input.style.boxShadow="";

});

/* ===========================
      RANDOM STATUS ENGINE
=========================== */

const statusTexts=[

"⚡ READY",

"🌐 ONLINE",

"🧠 MEMORY",

"💡 LEARNING",

"🚀 ACTIVE"

];

const pills=document.querySelectorAll(".pill");

setInterval(()=>{

    if(pills.length<4) return;

    const random=

    statusTexts[

        Math.floor(

            Math.random()*statusTexts.length

        )

    ];

    pills[3].innerHTML=random;

},5000);

/* ===========================
      CONSOLE BREATHING
=========================== */

const consoleArea=document.querySelector(".console");

let glow=0;

let direction=1;

setInterval(()=>{

    glow+=direction*2;

    if(glow>=20) direction=-1;

    if(glow<=0) direction=1;

    if(consoleArea){

        consoleArea.style.boxShadow=

        `0 0 ${glow}px rgba(0,229,255,.18)`;

    }

},60);

/* ===========================
       FLOATING PARTICLES
=========================== */

function createParticle(){

    const particle=document.createElement("div");

    particle.className="particle";

    particle.style.left=Math.random()*100+"vw";

    particle.style.animationDuration=

    (8+Math.random()*8)+"s";

    particle.style.opacity=

    .2+Math.random()*.6;

    document.body.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },16000);

}

setInterval(createParticle,500);

/* ===========================
      STARTUP MESSAGE
=========================== */

window.addEventListener("load",()=>{

    console.log(

`====================================

 ARISE OS v3.0

 PROJECT NEBULA

 Created by Akshit Raj

====================================`

);

});

/* ===========================
    VOICE BUTTON EFFECT
=========================== */

voiceBtn.addEventListener("click",()=>{

    voiceBtn.animate([

        {

            transform:"scale(1)"

        },

        {

            transform:"scale(1.15)"

        },

        {

            transform:"scale(1)"

        }

    ],{

        duration:300

    });

});

/* ===========================
   ATTACH BUTTON EFFECT
=========================== */

attachBtn.addEventListener("click",()=>{

    attachBtn.animate([

        {

            transform:"rotate(0deg)"

        },

        {

            transform:"rotate(-15deg)"

        },

        {

            transform:"rotate(15deg)"

        },

        {

            transform:"rotate(0deg)"

        }

    ],{

        duration:400

    });

});
/* ============================================
   PROJECT NEBULA
   SCRIPT.JS
   PART 3D
============================================ */

/* ===========================
      STAR TWINKLE ENGINE
=========================== */

const stars=document.querySelector(".stars");

setInterval(()=>{

    if(!stars) return;

    stars.style.opacity=

    (.08+Math.random()*.18).toFixed(2);

},1200);

/* ===========================
      MOUSE ENERGY TRAIL
=========================== */

document.addEventListener("mousemove",(e)=>{

    const trail=document.createElement("div");

    trail.className="trail";

    trail.style.left=e.clientX+"px";

    trail.style.top=e.clientY+"px";

    document.body.appendChild(trail);

    setTimeout(()=>{

        trail.remove();

    },700);

});

/* ===========================
      AI CORE BOOST
=========================== */

function coreBoost(){

    if(!aiCore) return;

    aiCore.animate([

        {

            transform:"translateX(-50%) scale(1)"

        },

        {

            transform:"translateX(-50%) scale(1.08)"

        },

        {

            transform:"translateX(-50%) scale(1)"

        }

    ],{

        duration:900

    });

}

/* ===========================
   BOOST WHILE THINKING
=========================== */

const oldShowThinking=showThinking;

showThinking=function(){

    coreBoost();

    oldShowThinking();

};

/* ===========================
      WINDOW GLOW
=========================== */

const windowPanel=document.querySelector(".window");

setInterval(()=>{

    if(!windowPanel) return;

    windowPanel.style.boxShadow=

    `0 0 ${20+Math.random()*25}px rgba(0,229,255,.12)`;

},700);

/* ===========================
      BOOT SEQUENCE
=========================== */

window.addEventListener("load",()=>{

    const messages=[

        "Initializing ARISE...",

        "Loading Neural Engine...",

        "Connecting Knowledge Matrix...",

        "System Ready."

    ];

    let i=0;

    const timer=setInterval(()=>{

        console.log(messages[i]);

        i++;

        if(i>=messages.length){

            clearInterval(timer);

        }

    },700);

});

/* ===========================
      RANDOM CORE FLASH
=========================== */

setInterval(()=>{

    if(!aiCore) return;

    aiCore.style.filter=

    "brightness(1.4)";

    setTimeout(()=>{

        aiCore.style.filter="";

    },180);

},6000);

/* ===========================
      SEND BUTTON RIPPLE
=========================== */

sendBtn.addEventListener("click",()=>{

    sendBtn.animate([

        {

            transform:"scale(1)"

        },

        {

            transform:"scale(.90)"

        },

        {

            transform:"scale(1.08)"

        },

        {

            transform:"scale(1)"

        }

    ],{

        duration:350

    });

});

/* ===========================
      CHAT FLASH
=========================== */

function flashChat(){

    chatBox.animate([

        {

            boxShadow:"0 0 0px #00e5ff"

        },

        {

            boxShadow:"0 0 35px #00e5ff"

        },

        {

            boxShadow:"0 0 0px #00e5ff"

        }

    ],{

        duration:500

    });

}

/* ===========================
      AFTER RESPONSE
=========================== */

const originalCreateBubble=createBubble;

createBubble=function(type,text){

    const bubble=

    originalCreateBubble(type,text);

    flashChat();

    return bubble;

};
/* ============================================
   PROJECT NEBULA
   SCRIPT.JS
   PART 3E
============================================ */

/* ===========================
      AMBIENT ENGINE
=========================== */

let idleTimer;

function resetIdle(){

    clearTimeout(idleTimer);

    document.body.classList.remove("idle");

    idleTimer=setTimeout(()=>{

        document.body.classList.add("idle");

    },12000);

}

document.addEventListener("mousemove",resetIdle);
document.addEventListener("keydown",resetIdle);
document.addEventListener("click",resetIdle);

resetIdle();

/* ===========================
      RANDOM SYSTEM PULSE
=========================== */

setInterval(()=>{

    document.body.animate([

        {

            filter:"brightness(1)"

        },

        {

            filter:"brightness(1.03)"

        },

        {

            filter:"brightness(1)"

        }

    ],{

        duration:500

    });

},9000);

/* ===========================
      AI GREETING
=========================== */

window.addEventListener("load",()=>{

    console.log("================================");

    console.log(" ARISE OS v3.0");

    console.log(" PROJECT NEBULA");

    console.log(" Created by Akshit Raj");

    console.log("================================");

});

/* ===========================
      FADE IN
=========================== */

document.body.animate([

    {

        opacity:0

    },

    {

        opacity:1

    }

],{

    duration:1200,

    fill:"forwards"

});

/* ===========================
      RANDOM CORE GLOW
=========================== */

setInterval(()=>{

    if(aiCore){

        aiCore.animate([

            {

                filter:"drop-shadow(0 0 15px cyan)"

            },

            {

                filter:"drop-shadow(0 0 45px cyan)"

            },

            {

                filter:"drop-shadow(0 0 15px cyan)"

            }

        ],{

            duration:800

        });

    }

},7000);

/* ===========================
      PAGE TITLE EFFECT
=========================== */

const titles=[

"🤖 ARISE",

"⚡ ARISE ONLINE",

"🧠 ARISE READY",

"🌐 ARISE"

];

let titleIndex=0;

setInterval(()=>{

    document.title=titles[titleIndex];

    titleIndex++;

    if(titleIndex>=titles.length){

        titleIndex=0;

    }

},2500);

/* ===========================
      PERFORMANCE
=========================== */

window.addEventListener("blur",()=>{

    console.log("ARISE Background Mode");

});

window.addEventListener("focus",()=>{

    console.log("ARISE Active");

});

/* ===========================
      PROJECT COMPLETE
=========================== */

console.log(

"%cPROJECT NEBULA SUCCESSFULLY LOADED",

"color:cyan;font-size:18px;font-weight:bold;"

);
/* ==========================================
   ARISE Boot Welcome
========================================== */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        createBubble(

            "ARISE",

            `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<br><br>

⚡ <span style="color:#00FFD5;font-weight:bold;">
Neural Core Activated
</span>

<br><br>

🧠 Memory Matrix Loaded

<br><br>

🌐 Knowledge Network Connected

<br><br>

🔒 Security Protocol Verified

<br><br>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<br><br>

<span style="font-size:18px;font-weight:bold;color:#8FFBFF;">

ARISE is Ready.

</span>

<br><br>

<span style="color:#7CFDFF;">

Awaiting Your Command...

</span>

<br><br>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,

            false

        );

    },1500);

});

/* ==========================================
   Status
========================================== */

function setStatus(text,color){

    const status=document.getElementById("ai-status");

    if(!status) return;

    status.innerHTML=text;

    status.style.color=color;

}

/* ==========================================
   ARISE Voice Input
========================================== */

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    voiceBtn.addEventListener("click", () => {

        recognition.start();

    });

    recognition.onstart = () => {

        voiceBtn.classList.add("listening");

        voiceBtn.innerHTML = "🎙";

        voiceBtn.title = "Listening...";

    };

    recognition.onresult = (event) => {

        const transcript = event.results[0][0].transcript;

        document.getElementById("user-input").value = transcript;

    };

    recognition.onend = () => {

        voiceBtn.classList.remove("listening");

        voiceBtn.innerHTML = "🎤";

        voiceBtn.title = "🎤 Talk to ARISE";

    };

    recognition.onerror = () => {

        voiceBtn.classList.remove("listening");

        voiceBtn.innerHTML = "🎤";

    };

}
else{

    voiceBtn.disabled = true;

    voiceBtn.title = "Voice not supported";

}