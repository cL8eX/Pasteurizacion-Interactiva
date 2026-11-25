import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const scene=new THREE.Scene();scene.background=new THREE.Color(0xbfd4e2);scene.fog=new THREE.Fog(0xbfd4e2,55,155);
const camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.1,260);
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;document.body.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xeaf6ff,0x708090,2));const sun=new THREE.DirectionalLight(0xfff1d5,3);sun.position.set(-18,30,15);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-48;sun.shadow.camera.right=48;sun.shadow.camera.top=42;sun.shadow.camera.bottom=-42;scene.add(sun);
const mat=(color,rough=.75,metal=0)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});const concrete=mat('#cbd4d8'),floorMat=mat('#d5dde0'),steel=mat('#aebdc6',.32,.65),darkSteel=mat('#536b7b',.4,.55),glass= new THREE.MeshStandardMaterial({color:'#83c5e9',roughness:.15,metalness:.1,transparent:true,opacity:.38}),white=mat('#edf3f5'),yellow=mat('#f4c542'),green=mat('#4b9b78'),blue=mat('#3b82c4'),red=mat('#e35d5d');
function box(w,h,d,m,x,y,z,shadow=true){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=shadow;o.receiveShadow=true;scene.add(o);return o}function cyl(r1,r2,h,m,x,y,z,seg=16){const o=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,seg),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;scene.add(o);return o}function pipe(a,b,r=.12,m=steel){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),dir=B.clone().sub(A);const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,dir.length(),10),m);o.position.copy(A.add(B).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());o.castShadow=true;scene.add(o);return o}
// Planta base y nave abierta
box(72,.3,54,floorMat,0,-.17,0);box(72,.35,54,concrete,0,-.45,0);for(let x=-32;x<=32;x+=10){box(.35,8,.35,darkSteel,x,4,-25);box(.35,8,.35,darkSteel,x,4,25)}for(let z of [-25,25])box(72,.3,.4,darkSteel,0,8,z);for(let x of [-35,35])box(.3,8,50,white,x,4,0);for(let x=-30;x<=30;x+=6){box(5.2,2.6,.12,glass,x,4.8,-24.78);box(5.2,2.6,.12,glass,x,4.8,24.78)}
// luces, franjas piso, racks y zona
for(let z=-20;z<=20;z+=8){box(64,.06,.08,yellow,0,.02,z)}for(let x=-28;x<=28;x+=8){box(.08,.06,44,yellow,x,.02,0)}box(12,.04,7,mat('#b6d7c3'),-25,.04,-17,false);box(12,.04,7,mat('#b6d7c3'),25,.04,17,false);
// ===== ETAPA 2 · EQUIPOS INDUSTRIALES (modelos low-poly) =====
const equipment=[];
function addLabel(text,x,y,z){
 const canvas=document.createElement('canvas');canvas.width=384;canvas.height=96;const ctx=canvas.getContext('2d');
 ctx.fillStyle='rgba(9,25,42,.88)';ctx.beginPath();ctx.roundRect(8,8,368,80,16);ctx.fill();
 ctx.strokeStyle='rgba(255,255,255,.32)';ctx.lineWidth=3;ctx.stroke();ctx.fillStyle='#fff';ctx.font='bold 29px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,192,48,344);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false}));sprite.scale.set(1.42,.36,1);sprite.position.set(x,y,z);scene.add(sprite);return sprite;
}
function addSectionLabel(text,x,z){
 const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=180;const ctx=canvas.getContext('2d');
 ctx.fillStyle='rgba(7,20,36,.84)';ctx.beginPath();ctx.roundRect(12,12,1000,156,28);ctx.fill();
 ctx.strokeStyle='rgba(255,255,255,.52)';ctx.lineWidth=5;ctx.stroke();ctx.fillStyle='#fff';ctx.font='800 66px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(text).toLocaleUpperCase('es'),512,90,940);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false,depthWrite:false}));
 sprite.scale.set(Math.max(5.5,Math.min(10,String(text).length*.31)),1.05,1);sprite.position.set(x,7.2,z);scene.add(sprite);return sprite;
}
function meshIn(group,geometry,material,x,y,z,rotX=0,rotY=0,rotZ=0){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.rotation.set(rotX,rotY,rotZ);m.castShadow=true;m.receiveShadow=true;group.add(m);return m;}

function registerEquipment(tag,type,g,labelY=3.2){const label=addLabel(tag,g.position.x,labelY,g.position.z);equipment.push({tag,type,group:g,label});return g;}
function flange(g,x,y,z,axis='x',radius=.22,material=darkSteel){
 const rot=axis==='x'?[0,0,Math.PI/2]:axis==='z'?[Math.PI/2,0,0]:[0,0,0];
 return meshIn(g,new THREE.CylinderGeometry(radius,radius,.12,20),material,x,y,z,...rot);
}
function makeTank(tag,x,z,scale=1,style='standard'){
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 const R=1.18*scale,H=3.45*scale,bodyY=H/2+.42;
 // Cuerpo sanitario vertical con fondos bombeados
 meshIn(g,new THREE.CylinderGeometry(R,R,H,32),steel,0,bodyY,0);
 meshIn(g,new THREE.SphereGeometry(R,32,16,0,Math.PI*2,0,Math.PI/2),steel,0,H+.42,0);
 meshIn(g,new THREE.SphereGeometry(R,32,16,0,Math.PI*2,Math.PI/2,Math.PI/2),steel,0,.42,0);
 // Aros de refuerzo y patas
 for(const yy of [.72,H*.48,H+.12])meshIn(g,new THREE.TorusGeometry(R,.045,8,32),darkSteel,0,yy+.42,0,Math.PI/2);
 for(let i=0;i<4;i++){const a=Math.PI/4+i*Math.PI/2,px=Math.cos(a)*R*.72,pz=Math.sin(a)*R*.72;
  meshIn(g,new THREE.BoxGeometry(.13,.9,.13),darkSteel,px,.34,pz);
  meshIn(g,new THREE.BoxGeometry(.32,.08,.32),darkSteel,px,.06,pz);
  meshIn(g,new THREE.BoxGeometry(.25,.08,.25),steel,px,.77,pz);
 }
 // Boca de hombre, respiradero, spray ball y boquillas
 meshIn(g,new THREE.CylinderGeometry(.34,.34,.13,24),darkSteel,0,H+.57,0);
 meshIn(g,new THREE.TorusGeometry(.30,.035,8,24),steel,0,H+.66,0,Math.PI/2);
 meshIn(g,new THREE.CylinderGeometry(.12,.12,.42,16),steel,0,H+.82,0);
 meshIn(g,new THREE.CylinderGeometry(.08,.08,.22,12),darkSteel,.48,H+.48,0);
 meshIn(g,new THREE.CylinderGeometry(.13,.13,.38,16),steel,R*.92,1.25,0,0,0,Math.PI/2);
 flange(g,R*1.08,1.25,0,'x',.2);
 meshIn(g,new THREE.CylinderGeometry(.07,.07,H*.52,12),blue,R+.055,H*.48+.42,0,0,0,Math.PI/2);
 for(const yy of [.95,H*.5+ .42,H+.0])meshIn(g,new THREE.TorusGeometry(R+.025,.025,6,28),white,0,yy,0,Math.PI/2);
 // Escalera vertical y plataforma superior
 for(const sx of [-.20,.20])meshIn(g,new THREE.CylinderGeometry(.035,.035,H*.78,8),darkSteel,R+sx,H*.42+.4,-.18,0,0,0);
 for(let yy=.72;yy<H*.78;yy+=.38)meshIn(g,new THREE.CylinderGeometry(.025,.025,.42,8),yellow,R+.0,yy,-.18,Math.PI/2,0,0);
 registerEquipment(tag,'Tanque sanitario de almacenamiento',g,H+1.55);return g;
}
function makePump(tag,x,z,rot=0){
 const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rot;scene.add(g);
 // Bancada y motor eléctrico aleteado
 meshIn(g,new THREE.BoxGeometry(2.15,.16,1.05),darkSteel,0,.18,0);
 meshIn(g,new THREE.BoxGeometry(1.15,.62,.72),blue,-.48,.67,0);
 meshIn(g,new THREE.CylinderGeometry(.34,.34,.92,24),blue,-.48,.67,0,0,0,Math.PI/2);
 for(let i=0;i<9;i++)meshIn(g,new THREE.CylinderGeometry(.37,.37,.035,20),darkSteel,-.88+i*.10,.67,0,0,0,Math.PI/2);
 meshIn(g,new THREE.CylinderGeometry(.12,.12,.25,16),darkSteel,-.48,1.03,0);
 // Acoplamiento protegido y carcasa tipo voluta
 meshIn(g,new THREE.CylinderGeometry(.19,.19,.28,20),yellow,.24,.67,0,0,0,Math.PI/2);
 meshIn(g,new THREE.BoxGeometry(.42,.34,.5),darkSteel,.24,.67,0);
 meshIn(g,new THREE.SphereGeometry(.48,24,18),steel,.78,.68,0);
 meshIn(g,new THREE.CylinderGeometry(.38,.38,.34,24),steel,1.03,.68,0,0,0,Math.PI/2);
 meshIn(g,new THREE.CylinderGeometry(.20,.20,.42,20),darkSteel,1.28,.68,0,0,0,Math.PI/2);
 flange(g,1.52,.68,0,'x',.28); // descarga
 meshIn(g,new THREE.CylinderGeometry(.19,.19,.48,20),steel,.78,1.12,0);
 flange(g,.78,1.38,0,'y',.25); // succión superior
 // Tapas de inspección y tornillería
 meshIn(g,new THREE.TorusGeometry(.32,.035,8,24),darkSteel,1.20,.68,0,0,0,Math.PI/2);
 for(let i=0;i<8;i++){const a=i*Math.PI/4;meshIn(g,new THREE.SphereGeometry(.035,8,6),yellow,1.31,.68+Math.cos(a)*.24,Math.sin(a)*.24)}
 registerEquipment(tag,'Bomba centrífuga con motor eléctrico',g,2.0);return g;
}
function makePlateHX(tag,x,z){
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 // Bastidor, placa fija y móvil
 meshIn(g,new THREE.BoxGeometry(2.25,.16,1.45),darkSteel,0,.20,0);
 for(const sx of [-.96,.96])meshIn(g,new THREE.BoxGeometry(.16,2.65,1.35),darkSteel,sx,1.55,0);
 meshIn(g,new THREE.BoxGeometry(.22,2.72,1.48),steel,-1.12,1.55,0);
 meshIn(g,new THREE.BoxGeometry(.22,2.72,1.48),steel,1.12,1.55,0);
 // Paquete de placas corrugadas, alternando acabado
 for(let i=0;i<17;i++){
  const xx=-.78+i*.098;
  meshIn(g,new THREE.BoxGeometry(.055,2.35,1.15),i%2?steel:darkSteel,xx,1.55,0);
  meshIn(g,new THREE.BoxGeometry(.025,2.22,1.08),white,xx+.03,1.55,0);
 }
 // Tirantes superiores/inferiores y pernos
 for(const yy of [.42,2.72])meshIn(g,new THREE.CylinderGeometry(.045,.045,2.45,10),steel,0,yy,.60,0,0,Math.PI/2);
 for(const sx of [-1,1])for(const yy of [.45,2.65])meshIn(g,new THREE.CylinderGeometry(.10,.10,.18,16),yellow,sx*1.12,yy,.77,Math.PI/2,0,0);
 // Cuatro bocas de producto/servicio con bridas codificadas
 for(const sx of [-1,1])for(const yy of [.72,2.36]){
  const col=(sx<0?blue:red);meshIn(g,new THREE.CylinderGeometry(.14,.14,.48,18),col,sx*1.18,yy,.78,Math.PI/2,0,0);
  flange(g,sx*1.18,yy,1.03,'z',.22,darkSteel);
 }
 registerEquipment(tag,'Intercambiador de calor de placas',g,3.25);return g;
}
function makePasteurizer(tag,x,z){
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 // Skid sanitario completo
 meshIn(g,new THREE.BoxGeometry(5.0,.20,2.55),darkSteel,0,.20,0);
 for(const X of [-2.25,2.25])for(const Z of [-1.08,1.08])meshIn(g,new THREE.BoxGeometry(.16,.7,.16),steel,X,.48,Z);
 // Banco de placas de calentamiento
 meshIn(g,new THREE.BoxGeometry(1.35,2.15,1.2),steel,-1.25,1.65,0);
 for(let i=0;i<13;i++)meshIn(g,new THREE.BoxGeometry(1.20,.045,1.06),darkSteel,-1.25,.67+i*.16,0);
 for(const sx of [-1,1])meshIn(g,new THREE.BoxGeometry(.12,2.30,1.3),darkSteel,-1.25+sx*.72,1.65,0);
 // Tubo de retención en serpentín sanitario
 for(let i=0;i<4;i++){
  const yy=.9+i*.36;
  meshIn(g,new THREE.CylinderGeometry(.13,.13,2.15,16),steel,.65,yy,0,0,0,Math.PI/2);
  for(const sx of [-1,1])meshIn(g,new THREE.TorusGeometry(.18,.105,10,20,Math.PI),steel,.65+sx*1.07,yy+.18,0,0,Math.PI/2,Math.PI/2);
 }
 // Bomba de recirculación pequeña
 meshIn(g,new THREE.BoxGeometry(.72,.42,.62),blue,1.45,.55,.72);
 meshIn(g,new THREE.SphereGeometry(.28,16,12),steel,1.80,.55,.72);
 // Armario de control con HMI
 meshIn(g,new THREE.BoxGeometry(.72,1.45,.28),darkSteel,1.78,1.25,-.78);
 meshIn(g,new THREE.BoxGeometry(.48,.42,.04),blue,1.78,1.55,-.61);
 meshIn(g,new THREE.BoxGeometry(.34,.08,.025),green,1.78,1.18,-.61);
 for(let i=0;i<3;i++)meshIn(g,new THREE.SphereGeometry(.065,10,8),i===0?green:i===1?yellow:red,1.78,1.0-i*.17,-.60);
 // Instrumentos visibles
 for(const X of [-.65,.25,1.1]){meshIn(g,new THREE.CylinderGeometry(.035,.035,.38,8),steel,X,2.45,.45);meshIn(g,new THREE.CylinderGeometry(.16,.16,.08,20),white,X,2.68,.45);meshIn(g,new THREE.TorusGeometry(.14,.018,6,20),red,X,2.68,.50)}
 registerEquipment(tag,'Skid de pasteurización continua',g,3.25);return g;
}
function makeFilter(tag,x,z){
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 meshIn(g,new THREE.BoxGeometry(1.7,.16,1.45),darkSteel,0,.18,0);
 for(const sx of [-.58,.58])meshIn(g,new THREE.BoxGeometry(.12,1.0,.12),darkSteel,sx,.62,0);
 // Carcasa vertical y tapa bridada
 meshIn(g,new THREE.CylinderGeometry(.58,.58,1.55,32),steel,0,1.55,0);
 meshIn(g,new THREE.SphereGeometry(.58,24,12,0,Math.PI*2,0,Math.PI/2),steel,0,2.32,0);
 meshIn(g,new THREE.CylinderGeometry(.62,.62,.12,32),darkSteel,0,2.30,0);
 meshIn(g,new THREE.CylinderGeometry(.48,.48,.12,32),steel,0,.75,0);
 for(let i=0;i<12;i++){const a=i*Math.PI/6;meshIn(g,new THREE.CylinderGeometry(.035,.035,.22,8),yellow,Math.cos(a)*.60,2.30,Math.sin(a)*.60)}
 // Entrada/salida laterales, manómetro y purga
 meshIn(g,new THREE.CylinderGeometry(.16,.16,.62,20),steel,.58,1.55,0,0,0,Math.PI/2);flange(g,.91,1.55,0,'x',.24);
 meshIn(g,new THREE.CylinderGeometry(.16,.16,.62,20),blue,-.58,1.20,0,0,0,Math.PI/2);flange(g,-.91,1.20,0,'x',.24);
 meshIn(g,new THREE.CylinderGeometry(.045,.045,.34,10),steel,0,2.52,0);
 meshIn(g,new THREE.CylinderGeometry(.18,.18,.08,20),white,.20,2.78,0);
 meshIn(g,new THREE.TorusGeometry(.16,.018,6,20),red,.20,2.78,.045);
 registerEquipment(tag,'Filtro sanitario de línea',g,3.35);return g;
}
function makeHomogenizer(tag,x,z){
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 meshIn(g,new THREE.BoxGeometry(2.8,.18,1.65),darkSteel,0,.18,0);
 // Cuerpo de transmisión y motor horizontal
 meshIn(g,new THREE.BoxGeometry(1.15,1.0,1.0),steel,-.55,.85,0);
 meshIn(g,new THREE.CylinderGeometry(.42,.42,.95,24),blue,-.55,.85,0,0,0,Math.PI/2);
 for(let i=0;i<8;i++)meshIn(g,new THREE.CylinderGeometry(.44,.44,.045,20),darkSteel,-.95+i*.115,.85,0,0,0,Math.PI/2);
 // Bloque de alta presión y cabezal de válvulas
 meshIn(g,new THREE.BoxGeometry(.82,1.05,.95),darkSteel,.68,.88,0);
 meshIn(g,new THREE.BoxGeometry(.58,.72,.72),steel,.72,1.0,.12);
 for(const sx of [-.18,.18])for(const sz of [-.18,.18])meshIn(g,new THREE.CylinderGeometry(.07,.07,.28,12),yellow,.72,1.52,sz);
 // Manómetro de presión
 meshIn(g,new THREE.CylinderGeometry(.045,.045,.38,10),steel,.70,1.65,-.42);
 meshIn(g,new THREE.CylinderGeometry(.18,.18,.08,20),white,.70,1.87,-.42);
 meshIn(g,new THREE.TorusGeometry(.16,.018,6,20),red,.70,1.87,-.37);
 // Tubos de aspiración/descarga
 for(const sx of [-1,1]){meshIn(g,new THREE.CylinderGeometry(.13,.13,.55,16),steel,sx*1.22,.72,.48,Math.PI/2,0,0);flange(g,sx*1.48,.72,.48,'x',.22)}
 registerEquipment(tag,'Homogeneizador de alta presión',g,2.55);return g;
}
function makeSeparator(tag,x,z){
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 meshIn(g,new THREE.BoxGeometry(2.1,.18,1.8),darkSteel,0,.18,0);
 // Columna motriz y bowl cónico de alta velocidad
 meshIn(g,new THREE.CylinderGeometry(.62,.72,1.0,32),steel,0,.78,0);
 meshIn(g,new THREE.CylinderGeometry(.48,.62,.78,32),steel,0,1.58,0);
 meshIn(g,new THREE.ConeGeometry(.62,.72,32),darkSteel,0,2.30,0);
 meshIn(g,new THREE.CylinderGeometry(.50,.50,.20,32),steel,0,2.78,0);
 meshIn(g,new THREE.SphereGeometry(.50,24,12,0,Math.PI*2,0,Math.PI/2),steel,0,2.88,0);
 meshIn(g,new THREE.CylinderGeometry(.22,.22,.48,20),darkSteel,0,3.35,0);
 // Capota y salidas
 meshIn(g,new THREE.TorusGeometry(.58,.045,8,32),darkSteel,0,2.68,0,Math.PI/2);
 for(let i=0;i<3;i++){const a=i*Math.PI*2/3;meshIn(g,new THREE.CylinderGeometry(.10,.10,.55,14),blue,Math.cos(a)*.62,2.25,Math.sin(a)*.62,Math.PI/2,0,0)}
 for(const sx of [-.55,.55])meshIn(g,new THREE.BoxGeometry(.12,.75,.12),darkSteel,sx,.55,0);
 registerEquipment(tag,'Separador centrífugo de leche',g,4.0);return g;
}
function makePackager(tag,x,z){
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 // Bastidor de envasadora con transportador
 meshIn(g,new THREE.BoxGeometry(4.3,.18,1.5),darkSteel,0,.75,0);
 for(const sx of [-1.85,1.85])for(const sz of [-.52,.52])meshIn(g,new THREE.BoxGeometry(.13,1.25,.13),steel,sx,.62,sz);
 meshIn(g,new THREE.BoxGeometry(4.0,.12,1.12),steel,0,.88,0);
 // Banda transportadora y rodillos
 meshIn(g,new THREE.BoxGeometry(3.8,.08,.86),blue,0,.99,0);
 for(let i=0;i<13;i++)meshIn(g,new THREE.CylinderGeometry(.055,.055,.92,12),darkSteel,-1.75+i*.29,.92,0,Math.PI/2,0,0);
 // Puente superior y cabezales de llenado
 meshIn(g,new THREE.BoxGeometry(2.25,.14,.18),darkSteel,0,2.25,0);
 for(const xh of [-.72,0,.72]){
  meshIn(g,new THREE.CylinderGeometry(.09,.09,.78,16),steel,xh,1.78,0);
  meshIn(g,new THREE.ConeGeometry(.13,.22,16),darkSteel,xh,1.28,0,Math.PI);
  meshIn(g,new THREE.CylinderGeometry(.12,.12,.12,16),yellow,xh,2.20,0);
 }
 // Protecciones transparentes laterales
 const guard=new THREE.Mesh(new THREE.BoxGeometry(3.75,1.0,.05),glass);guard.position.set(0,1.52,.62);guard.castShadow=false;g.add(guard);
 // Panel de operación
 meshIn(g,new THREE.BoxGeometry(.62,1.0,.25),darkSteel,1.82,1.55,-.70);
 meshIn(g,new THREE.BoxGeometry(.40,.28,.04),blue,1.82,1.78,-.55);
 registerEquipment(tag,'Máquina envasadora con transportador',g,2.85);return g;
}
function makeValve(tag,x,y,z,axis='y'){
 const g=new THREE.Group();g.position.set(x,y,z);scene.add(g);
 // Cuerpo de válvula, uniones bridadas, vástago y volante
 const alongX=axis==='x';
 meshIn(g,new THREE.SphereGeometry(.24,20,14),red,0,0,0);
 meshIn(g,new THREE.CylinderGeometry(.19,.19,.36,20),steel,0,0,0,0,0,alongX?Math.PI/2:0);
 if(alongX){flange(g,-.27,0,0,'x',.25);flange(g,.27,0,0,'x',.25)}
 else{meshIn(g,new THREE.CylinderGeometry(.14,.14,.48,16),steel,0,-.28,0);meshIn(g,new THREE.CylinderGeometry(.14,.14,.48,16),steel,0,.28,0)}
 meshIn(g,new THREE.CylinderGeometry(.045,.045,.48,12),darkSteel,0,.38,0);
 meshIn(g,new THREE.CylinderGeometry(.065,.065,.10,12),yellow,0,.62,0);
 meshIn(g,new THREE.TorusGeometry(.28,.045,8,28),yellow,0,.90,0,Math.PI/2);
 for(let i=0;i<4;i++){const a=i*Math.PI/2;meshIn(g,new THREE.BoxGeometry(.07,.40,.07),yellow,Math.cos(a)*.25,.90,Math.sin(a)*.25)}
 registerEquipment(tag,'Válvula manual de volante',g,1.55);return g;
}
// ETAPA 5 · Planta generada desde el PFD guardado por el editor.
const pfd3dProjectId=localStorage.getItem('pfd3d-active-project')||'default';
let pfd3dModel=null;try{pfd3dModel=JSON.parse(localStorage.getItem('pfd3d-model-v1-'+pfd3dProjectId)||'null')}catch(e){console.warn('Modelo PFD 3D ilegible',e)}
const pfd3dEquipmentNodes=(pfd3dModel?.nodes||[]).filter(n=>['pump','tank','filter','heat','pasteurizer','homogenizer','separator','valve','packager'].includes(n.type));
const pfd3dPositions=new Map();const pfd3dPipeSegments=[];
if(pfd3dEquipmentNodes.length){
 const xs=pfd3dEquipmentNodes.map(n=>n.x),ys=pfd3dEquipmentNodes.map(n=>n.y),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 const mapX=x=>-30+(maxX===minX?30:(x-minX)/(maxX-minX)*60),mapZ=y=>-20+(maxY===minY?20:(y-minY)/(maxY-minY)*40);
 for(const n of pfd3dEquipmentNodes){const x=mapX(n.x+n.w/2),z=mapZ(n.y+n.h/2);pfd3dPositions.set(n.id,{x,z});const tag=n.tag||n.label||n.id;switch(n.type){
  case 'tank': makeTank(tag,x,z,.72);break;
  case 'pump': makePump(tag,x,z,0);break;
  case 'heat': makePlateHX(tag,x,z);break;
  case 'pasteurizer': makePasteurizer(tag,x,z);break;
  case 'valve': makeValve(tag,x,1.1,z,'y');break;
  case 'filter': makeFilter(tag,x,z);break;
  case 'homogenizer': makeHomogenizer(tag,x,z);break;
  case 'separator': makeSeparator(tag,x,z);break;
  case 'packager': makePackager(tag,x,z);break;
 }}
 // Títulos de sección del PFD: los nodos tipo texto se elevan como rótulos grandes en la planta.
 const pfd3dSectionNodes=(pfd3dModel?.nodes||[]).filter(n=>n.type==='text'&&String(n.label||'').trim());
 for(const n of pfd3dSectionNodes){const sx=mapX(n.x+(n.w||0)/2),sz=mapZ(n.y+(n.h||24)/2);addSectionLabel(n.label,sx,sz)}
 // Las líneas se trazan únicamente entre equipos consecutivos identificados en el grafo PFD.
 const nodeById=new Map((pfd3dModel.nodes||[]).map(n=>[n.id,n]));
 const equipmentTypes=new Set(['pump','tank','filter','heat','pasteurizer','homogenizer','separator','valve','packager']);
 const edgePairs=new Set();
 const adjacency=new Map();for(const e of (pfd3dModel.edges||[])){if(!adjacency.has(e.from))adjacency.set(e.from,[]);adjacency.get(e.from).push(e.to)}
 // Recorre nodos intermedios (válvulas, identificadores y corrientes) hasta hallar el siguiente equipo.
 for(const start of pfd3dEquipmentNodes){const queue=[...(adjacency.get(start.id)||[])],seen=new Set();while(queue.length){const id=queue.shift();if(seen.has(id))continue;seen.add(id);if(pfd3dPositions.has(id)){const key=[start.id,id].sort().join('|');if(!edgePairs.has(key)){edgePairs.add(key);const A=pfd3dPositions.get(start.id),B=pfd3dPositions.get(id);pfd3dPipeSegments.push([[A.x,1.15,A.z],[B.x,1.15,A.z],[B.x,1.15,B.z]])}continue}queue.push(...(adjacency.get(id)||[]))}}
 
 const sourceNodes=pfd3dEquipmentNodes.length;
 console.info(`[PFD 3D] Modelo ${pfd3dModel.projectName}: ${sourceNodes} equipos y ${edgePairs.size} conexiones directas representadas.`);
}else{
 console.warn('[PFD 3D] No se encontró un PFD con equipos. Se muestra la planta base de demostración.');
 makeTank('TK-101',-24,-12,1.0);makeTank('TK-102',-12,-12,.86);makePump('P-101',-18,-2,.15);makePlateHX('HX-101',-4,-9);makePasteurizer('PA-101',7,2);makePump('P-102',18,5,-.15);makeTank('TK-103',25,13,1.05);makeTank('TK-104',14,13,.82);
}
// ===== ETAPA 3 · FICHAS E INTERACCIÓN =====
const equipmentInfo={
 'TK-101':{description:'Tanque de almacenamiento inicial. Recibe la leche cruda antes de su transferencia al proceso.',fields:[['Servicio','Recepción / almacenamiento'],['Capacidad','Por definir'],['Temperatura','Variable de proceso pendiente'],['Presión','Atmosférica (referencial)'],['Material','Acero inoxidable'],['Estado','Disponible']],connections:'Entrada de leche · Conexión hacia P-101'},
 'TK-102':{description:'Tanque auxiliar de almacenamiento dentro de la zona inicial de la planta.',fields:[['Servicio','Almacenamiento'],['Capacidad','Por definir'],['Temperatura','Variable pendiente'],['Presión','Atmosférica (referencial)'],['Material','Acero inoxidable'],['Estado','Disponible']],connections:'Conexiones de proceso por definir'},
 'P-101':{description:'Bomba centrífuga para impulsar el fluido hacia las etapas de tratamiento.',fields:[['Servicio','Transferencia de producto'],['Tipo','Centrífuga'],['Caudal','Por definir'],['Potencia','Por definir'],['Material','Acero inoxidable'],['Estado','Disponible']],connections:'Succión desde almacenamiento · Descarga hacia HX-101'},
 'HX-101':{description:'Intercambiador de placas para transferencia de energía térmica entre corrientes.',fields:[['Servicio','Intercambio térmico'],['Tipo','Placas'],['Temperatura','Por definir'],['Área','Por definir'],['Material','Acero inoxidable'],['Estado','Disponible']],connections:'Corrientes térmicas/producto · Vinculación detallada pendiente'},
 'PA-101':{description:'Skid de pasteurización. Representa el conjunto de calentamiento, tubo de retención y control.',fields:[['Servicio','Pasteurización'],['Temperatura objetivo','Por definir'],['Tiempo de retención','Por definir'],['Tipo','Sistema continuo'],['Material','Acero inoxidable'],['Estado','Disponible']],connections:'Entrada desde HX-101 · Salida hacia bombeo / almacenamiento'},
 'P-102':{description:'Bomba centrífuga de transferencia posterior al tratamiento térmico.',fields:[['Servicio','Transferencia de producto'],['Tipo','Centrífuga'],['Caudal','Por definir'],['Potencia','Por definir'],['Material','Acero inoxidable'],['Estado','Disponible']],connections:'Descarga de PA-101 · Transferencia hacia TK-103'},
 'TK-103':{description:'Tanque de almacenamiento de producto a la salida del proceso.',fields:[['Servicio','Almacenamiento de producto'],['Capacidad','Por definir'],['Temperatura','Variable pendiente'],['Presión','Atmosférica (referencial)'],['Material','Acero inoxidable'],['Estado','Disponible']],connections:'Recepción desde P-102 · Conexión de salida'},
 'TK-104':{description:'Tanque auxiliar representado en la zona de salida de la planta.',fields:[['Servicio','Almacenamiento auxiliar'],['Capacidad','Por definir'],['Temperatura','Variable pendiente'],['Presión','Atmosférica (referencial)'],['Material','Acero inoxidable'],['Estado','Disponible']],connections:'Conexiones de proceso por definir'},
 'V-101':{description:'Válvula manual para aislamiento o regulación básica de una línea.',fields:[['Servicio','Aislamiento'],['Tipo','Manual'],['Posición','Por definir'],['Diámetro','Por definir'],['Material','Acero inoxidable'],['Estado','Disponible']],connections:'Línea de transferencia hacia HX-101'},
 'V-102':{description:'Válvula manual ubicada en el tramo de proceso térmico.',fields:[['Servicio','Aislamiento'],['Tipo','Manual'],['Posición','Por definir'],['Diámetro','Por definir'],['Material','Acero inoxidable'],['Estado','Disponible']],connections:'Línea próxima al skid PA-101'},
 'V-103':{description:'Válvula manual representada en la zona de transferencia de salida.',fields:[['Servicio','Aislamiento'],['Tipo','Manual'],['Posición','Por definir'],['Diámetro','Por definir'],['Material','Acero inoxidable'],['Estado','Disponible']],connections:'Línea hacia zona de almacenamiento'}
};
// Enlaza cada ficha 3D con los metadatos originales del nodo PFD.
const pfdNodeByTag=new Map((pfd3dModel?.nodes||[]).map(n=>[String(n.tag||n.label||n.id).trim(),n]));
const pfdConnectionsByTag=new Map();
if(pfd3dModel?.edges?.length){
 const nodeMap=new Map((pfd3dModel.nodes||[]).map(n=>[n.id,n]));
 for(const edge of pfd3dModel.edges){const a=nodeMap.get(edge.from),b=nodeMap.get(edge.to);if(!a||!b)continue;
  const ta=String(a.tag||a.label||a.id).trim(),tb=String(b.tag||b.label||b.id).trim();
  if(!pfdConnectionsByTag.has(ta))pfdConnectionsByTag.set(ta,new Set());if(!pfdConnectionsByTag.has(tb))pfdConnectionsByTag.set(tb,new Set());
  pfdConnectionsByTag.get(ta).add(tb);pfdConnectionsByTag.get(tb).add(ta);
 }
}
for(const item of equipment){item.pfdNode=pfdNodeByTag.get(String(item.tag).trim())||null;item.pfdConnections=[...(pfdConnectionsByTag.get(String(item.tag).trim())||[])];}
const promptEl=document.getElementById('interactPrompt'),promptTag=document.getElementById('promptTag'),panel=document.getElementById('equipmentPanel');let nearbyEquipment=null,panelOpen=false;
function findNearby(){let nearest=null,dist=Infinity;for(const item of equipment){const pos=item.group.position;const d=Math.hypot(player.position.x-pos.x,player.position.z-pos.z);if(d<dist){dist=d;nearest=item}}return dist<7.5?nearest:null}
function getNearbyDistance(item){return item?Math.hypot(player.position.x-item.group.position.x,player.position.z-item.group.position.z):Infinity}
function openEquipment(item){if(!item)return;panelOpen=true;promptEl.style.display='none';document.exitPointerLock?.();
 const n=item.pfdNode||{};const params=n.parameters&&typeof n.parameters==='object'?n.parameters:{};
 const base=equipmentInfo[item.tag]||{};const fields=base.fields?base.fields.slice():[['Tipo',item.type],['Código',item.tag],['Familia',n.family||'Por definir'],['Material','Por definir'],['Estado','Disponible']];
 // Los parámetros editados en el PFD prevalecen sobre los valores genéricos de la ficha.
 const extra=Object.entries(params).filter(([k,v])=>v!==null&&v!==undefined&&String(v).trim()!=='').map(([k,v])=>[k,String(v)]);
 for(const [k,v] of extra){const ix=fields.findIndex(f=>String(f[0]).toLowerCase()===String(k).toLowerCase());if(ix>=0)fields[ix]=[fields[ix][0],v];else fields.push([k,v]);}
 if(n.family&&!fields.some(f=>f[0]==='Familia'))fields.push(['Familia',n.family]);
 const connected=item.pfdConnections.length?item.pfdConnections.join(' · '):(base.connections||'Sin conexiones identificadas en el grafo PFD.');
 const description=n.description||base.description||'Equipo de la planta piloto. La ficha muestra los datos disponibles en el PFD.';
 document.getElementById('equipTag').textContent=item.tag;document.getElementById('equipType').textContent=item.type;document.getElementById('equipDescription').textContent=description;
 document.getElementById('equipGrid').innerHTML=fields.map(([k,v])=>`<div class="equip-field"><small>${k}</small><b>${v}</b></div>`).join('');document.getElementById('equipConnections').innerHTML='<strong>Conexiones PFD</strong><div>'+connected+'</div>';panel.style.display='block'}
function closeEquipment(){panelOpen=false;panel.style.display='none';keys.KeyE=false;renderer.domElement.requestPointerLock?.()}
document.getElementById('closeEquipment').addEventListener('click',closeEquipment);document.getElementById('interactButton').addEventListener('click',()=>{nearbyEquipment=findNearby();if(nearbyEquipment)openEquipment(nearbyEquipment)});

// Main pipe network, color-coded by conceptual service (not process data yet)
const coldPipe=mat('#5aa6dc',.35,.5),warmPipe=mat('#e16c49',.35,.45),neutralPipe=mat('#a6b7c2',.35,.55);
function route(points,r=.13,m=neutralPipe){for(let i=0;i<points.length-1;i++)pipe(points[i],points[i+1],r,m);}
if(typeof pfd3dPipeSegments!=='undefined')pfd3dPipeSegments.forEach(points=>route(points,.12,neutralPipe));
if(!pfd3dEquipmentNodes.length){
 route([[-13,3.8,-7],[-13,5,-7],[-7.5,5,-7],[-7.5,3.5,-7]],.14,coldPipe);
 route([[-13,1,-7],[-13,.8,-7],[-10,.8,-2],[-10,1.1,-2],[-5,1.1,-2],[-2,1.4,-5]],.16,coldPipe);
 route([[-2,2.6,-5],[-2,3.3,-5],[1,3.3,-5],[1,2.5,-5],[3,2.5,1]],.16,warmPipe);
 route([[3,1.4,1],[3,2.2,1],[6,2.2,1],[9,1.2,2]],.16,warmPipe);
 route([[9,1,2],[9,4,2],[12,4,2],[12,3.8,7]],.14,warmPipe);
 route([[12,1,7],[12,.8,7],[7,.8,7],[7,3.5,7]],.14,neutralPipe);
 makeValve('V-101',-8,1.15,-2,'y');makeValve('V-102',2,2.3,1,'y');makeValve('V-103',10,1.1,2,'y');
 for(let x=-12;x<=12;x+=4){box(.16,1.65,.16,darkSteel,x,.85,3);box(.55,.12,.55,darkSteel,x,1.7,3)}
}

// ===== ETAPA 4 · SIMULACIÓN VISUAL DEL PROCESO =====
const stage4UI=document.createElement('section');stage4UI.id='stage4Panel';stage4UI.innerHTML=`<div class="s4-head"><span class="s4-dot" id="s4Dot"></span><div><b>PROCESO EN VIVO</b><small>SIMULACIÓN CONCEPTUAL</small></div></div><div class="s4-stats"><div><small>Temperatura producto</small><strong id="s4Temp">4.0 °C</strong></div><div><small>Caudal simulado</small><strong id="s4Flow">0.0 L/s</strong></div><div><small>Retención</small><strong id="s4Hold">0 s</strong></div><div><small>Estado</small><strong id="s4State">DETENIDO</strong></div></div><div class="s4-tempbar"><span id="s4TempFill"></span></div><div class="s4-actions"><button id="s4Start">▶ Iniciar proceso</button><button id="s4Stop" disabled>■ Detener</button><button id="s4Reset">↺ Reiniciar</button></div><div class="s4-legend"><i class="cold"></i> Frío <i class="hot"></i> Caliente <i class="neutral"></i> Transferencia</div><p class="s4-note">Valores ilustrativos; no representan instrumentación real ni validación sanitaria.</p>`;document.body.appendChild(stage4UI);
const s4={running:false,elapsed:0,temp:4,flow:0,hold:0,particles:[],last:performance.now()};
const s4Paths=(pfd3dPipeSegments.length?pfd3dPipeSegments.map(seg=>seg.map(point=>point.slice())):[
 [[-13,1.05,-7],[-10,.85,-2],[-5,1.1,-2],[-2,1.4,-5]],
 [[-2,2.65,-5],[-2,3.3,-5],[1,3.3,-5],[1,2.5,-5],[3,2.5,1]],
 [[3,1.45,1],[3,2.2,1],[6,2.2,1],[9,1.25,2]],
 [[9,1.05,2],[9,4,2],[12,4,2],[12,3.8,7]]
]);
function s4PointAt(path,t){let lens=[],total=0;for(let i=0;i<path.length-1;i++){let a=new THREE.Vector3(...path[i]),b=new THREE.Vector3(...path[i+1]),l=a.distanceTo(b);lens.push(l);total+=l}let d=((t%1)+1)%1*total;for(let i=0;i<lens.length;i++){if(d<=lens[i])return new THREE.Vector3(...path[i]).lerp(new THREE.Vector3(...path[i+1]),d/lens[i]);d-=lens[i]}return new THREE.Vector3(...path.at(-1))}
const s4Mats=[mat('#45a6e8',.25,.25),mat('#ff7547',.25,.25),mat('#f0a13b',.25,.25),mat('#42c98b',.25,.25)];
s4Paths.forEach((path,idx)=>{for(let i=0;i<5;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.065,8,6),s4Mats[idx]);m.position.copy(s4PointAt(path,i/9));m.visible=false;scene.add(m);s4.particles.push({mesh:m,path,offset:i/9,idx})}});
function s4SetRunning(on){s4.running=on;s4.last=performance.now();document.getElementById('s4Start').disabled=on;document.getElementById('s4Stop').disabled=!on;document.getElementById('s4Dot').classList.toggle('active',on);document.getElementById('s4State').textContent=on?'OPERANDO':'DETENIDO';s4.particles.forEach(p=>p.mesh.visible=on)}
document.getElementById('s4Start').onclick=()=>s4SetRunning(true);document.getElementById('s4Stop').onclick=()=>s4SetRunning(false);document.getElementById('s4Reset').onclick=()=>{s4SetRunning(false);s4.elapsed=0;s4.temp=4;s4.flow=0;s4.hold=0;};
function s4Update(now){let dt=Math.min((now-s4.last)/1000,.05);s4.last=now;if(s4.running){s4.elapsed+=dt;s4.flow=1.8;const cycle=(s4.elapsed%50)/50;s4.temp=cycle<.25?4+cycle*272:cycle<.5?72:cycle<.75?72-(cycle-.5)*272:4;s4.hold=cycle>=.25&&cycle<.5?(cycle-.25)*40:0;for(const p of s4.particles){p.mesh.position.copy(s4PointAt(p.path,(s4.elapsed*.12+p.offset)%1))}}
 document.getElementById('s4Temp').textContent=s4.temp.toFixed(1)+' °C';document.getElementById('s4Flow').textContent=s4.flow.toFixed(1)+' L/s';document.getElementById('s4Hold').textContent=s4.hold.toFixed(1)+' s';document.getElementById('s4TempFill').style.width=Math.max(0,Math.min(100,s4.temp/80*100))+'%';document.getElementById('s4TempFill').style.background=s4.temp>55?'linear-gradient(90deg,#fb923c,#ef4444)':'linear-gradient(90deg,#38bdf8,#60a5fa)';}

// Simple low-poly player
const player=new THREE.Group();const body=new THREE.Mesh(new THREE.CapsuleGeometry(.35,.65,4,8),blue);body.position.y=1.05;body.castShadow=true;player.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(.27,10,8),mat('#d9a47c'));head.position.y=1.65;player.add(head);const helmet=new THREE.Mesh(new THREE.SphereGeometry(.3,10,6,0,Math.PI*2,0,Math.PI/2),yellow);helmet.position.y=1.82;player.add(helmet);const legs=[];const originalPlayerLegs=[];for(let s of [-1,1]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.2,.55,.22),darkSteel);leg.position.set(s*.15,.38,0);player.add(leg);legs.push(leg);originalPlayerLegs.push(leg)}player.position.set(-32,0,22);scene.add(player);

// Avatar MILKLAB: modelo humanoide 3D aislado con fallback seguro.
// Si alguna geometría falla, el operador original permanece visible y el motor continúa.
const avatarArms=[];
try{
  const avatar=new THREE.Group();
  const aMat=(c,r=.78,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
  const skin=aMat('#bd805f'), skinLight=aMat('#d99a76'), skinShade=aMat('#925c49');
  const hair=aMat('#211b1a'), hairLight=aMat('#3a2b27'), beard=aMat('#302321');
  const shirt=aMat('#173d68'), shirtHi=aMat('#285b87'), pants=aMat('#263746'), shoes=aMat('#202a32');
  const eye=aMat('#fff4e8',.3), iris=aMat('#68452f',.35), pupil=aMat('#17191d',.2), brow=aMat('#30231f');
  const addMesh=(geo,material,pos,scale,rotation)=>{
    const mesh=new THREE.Mesh(geo,material);
    mesh.position.set(pos[0],pos[1],pos[2]);
    if(scale)mesh.scale.set(scale[0],scale[1],scale[2]);
    if(rotation)mesh.rotation.set(rotation[0],rotation[1],rotation[2]);
    mesh.castShadow=true;mesh.receiveShadow=true;avatar.add(mesh);return mesh;
  };
  const addCapsule=(parent,radius,length,material,pos)=>{
    const mesh=new THREE.Mesh(new THREE.CapsuleGeometry(radius,length,4,10),material);
    mesh.position.set(pos[0],pos[1],pos[2]);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
  };
  // Piernas articuladas
  for(const side of [-1,1]){
    const legPivot=new THREE.Group();legPivot.position.set(side*.18,.82,0);avatar.add(legPivot);
    addCapsule(legPivot,.105,.43,pants,[0,-.28,0]);
    const knee=new THREE.Mesh(new THREE.SphereGeometry(.108,14,10),pants);knee.position.set(0,-.08,0);legPivot.add(knee);
    const shoe=new THREE.Mesh(new THREE.BoxGeometry(.23,.13,.36),shoes);shoe.position.set(0,-.59,.075);shoe.castShadow=true;legPivot.add(shoe);
    legs.push(legPivot);
    // Brazos articulados
    const armPivot=new THREE.Group();armPivot.position.set(side*.37,1.42,0);avatar.add(armPivot);
    const sleeve=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),shirt);sleeve.position.set(side*.015,-.16,0);sleeve.scale.set(.145,.25,.155);armPivot.add(sleeve);
    addCapsule(armPivot,.09,.25,skinLight,[side*.02,-.46,.015]);
    const hand=new THREE.Mesh(new THREE.SphereGeometry(.095,14,10),skinLight);hand.position.set(side*.02,-.59,.02);armPivot.add(hand);
    avatarArms.push(armPivot);
  }
  // Torso y cuello
  addCapsule(avatar,.32,.52,shirt,[0,1.24,0]);
  addMesh(new THREE.SphereGeometry(1,20,16),shirt,[0,1.37,0],[.36,.36,.235]);
  addMesh(new THREE.CylinderGeometry(.105,.12,.13,16),skinLight,[0,1.68,0]);
  // Cabeza, orejas y cara
  addMesh(new THREE.SphereGeometry(1,24,20),skinLight,[0,1.98,.015],[.285,.35,.255]);
  for(const side of [-1,1]){
    addMesh(new THREE.SphereGeometry(1,14,12),skin,[side*.28,1.99,0],[.065,.09,.065]);
    addMesh(new THREE.SphereGeometry(1,16,12),eye,[side*.105,2.035,.235],[.061,.078,.034]);
    addMesh(new THREE.SphereGeometry(1,14,10),iris,[side*.105,2.03,.266],[.034,.047,.017]);
    addMesh(new THREE.SphereGeometry(1,12,10),pupil,[side*.105,2.03,.279],[.017,.029,.01]);
    addMesh(new THREE.SphereGeometry(1,8,8),eye,[side*.115,2.05,.289],[.008,.011,.005]);
    addMesh(new THREE.SphereGeometry(1,12,8),brow,[side*.105,2.14,.235],[.078,.021,.03],[0,0,side*-.1]);
  }
  addMesh(new THREE.SphereGeometry(1,14,12),skin,[0,1.98,.27],[.05,.075,.055]);
  addMesh(new THREE.SphereGeometry(1,12,10),skinLight,[0,1.95,.30],[.04,.03,.025]);
  // Barba y bigote
  addMesh(new THREE.SphereGeometry(1,20,14),beard,[0,1.79,.10],[.23,.13,.18]);
  addMesh(new THREE.SphereGeometry(1,16,10),beard,[0,1.875,.205],[.17,.055,.065]);
  // Sonrisa sutil
  addMesh(new THREE.TorusGeometry(.047,.008,6,16),skinShade,[0,1.89,.252],[1,1,1],[0,0,Math.PI]);
  // Cabello con volumen y copete
  addMesh(new THREE.SphereGeometry(1,20,14),hair,[0,2.22,-.005],[.29,.18,.255]);
  addMesh(new THREE.SphereGeometry(1,16,10),hairLight,[-.12,2.29,.11],[.13,.07,.13]);
  addMesh(new THREE.SphereGeometry(1,16,10),hair,[.10,2.30,.12],[.14,.07,.12]);
  addMesh(new THREE.SphereGeometry(1,14,10),hairLight,[.015,2.35,.055],[.10,.05,.09]);
  // Distintivo discreto en el pecho
  addMesh(new THREE.BoxGeometry(.095,.12,.018),shirtHi,[.18,1.38,.225]);
  addMesh(new THREE.SphereGeometry(.025,10,8),aMat('#f2a0a0',.45),[.18,1.41,.24],[.8,1.2,.4]);
  // Solo sustituir el modelo básico cuando toda la geometría nueva se construyó correctamente.
  player.add(avatar);
  body.visible=false;head.visible=false;helmet.visible=false;
  for(let i=0;i<2;i++){/* las piernas básicas son los dos primeros hijos después de body/head/helmet */ }
  // Ocultar las piernas originales guardadas antes de añadir las nuevas.
  for(const oldLeg of originalPlayerLegs)oldLeg.visible=false;
}catch(avatarError){
  console.warn('MILKLAB avatar detallado no disponible; se conserva el operador original.',avatarError);
}

// Camera follow and keyboard controls
let yaw=Math.PI,pitch=-.18,locked=false,flightMode=false,creativeMode=false;const keys={};let velY=0,onGround=true;const flightBtn=document.getElementById('flightToggle');const start=document.querySelector('#startBtn'),enter=document.querySelector('#enterBtn'),loading=document.querySelector('#loading'),game=document.querySelector('#game'),toast=document.querySelector('#toast');game.style.display='block';enter.addEventListener('click',()=>{loading.style.display='none';renderer.domElement.requestPointerLock?.();toast.style.display='block';setTimeout(()=>toast.style.display='none',4500)});start.addEventListener('click',()=>{renderer.domElement.requestPointerLock?.()});
flightBtn?.addEventListener('click',()=>{flightMode=!flightMode;if(flightMode){creativeMode=false;player.visible=false;document.exitPointerLock?.();camera.position.set(0,48,.01);camera.lookAt(0,0,0);toast.textContent='Vista aérea · WASD desplaza la cámara · SHIFT acelera';}else{player.visible=true;toast.textContent=creativeMode?'Vuelo creativo activado · F para salir':'Exploración a nivel del suelo';}flightBtn.textContent=flightMode?'✕ Salir de vista aérea':'✈ Vista aérea';flightBtn.classList.toggle('active',flightMode);toast.style.display='block';setTimeout(()=>toast.style.display='none',2600)});renderer.domElement.addEventListener('click',()=>{if(game.style.display!=='none')renderer.domElement.requestPointerLock?.()});document.addEventListener('pointerlockchange',()=>locked=document.pointerLockElement===renderer.domElement);document.addEventListener('mousemove',e=>{if(!locked)return;yaw-=e.movementX*.0023;pitch-=e.movementY*.002;pitch=Math.max(-.65,Math.min(.35,pitch))});function toggleCreativeFlight(){if(panelOpen)return;creativeMode=!creativeMode;flightMode=false;player.visible=true;velY=0;onGround=false;flightBtn.textContent='✈ Vista aérea';flightBtn.classList.remove('active');if(creativeMode){toast.textContent='MODO CREATIVO ACTIVADO · WASD volar · SPACE subir · CTRL bajar · SHIFT acelerar · F salir';}else{player.position.y=Math.max(0,player.position.y);onGround=player.position.y===0;toast.textContent='Modo creativo desactivado';}toast.style.display='block';clearTimeout(window.__flightToastTimer);window.__flightToastTimer=setTimeout(()=>toast.style.display='none',3500);}
document.addEventListener('keydown',e=>{const key=(e.key||'').toLowerCase();if(e.code==='Escape'&&panelOpen){closeEquipment();return}if((e.code==='KeyF'||key==='f')&&!e.repeat&&!panelOpen){e.preventDefault();toggleCreativeFlight();return}if((e.code==='KeyE'||key==='e')&&!panelOpen&&!creativeMode&&!flightMode){nearbyEquipment=findNearby();if(nearbyEquipment){e.preventDefault();openEquipment(nearbyEquipment);return}}keys[e.code]=true;if(['Space','ArrowUp','ArrowDown','ControlLeft','ControlRight'].includes(e.code))e.preventDefault()});document.addEventListener('keyup',e=>{keys[e.code]=false});window.addEventListener('blur',()=>{for(const k in keys)keys[k]=false});
const mobileBtns=document.querySelectorAll('#mobileControls button');mobileBtns.forEach(b=>{const k=b.dataset.key;const down=e=>{e.preventDefault();keys[k==='jump'?'Space':'Key'+k.toUpperCase()]=true};const up=e=>{e.preventDefault();keys[k==='jump'?'Space':'Key'+k.toUpperCase()]=false};b.addEventListener('pointerdown',down);b.addEventListener('pointerup',up);b.addEventListener('pointerleave',up)});
function animate(){requestAnimationFrame(animate);if(game.style.display!=='none'){if(!panelOpen){if(flightMode){const pan=(keys.KeyW?1:0)-(keys.KeyS?1:0),strafe=(keys.KeyD?1:0)-(keys.KeyA?1:0),flySpeed=(keys.ShiftLeft||keys.ShiftRight?34:20)*.016;camera.position.x+=strafe*flySpeed;camera.position.z-=pan*flySpeed;if(keys.Space)camera.position.y=Math.max(18,camera.position.y-18*.016);if(keys.ControlLeft||keys.ControlRight)camera.position.y=Math.min(75,camera.position.y+18*.016);camera.position.x=Math.max(-45,Math.min(45,camera.position.x));camera.position.z=Math.max(-38,Math.min(38,camera.position.z));camera.lookAt(camera.position.x,0,camera.position.z)}else if(creativeMode){const forward=(keys.KeyW?1:0)-(keys.KeyS?1:0),side=(keys.KeyA?1:0)-(keys.KeyD?1:0),vertical=(keys.Space?1:0)-((keys.ControlLeft||keys.ControlRight)?1:0),speed=(keys.ShiftLeft||keys.ShiftRight?24:11)*.016;const dir=new THREE.Vector3(Math.sin(yaw)*Math.cos(pitch),0,Math.cos(yaw)*Math.cos(pitch)).normalize();const right=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw)).normalize();player.position.addScaledVector(dir,forward*speed);player.position.addScaledVector(right,side*speed);player.position.y+=vertical*speed;player.position.x=Math.max(-43,Math.min(43,player.position.x));player.position.y=Math.max(0,Math.min(65,player.position.y));player.position.z=Math.max(-36,Math.min(36,player.position.z));player.rotation.y=yaw+Math.PI;const target=new THREE.Vector3(player.position.x,player.position.y+1.25,player.position.z);const camDir=new THREE.Vector3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch));camera.position.copy(target).add(camDir.multiplyScalar(-5.8));camera.position.y+=1.25;camera.lookAt(target)}else{const forward=(keys.KeyW?1:0)-(keys.KeyS?1:0),side=(keys.KeyA?1:0)-(keys.KeyD?1:0);const speed=keys.ShiftLeft||keys.ShiftRight?7.5:4.2;const dir=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw));const right=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw));player.position.addScaledVector(dir,forward*speed*.016);player.position.addScaledVector(right,side*speed*.016);player.position.x=Math.max(-33,Math.min(33,player.position.x));player.position.z=Math.max(-24,Math.min(24,player.position.z));player.rotation.y=yaw+Math.PI;if(keys.Space&&onGround){velY=6;onGround=false}velY-=16*.016;player.position.y+=velY*.016;if(player.position.y<=0){player.position.y=0;velY=0;onGround=true}const moving=forward||side;legs.forEach((l,i)=>{l.rotation.x=moving?Math.sin(Date.now()*.012+i*Math.PI)*.55:0});avatarArms.forEach((a,i)=>{a.rotation.x=moving?Math.sin(Date.now()*.012+(i+1)*Math.PI)*.32:0});const target=new THREE.Vector3(player.position.x,player.position.y+1.25,player.position.z);const camDir=new THREE.Vector3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch));camera.position.copy(target).add(camDir.multiplyScalar(-5.8));camera.position.y+=1.25;camera.lookAt(target)}}if(!flightMode)nearbyEquipment=findNearby();if(!flightMode&&!panelOpen&&nearbyEquipment){promptEl.style.display='block';promptTag.textContent=nearbyEquipment.tag+' · '+nearbyEquipment.type+' · '+getNearbyDistance(nearbyEquipment).toFixed(1)+' m'}else promptEl.style.display='none'}s4Update(performance.now());renderer.render(scene,camera)}animate();window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
