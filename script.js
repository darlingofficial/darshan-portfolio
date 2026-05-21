
window.addEventListener('load',()=>{
setTimeout(()=>{
document.getElementById('loader').style.opacity='0';
setTimeout(()=>{
document.getElementById('loader').style.display='none';
},800);
},1200);
});

const topBtn=document.getElementById('topBtn');

window.addEventListener('scroll',()=>{
if(window.scrollY>500){
topBtn.style.display='block';
}else{
topBtn.style.display='none';
}
});

topBtn.addEventListener('click',()=>{
window.scrollTo({
top:0,
behavior:'smooth'
});
});

console.log('Darshan Visuals Ultimate Loaded');
