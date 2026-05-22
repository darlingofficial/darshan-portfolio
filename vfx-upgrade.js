
/* === CGI / VFX / SFX UPGRADE === */

/* loader */

const loader=document.createElement("div");
loader.className="cinematic-loader";
loader.innerHTML="<h1>DARSHAN VISUALS</h1>";
document.body.appendChild(loader);

window.addEventListener("load",()=>{
setTimeout(()=>{
loader.style.opacity="0";
setTimeout(()=>loader.remove(),800);
},1200);
});

/* cinematic spotlight */

document.addEventListener("mousemove",(e)=>{
document.body.style.setProperty("--x",e.clientX+"px");
document.body.style.setProperty("--y",e.clientY+"px");
});

/* floating particles */

const particles=document.createElement("div");
particles.className="cinematic-particles";

for(let i=0;i<45;i++){
const p=document.createElement("span");

p.style.left=Math.random()*100+"vw";
p.style.animationDuration=(8+Math.random()*10)+"s";
p.style.animationDelay=Math.random()*8+"s";
p.style.opacity=Math.random();

particles.appendChild(p);
}

document.body.appendChild(particles);

/* magnetic buttons */

document.querySelectorAll(".button").forEach((btn)=>{

btn.addEventListener("mousemove",(e)=>{

const rect=btn.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;
const y=e.clientY-rect.top-rect.height/2;

btn.style.transform=`translate(${x*0.08}px,${y*0.08}px)`;

});

btn.addEventListener("mouseleave",()=>{
btn.style.transform="translate(0,0)";
});

});

/* reveal animation */

const observer=new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){
entry.target.classList.add("active");
}

});

},{threshold:0.15});

document.querySelectorAll(".section,.reel-card,.service-list div").forEach((el)=>{
el.classList.add("reveal");
observer.observe(el);
});

/* hover sfx */

const hoverSound=new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
hoverSound.volume=0.15;

document.querySelectorAll(".button,.reel-card").forEach((el)=>{

el.addEventListener("mouseenter",()=>{

hoverSound.currentTime=0;
hoverSound.play().catch(()=>{});

});

});

/* ===== DARSH VFX COMPLETE UPGRADE ===== */

document.addEventListener("mousemove", (e) => {
  const particle = document.createElement("div");

  particle.className = "cursor-particle";

  particle.style.left = e.clientX + "px";
  particle.style.top = e.clientY + "px";

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 1200);
});

const hero = document.querySelector(".hero");

document.addEventListener("mousemove", (e) => {

if(hero){

const x = (window.innerWidth / 2 - e.clientX) / 40;
const y = (window.innerHeight / 2 - e.clientY) / 40;

hero.style.transform = `translate(${x}px, ${y}px)`;

}

});

const hoverSound = new Audio(
"https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
);

hoverSound.volume = 0.1;

document.querySelectorAll(".reel-card,.button")
.forEach((el)=>{

el.addEventListener("mouseenter",()=>{

hoverSound.currentTime = 0;
hoverSound.play();

});

});

document.querySelectorAll(".video-link")
.forEach((link)=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

const modal = document.createElement("div");

modal.className="cinema-modal";

modal.innerHTML=`
<div class="modal-bg"></div>
<video src="${link.querySelector("video source").src}" controls autoplay></video>
`;

document.body.appendChild(modal);

modal.addEventListener("click",()=>{
modal.remove();
});

});

});

for(let i=0;i<50;i++){

const dust=document.createElement("div");

dust.className="dust";

dust.style.left=Math.random()*100+"vw";
dust.style.animationDuration=
8+Math.random()*10+"s";

document.body.appendChild(dust);

}
