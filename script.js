// ================================
// Rotating cube with inner sphere
// ================================

// Basic scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(0, 0, 18);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x0a0a0a, 1);
document.body.appendChild(renderer.domElement);

// Lights - six vibrant point light sources
scene.add(new THREE.AmbientLight(0x1a1a1a, 0.6));

const pointLight1 = new THREE.PointLight(0xe2e225, 2.0, 120); // hsla(61 100% 44.3% / 0.46)
pointLight1.position.set(10, 14, 16);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x2589e2, 1.8, 100); // hsla(202 100% 44.3% / 0.46)
pointLight2.position.set(-12, -8, 10);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xbb25e2, 1.9, 110); // hsla(280 100% 44.3% / 0.46)
pointLight3.position.set(5, -10, -14);
scene.add(pointLight3);

const pointLight4 = new THREE.PointLight(0xe2e225, 1.7, 105); // hsla(61 100% 44.3% / 0.46)
pointLight4.position.set(-8, 12, -12);
scene.add(pointLight4);

const pointLight5 = new THREE.PointLight(0x2589e2, 1.85, 115); // hsla(202 100% 44.3% / 0.46)
pointLight5.position.set(14, -5, 8);
scene.add(pointLight5);

const pointLight6 = new THREE.PointLight(0xbb25e2, 1.75, 108); // hsla(280 100% 44.3% / 0.46)
pointLight6.position.set(-6, -12, -8);
scene.add(pointLight6);

// Rotating cube with rounded corners
// Create rounded box by using higher segments and modifying corner vertices
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10, 10, 10, 10);

// Round the corners by pulling corner vertices inward
const cubePositions = cubeGeometry.attributes.position;
const cornerRadius = 1.5; // Radius of rounding

for (let i = 0; i < cubePositions.count; i++) {
  let x = cubePositions.getX(i);
  let y = cubePositions.getY(i);
  let z = cubePositions.getZ(i);
  
  const halfSize = 5;
  const edgeThreshold = halfSize - cornerRadius;
  
  // Count how many axes are at the edge
  const xAtEdge = Math.abs(x) > edgeThreshold;
  const yAtEdge = Math.abs(y) > edgeThreshold;
  const zAtEdge = Math.abs(z) > edgeThreshold;
  const edgeCount = (xAtEdge ? 1 : 0) + (yAtEdge ? 1 : 0) + (zAtEdge ? 1 : 0);
  
  // If vertex is at a corner or edge, round it
  if (edgeCount >= 2) {
    // Clamp to the inner box
    const clampedX = Math.sign(x) * Math.min(Math.abs(x), edgeThreshold);
    const clampedY = Math.sign(y) * Math.min(Math.abs(y), edgeThreshold);
    const clampedZ = Math.sign(z) * Math.min(Math.abs(z), edgeThreshold);
    
    // Calculate direction from clamped point
    const dx = x - clampedX;
    const dy = y - clampedY;
    const dz = z - clampedZ;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    
    if (dist > 0) {
      // Normalize and scale to corner radius
      const scale = cornerRadius / dist;
      x = clampedX + dx * scale;
      y = clampedY + dy * scale;
      z = clampedZ + dz * scale;
      
      cubePositions.setXYZ(i, x, y, z);
    }
  }
}

cubePositions.needsUpdate = true;
cubeGeometry.computeVertexNormals();

// Actual source code from this program
const actualCode = `
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(0, 0, 18);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x0a0a0a, 1);
document.body.appendChild(renderer.domElement);
scene.add(new THREE.AmbientLight(0x1a1a1a, 0.6));
const pointLight1 = new THREE.PointLight(0xe2e225, 2.0, 120);
pointLight1.position.set(10, 14, 16);
scene.add(pointLight1);
const pointLight2 = new THREE.PointLight(0x2589e2, 1.8, 100);
pointLight2.position.set(-12, -8, 10);
scene.add(pointLight2);
const pointLight3 = new THREE.PointLight(0xbb25e2, 1.9, 110);
pointLight3.position.set(5, -10, -14);
scene.add(pointLight3);
const cubeGeometry = new THREE.BoxGeometry(12, 12, 12, 10, 10, 10);
const cubePositions = cubeGeometry.attributes.position;
const cornerRadius = 1.5;
for (let i = 0; i < cubePositions.count; i++) {
  let x = cubePositions.getX(i);
  let y = cubePositions.getY(i);
  let z = cubePositions.getZ(i);
  const halfSize = 6;
  const edgeThreshold = halfSize - cornerRadius;
  const xAtEdge = Math.abs(x) > edgeThreshold;
  const yAtEdge = Math.abs(y) > edgeThreshold;
  const zAtEdge = Math.abs(z) > edgeThreshold;
  const edgeCount = (xAtEdge ? 1 : 0) + (yAtEdge ? 1 : 0) + (zAtEdge ? 1 : 0);
  if (edgeCount >= 2) {
    const clampedX = Math.sign(x) * Math.min(Math.abs(x), edgeThreshold);
    const clampedY = Math.sign(y) * Math.min(Math.abs(y), edgeThreshold);
    const clampedZ = Math.sign(z) * Math.min(Math.abs(z), edgeThreshold);
    const dx = x - clampedX;
    const dy = y - clampedY;
    const dz = z - clampedZ;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (dist > 0) {
      const scale = cornerRadius / dist;
      x = clampedX + dx * scale;
      y = clampedY + dy * scale;
      z = clampedZ + dz * scale;
      cubePositions.setXYZ(i, x, y, z);
    }
  }
}
cubePositions.needsUpdate = true;
cubeGeometry.computeVertexNormals();
const sphereGeom = new THREE.SphereGeometry(3.0, 64, 48);
const positions = sphereGeom.attributes.position;
for (let i = 0; i < positions.count; i++) {
  const x = positions.getX(i);
  const y = positions.getY(i);
  const z = positions.getZ(i);
  const length = Math.sqrt(x * x + y * y + z * z);
  const nx = x / length;
  const ny = y / length;
  const nz = z / length;
  const spikeAmount = 0.3 + Math.random() * 1.2;
  positions.setXYZ(i, x + nx * spikeAmount, y + ny * spikeAmount, z + nz * spikeAmount);
}
positions.needsUpdate = true;
sphereGeom.computeVertexNormals();
const sphereMat = new THREE.MeshStandardMaterial({
  color: 0xff3355,
  emissive: 0x220011,
  roughness: 0.35,
  metalness: 0.15,
  emissiveIntensity: 0.7,
  flatShading: true
});
const sphere = new THREE.Mesh(sphereGeom, sphereMat);
scene.add(sphere);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
function animate() {
  requestAnimationFrame(animate);
  const t = (performance.now() - startTime) * 0.001;
  cube.rotation.x = t * 0.4;
  cube.rotation.y = t * 0.6;
  sphere.rotation.y = t * 0.8;
  sphere.rotation.x = t * 0.4;
  sphere.position.addScaledVector(sphereVelocity, dt);
  if (sphere.position.x > boundaryLimit || sphere.position.x < -boundaryLimit) {
    sphereVelocity.x *= -0.98;
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();
`.trim().split('\n');

// Create canvas textures with code for each cube face
const codeCanvases = [];
const codeTextures = [];

for (let face = 0; face < 6; face++) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  codeCanvases.push(canvas);
  
  const texture = new THREE.CanvasTexture(canvas);
  codeTextures.push(texture);
}

// Function to update code texture (continuously scrolling down)
function updateCodeTexture(faceIndex, time) {
  const canvas = codeCanvases[faceIndex];
  const ctx = canvas.getContext('2d');
  
  // Dark background (clear each frame)
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, 512, 512);
  
  ctx.font = '14px monospace';
  
  // Continuous scrolling: calculate position and show multiple lines
  const lineHeight = 16;
  const scrollSpeed = 80; // Pixels per second
  const totalHeight = actualCode.length * lineHeight;
  const scrollPosition = (time * scrollSpeed + faceIndex * 200) % totalHeight;
  const startLineIndex = Math.floor(scrollPosition / lineHeight);
  const yOffset = -(scrollPosition % lineHeight);
  
  // Draw all visible lines starting from top
  let y = yOffset;
  
  for (let i = 0; i < 40; i++) { // Draw enough lines to fill screen
    const currentLineIndex = (startLineIndex + i) % actualCode.length;
    const codeLine = actualCode[currentLineIndex];
    
    if (y >= -20 && y <= 530) {
      // Calculate alpha with fade at top and bottom edges
      let alpha = 0.85;
      if (y < 50) alpha *= Math.max(0, y / 50);
      if (y > 462) alpha *= Math.max(0, (512 - y) / 50);
      alpha = Math.max(0.1, Math.min(alpha, 0.85));
      
      ctx.fillStyle = `rgba(0, 200, ${50 + Math.sin(time + faceIndex + i * 0.2) * 20 + 60}, ${alpha})`;
      ctx.fillText(codeLine, 10, y);
    }
    
    y += lineHeight;
    if (y > 530) break;
  }
  
  codeTextures[faceIndex].needsUpdate = true;
}

const cubeMaterials = [
  new THREE.MeshStandardMaterial({
    map: codeTextures[0],
    roughness: 0.95,
    metalness: 0.2,
    transparent: true,
    opacity: 0.95,
    depthWrite: true
  }),
  new THREE.MeshStandardMaterial({
    map: codeTextures[1],
    roughness: 0.92,
    metalness: 0.15,
    transparent: true,
    opacity: 0.92,
    depthWrite: true
  }),
  new THREE.MeshStandardMaterial({
    map: codeTextures[2],
    roughness: 0.88,
    metalness: 0.25,
    transparent: true,
    opacity: 0.94,
    depthWrite: true
  }),
  new THREE.MeshStandardMaterial({
    map: codeTextures[3],
    roughness: 0.9,
    metalness: 0.18,
    transparent: true,
    opacity: 0.90,
    depthWrite: true
  }),
  new THREE.MeshStandardMaterial({
    map: codeTextures[4],
    roughness: 0.93,
    metalness: 0.22,
    transparent: true,
    opacity: 0.93,
    depthWrite: true
  }),
  new THREE.MeshStandardMaterial({
    map: codeTextures[5],
    roughness: 0.91,
    metalness: 0.16,
    transparent: true,
    opacity: 0.91,
    depthWrite: true
  })
];
const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
scene.add(cube);

// Inner rotating sphere with spiky geometry
const sphereGeom = new THREE.SphereGeometry(1.3, 64, 48);

// Make sphere spiky by displacing vertices outward randomly
const positions = sphereGeom.attributes.position;
for (let i = 0; i < positions.count; i++) {
  const x = positions.getX(i);
  const y = positions.getY(i);
  const z = positions.getZ(i);
  
  // Calculate normal direction (from center)
  const length = Math.sqrt(x * x + y * y + z * z);
  const nx = x / length;
  const ny = y / length;
  const nz = z / length;
  
  // Random spike displacement (0.5 to 2.5 units outward for longer spikes)
  const spikeAmount = 0.5 + Math.random() * 2.0;
  
  positions.setXYZ(
    i,
    x + nx * spikeAmount,
    y + ny * spikeAmount,
    z + nz * spikeAmount
  );
}
positions.needsUpdate = true;
sphereGeom.computeVertexNormals();

const sphereMat = new THREE.MeshStandardMaterial({
  color: 0xff3355,
  emissive: 0x220011,
  roughness: 0.35,
  metalness: 0.15,
  emissiveIntensity: 1.5,
  flatShading: true, // Makes spikes more visible
  transparent: true,
  opacity: 0.5
});
const sphere = new THREE.Mesh(sphereGeom, sphereMat);
sphere.renderOrder = -1;
scene.add(sphere);

// Create inner solid sphere
const innerSphereGeom = new THREE.SphereGeometry(1.2, 32, 32);
const innerSphereMat = new THREE.MeshStandardMaterial({
  color: 0xff5577,
  emissive: 0x440022,
  roughness: 0.4,
  metalness: 0.3,
  emissiveIntensity: 1.8
});
const innerSphere = new THREE.Mesh(innerSphereGeom, innerSphereMat);
innerSphere.renderOrder = 0;
scene.add(innerSphere);

// Create glowing stars around the cube
const stars = [];
const starCount = 80;

// Create star shape geometry (5-pointed star)
function createStarGeometry(outerRadius, innerRadius, points) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / points;
  
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * step) / 2 - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  
  const extrudeSettings = {
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.03,
    bevelSegments: 3
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

const starGeometry = createStarGeometry(0.06, 0.025, 5);

for (let i = 0; i < starCount; i++) {
  const starMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(Math.random(), 0.6, 0.5),
    emissive: new THREE.Color().setHSL(Math.random(), 0.7, 0.4),
    emissiveIntensity: 0.8,
    roughness: 0.4,
    metalness: 0.2
  });
  
  const star = new THREE.Mesh(starGeometry, starMaterial);
  
  // Random position around cube (15-25 units from center)
  const radius = 15 + Math.random() * 10;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI;
  
  star.position.set(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
  
  // Random rotation
  star.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );
  
  // Random velocity
  star.userData.velocity = new THREE.Vector3(
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2
  );
  
  star.userData.baseColor = starMaterial.color.clone();
  star.userData.baseEmissive = starMaterial.emissive.clone();
  
  scene.add(star);
  stars.push(star);
}

// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.9;
controls.zoomSpeed = 0.6;
controls.minDistance = 6;
controls.maxDistance = 40;

// Mouse tracking for gradient
const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1; // NDC X
  mouse.y = (e.clientY / window.innerHeight) * 2 - 1; // NDC Y
});

// Gradient colors
const colorA = new THREE.Color(0xff3355); // inner base
const colorB = new THREE.Color(0x33aaff); // far color
const tempColor = new THREE.Color();

// Animation state
let startTime = performance.now();
let lastFrameTime = startTime;

// Sphere bouncing physics
const sphereVelocity = new THREE.Vector3(
  1.5 + Math.random() * 1.0,
  1.2 + Math.random() * 1.0,
  1.3 + Math.random() * 1.0
);
const sphereMaxRadius = 3.0 + 1.5; // base radius + max spike length
const cubeHalfSize = 6.0;
const boundaryLimit = cubeHalfSize - sphereMaxRadius - 0.5; // Additional 0.5 unit margin

function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const t = (now - startTime) * 0.001; // seconds
  const dt = Math.min((now - lastFrameTime) * 0.001, 0.1); // delta time, capped at 0.1s
  lastFrameTime = now;

  // Update code textures on all cube faces
  for (let i = 0; i < 6; i++) {
    updateCodeTexture(i, t);
  }

  // Cube rotation
  cube.rotation.x = t * 0.4;
  cube.rotation.y = t * 0.6;

  // Sphere rotation (no breathing scale)
  sphere.rotation.y = t * 0.8;
  sphere.rotation.x = t * 0.4;

  // Sphere bouncing physics
  sphere.position.addScaledVector(sphereVelocity, dt);
  
  // Boundary collision detection (accounting for spiky radius)
  if (sphere.position.x > boundaryLimit || sphere.position.x < -boundaryLimit) {
    sphereVelocity.x *= -0.98; // Slight damping on bounce
    sphere.position.x = THREE.MathUtils.clamp(sphere.position.x, -boundaryLimit, boundaryLimit);
  }
  if (sphere.position.y > boundaryLimit || sphere.position.y < -boundaryLimit) {
    sphereVelocity.y *= -0.98;
    sphere.position.y = THREE.MathUtils.clamp(sphere.position.y, -boundaryLimit, boundaryLimit);
  }
  if (sphere.position.z > boundaryLimit || sphere.position.z < -boundaryLimit) {
    sphereVelocity.z *= -0.98;
    sphere.position.z = THREE.MathUtils.clamp(sphere.position.z, -boundaryLimit, boundaryLimit);
  }

  // Mouse distance gradient influence
  const dist = Math.min(Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y), 1.25); // radial distance
  const factor = dist / 1.25; // 0 at center, 1 at edge
  tempColor.copy(colorA).lerp(colorB, factor);
  sphere.material.color.set(tempColor);
  sphere.material.emissive.set(tempColor.clone().multiplyScalar(0.25));

  // Update inner sphere to follow outer sphere
  innerSphere.position.copy(sphere.position);
  innerSphere.rotation.y = t * 1.2;
  innerSphere.rotation.x = t * 0.7;
  innerSphere.material.color.set(tempColor.clone().multiplyScalar(0.8));
  innerSphere.material.emissive.set(tempColor.clone().multiplyScalar(0.3));

  // Update stars: movement and cube collision detection
  const cubeSize = 12;
  const cubeHalfSize = cubeSize / 2;
  
  stars.forEach((star, index) => {
    // Move star
    star.position.addScaledVector(star.userData.velocity, dt);
    
    // Get cube bounding box in world space (accounting for rotation)
    const cubeMatrix = cube.matrixWorld;
    const localStarPos = star.position.clone().applyMatrix4(cubeMatrix.clone().invert());
    
    // Check collision with cube faces
    let collision = false;
    const bounceThreshold = 0.3;
    
    if (Math.abs(localStarPos.x) > cubeHalfSize - bounceThreshold ||
        Math.abs(localStarPos.y) > cubeHalfSize - bounceThreshold ||
        Math.abs(localStarPos.z) > cubeHalfSize - bounceThreshold) {
      
      // Simple collision: check if star is near cube
      const distToCube = Math.max(
        Math.abs(localStarPos.x) - cubeHalfSize,
        Math.abs(localStarPos.y) - cubeHalfSize,
        Math.abs(localStarPos.z) - cubeHalfSize
      );
      
      if (distToCube > -1 && distToCube < 1) {
        collision = true;
        
        // Bounce away from cube center
        const dirFromCube = star.position.clone().sub(cube.position).normalize();
        star.userData.velocity.copy(dirFromCube.multiplyScalar(3 + Math.random() * 2));
        
        // Flash brighter on collision
        star.material.emissiveIntensity = 2.0;
      }
    }
    
    // Fade emissive back to normal
    star.material.emissiveIntensity = THREE.MathUtils.lerp(
      star.material.emissiveIntensity,
      0.8,
      0.1
    );
    
    // Keep stars in bounds (30 unit sphere)
    const distFromCenter = star.position.length();
    if (distFromCenter > 30) {
      star.userData.velocity.reflect(star.position.clone().normalize());
    }
  });

  // Update controls
  controls.update();

  // Light subtle color cycles for all six lights
  const hueShift = (Math.sin(t * 0.6) * 0.02);
  pointLight1.color.setHSL((61/360) - hueShift, 1.0, 0.443); // hsla(61 100% 44.3%)
  pointLight2.color.setHSL((202/360) + hueShift * 0.5, 1.0, 0.443); // hsla(202 100% 44.3%)
  pointLight3.color.setHSL((280/360) + hueShift * 0.7, 1.0, 0.443); // hsla(280 100% 44.3%)
  pointLight4.color.setHSL((61/360) + hueShift * 0.6, 1.0, 0.443); // hsla(61 100% 44.3%)
  pointLight5.color.setHSL((202/360) - hueShift * 0.4, 1.0, 0.443); // hsla(202 100% 44.3%)
  pointLight6.color.setHSL((280/360) + hueShift * 0.8, 1.0, 0.443); // hsla(280 100% 44.3%)

  renderer.render(scene, camera);
}

animate();

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});
