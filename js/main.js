import { createDNA } from './dna.js';
import { setupControls } from './controls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Licht
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00ffff, 3, 300);
pointLight.position.set(50,50,50);
scene.add(pointLight);

// Controls
const controls = setupControls(camera, renderer);

// DNA-Strang
const dna = createDNA();
scene.add(dna);

// Animation
function animate() {
  requestAnimationFrame(animate);
  dna.rotation.y += 0.002;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
