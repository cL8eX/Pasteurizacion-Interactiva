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
function meshIn(group,geometry,material,x,y,z,rotX=0,rotY=0,rotZ=0){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.rotation.set(rotX,rotY,rotZ);m.castShadow=true;m.receiveShadow=true;group.add(m);return m;}
function makeTank(tag,x,z,scale=1,style='standard'){
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);const R=1.22*scale,H=3.5*scale;
 meshIn(g,new THREE.CylinderGeometry(R,R,H,20),steel,0,H/2+.18,0);
 meshIn(g,new THREE.SphereGeometry(R,20,10,0,Math.PI*2,0,Math.PI/2),steel,0,H+.18,0);
 meshIn(g,new THREE.CylinderGeometry(R*.98,R*.98,.14,20),darkSteel,0,H+.22,0);
 meshIn(g,new THREE.CylinderGeometry(R*.68,R*.68,.13,20),white,0,H+.32,0);
 meshIn(g,new THREE.CylinderGeometry(.14,.14,.65,12),steel,0,H+.58,0);
 // bottom cone / outlet
 meshIn(g,new THREE.ConeGeometry(R*.72,.65,20),steel,0,.15,0,Math.PI);
 meshIn(g,new THREE.CylinderGeometry(.16,.16,.5,12),darkSteel,0,-.15,0);
 // legs
 for(let i=0;i<4;i++){const a=Math.PI/4+i*Math.PI/2;meshIn(g,new THREE.BoxGeometry(.16,.8,.16),darkSteel,Math.cos(a)*R*.72,.36,Math.sin(a)*R*.72);meshIn(g,new THREE.BoxGeometry(.35,.08,.35),darkSteel,Math.cos(a)*R*.72,.06,Math.sin(a)*R*.72)}
 // sight glass and bands
 meshIn(g,new THREE.CylinderGeometry(.055,.055,H*.62,8),blue,R+.045,H*.43,0,0,0,Math.PI/2);
 for(let y of [.45,H*.55,H-.3])meshIn(g,new THREE.TorusGeometry(R,.045,6,20),darkSteel,0,y+.18,0,Math.PI/2);
 // manway and nozzle details
 meshIn(g,new THREE.CylinderGeometry(.28,.28,.12,16),darkSteel,R*.58,H*.65,0,Math.PI/2);
 meshIn(g,new THREE.CylinderGeometry(.12,.12,.45,10),steel,R*.58,H*.65,.35,Math.PI/2);
 const label=addLabel(tag,x,H+1.15,z);equipment.push({tag,type:'Tanque de almacenamiento',group:g,label});return g;
}
function makePump(tag,x,z,rot=0){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rot;scene.add(g);
 meshIn(g,new THREE.BoxGeometry(1.45,.68,.78),blue,0,.55,0);meshIn(g,new THREE.CylinderGeometry(.42,.42,.6,16),steel,.82,.58,0,0,0,Math.PI/2);meshIn(g,new THREE.SphereGeometry(.4,12,10),steel,1.18,.58,0);meshIn(g,new THREE.CylinderGeometry(.16,.16,.55,12),darkSteel,-.85,.58,0,0,0,Math.PI/2);meshIn(g,new THREE.BoxGeometry(1.8,.12,1),darkSteel,0,.15,0);
 // motor cooling ribs
 for(let i=0;i<5;i++)meshIn(g,new THREE.CylinderGeometry(.34,.34,.055,12),darkSteel,-.28+i*.16,.58,0,0,0,Math.PI/2);
 meshIn(g,new THREE.CylinderGeometry(.15,.15,.5,12),steel,.15,.95,0);
 addLabel(tag,x,1.9,z);equipment.push({tag,type:'Bomba centrífuga',group:g});return g;}
function makePlateHX(tag,x,z){const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 meshIn(g,new THREE.BoxGeometry(1.5,2.25,1.05),steel,0,1.45,0);meshIn(g,new THREE.BoxGeometry(1.7,2.45,.16),darkSteel,-.95,1.45,0);meshIn(g,new THREE.BoxGeometry(1.7,2.45,.16),darkSteel,.95,1.45,0);
 for(let i=0;i<11;i++){meshIn(g,new THREE.BoxGeometry(1.35,.055,.9),darkSteel,0,.48+i*.19,0);meshIn(g,new THREE.BoxGeometry(1.35,.035,.9),white,0,.52+i*.19,0)}
 for(let s of [-1,1])for(let y of [.65,2.25])meshIn(g,new THREE.CylinderGeometry(.14,.14,.45,12),blue,s*.8,y,.65,Math.PI/2);
 meshIn(g,new THREE.BoxGeometry(2.5,.18,1.5),darkSteel,0,.18,0);addLabel(tag,x,3.35,z);equipment.push({tag,type:'Intercambiador de placas',group:g});return g;}
function makePasteurizer(tag,x,z){const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 // skid frame
 for(let X of [-2,2])for(let Z of [-1,1])meshIn(g,new THREE.BoxGeometry(.18,.18,.18),darkSteel,X,.18,Z);
 meshIn(g,new THREE.BoxGeometry(4.6,.18,2.4),darkSteel,0,.18,0);
 // HX stack and holding tube
 meshIn(g,new THREE.BoxGeometry(1.35,2.1,1.15),steel,-1.15,1.35,0);for(let i=0;i<9;i++)meshIn(g,new THREE.BoxGeometry(1.22,.06,1.05),darkSteel,-1.15,.45+i*.2,0);
 meshIn(g,new THREE.CylinderGeometry(.2,.2,2.6,12),steel,.75,1.15,0,0,0,Math.PI/2);meshIn(g,new THREE.CylinderGeometry(.24,.24,.25,12),darkSteel,2.1,1.15,0,0,0,Math.PI/2);
 // control panel
 meshIn(g,new THREE.BoxGeometry(.65,1.15,.25),darkSteel,1.75,1.45,-.8);meshIn(g,new THREE.BoxGeometry(.45,.35,.05),blue,1.75,1.72,-.65);for(let i=0;i<3;i++)meshIn(g,new THREE.SphereGeometry(.07,8,8),i===0?green:i===1?yellow:red,1.75,1.25-i*.18,-.63);
 addLabel(tag,x,3.05,z);equipment.push({tag,type:'Pasteurizador / skid de proceso',group:g});return g;}
function makeValve(tag,x,y,z,axis='y'){const g=new THREE.Group();g.position.set(x,y,z);scene.add(g);meshIn(g,new THREE.CylinderGeometry(.22,.22,.38,12),red,0,0,0,axis==='x'?0:0,0,axis==='x'?Math.PI/2:0);meshIn(g,new THREE.SphereGeometry(.24,10,8),darkSteel,0,.28,0);meshIn(g,new THREE.CylinderGeometry(.055,.055,.48,8),steel,0,.55,0);meshIn(g,new THREE.TorusGeometry(.28,.055,8,16),yellow,0,.82,0,Math.PI/2);equipment.push({tag,type:'Válvula manual',group:g});}
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
  case 'filter': makePlateHX(tag,x,z);break;
  case 'homogenizer': makePasteurizer(tag,x,z);break;
  case 'separator': makeTank(tag,x,z,.8);break;
  case 'packager': makePasteurizer(tag,x,z);break;
 }}
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
const player=new THREE.Group();const body=new THREE.Mesh(new THREE.CapsuleGeometry(.35,.65,4,8),blue);body.position.y=1.05;body.castShadow=true;player.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(.27,10,8),mat('#d9a47c'));head.position.y=1.65;player.add(head);const helmet=new THREE.Mesh(new THREE.SphereGeometry(.3,10,6,0,Math.PI*2,0,Math.PI/2),yellow);helmet.position.y=1.82;player.add(helmet);const legs=[];for(let s of [-1,1]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.2,.55,.22),darkSteel);leg.position.set(s*.15,.38,0);player.add(leg);legs.push(leg)}player.position.set(-32,0,22);scene.add(player);
// Camera follow and keyboard controls
let yaw=Math.PI,pitch=-.18,locked=false;const keys={};let velY=0,onGround=true;const start=document.querySelector('#startBtn'),enter=document.querySelector('#enterBtn'),loading=document.querySelector('#loading'),game=document.querySelector('#game'),toast=document.querySelector('#toast');game.style.display='block';enter.addEventListener('click',()=>{loading.style.display='none';renderer.domElement.requestPointerLock?.();toast.style.display='block';setTimeout(()=>toast.style.display='none',4500)});start.addEventListener('click',()=>{renderer.domElement.requestPointerLock?.()});renderer.domElement.addEventListener('click',()=>{if(game.style.display!=='none')renderer.domElement.requestPointerLock?.()});document.addEventListener('pointerlockchange',()=>locked=document.pointerLockElement===renderer.domElement);document.addEventListener('mousemove',e=>{if(!locked)return;yaw-=e.movementX*.0023;pitch-=e.movementY*.002;pitch=Math.max(-.65,Math.min(.35,pitch))});document.addEventListener('keydown',e=>{if(e.code==='Escape'&&panelOpen){closeEquipment();return}if((e.code==='KeyE'||e.key?.toLowerCase()==='e')&&!panelOpen){nearbyEquipment=findNearby();if(nearbyEquipment){e.preventDefault();openEquipment(nearbyEquipment);return}}keys[e.code]=true;if(['Space','ArrowUp','ArrowDown'].includes(e.code))e.preventDefault()});document.addEventListener('keyup',e=>keys[e.code]=false);
const mobileBtns=document.querySelectorAll('#mobileControls button');mobileBtns.forEach(b=>{const k=b.dataset.key;const down=e=>{e.preventDefault();keys[k==='jump'?'Space':'Key'+k.toUpperCase()]=true};const up=e=>{e.preventDefault();keys[k==='jump'?'Space':'Key'+k.toUpperCase()]=false};b.addEventListener('pointerdown',down);b.addEventListener('pointerup',up);b.addEventListener('pointerleave',up)});
function animate(){requestAnimationFrame(animate);if(game.style.display!=='none'){if(!panelOpen){const forward=(keys.KeyW?1:0)-(keys.KeyS?1:0),side=(keys.KeyD?1:0)-(keys.KeyA?1:0);const speed=keys.ShiftLeft||keys.ShiftRight?7.5:4.2;const dir=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw));const right=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw));player.position.addScaledVector(dir,forward*speed*.016);player.position.addScaledVector(right,side*speed*.016);player.position.x=Math.max(-33,Math.min(33,player.position.x));player.position.z=Math.max(-24,Math.min(24,player.position.z));player.rotation.y=yaw+Math.PI; if(keys.Space&&onGround){velY=6;onGround=false}velY-=16*.016;player.position.y+=velY*.016;if(player.position.y<=0){player.position.y=0;velY=0;onGround=true}const moving=forward||side;legs.forEach((l,i)=>{l.rotation.x=moving?Math.sin(Date.now()*.012+i*Math.PI)*.55:0});const target=new THREE.Vector3(player.position.x,player.position.y+1.25,player.position.z);const camDir=new THREE.Vector3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch));camera.position.copy(target).add(camDir.multiplyScalar(-5.8));camera.position.y+=1.25;camera.lookAt(target)}nearbyEquipment=findNearby();if(!panelOpen&&nearbyEquipment){promptEl.style.display='block';promptTag.textContent=nearbyEquipment.tag+' · '+nearbyEquipment.type+' · '+getNearbyDistance(nearbyEquipment).toFixed(1)+' m'}else promptEl.style.display='none'}s4Update(performance.now());renderer.render(scene,camera)}animate();window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
