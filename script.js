let audioUnlocked = false;
let pw = "";

/* =========================
   AUDIO
========================= */

function unlockAudio() {
  if (audioUnlocked) return;

  const click = document.getElementById("clickSound");
  if (!click) return;

  click.play().then(() => {
    click.pause();
    click.currentTime = 0;
  }).catch(()=>{});

  audioUnlocked = true;
}

function playSound(id){
  const s = document.getElementById(id);
  if (!s) return;

  try {
    s.pause();
    s.currentTime = 0;

    const playPromise = s.play();
    if (playPromise !== undefined) {
      playPromise.catch(()=>{});
    }

  } catch(e) {}
}

const clickSound = () => playSound("clickSound");
const successSound = () => playSound("successSound");

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
  unlockAudio();
  clickSound();
  show("menu");
}

function goAmount(){
  clickSound();
  show("amount");
}

function goPassword(){
  clickSound();
  show("password");
}

/* =========================
   PASSWORD
========================= */

function key(n){
  clickSound();

  if(pw.length < 4){
    pw += n;
    document.getElementById("pw").innerText = pw.split("").join(" ");
  }
}

function clearPw(){
  clickSound();
  pw = "";
  document.getElementById("pw").innerText = "○ ○ ○ ○";
}

/* =========================
   FINAL
========================= */
function confirmPw(){

  clickSound();

  show("card");

  const card = document.getElementById("cardImg");

  if (card) {
    card.classList.add("card-move");
    const slot = document.querySelector(".slot");

setTimeout(()=>{
    slot.classList.add("active");
},1600);

    // 카드 ATM 삽입 느낌
    setTimeout(()=>{
      card.style.transform = "translateX(-50%) translateY(120px)";
    }, 1500);
  }

  // 로딩 화면
  setTimeout(()=>{
    show("loading");
  }, 2600);

  // 완료 화면 + 효과음
  setTimeout(()=>{
    successSound();
    show("ending");
  }, 5200);
}

window.addEventListener("load", () => {

  const click = document.getElementById("clickSound");
  const success = document.getElementById("successSound");

  if (click) {
    click.volume = 0;
    click.play().then(()=>{
      click.pause();
      click.currentTime = 0;
      click.volume = 1;
    }).catch(()=>{});
  }

  if (success) {
    success.volume = 0;
    success.play().then(()=>{
      success.pause();
      success.currentTime = 0;
      success.volume = 1;
    }).catch(()=>{});
  }
});

// =========================
// ATM 시간 표시
// =========================
// ATM 번호 랜덤 생성 (처음 한 번만)
const atmNo = Math.floor(Math.random() * 999) + 1;

const atmNoEl = document.getElementById("atmNo");

if(atmNoEl){
    atmNoEl.innerText = `ATM NO.${String(atmNo).padStart(3,"0")}`;
}

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

updateATMTime();

setInterval(updateATMTime,1000);