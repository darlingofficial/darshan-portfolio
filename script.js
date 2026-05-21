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
  video.innerHTML = `<source src="${source}" type="video/mp4">`;
  video.load();
  video.muted = true;
  video.playsInline = true;
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
