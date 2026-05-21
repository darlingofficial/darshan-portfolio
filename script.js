const previewVideos = document.querySelectorAll(".video-link video");
const heroVideos = document.querySelectorAll(".hero-bg-video");
const heroSources = [
  "cinematic-reel.mp4",
  "family-event-edit.mp4",
  "festival-edit.mp4",
  "bike-edit.mp4",
  "pre-wedding-edit.mp4",
];

previewVideos.forEach((video) => {
  video.muted = true;
  video.playsInline = true;
  video.addEventListener("loadeddata", () => {
    video.classList.add("is-ready");
  });
});

const playWhenVisible = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  },
  {
    threshold: 0.36,
  }
);

previewVideos.forEach((video) => playWhenVisible.observe(video));

let heroIndex = 0;
let activeHero = 0;

function setHeroVideo(video, source) {
  video.pause();
  video.src = source;
  video.load();
  video.muted = true;
  video.playsInline = true;
  video.loop = true;
  video.currentTime = 0;
}

function rotateHeroShowreel() {
  if (heroVideos.length < 2) return;

  const current = heroVideos[activeHero];
  const next = heroVideos[1 - activeHero];

  heroIndex = (heroIndex + 1) % heroSources.length;
  setHeroVideo(next, heroSources[heroIndex]);

  next.addEventListener(
    "loadeddata",
    () => {
      next.play().catch(() => {});
      next.classList.add("is-active");
      current.classList.remove("is-active");
      current.pause();
      activeHero = 1 - activeHero;
    },
    { once: true }
  );
}

if (heroVideos.length >= 2) {
  setHeroVideo(heroVideos[0], heroSources[0]);
  heroVideos[0].addEventListener("loadeddata", () => {
    heroVideos[0].classList.add("is-active");
    heroVideos[0].play().catch(() => {});
  });
  window.setInterval(rotateHeroShowreel, 3000);
}


/* Loader */

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");
const loadingText=document.getElementById("loading-text");

let count=0;

const interval=setInterval(()=>{

count+=5;
loadingText.textContent=`LOADING ${count}%`;

if(count>=100){

clearInterval(interval);

setTimeout(()=>{
loader.style.opacity="0";

setTimeout(()=>{
loader.style.display="none";
},800);

},500);

}

},60);

});

/* Cursor Glow */

const glow=document.querySelector(".cursor-glow");

if(glow){

document.addEventListener("mousemove",(e)=>{
glow.style.left=e.clientX+"px";
glow.style.top=e.clientY+"px";
});

}

/* Typing Animation */

const heroHeading=document.querySelector("h1");

if(heroHeading){

const texts=[
"Videographer.",
"Editor.",
"Storyteller."
];

let index=0;

setInterval(()=>{
heroHeading.textContent=texts[index];
index=(index+1)%texts.length;
},2500);

}

/* Music Toggle */

const music=document.getElementById("bg-music");
const musicToggle=document.querySelector(".music-toggle");

if(musicToggle && music){

musicToggle.addEventListener("click",()=>{

if(music.paused){
music.play();
musicToggle.style.opacity="1";
}else{
music.pause();
musicToggle.style.opacity=".5";
}

});

}

/* Scroll Animation */

const animated=document.querySelectorAll(".reel-card,.service-list div");

const observer=new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0px)";

}

});

},{threshold:.1});

animated.forEach((el,index)=>{

el.style.opacity="0";
el.style.transform="translateY(50px)";
el.style.transition=`all .8s ease ${index*.08}s`;

observer.observe(el);

});
