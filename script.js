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


/* Fullscreen Video Popup */

const videoLinks=document.querySelectorAll(".video-link");
const modal=document.getElementById("video-modal");
const popupVideo=document.getElementById("popup-video");
const closeVideo=document.getElementById("close-video");

videoLinks.forEach((link)=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

const source=link.querySelector("source");

if(source){

popupVideo.src=source.src;
modal.style.display="flex";
popupVideo.play();

}

});

});

if(closeVideo){

closeVideo.addEventListener("click",()=>{

modal.style.display="none";
popupVideo.pause();
popupVideo.src="";

});

}

/* Floating Particles */

const particles=document.getElementById("particles");

if(particles){

for(let i=0;i<50;i++){

const particle=document.createElement("div");

particle.classList.add("particle");

particle.style.left=Math.random()*100+"vw";
particle.style.animationDuration=(5+Math.random()*10)+"s";
particle.style.opacity=Math.random();

particles.appendChild(particle);

}

}

/* Fake Visitor Counter */

const visitorCounter=document.createElement("div");

visitorCounter.innerHTML="🔥 10,000+ Portfolio Views";
visitorCounter.style.position="fixed";
visitorCounter.style.left="20px";
visitorCounter.style.top="100px";
visitorCounter.style.padding="12px 18px";
visitorCounter.style.background="#111";
visitorCounter.style.border="1px solid rgba(255,255,255,.1)";
visitorCounter.style.borderRadius="8px";
visitorCounter.style.zIndex="99999";

document.body.appendChild(visitorCounter);

/* Form Submission */

const bookingForm=document.querySelector(".booking-form");

if(bookingForm){

bookingForm.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Inquiry Submitted Successfully");

bookingForm.reset();

});

}
