import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';

/* LOADER */

window.addEventListener('load',()=>{

setTimeout(()=>{

document.getElementById('loader').style.opacity='0';

setTimeout(()=>{
document.getElementById('loader').style.display='none';
},1000);

},1800);

});

/* CURSOR */

const glow=document.querySelector('.cursor-glow');

document.addEventListener('mousemove',(e)=>{

glow.style.left=e.clientX+'px';
glow.style.top=e.clientY+'px';

});

/* THREE JS WORLD */

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

const count=10000;

const positions=new Float32Array(count*3);

for(let i=0;i<count*3;i++){

positions[i]=(Math.random()-0.5)*50;

}

particlesGeometry.setAttribute(
'position',
new THREE.BufferAttribute(positions,3)
);

const particlesMaterial=new THREE.PointsMaterial({
size:0.025,
color:0xd4a84f
});

const particles=new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particles);

/* FLOATING TORUS */

const torusGeometry=new THREE.TorusGeometry(1.2,0.04,16,100);

const torusMaterial=new THREE.MeshStandardMaterial({
color:0xd4a84f,
emissive:0xd4a84f,
emissiveIntensity:1
});

const torus=new THREE.Mesh(
torusGeometry,
torusMaterial
);

scene.add(torus);

torus.position.set(2,0,-2);

/* LIGHTS */

const light1=new THREE.PointLight(0xd4a84f,4,100);

light1.position.set(2,2,4);

scene.add(light1);

const light2=new THREE.PointLight(0xffffff,1,100);

light2.position.set(-3,-2,2);

scene.add(light2);

camera.position.z=5;

/* MOUSE PARALLAX */

document.addEventListener('mousemove',(e)=>{

const x=(e.clientX/window.innerWidth-0.5)*1.2;
const y=(e.clientY/window.innerHeight-0.5)*1.2;

particles.rotation.y=x*0.2;
particles.rotation.x=y*0.2;

torus.rotation.x=y;
torus.rotation.y=x;

});

/* REELS */

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

particles.rotation.y += 0.0007;

torus.rotation.z += 0.01;

renderer.render(scene,camera);

}

animate();

window.addEventListener('resize',()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});
