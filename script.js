const svg=document.querySelector("#diagram"),NS="http://www.w3.org/2000/svg",$=s=>document.querySelector(s);
const types={block:{label:"Bloque de proceso",symbol:"▰",w:170,h:78},tank:{label:"Tanque",symbol:"◉",w:100,h:105},pump:{label:"Bomba",symbol:"◖",w:92,h:80},heat:{label:"Intercambiador",symbol:"▤",w:118,h:90},valve:{label:"Válvula",symbol:"◇",w:74,h:54},sensor:{label:"Instrumento",symbol:"Ⓣ",w:70,h:62},cooler:{label:"Enfriador",symbol:"❄",w:110,h:88},filler:{label:"Envasadora",symbol:"▥",w:108,h:92}};
const paletteItems=[["block","Bloque"],["tank","Tanque"],["pump","Bomba"],["heat","Intercambiador"],["valve","Válvula"],["sensor","Instrumento"],["cooler","Enfriador"],["filler","Envasadora"]];
let mode="blocks",selectedId=null,selectedEdgeId=null,connectMode=false,connectFrom=null,drag=null,idCounter=10,nodes=[],edges=[];
let projectMetadata={university:"Universidad Libre",faculty:"Facultad de Ingeniería · Ingeniería Mecánica",title:"Proceso de Pasteurización",course:"",teacher:"",students:[""]};
const defaults=()=>[
{id:"n1",type:"block",x:25,y:55,title:"Recepción y calidad",subtitle:"Descarga · muestreo",tag:"OP-01",note:"Recepción de leche cruda, identificación del lote y análisis inicial antes de aprobar la descarga. Variables: volumen, temperatura y calidad."},
{id:"n2",type:"block",x:245,y:55,title:"Filtración",subtitle:"Retención de sólidos",tag:"OP-02",note:"Retiene impurezas sólidas. El tipo de filtro y su capacidad se definen según el caudal y las especificaciones de la planta."},
{id:"n3",type:"block",x:465,y:55,title:"Desaireación",subtitle:"Remoción de aire",tag:"OP-03",note:"Reduce el aire incorporado en la leche. Parámetros de operación por confirmar con el equipo seleccionado."},
{id:"n4",type:"tank",x:700,y:42,title:"Tanque de balance",subtitle:"Alimentación estable",tag:"TK-101",note:"Proporciona alimentación estable al proceso. Variables relevantes: nivel, caudal y temperatura."},
{id:"n5",type:"block",x:25,y:235,title:"Descremado",subtitle:"Separación de nata",tag:"OP-04",note:"Separación centrífuga de nata y leche; la estandarización de grasa depende del producto objetivo. Etapa configurable según la línea real."},
{id:"n6",type:"block",x:245,y:235,title:"Homogeneización",subtitle:"Reducción de glóbulos",tag:"OP-05",note:"Reduce el tamaño de los glóbulos de grasa para mejorar la estabilidad de la emulsión. Presión y caudal por definir según el equipo."},
{id:"n7",type:"heat",x:465,y:225,title:"Pasteurización",subtitle:"Tratamiento térmico",tag:"HT-101",note:"Etapa crítica de tiempo-temperatura. Como referencia normativa colombiana, verificar condiciones aplicables al producto y al equipo; no operar con valores sin validación."},
{id:"n8",type:"heat",x:700,y:225,title:"Recuperación de calor",subtitle:"Intercambio térmico",tag:"E-102",note:"En una configuración HTST regenerativa, la leche pasteurizada transfiere calor a la leche entrante. La configuración exacta debe validarse en el diseño."},
{id:"n9",type:"cooler",x:25,y:415,title:"Enfriamiento",subtitle:"Descenso de temperatura",tag:"E-103",note:"Enfriamiento posterior al tratamiento térmico hasta la temperatura de conservación definida para el producto."},
{id:"n10",type:"tank",x:285,y:405,title:"Tanque de leche pasteurizada",subtitle:"Almacenamiento higiénico",tag:"TK-102",note:"Almacenamiento protegido a temperatura controlada antes del envasado. Variables: nivel, temperatura y tiempo de permanencia."},
{id:"n11",type:"filler",x:565,y:410,title:"Envasado y despacho",subtitle:"Producto terminado",tag:"PK-101",note:"Llenado y cierre higiénico del envase; posteriormente, almacenamiento refrigerado y distribución."}
];
const initialEdges=()=>[["n1","n2","Leche cruda","process"],["n2","n3","Leche filtrada","process"],["n3","n4","Leche desaireada","process"],["n4","n5","Alimentación","process"],["n5","n6","Leche estandarizada","process"],["n6","n7","Leche homogeneizada","process"],["n7","n8","Leche tratada","process"],["n8","n9","Leche caliente","process"],["n9","n10","Leche enfriada","process"],["n10","n11","Leche pasteurizada","process"]].map(([from,to,label,type],i)=>({id:"e"+(i+1),from,to,label,type}));
function el(tag,attrs={},parent=svg){const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));parent.appendChild(e);return e;}
function txt(parent,x,y,content,cls,anchor="middle"){const t=el("text",{x,y,"text-anchor":anchor,class:cls},parent);t.textContent=content;return t;}
function wrapSvgText(parent,x,y,content,cls,maxChars,anchor="middle",lineHeight=13,maxLines=2){
 const words=String(content??"").trim().split(/\s+/).filter(Boolean), lines=[];let line="";
 for(const word of words){const test=line?line+" "+word:word;if(test.length>maxChars&&line){lines.push(line);line=word}else line=test}
 if(line)lines.push(line);
 if(lines.length>maxLines){const kept=lines.slice(0,maxLines);kept[maxLines-1]=kept[maxLines-1].replace(/[.,;:]?$/,"")+"…";lines.length=0;lines.push(...kept)}
 const t=el("text",{x,y,"text-anchor":anchor,class:cls},parent);
 const start=y-((lines.length-1)*lineHeight)/2;
 lines.forEach((line,i)=>{const span=el("tspan",{x, y:start+i*lineHeight},t);span.textContent=line});
 return t;
}
function nodeById(id){return nodes.find(n=>n.id===id)}function edgeById(id){return edges.find(e=>e.id===id)}function dim(n){return types[n.type]||types.block}
function center(n){const d=dim(n);return{x:n.x+d.w/2,y:n.y+d.h/2}}
function notify(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(notify.timer);notify.timer=setTimeout(()=>t.classList.remove("show"),2300)}
function renderPalette(){$("#palette").innerHTML="";paletteItems.forEach(([type,label])=>{const b=document.createElement("button");b.className="palette-item";b.type="button";b.innerHTML=`<span class="sym">${types[type].symbol}</span><span>${label}</span>`;b.onclick=()=>addNode(type);$("#palette").appendChild(b)})}
function addNode(type){const d=types[type],count=nodes.length,id="n"+(++idCounter);nodes.push({id,type,x:70+(count%4)*220,y:140+Math.floor(count/4)*160,title:d.label,subtitle:"Editar descripción",tag:id.toUpperCase(),note:"Añade aquí la función del equipo y sus parámetros de diseño."});selectedId=id;selectedEdgeId=null;render();fillInspector();markUnsaved();notify("Elemento añadido")}
function edgePoints(a,b){const ca=center(a),cb=center(b),dx=cb.x-ca.x,dy=cb.y-ca.y;let x1=ca.x,y1=ca.y,x2=cb.x,y2=cb.y;
if(Math.abs(dx)>Math.abs(dy)){x1=ca.x+Math.sign(dx)*dim(a).w/2;x2=cb.x-Math.sign(dx)*dim(b).w/2}else{y1=ca.y+Math.sign(dy)*dim(a).h/2;y2=cb.y-Math.sign(dy)*dim(b).h/2}
if(Math.abs(dx)>Math.abs(dy)){const mid=(x1+x2)/2;return{x1,y1,x2,y2,d:`M ${x1} ${y1} L ${mid} ${y1} L ${mid} ${y2} L ${x2} ${y2}`,lx:mid,ly:(y1+y2)/2-8}}
const mid=(y1+y2)/2;return{x1,y1,x2,y2,d:`M ${x1} ${y1} L ${x1} ${mid} L ${x2} ${mid} L ${x2} ${y2}`,lx:(x1+x2)/2,ly:mid-8}}
function renderTagLegend(){
  const body=$("#tagLegendRows");
  if(!body) return;
  const meaningByPrefix={
    OP:tag=>`Operación ${tag.split("-")[1]||""}`.trim(),
    TK:tag=>`Tanque ${tag.split("-")[1]||""}`.trim(),
    E:tag=>`Intercambiador de calor ${tag.split("-")[1]||""}`.trim(),
    H:tag=>`Equipo de homogeneización ${tag.split("-")[1]||""}`.trim(),
    PK:tag=>`Equipo de envasado ${tag.split("-")[1]||""}`.trim(),
    HT:tag=>`Equipo de tratamiento térmico ${tag.split("-")[1]||""}`.trim()
  };
  body.replaceChildren();
  const seen=new Set();
  nodes.filter(n=>n.tag && String(n.tag).trim()).forEach(n=>{
    const code=String(n.tag).trim(); if(seen.has(code)) return; seen.add(code);
    const prefix=(code.match(/^[A-Za-z]+/)||[""])[0].toUpperCase();
    let meaning=meaningByPrefix[prefix] ? meaningByPrefix[prefix](code) : `Identificador de ${n.title||"equipo"}`;
    if(prefix==="OP") meaning=`Operación ${code.split("-")[1]||""}`.trim();
    const tr=document.createElement("tr");
    [code,n.title||"Sin nombre",meaning].forEach((value,index)=>{
      const cell=document.createElement(index===0?"th":"td");
      if(index===0) cell.scope="row";
      cell.textContent=value; tr.appendChild(cell);
    });
    body.appendChild(tr);
  });
}
function render(){
 svg.innerHTML="";const defs=el("defs");const grad=el("linearGradient",{id:"nodeGradient",x1:"0",y1:"0",x2:"1",y2:"1"},defs);el("stop",{offset:"0%","stop-color":"#193448"},grad);el("stop",{offset:"100%","stop-color":"#102330"},grad);const marker=el("marker",{id:"arrow",markerWidth:10,markerHeight:10,refX:8,refY:3,orient:"auto",markerUnits:"strokeWidth"},defs);el("path",{d:"M0,0 L0,6 L9,3 z",fill:"#7ddbd0"},marker);
 const eg=el("g",{"aria-label":"Conexiones"});edges.forEach(e=>{const a=nodeById(e.from),b=nodeById(e.to);if(!a||!b)return;const p=edgePoints(a,b),g=el("g",{class:`edge-group${selectedEdgeId===e.id?" selected":""}`},eg);el("path",{d:p.d,class:`edge ${e.type||"process"}`},g);if(e.label)txt(g,p.lx,p.ly,e.label,"edge-label");const hit=el("path",{d:p.d,class:"edge-hit"},g);hit.addEventListener("click",ev=>{ev.stopPropagation();selectedEdgeId=e.id;selectedId=null;render();fillInspector()})});
 const ng=el("g",{"aria-label":"Equipos y operaciones"});nodes.forEach(n=>drawNode(ng,n));svg.classList.toggle("connect-mode",connectMode);$("#elementCount").textContent=`${nodes.length} elementos · ${edges.length} conexiones`;$("#canvasTitle").textContent=mode==="blocks"?"Diagrama de bloques del proceso":mode==="pfd"?"Diagrama de flujo de proceso (PFD)":"Tuberías e instrumentación (P&ID)";renderTagLegend();
}
function drawNode(parent,n){
 const d=dim(n),g=el("g",{class:`node${selectedId===n.id?" selected":""}`,transform:`translate(${n.x},${n.y})`,tabindex:0,role:"button","aria-label":n.title},parent);
 if(selectedId===n.id)el("rect",{x:-5,y:-5,width:d.w+10,height:d.h+10,rx:10,class:"selection-ring"},g);
 if(mode==="blocks"){
   el("rect",{x:0,y:0,width:d.w,height:d.h,rx:12,class:"shape"},g);
   el("rect",{x:0,y:0,width:5,height:d.h,rx:2,fill:"#63d8bd"},g);
   if(n.logo){
     el("rect",{x:11,y:19,width:40,height:40,rx:8,class:"node-logo-bg"},g);
     el("image",{x:14,y:22,width:34,height:34,href:n.logo,preserveAspectRatio:"xMidYMid meet",class:"node-logo"},g);
     txt(g,61,d.h/2-12,n.title,"node-name","start");
     txt(g,61,d.h/2+5,n.subtitle,"node-sub","start");
     txt(g,61,d.h-9,n.tag,"node-tag","start");
   }else{
     const titleLines=String(n.title||"").trim().split(/\s+/).reduce((acc,w)=>{const last=acc[acc.length-1]||"";if((last?last.length+1:0)+w.length>Math.max(12,Math.floor((d.w-20)/7.2))&&last)acc.push(w);else acc[acc.length-1]=(last?last+" ":"")+w;return acc},[""]).filter(Boolean).length;
     const subLines=String(n.subtitle||"").trim().split(/\s+/).reduce((acc,w)=>{const last=acc[acc.length-1]||"";if((last?last.length+1:0)+w.length>Math.max(15,Math.floor((d.w-18)/5.7))&&last)acc.push(w);else acc[acc.length-1]=(last?last+" ":"")+w;return acc},[""]).filter(Boolean).length;
     const titleY=d.h/2-(titleLines>1?16:8);
     wrapSvgText(g,d.w/2,titleY,n.title,"node-name",Math.max(12,Math.floor((d.w-20)/7.2)),"middle",13,2);
     wrapSvgText(g,d.w/2,d.h/2+(titleLines>1?10:10),n.subtitle,"node-sub",Math.max(15,Math.floor((d.w-18)/5.7)),"middle",11,2);
     txt(g,d.w/2,d.h-9,n.tag,"node-tag");
   }
 }else drawEquipment(g,n,d);
 g.addEventListener("click",ev=>{ev.stopPropagation();if(connectMode){if(!connectFrom){connectFrom=n.id;notify("Ahora selecciona el destino")}else if(connectFrom===n.id)notify("Selecciona un destino diferente");else{if(!edges.some(e=>e.from===connectFrom&&e.to===n.id))edges.push({id:"e"+(++idCounter),from:connectFrom,to:n.id,label:"",type:"process"});connectMode=false;connectFrom=null;$("#connectBtn").textContent="↗ Conectar";render();markUnsaved();notify("Conexión creada")};return}selectedId=n.id;selectedEdgeId=null;render();fillInspector()});
 g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectedId=n.id;selectedEdgeId=null;render();fillInspector()}});
 g.addEventListener("pointerdown",e=>{if(connectMode||e.button!==0)return;drag={id:n.id,startX:e.clientX,startY:e.clientY,originX:n.x,originY:n.y,moved:false};g.setPointerCapture(e.pointerId);});
 g.addEventListener("pointermove",e=>{if(!drag||drag.id!==n.id)return;const scale=svg.getBoundingClientRect().width/1100,dx=(e.clientX-drag.startX)/scale,dy=(e.clientY-drag.startY)/scale;if(Math.abs(dx)+Math.abs(dy)>3)drag.moved=true;if(drag.moved){n.x=Math.max(5,Math.min(1100-d.w-5,drag.originX+dx));n.y=Math.max(5,Math.min(620-d.h-5,drag.originY+dy));g.setAttribute("transform",`translate(${n.x},${n.y})`);renderEdgesOnly()}});
 g.addEventListener("pointerup",()=>{if(drag&&drag.id===n.id&&drag.moved){markUnsaved();fillInspector()}drag=null});
}
function drawEquipment(g,n,d){const s=el("g",{class:"equip-symbol"},g);
 if(n.type==="tank"){el("path",{d:`M ${d.w*.22} 14 Q ${d.w*.5} 2 ${d.w*.78} 14 L ${d.w*.78} ${d.h*.66} Q ${d.w*.5} ${d.h*.86} ${d.w*.22} ${d.h*.66} Z`},s);el("path",{d:`M ${d.w*.22} 25 Q ${d.w*.5} 38 ${d.w*.78} 25 M ${d.w*.5} 4 V -2`},s)}
 else if(n.type==="pump"){el("circle",{cx:d.w/2,cy:d.h*.38,r:22},s);el("path",{d:`M ${d.w/2-9} ${d.h*.38-12} L ${d.w/2+12} ${d.h*.38} L ${d.w/2-9} ${d.h*.38+12} Z M 6 ${d.h*.38} H ${d.w/2-22} M ${d.w/2+22} ${d.h*.38} H ${d.w-6}`},s)}
 else if(n.type==="heat"){el("rect",{x:10,y:7,width:d.w-20,height:d.h*.52,rx:4},s);for(let i=0;i<4;i++)el("path",{d:`M ${20+i*19} 13 l 12 ${d.h*.38} m -12 0 l 12 -${d.h*.38}`},s)}
 else if(n.type==="valve"){el("path",{d:`M 8 ${d.h/2-15} L ${d.w/2} ${d.h/2} L 8 ${d.h/2+15} Z M ${d.w-8} ${d.h/2-15} L ${d.w/2} ${d.h/2} L ${d.w-8} ${d.h/2+15} Z M ${d.w/2} ${d.h/2-1} V 5 M ${d.w/2-13} 5 H ${d.w/2+13}`},s)}
 else if(n.type==="sensor"){el("circle",{cx:d.w/2,cy:20,r:17},s);txt(s,d.w/2,24,n.tag.slice(0,2),"node-tag");el("path",{d:`M ${d.w/2} 37 V 48`},s)}
 else if(n.type==="cooler"){el("rect",{x:8,y:7,width:d.w-16,height:45,rx:5},s);for(let i=0;i<3;i++)el("path",{d:`M ${17+i*25} 13 l 12 32 m -12 0 l 12 -32`},s)}
 else if(n.type==="filler"){el("rect",{x:12,y:7,width:d.w-24,height:48,rx:4},s);for(let i=0;i<3;i++){el("path",{d:`M ${24+i*25} 0 V 18`},s);el("rect",{x:20+i*25,y:31,width:10,height:17,rx:2},s)}}
 txt(g,d.w/2,d.h-22,n.title,"node-name");txt(g,d.w/2,d.h-7,n.tag,"node-tag")}
function renderEdgesOnly(){// Keep selected object position live while recomputing all orthogonal paths.
 const active=drag&&nodeById(drag.id);if(!active)return;
 const eg=svg.querySelector('g[aria-label="Conexiones"]');if(!eg)return;
 eg.innerHTML="";edges.forEach(e=>{const a=nodeById(e.from),b=nodeById(e.to);if(!a||!b)return;const p=edgePoints(a,b),g=el("g",{class:`edge-group${selectedEdgeId===e.id?" selected":""}`},eg);el("path",{d:p.d,class:`edge ${e.type||"process"}`},g);if(e.label)txt(g,p.lx,p.ly,e.label,"edge-label");const hit=el("path",{d:p.d,class:"edge-hit"},g);hit.onclick=ev=>{ev.stopPropagation();selectedEdgeId=e.id;selectedId=null;render();fillInspector()}})}
function fillInspector(){
 const n=nodeById(selectedId),e=edgeById(selectedEdgeId),obj=n||e;
 $("#emptyInspector").classList.toggle("hidden",!!obj);$("#propertyForm").classList.toggle("hidden",!obj);if(!obj)return;
 const isEdge=!!e;
 $("#selectedType").textContent=isEdge?"CONEXIÓN / TUBERÍA":types[n.type].label.toUpperCase();
 $("#nodeFields").classList.toggle("hidden",isEdge);$("#edgeFields").classList.toggle("hidden",!isEdge);$("#logoEditor").classList.toggle("hidden",isEdge);$("#duplicateBtn").classList.toggle("hidden",isEdge);
 $("#propTitle").parentElement.classList.toggle("hidden",isEdge);$("#propSubtitle").parentElement.classList.toggle("hidden",isEdge);$("#propTag").parentElement.classList.toggle("hidden",isEdge);$("#propNote").parentElement.classList.toggle("hidden",isEdge);
 if(isEdge){$("#propEdgeLabel").value=e.label||"";$("#propEdgeType").value=e.type||"process";$("#propTitle").value="";$("#propSubtitle").value="";$("#propTag").value="";$("#propNote").value=""}
 else{
   $("#propTitle").value=n.title;$("#propSubtitle").value=n.subtitle;$("#propTag").value=n.tag;$("#propNote").value=n.note;$("#propX").value=Math.round(n.x);$("#propY").value=Math.round(n.y);
   const preview=$("#logoPreview"),empty=$("#logoEmpty"),remove=$("#removeLogoBtn");
   if(n.logo){preview.src=n.logo;preview.classList.remove("hidden");empty.classList.add("hidden");remove.classList.remove("hidden")}
   else{preview.removeAttribute("src");preview.classList.add("hidden");empty.classList.remove("hidden");remove.classList.add("hidden")}
   $("#propLogo").value="";
 }
}
$("#propertyForm").addEventListener("submit",e=>{e.preventDefault();if(selectedEdgeId){const edge=edgeById(selectedEdgeId);if(!edge)return;edge.label=$("#propEdgeLabel").value.trim();edge.type=$("#propEdgeType").value;render();fillInspector();markUnsaved();notify("Conexión actualizada");return}const n=nodeById(selectedId);if(!n)return;n.title=$("#propTitle").value.trim()||"Elemento";n.subtitle=$("#propSubtitle").value.trim();n.tag=$("#propTag").value.trim();n.note=$("#propNote").value.trim();n.x=Math.max(0,Math.min(1020,Number($("#propX").value)||0));n.y=Math.max(0,Math.min(560,Number($("#propY").value)||0));render();fillInspector();markUnsaved();notify("Propiedades actualizadas")});

$("#propLogo").addEventListener("change",async e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 if(!["image/png","image/jpeg","image/webp","image/svg+xml"].includes(file.type)){notify("Formato no compatible. Usa PNG, JPG, WEBP o SVG.");e.target.value="";return}
 if(file.size>1024*1024){notify("El logotipo supera 1 MB. Reduce el tamaño e inténtalo de nuevo.");e.target.value="";return}
 const reader=new FileReader();reader.onload=()=>{const n=nodeById(selectedId);if(!n)return;n.logo=String(reader.result);render();fillInspector();markUnsaved();notify("Logotipo actualizado. Pulsa Guardar para compartirlo")};reader.onerror=()=>notify("No se pudo leer la imagen");reader.readAsDataURL(file);
});
$("#removeLogoBtn").addEventListener("click",()=>{const n=nodeById(selectedId);if(!n)return;delete n.logo;render();fillInspector();markUnsaved();notify("Logotipo quitado")});
$("#duplicateBtn").addEventListener("click",()=>{const n=nodeById(selectedId);if(!n)return;const copy={...n,id:"n"+(++idCounter),x:Math.min(930,n.x+35),y:Math.min(520,n.y+35),title:n.title+" (copia)",tag:"CP-"+idCounter};nodes.push(copy);selectedId=copy.id;selectedEdgeId=null;render();fillInspector();markUnsaved();notify("Elemento duplicado")});
$("#deleteBtn").addEventListener("click",deleteSelected);
function deleteSelected(){if(selectedEdgeId){edges=edges.filter(e=>e.id!==selectedEdgeId);selectedEdgeId=null;render();fillInspector();markUnsaved();notify("Conexión eliminada");return}if(!selectedId){notify("Selecciona un elemento o una conexión");return}nodes=nodes.filter(n=>n.id!==selectedId);edges=edges.filter(e=>e.from!==selectedId&&e.to!==selectedId);selectedId=null;render();fillInspector();markUnsaved();notify("Elemento eliminado")}
$("#connectBtn").addEventListener("click",()=>{connectMode=!connectMode;connectFrom=null;selectedId=null;selectedEdgeId=null;$("#connectBtn").textContent=connectMode?"Cancelar conexión":"↗ Conectar";svg.classList.toggle("connect-mode",connectMode);render();fillInspector();notify(connectMode?"Selecciona el origen y luego el destino":"Conexión cancelada")});
$("#diagramMode").addEventListener("change",e=>{mode=e.target.value;render();markUnsaved()});
$("#resetBtn").addEventListener("click",()=>{if(!confirm("¿Restablecer el diagrama de ejemplo? Se perderán los cambios no guardados."))return;nodes=defaults();edges=initialEdges();selectedId=null;selectedEdgeId=null;connectMode=false;render();fillInspector();markUnsaved();notify("Diagrama restaurado")});
svg.addEventListener("click",e=>{if(e.target===svg&&!connectMode){selectedId=null;selectedEdgeId=null;render();fillInspector()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&connectMode){connectMode=false;connectFrom=null;$("#connectBtn").textContent="↗ Conectar";render();notify("Conexión cancelada")}if((e.key==="Delete"||e.key==="Backspace")&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName))deleteSelected()});
function projectData(){return{app:"MILKLAB",version:3,mode,nodes,edges,metadata:projectMetadata}}
let remoteSaveInProgress=false;
let remoteChannel=null;
let hasUnsavedChanges=false;
let supabaseClient=null;
const remoteTable="milklab_diagram";
const remoteIdColumn="id";
const remoteDiagramColumn="diagram";
const remoteUpdatedColumn="updated_at";

function setSaveStatus(message,color){
  const status=$("#saveStatus");
  // El indicador visual es opcional; nunca debe interrumpir la sincronización.
  if(!status) return;
  status.textContent=message;
  status.style.color=color;
}
function markUnsaved(){
  hasUnsavedChanges=true;
  setSaveStatus("Cambios sin guardar","#e3c981");
}
function savedStatus(){
  hasUnsavedChanges=false;
  const now=new Date();
  const time=now.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"});
  setSaveStatus(supabaseClient?`Guardado en la nube · ${time}`:`Guardado localmente · ${time}`,"#b8f36b");
}
function applyProjectData(data){
  if(!data || data.app!=="MILKLAB" || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) return false;
  nodes=data.nodes;
  edges=data.edges.map((e,i)=>({...e,id:e.id||"e"+(i+1)}));
  mode="blocks";
  $("#diagramMode").value="blocks";
  if(data.metadata && typeof data.metadata==="object"){
    projectMetadata={...projectMetadata,...data.metadata,students:Array.isArray(data.metadata.students)?data.metadata.students:[""]};
    projectMetadata.students=projectMetadata.students.filter(v=>typeof v==="string");
    if(!projectMetadata.students.length)projectMetadata.students=[""];
  }
  renderProjectMetadata();
  idCounter=Math.max(10,...nodes.map(n=>Number(String(n.id).replace(/\D/g,""))||0),...edges.map(e=>Number(String(e.id).replace(/\D/g,""))||0));
  selectedId=null; selectedEdgeId=null;
  render(); fillInspector();
  return true;
}
function renderProjectMetadata(){
  const title=(projectMetadata.title||"Proceso de Pasteurización").trim();
  const university=(projectMetadata.university||"Universidad Libre").trim();
  const faculty=(projectMetadata.faculty||"Facultad de Ingeniería").trim();
  const course=(projectMetadata.course||"").trim();
  const teacher=(projectMetadata.teacher||"").trim();
  $("#brandTitle").innerHTML="";
  $("#brandTitle").append(document.createTextNode(title.toLocaleUpperCase("es-CO")));
  const small=document.createElement("small");small.textContent="EDITOR ACADÉMICO · DIAGRAMA DE BLOQUES";$("#brandTitle").append(small);
  document.title=`${title} | ${university}`;
  $("#sideUniversity").textContent=university||"Por definir";
  $("#sideFaculty").textContent=faculty||"Por definir";
  $("#sideCourse").textContent=course||"Por definir";
  $("#sideTeacher").textContent=teacher||"Por definir";
  const studentsHost=$("#sideStudents");studentsHost.innerHTML="";
  const students=(projectMetadata.students||[]).map(s=>String(s).trim()).filter(Boolean);
  if(!students.length){const empty=document.createElement("span");empty.textContent="Completar en Información del proyecto";studentsHost.append(empty)}
  else students.forEach((name,index)=>{const chip=document.createElement("span");chip.className="student-chip";chip.textContent=`${index+1}. ${name}`;studentsHost.append(chip)});
}

function renderStudentInputs(){
  const list=$("#studentList");list.innerHTML="";
  projectMetadata.students.forEach((student,index)=>{
    const row=document.createElement("div");row.className="student-row";
    const label=document.createElement("label");label.textContent=`Estudiante ${index+1}`;label.htmlFor=`student-${index}`;
    const input=document.createElement("input");input.id=`student-${index}`;input.maxLength=120;input.placeholder=`Nombre completo del estudiante ${index+1}`;input.value=student;
    input.addEventListener("input",()=>{projectMetadata.students[index]=input.value});
    const remove=document.createElement("button");remove.type="button";remove.className="remove-student";remove.textContent="Quitar";remove.disabled=projectMetadata.students.length===1;
    remove.addEventListener("click",()=>{projectMetadata.students.splice(index,1);renderStudentInputs()});
    row.append(label,input,remove);list.append(row);
  });
}
function openProjectInfo(){
  $("#metaUniversity").value=projectMetadata.university||"";$("#metaFaculty").value=projectMetadata.faculty||"";$("#metaTitle").value=projectMetadata.title||"";$("#metaCourse").value=projectMetadata.course||"";$("#metaTeacher").value=projectMetadata.teacher||"";
  renderStudentInputs();$("#projectInfoDialog").showModal();
}
$("#projectInfoBtn").addEventListener("click",openProjectInfo);
$("#editAcademicBtn").addEventListener("click",openProjectInfo);
$("#closeProjectInfo").addEventListener("click",()=>$("#projectInfoDialog").close());
$("#cancelProjectInfo").addEventListener("click",()=>$("#projectInfoDialog").close());
$("#addStudentBtn").addEventListener("click",()=>{if(projectMetadata.students.length>=20){notify("Puedes añadir hasta 20 estudiantes");return}projectMetadata.students.push("");renderStudentInputs()});
$("#projectInfoForm").addEventListener("submit",e=>{
  e.preventDefault();projectMetadata={university:$("#metaUniversity").value.trim()||"Universidad Libre",faculty:$("#metaFaculty").value.trim()||"Facultad de Ingeniería",title:$("#metaTitle").value.trim()||"Proceso de Pasteurización",course:$("#metaCourse").value.trim(),teacher:$("#metaTeacher").value.trim(),students:projectMetadata.students.map(s=>String(s).trim()).filter(Boolean)};
  if(!projectMetadata.students.length)projectMetadata.students=[""];
  renderProjectMetadata();markUnsaved();$("#projectInfoDialog").close();notify("Información actualizada. Pulsa Guardar para compartirla");
});
function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  const dark=theme!=="light";
  $("#darkThemeBtn").classList.toggle("active",dark);$("#lightThemeBtn").classList.toggle("active",!dark);
  $("#darkThemeBtn").setAttribute("aria-pressed",String(dark));$("#lightThemeBtn").setAttribute("aria-pressed",String(!dark));
  try{localStorage.setItem("milklab-theme",theme)}catch(e){}
}
$("#darkThemeBtn").addEventListener("click",()=>setTheme("dark"));
$("#lightThemeBtn").addEventListener("click",()=>setTheme("light"));
try{setTheme(localStorage.getItem("milklab-theme")||"dark")}catch(e){setTheme("dark")}

function initSupabase(){
  const url=window.MILKLAB_SUPABASE_URL;
  const key=window.MILKLAB_SUPABASE_KEY;
  if(!window.supabase || !url || !key || url.includes("PEGA_AQUI") || key.includes("PEGA_AQUI")){
    setSaveStatus("Modo local · falta configurar nube","#e3c981");
    return;
  }
  try{
    supabaseClient=window.supabase.createClient(url,key);
    loadCloudProject();
    remoteChannel=supabaseClient.channel("milklab-shared-diagram")
      .on("postgres_changes",{event:"UPDATE",schema:"public",table:remoteTable,filter:`${remoteIdColumn}=eq.1`},payload=>{
        if(hasUnsavedChanges || remoteSaveInProgress) return;
        const record=payload.new;
        if(record && record[remoteDiagramColumn] && applyProjectData(record[remoteDiagramColumn])){
          savedStatus();
          notify("Diagrama actualizado desde otro usuario");
        }
      })
      .on("postgres_changes",{event:"INSERT",schema:"public",table:remoteTable,filter:`${remoteIdColumn}=eq.1`},payload=>{
        if(hasUnsavedChanges || remoteSaveInProgress) return;
        const record=payload.new;
        if(record && record[remoteDiagramColumn] && applyProjectData(record[remoteDiagramColumn])){
          savedStatus();
          notify("Diagrama compartido cargado");
        }
      })
      .subscribe();
  }catch(err){
    console.error("No se pudo iniciar Supabase:",err);
    notify("No se pudo conectar con la nube");
  }
}
async function loadCloudProject(){
  try{
    const {data,error}=await supabaseClient.from(remoteTable)
      .select(`${remoteIdColumn},${remoteDiagramColumn}`)
      .eq(remoteIdColumn,1).maybeSingle();
    if(error) throw error;
    if(data && applyProjectData(data[remoteDiagramColumn])){
      savedStatus();
      notify("Proyecto cargado desde Supabase");
    } else {
      // Si la fila existe pero está vacía, no sobreescribirla automáticamente.
      notify("No se encontró un diagrama válido en la nube; se conserva el proyecto local");
    }
  }catch(err){
    console.error("Error cargando MILKLAB:",err);
    notify("Error al cargar nube; se conserva el proyecto local");
  }
}
$("#saveBtn").addEventListener("click",async()=>{
  const snapshot=JSON.parse(JSON.stringify(projectData()));
  try{
    localStorage.setItem("milklab-project",JSON.stringify(snapshot));
  }catch(e){}
  if(!supabaseClient){
    savedStatus();
    notify("Guardado localmente; configura Supabase para compartirlo");
    return;
  }
  remoteSaveInProgress=true;
  setSaveStatus("Guardando en la nube…","#e3c981");
  try{
    const row={
      [remoteIdColumn]:1,
      [remoteDiagramColumn]:snapshot,
      [remoteUpdatedColumn]:new Date().toISOString()
    };
    const {error}=await supabaseClient.from(remoteTable).upsert(row,{onConflict:remoteIdColumn});
    if(error) throw error;
    // Verify persistence by reading the row back before claiming cloud success.
    const {data:verified,error:verifyError}=await supabaseClient.from(remoteTable)
      .select(`${remoteIdColumn},${remoteDiagramColumn},${remoteUpdatedColumn}`)
      .eq(remoteIdColumn,1).maybeSingle();
    if(verifyError) throw verifyError;
    if(!verified || !verified[remoteDiagramColumn] || verified[remoteDiagramColumn].nodes?.length!==snapshot.nodes.length) {
      throw new Error("El guardado no se pudo verificar al volver a leer el diagrama");
    }
    savedStatus();
    notify("Proyecto guardado y verificado en la nube");
  }catch(err){
    console.error("Error guardando MILKLAB:",err);
    setSaveStatus("Error al guardar en nube","#f08b8b");
    notify("No se pudo guardar en Supabase; copia local conservada");
  }finally{
    remoteSaveInProgress=false;
  }
});
$("#exportBtn").addEventListener("click",()=>{const clone=svg.cloneNode(true);clone.setAttribute("xmlns",NS);clone.setAttribute("width","1100");clone.setAttribute("height","620");const style=el("style",{},clone);style.textContent=".edge{stroke:#7ddbd0;stroke-width:2.5;fill:none;marker-end:url(#arrow)}.edge.utility{stroke:#f1c879;stroke-dasharray:8 5}.edge.signal{stroke:#b7a0f2;stroke-dasharray:3 5}.edge-label{fill:#a8c6c1;font:10px monospace}.node .shape{fill:#17272b;stroke:#5a7778;stroke-width:2}.node text{fill:#edf4f2;font-family:Arial,sans-serif}.node .node-sub{fill:#a1b2b1}.node .node-tag{fill:#b8f36b}.equip-symbol{fill:none;stroke:#7ddbd0;stroke-width:2.5}";const blob=new Blob([new XMLSerializer().serializeToString(clone)],{type:"image/svg+xml;charset=utf-8"});downloadBlob(blob,`MILKLAB-${mode}.svg`);notify("Diagrama SVG exportado")});

$("#pdfBtn").addEventListener("click",()=>{
  // Print only the diagram, using the browser's built-in Save as PDF feature.
  const oldTitle=document.title;
  const oldSelected=selectedId, oldEdge=selectedEdgeId;
  selectedId=null;selectedEdgeId=null;render();
  document.title=`MILKLAB-${mode}-diagrama`;
  notify("En la ventana de impresión, selecciona “Guardar como PDF”");
  setTimeout(()=>window.print(),120);
  window.addEventListener("afterprint",function restorePrint(){
    document.title=oldTitle;selectedId=oldSelected;selectedEdgeId=oldEdge;render();fillInspector();
    window.removeEventListener("afterprint",restorePrint);
  });
});

function downloadBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}
renderPalette();
renderProjectMetadata();
try{
  const data=JSON.parse(localStorage.getItem("milklab-project")||"null");
  if(!applyProjectData(data)){nodes=defaults();edges=initialEdges();render();fillInspector();}
  else savedStatus();
}catch(e){nodes=defaults();edges=initialEdges();render();fillInspector();}
initSupabase();
