let current = 0;
const slides = document.querySelectorAll(".slide");
const music = document.getElementById("bgMusic");

// play music after first click
document.body.addEventListener("click", () => { music.play().catch(() => {}); }, { once: true });

// floating flower emojis
function spawnFlowers() {
  const flowerContainer = document.querySelector(".flower-emojis");
  flowerContainer.innerHTML = ""; // clear previous
  const flowerTypes = ["🌸","🌺","🌼","💐","🥀"];
  for(let i=0;i<30;i++){
    const span = document.createElement("span");
    span.classList.add("emoji");
    span.textContent = flowerTypes[Math.floor(Math.random()*flowerTypes.length)];
    span.style.left = Math.random()*window.innerWidth + "px";
    span.style.animationDuration = 5 + Math.random()*10 + "s";
    span.style.fontSize = 16 + Math.random()*24 + "px";
    flowerContainer.appendChild(span);
  }
}

// trivia buttons
document.querySelectorAll(".answer").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const fb = slides[current].querySelector(".feedback");
    if(btn.dataset.correct){ fb.textContent="Correct 😸"; setTimeout(()=>showSlide(current+1),800); }
    else fb.textContent="Try again 😾";
  });
});

// unscramble
function checkUnscramble(){
  const v=document.getElementById("unscramble").value.trim().toLowerCase();
  const fb=slides[current].querySelector(".feedback");
  if(v==="wyvern"){ fb.textContent="Correct 😸"; setTimeout(()=>showSlide(current+1),800); }
  else fb.textContent="Nope 😾";
}

// captcha
function checkCaptcha(){
  const v=document.getElementById("captcha").value.trim();
  const fb=slides[current].querySelector(".feedback");
  if(v==="aeiouy"){ fb.textContent="Verified 😸"; setTimeout(()=>showSlide(current+1),800); }
  else fb.textContent="Wrong 😾";
}

// Valentine buttons → Happy Cat
const happyCatIndex = 11; // slide 12
document.getElementById("yesBtn").addEventListener("click",()=>showSlide(happyCatIndex));
document.getElementById("yesChittiBtn").addEventListener("click",()=>showSlide(happyCatIndex));

// NEXT / PREV buttons
document.querySelectorAll(".next").forEach(btn=>{
  btn.addEventListener("click",()=>showSlide(current+1));
});
document.querySelectorAll(".prev").forEach(btn=>{
  btn.addEventListener("click",()=>showSlide(current-1));
});

// show slide circularly + respawn flowers
function showSlide(index){
  if(index<0) index=slides.length-1;
  if(index>=slides.length) index=0;
  slides[current].classList.remove("active");
  current=index;
  slides[current].classList.add("active");
  spawnFlowers();
}

// spawn flowers initially
spawnFlowers();
