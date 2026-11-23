// ===== ETAPA 2 · EQUIPOS INDUSTRIALES (modelos low-poly) =====
const equipment=[];
function addLabel(text,x,y,z){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;const ctx=canvas.getContext('2d');
 ctx.fillStyle='rgba(9,25,42,.88)';ctx.beginPath();ctx.roundRect(12,12,488,104,22);ctx.fill();
 ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=4;ctx.stroke();ctx.fillStyle='#fff';ctx.font='bold 44px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,64);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false}));sprite.scale.set(3.6,.9,1);sprite.position.set(x,y,z);scene.add(sprite);return sprite;
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
// Equipment layout: almacenamiento → bombeo → tratamiento → salida
makeTank('TK-101',-13,-7,1.0);makeTank('TK-102',-7.5,-7,.86);makePump('P-101',-10,-2,.15);makePlateHX('HX-101',-2,-5);makePasteurizer('PA-101',3,1);makePump('P-102',9,2,-.15);makeTank('TK-103',12,7,1.05);makeTank('TK-104',7,7,.82);
// Main pipe network, color-coded by conceptual service (not process data yet)
const coldPipe=mat('#5aa6dc',.35,.5),warmPipe=mat('#e16c49',.35,.45),neutralPipe=mat('#a6b7c2',.35,.55);
function route(points,r=.13,m=neutralPipe){for(let i=0;i<points.length-1;i++)pipe(points[i],points[i+1],r,m);}
route([[-13,3.8,-7],[-13,5,-7],[-7.5,5,-7],[-7.5,3.5,-7]],.14,coldPipe);
route([[-13,1,-7],[-13,.8,-7],[-10,.8,-2],[-10,1.1,-2],[-5,1.1,-2],[-2,1.4,-5]],.16,coldPipe);
route([[-2,2.6,-5],[-2,3.3,-5],[1,3.3,-5],[1,2.5,-5],[3,2.5,1]],.16,warmPipe);
route([[3,1.4,1],[3,2.2,1],[6,2.2,1],[9,1.2,2]],.16,warmPipe);
route([[9,1,2],[9,4,2],[12,4,2],[12,3.8,7]],.14,warmPipe);
route([[12,1,7],[12,.8,7],[7,.8,7],[7,3.5,7]],.14,neutralPipe);
// small visible valves in key pipe segments
makeValve('V-101',-8,1.15,-2,'y');makeValve('V-102',2,2.3,1,'y');makeValve('V-103',10,1.1,2,'y');
// pipe bridges/supports
for(let x=-12;x<=12;x+=4){box(.16,1.65,.16,darkSteel,x,.85,3);box(.55,.12,.55,darkSteel,x,1.7,3)}
