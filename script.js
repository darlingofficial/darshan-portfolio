import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';

/* LOADER */

window.addEventListener('load',()=>{

setTimeout(()=>{

document.getElementById('loader').style.opacity='0';

setTimeout(()=>{
document.getElementById('loader').style.display='none';
},1000);

},1500);

});

/* CURSOR GLOW */

const glow=document.querySelector('.cursor-glow');

document.addEventListener('mousemove',(e)=>{

glow.style.left=e.clientX+'px';
glow.style.top=e.clientY+'px';

});

/* THREE JS */

const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer=new THREE.WebGLRenderer({
antialias:true,
alpha:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

document.getElementById('canvas-container').appendChild(renderer.domElement);

/* PARTICLES */

const particlesGeometry=new THREE.BufferGeometry();

const count=7000;

const positions=new Float32Array(count*3);

for(let i=0;i<count*3;i++){

positions[i]=(Math.random()-0.5)*35;

}

particlesGeometry.setAttribute(
'position',
new THREE.BufferAttribute(positions,3)
);

const particlesMaterial=new THREE.PointsMaterial({
size:0.03,
color:0xd4a84f
});

const particles=new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particles);

/* LIGHT */

const light=new THREE.PointLight(0xd4a84f,4,100);

light.position.set(2,3,4);

scene.add(light);

camera.position.z=5;

/* PARALLAX */

document.addEventListener('mousemove',(e)=>{

const x=(e.clientX/window.innerWidth-0.5)*0.8;
const y=(e.clientY/window.innerHeight-0.5)*0.8;

particles.rotation.y=x;
particles.rotation.x=y;

});

/* REEL HOVER */

const cards=document.querySelectorAll('.reel-card');

cards.forEach(card=>{

const video=card.querySelector('video');

card.addEventListener('mouseenter',()=>{
video.play();
});

card.addEventListener('mouseleave',()=>{
video.pause();
video.currentTime=0;
});

});

/* ANIMATION */

function animate(){

requestAnimationFrame(animate);

particles.rotation.y += 0.0009;

renderer.render(scene,camera);

}

animate();

window.addEventListener('resize',()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});
