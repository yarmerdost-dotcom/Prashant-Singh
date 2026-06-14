gsap.registerPlugin(ScrollTrigger);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas:document.getElementById("bg"),
alpha:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

camera.position.z = 25;

const geometry =
new THREE.TorusKnotGeometry(
8,
2,
150,
20
);

VANTA.NET({
  el: "#background",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  color: 0xff3f81,
  backgroundColor: 0x000000,
  points: 12.0,
  maxDistance: 20.0,
  spacing: 18.0
})

const material =
new THREE.MeshStandardMaterial({
color:0x6b4eff,
wireframe:true
});

const knot =
new THREE.Mesh(
geometry,
material
);

scene.add(knot);

const light =
new THREE.PointLight(
0xffffff,
3
);

light.position.set(
20,
20,
20
);

scene.add(light);

function animate(){

requestAnimationFrame(animate);

knot.rotation.x += 0.003;
knot.rotation.y += 0.005;

renderer.render(
scene,
camera
);

}

animate();

window.addEventListener(
'resize',
()=>{

camera.aspect=
window.innerWidth/
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);

gsap.to(".ae-logo",{

y:700,
rotation:1080,
scale:2,

scrollTrigger:{
trigger:"#home",
start:"top top",
end:"bottom top",
scrub:true

}

});

// Featured Projects: premium horizontal X-scroll carousel
const projectCarousel = document.querySelector(".project-wheel");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const projectVideos = Array.from(document.querySelectorAll(".project-card video"));

let projectAutoTimer = null;
let projectRestartTimer = null;
let projectAutoPausedByVideo = false;

function getCardStep(){

if(!projectCarousel || !projectCards.length){
return 0;
}

const firstCard = projectCards[0];
const carouselStyle = window.getComputedStyle(projectCarousel);
const gap = parseFloat(carouselStyle.columnGap || carouselStyle.gap) || 30;

return firstCard.getBoundingClientRect().width + gap;

}

function getMaxProjectScroll(){

if(!projectCarousel){
return 0;
}

return Math.max(0, projectCarousel.scrollWidth - projectCarousel.clientWidth);

}

function scrollToNextProject(){

if(!projectCarousel || projectAutoPausedByVideo){
return;
}

const step = getCardStep();
const maxScroll = getMaxProjectScroll();

if(maxScroll <= 0 || step <= 0){
return;
}

const current = projectCarousel.scrollLeft;
const nextPosition = current >= maxScroll - 5
? 0
: Math.min(current + step, maxScroll);

projectCarousel.scrollTo({
left: nextPosition,
behavior: "smooth"
});

}

function startProjectAutoScroll(){

if(!projectCarousel || projectAutoPausedByVideo){
return;
}

clearInterval(projectAutoTimer);
projectAutoTimer = setInterval(scrollToNextProject, 20000);

}

function restartProjectAutoScroll(){

if(projectAutoPausedByVideo){
return;
}

clearTimeout(projectRestartTimer);
projectRestartTimer = setTimeout(()=>{
startProjectAutoScroll();
}, 600);

}

function stopProjectAutoScroll(){

clearInterval(projectAutoTimer);
clearTimeout(projectRestartTimer);

}

if(projectCarousel){

// Make sure carousel always starts from the first card.
projectCarousel.scrollLeft = 0;

projectCarousel.addEventListener(
"wheel",
(event)=>{

const horizontalMove = Math.abs(event.deltaX) > Math.abs(event.deltaY)
? event.deltaX
: event.deltaY;

projectCarousel.scrollBy({
left: horizontalMove,
behavior: "smooth"
});

event.preventDefault();
restartProjectAutoScroll();

},
{ passive:false }
);

// Drag / swipe with mouse for desktop premium feel.
let isDragging = false;
let dragStartX = 0;
let dragStartScroll = 0;

projectCarousel.addEventListener("pointerdown", (event)=>{
if(event.target.closest("video")) return;
isDragging = true;
dragStartX = event.clientX;
dragStartScroll = projectCarousel.scrollLeft;
projectCarousel.setPointerCapture(event.pointerId);
stopProjectAutoScroll();
});

projectCarousel.addEventListener("pointermove", (event)=>{
if(!isDragging) return;
projectCarousel.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
});

projectCarousel.addEventListener("pointerup", ()=>{
isDragging = false;
restartProjectAutoScroll();
});

projectCarousel.addEventListener("pointercancel", ()=>{
isDragging = false;
restartProjectAutoScroll();
});

projectVideos.forEach((video)=>{

video.addEventListener("play", ()=>{
projectAutoPausedByVideo = true;
stopProjectAutoScroll();
});

video.addEventListener("pause", ()=>{
if(!video.ended){
projectAutoPausedByVideo = false;
restartProjectAutoScroll();
}
});

video.addEventListener("ended", ()=>{
projectAutoPausedByVideo = false;
scrollToNextProject();
startProjectAutoScroll();
});

});

startProjectAutoScroll();

// First motion preview so you can instantly see the X-scroll working.
setTimeout(scrollToNextProject, 1200);

}

gsap.from(".service-card",{

opacity:0,
y:100,
stagger:.2,

scrollTrigger:{
trigger:"#services",
start:"top 70%"
}

});
