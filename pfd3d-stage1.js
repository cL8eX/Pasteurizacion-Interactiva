let p3dCleanup=null;
function renderPfd3dStage1(){
 const host=document.getElementById('wsContent'); if(!host)return;
 host.innerHTML=`<div class="p3d-shell" id="p3dShell"><header class="p3d-top"><button onclick="workspacePage('home')">← Salir</button><div><div class="p3d-title">MILKLAB · Exploración 3D</div><div class="p3d-sub">Etapa 1 · Prototipo de exploración</div></div><div class="p3d-status" id="p3dStatus">Inicializando entorno…</div></header><main class="p3d-main" id="p3dMain"><div class="p3d-hud"><section class="p3d-card p3d-help"><h3>🎮 Controles</h3><p><span class="p3d-key">W</span><span class="p3d-key">A</span><span class="p3d-key">S</span><span class="p3d-key">D</span> caminar · Mouse arrastrar: cámara<br><span class="p3d-key">Shift</span> correr · <span class="p3d-key">Space</span> saltar</p></section><section class="p3d-card p3d-minimap"><h3>📍 Planta piloto</h3><p>Zona de exploración inicial<br>Prototipo de entorno industrial</p></section><section class="p3d-card p3d-bottom"><span class="p3d-key">WASD</span> Movimiento <span class="p3d-key">SHIFT</span> Correr <span class="p3d-key">SPACE</span> Saltar</section><div class="p3d-toast" id="p3dToast"></div><div class="p3d-mobile"><div class="p3d-joystick"><button class="up" data-move="forward">▲</button><button class="left" data-move="left">◀</button><button class="down" data-move="back">▼</button><button class="right" data-move="right">▶</button><button class="jump" data-move="jump">SALTAR</button></div></div></div></main></div>`;
 if(p3dCleanup){p3dCleanup();p3dCleanup=null;}
 startPfd3dStage1();
}
async function startPfd3dStage1(){
 const status=document.getElementById('p3dStatus'),mount=document.getElementById('p3dMain'); if(!mount)return;
 try{
 const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
 if(!document.getElementById('p3dMain'))return;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#9ec9e5');scene.fog=new THREE.Fog('#9ec9e5',38,100);
 const camera=new THREE.PerspectiveCamera(65,mount.clientWidth/mount.clientHeight,.1,180);
 const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(mount.clientWidth,mount.clientHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;mount.appendChild(renderer.domElement);
 scene.add(new THREE.HemisphereLight(0xd9efff,0x526044,2.0));const sun=new THREE.DirectionalLight(0xfff1d8,3.1);sun.position.set(-18,28,14);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-35;sun.shadow.camera.right=35;sun.shadow.camera.top=35;sun.shadow.camera.bottom=-35;scene.add(sun);
 const mat=(color,rough=.75,metal=0)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});
 const ground= new THREE.Mesh(new THREE.PlaneGeometry(90,90),mat('#9ba9a5'));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
 // Concrete slab and safety markings
 const slab=new THREE.Mesh(new THREE.BoxGeometry(34,.25,28),mat('#b7c0c2'));slab.position.y=.05;slab.receiveShadow=true;slab.castShadow=true;scene.add(slab);
 const lineMat=mat('#e7c64c');for(let x=-15;x<=15;x+=5){const stripe=new THREE.Mesh(new THREE.BoxGeometry(.08,.015,25),lineMat);stripe.position.set(x,.19,0);scene.add(stripe)}
 // Main industrial hall: frame, walls, roof and windows
 const wallMat=mat('#dce4e8'),steel=mat('#566b7a',.42,.65),roofMat=mat('#405565');
 function box(w,h,d,m,x,y,z){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;scene.add(o);return o}
 box(34,5,.35,wallMat,0,2.7,-14);box(34,5,.35,wallMat,0,2.7,14);box(.35,5,28,wallMat,-17,2.7,0);box(.35,5,28,wallMat,17,2.7,0);
 // Roof panels and beams
 box(34,.3,28,roofMat,0,5.45,0);for(let x=-16;x<=16;x+=4)box(.18,5.6,.18,steel,x,2.7,0);for(let z=-12;z<=12;z+=4)box(34,.16,.16,steel,0,5.15,z);
 // Window strips along side walls
 const glass= new THREE.MeshStandardMaterial({color:'#8ec9e5',transparent:true,opacity:.52,metalness:.2,roughness:.25});for(let x=-13;x<=13;x+=4){box(2.1,1.5,.06,glass,x,3.55,-13.78);box(2.1,1.5,.06,glass,x,3.55,13.78)}
 // Loading door / entry
 box(5,3.8,.16,mat('#32495b'),0,2.05,13.8);box(4.6,3.5,.12,mat('#8299a7'),0,2.05,13.68);
 // Basic industrial props: pallets, crates, racks, utility corner
 const crateMat=mat('#b48b58');for(let i=0;i<6;i++){box(1.15,1,1.15,crateMat,-13+i*2.1,.75,-10);box(1.15,.08,1.15,mat('#d0aa73'),-13+i*2.1,1.28,-10)}
 // Equipment placeholders as visual landmarks, not yet linked to PFD
 function landmark(x,z,color,label){const base=box(2.3,.25,2.3,steel,x,.32,z);const pillar=box(.18,2.5,.18,mat(color),x,1.55,z);const cap=box(2.1,.18,2.1,mat(color),x,2.9,z);const light=new THREE.Mesh(new THREE.SphereGeometry(.16,16,12),mat('#65e5a1',.25,.1));light.position.set(x,3.2,z);scene.add(light);const sprite=makeLabel(label,THREE);sprite.position.set(x,4.1,z);scene.add(sprite);return {x,z}}
 function makeLabel(text,THREE){const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;const c=canvas.getContext('2d');c.fillStyle='#10283bdc';c.roundRect(10,10,492,108,20);c.fill();c.strokeStyle='#8fb5d2';c.lineWidth=4;c.stroke();c.fillStyle='white';c.font='bold 38px Arial';c.textAlign='center';c.fillText(text,256,78);const tex=new THREE.CanvasTexture(canvas);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true}));s.scale.set(4,1,1);return s}
 landmark(-8,-4,'#36a5bf','ZONA DE PROCESO');landmark(7,-5,'#54a17c','EQUIPOS');landmark(0,7,'#d19a48','ACCESO');
 // Safety rails and walkway blocks
 const rail=mat('#e0b73f');for(let x=-14;x<=14;x+=2.5){box(.08,.9,.08,rail,x,.65,10);box(.08,.9,.08,rail,x,.65,-10)}box(30,.08,.08,rail,0,1.1,10);box(30,.08,.08,rail,0,1.1,-10);
 // Player: stylized low-poly character
 const player=new THREE.Group();scene.add(player);const body= new THREE.Mesh(new THREE.CapsuleGeometry(.38,.85,4,8),mat('#4e78dc'));body.position.y=1.05;body.castShadow=true;player.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(.3,12,8),mat('#e8c8a5'));head.position.y=1.75;head.castShadow=true;player.add(head);const visor=new THREE.Mesh(new THREE.BoxGeometry(.38,.12,.15),mat('#20394d',.25,.4));visor.position.set(0,1.78,.25);player.add(visor);const backpack=new THREE.Mesh(new THREE.BoxGeometry(.35,.55,.24),mat('#f0a63b'));backpack.position.set(0,1.1,-.38);player.add(backpack);player.position.set(0,0,4);
 // collision bounds: plant perimeter and props rough
 const keys={};let yaw=0,pitch=.24,drag=false,lastX=0,lastY=0,velocityY=0,onGround=true,disposed=false;
 function keydown(e){if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();keys[e.code]=true}function keyup(e){keys[e.code]=false}
 window.addEventListener('keydown',keydown);window.addEventListener('keyup',keyup);
 renderer.domElement.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture?.(e.pointerId)});renderer.domElement.addEventListener('pointerup',()=>drag=false);renderer.domElement.addEventListener('pointermove',e=>{if(!drag)return;yaw-= (e.clientX-lastX)*.005;pitch=Math.max(-.15,Math.min(.75,pitch+(e.clientY-lastY)*.003));lastX=e.clientX;lastY=e.clientY});
 const mobileBtns=mount.querySelectorAll('[data-move]');mobileBtns.forEach(b=>{const k=b.dataset.move;const map={forward:'KeyW',back:'KeyS',left:'KeyA',right:'KeyD',jump:'Space'};b.addEventListener('pointerdown',e=>{e.preventDefault();keys[map[k]]=true});['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,()=>keys[map[k]]=false))});
 const toast=document.getElementById('p3dToast');let toastTimer;function showToast(t){toast.textContent=t;toast.style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.style.display='none',2600)}
 const clock=new THREE.Clock();const camTarget=new THREE.Vector3();
 function animate(){if(disposed)return;requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.04);const forward=(keys.KeyW||keys.ArrowUp?1:0)-(keys.KeyS||keys.ArrowDown?1:0),side=(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0);const speed=keys.ShiftLeft||keys.ShiftRight?7:4.2;
 if(forward||side){const dir=new THREE.Vector3(side,0,forward).normalize().applyAxisAngle(new THREE.Vector3(0,1,0),yaw);player.position.addScaledVector(dir,speed*dt);player.rotation.y=Math.atan2(dir.x,dir.z)}player.position.x=Math.max(-15.7,Math.min(15.7,player.position.x));player.position.z=Math.max(-12.7,Math.min(12.7,player.position.z));
 if(keys.Space&&onGround){velocityY=6.4;onGround=false;keys.Space=false}velocityY-=18*dt;player.position.y+=velocityY*dt;if(player.position.y<=0){player.position.y=0;velocityY=0;onGround=true}
 camTarget.copy(player.position).add(new THREE.Vector3(0,1.35,0));const offset=new THREE.Vector3(Math.sin(yaw)*7,2.4+pitch*4,Math.cos(yaw)*7);camera.position.copy(camTarget).add(offset);camera.lookAt(camTarget);renderer.render(scene,camera)}animate();
 const resize=()=>{if(!mount.clientWidth)return;camera.aspect=mount.clientWidth/mount.clientHeight;camera.updateProjectionMatrix();renderer.setSize(mount.clientWidth,mount.clientHeight)};window.addEventListener('resize',resize);
 status.textContent='Entorno listo · Puedes explorar';showToast('¡Bienvenido a la planta piloto! Explora con WASD.');
 p3dCleanup=()=>{disposed=true;window.removeEventListener('keydown',keydown);window.removeEventListener('keyup',keyup);window.removeEventListener('resize',resize);renderer.dispose();scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose()}})};
 }catch(err){console.error(err);if(status)status.textContent='No se pudo cargar el entorno 3D';mount.insertAdjacentHTML('beforeend',`<div style="position:absolute;inset:20%;color:white;background:#142536;padding:20px;border-radius:14px">No fue posible cargar Three.js. Revisa conexión a internet o recarga. <br><small>${err.message}</small></div>`)}
}
