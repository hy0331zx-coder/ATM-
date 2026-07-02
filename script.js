let pw = "";

/* =========================
   SOUND (SAFE VERSION)
========================= */

function safePlay(src, volume = 0.4){
  const audioPool = {
  click: new Audio("https://actions.google.com/sounds/v1/household/wood_plank_flicks.ogg"),
  card: new Audio("https://actions.google.com/sounds/v1/impacts/metal_thud_and_scrape.ogg"),
  loading: new Audio("https://actions.google.com/sounds/v1/ambiences/industrial_hum.ogg"),
  success: new Audio("https://actions.google.com/sounds/v1/alarms/notification_success.ogg")
};

Object.values(audioPool).forEach(a=>{
  a.preload = "auto";
  a.volume = 0.5;
});
  function safePlay(type, volume = 0.4){
  const audio = audioPool[type];
  if(!audio) return;

  try{
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;

    const p = audio.play();
    if(p !== undefined){
      p.catch(()=>{});
    }

  } catch(e){}
}
}

// ATM 효과음 4종
function playClick(){
  safePlay("click", 0.3);
}

function playCard(){
  safePlay("card", 0.4);
}

function playLoading(){
  safePlay("loading", 0.2);
}

function playSuccess(){
  safePlay("https://actions.google.com/sounds/v1/alarms/notification_success.ogg", 0.5);
}

/* =========================
   SCREEN
========================= */

function show(id){
  document.querySelectorAll(".screen").forEach(s=>{
    s.classList.remove("active");
  });

  document.getElementById(id)?.classList.add("active");
}

/* =========================
   FLOW
========================= */

function goMenu(){
  playClick();
  show("menu");
}

function goAmount(){
  playClick();
  show("amount");
}

function goPassword(){
  playClick();
  show("password");
}

/* =========================
   PASSWORD
========================= */

function key(n){

  playClick();

  if(pw.length < 4){
    pw += n;
    document.getElementById("pw").innerText = pw.split("").join(" ");
  }
}

function clearPw(){
  playClick();
  pw = "";
  document.getElementById("pw").innerText = "○ ○ ○ ○";
}

/* =========================
   FINAL FLOW
========================= */

function confirmPw(){

  playClick();
  playCard();

  show("card");

  const card = document.getElementById("cardImg");

  if (card) {
    card.classList.add("card-move");
    const slot = document.querySelector(".slot");

    setTimeout(()=>{
      slot.classList.add("active");
    },1600);

    setTimeout(()=>{
      card.style.transform = "translateX(-50%) translateY(120px)";
    }, 1500);
  }

  // 로딩 화면 + 소리
  setTimeout(()=>{
    playLoading();
    show("loading");
  }, 2600);

  // 엔딩 + 성공 소리
  setTimeout(()=>{
    playSuccess();
    show("ending");
  }, 5200);
}

/* =========================
   ATM INFO
========================= */

window.addEventListener("load", () => {

  const atmNo = Math.floor(Math.random() * 999) + 1;
  const atmNoEl = document.getElementById("atmNo");

  if(atmNoEl){
    atmNoEl.innerText = `ATM NO.${String(atmNo).padStart(3,"0")}`;
  }

  updateATMTime();
  setInterval(updateATMTime,1000);
});

/* =========================
   TIME
========================= */

function updateATMTime(){

  const now = new Date();

  const y = now.getFullYear();
  const m = String(now.getMonth()+1).padStart(2,"0");
  const d = String(now.getDate()).padStart(2,"0");

  const h = String(now.getHours()).padStart(2,"0");
  const min = String(now.getMinutes()).padStart(2,"0");
  const s = String(now.getSeconds()).padStart(2,"0");

  const time = document.getElementById("atmTime");

  if(time){
    time.innerHTML = `${y}.${m}.${d}<br>${h}:${min}:${s}`;
  }
}

let audioUnlocked = false;

function unlockAudio(){
  if(audioUnlocked) return;

  const test = new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg");

  test.play().then(()=>{
    test.pause();
    test.currentTime = 0;
    audioUnlocked = true;
  }).catch(()=>{});
}

document.body.addEventListener("click", unlockAudio, { once: true });
