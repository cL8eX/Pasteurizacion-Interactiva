const svg=document.querySelector("#diagram"),NS="http://www.w3.org/2000/svg",$=s=>document.querySelector(s);
const types={block:{label:"Bloque de proceso",symbol:"▰",w:170,h:78},tank:{label:"Tanque",symbol:"◉",w:100,h:105},pump:{label:"Bomba",symbol:"◖",w:92,h:80},heat:{label:"Intercambiador",symbol:"▤",w:118,h:90},valve:{label:"Válvula",symbol:"◇",w:74,h:54},sensor:{label:"Instrumento",symbol:"Ⓣ",w:70,h:62},cooler:{label:"Enfriador",symbol:"❄",w:110,h:88},filler:{label:"Envasadora",symbol:"▥",w:108,h:92}};
const paletteItems=[["block","Bloque"],["tank","Tanque"],["pump","Bomba"],["heat","Intercambiador"],["valve","Válvula"],["sensor","Instrumento"],["cooler","Enfriador"],["filler","Envasadora"]];
let mode="blocks",selectedId=null,selectedEdgeId=null,connectMode=false,connectFrom=null,drag=null,idCounter=10,nodes=[],edges=[];
const defaults=()=>[
{id:"n1",type:"block",x:55,y:90,title:"Recepción",subtitle:"Leche cruda",tag:"OP-01",note:"Recepción, identificación del lote y control inicial."},
{id:"n2",type:"block",x:285,y:90,title:"Filtración",subtitle:"Retiro de partículas",tag:"OP-02",note:"Separación física de partículas mediante filtración o clarificación."},
{id:"n3",type:"heat",x:515,y:80,title:"Precalentamiento",subtitle:"Intercambiador de placas",tag:"E-101",note:"Recuperación de energía térmica cuando el diseño lo permite."},
{id:"n4",type:"heat",x:735,y:80,title:"Pasteurización",subtitle:"72 °C / 15 s referencia",tag:"HT-101",note:"Tratamiento térmico validado según normativa y diseño de planta."},
{id:"n5",type:"cooler",x:735,y:330,title:"Enfriamiento",subtitle:"Control de temperatura",tag:"E-102",note:"Enfriamiento y mantenimiento de la cadena de frío."},
{id:"n6",type:"filler",x:490,y:330,title:"Envasado",subtitle:"Producto terminado",tag:"PK-101",note:"Envasado higiénico y almacenamiento según especificación."}];
const initialEdges=()=>[["n1","n2","Leche","process"],["n2","n3","Leche","process"],["n3","n4","Leche","process"],["n4","n5","Leche","process"],["n5","n6","Leche","process"]].map(([from,to,label,type],i)=>({id:"e"+(i+1),from,to,label,type}));
function el(tag,attrs={},parent=svg){const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));parent.appendChild(e);return e;}
function txt(parent,x,y,content,cls,anchor="middle"){const t=el("text",{x,y,"text-anchor":anchor,class:cls},parent);t.textContent=content;return t;}
function nodeById(id){return nodes.find(n=>n.id===id)}function edgeById(id){return edges.find(e=>e.id===id)}function dim(n){return types[n.type]||types.block}
function center(n){const d=dim(n);return{x:n.x+d.w/2,y:n.y+d.h/2}}
function notify(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(notify.timer);notify.timer=setTimeout(()=>t.classList.remove("show"),2300)}
function renderPalette(){$("#palette").innerHTML="";paletteItems.forEach(([type,label])=>{const b=document.createElement("button");b.className="palette-item";b.type="button";b.innerHTML=`<span class="sym">${types[type].symbol}</span><span>${label}</span>`;b.onclick=()=>addNode(type);$("#palette").appendChild(b)})}
function addNode(type){const d=types[type],count=nodes.length,id="n"+(++idCounter);nodes.push({id,type,x:70+(count%4)*220,y:140+Math.floor(count/4)*160,title:d.label,subtitle:"Editar descripción",tag:id.toUpperCase(),note:"Añade aquí la función del equipo y sus parámetros de diseño."});selectedId=id;selectedEdgeId=null;render();fillInspector();markUnsaved();notify("Elemento añadido")}
function edgePoints(a,b){const ca=center(a),cb=center(b),dx=cb.x-ca.x,dy=cb.y-ca.y;let x1=ca.x,y1=ca.y,x2=cb.x,y2=cb.y;
if(Math.abs(dx)>Math.abs(dy)){x1=ca.x+Math.sign(dx)*dim(a).w/2;x2=cb.x-Math.sign(dx)*dim(b).w/2}else{y1=ca.y+Math.sign(dy)*dim(a).h/2;y2=cb.y-Math.sign(dy)*dim(b).h/2}
if(Math.abs(dx)>Math.abs(dy)){const mid=(x1+x2)/2;return{x1,y1,x2,y2,d:`M ${x1} ${y1} L ${mid} ${y1} L ${mid} ${y2} L ${x2} ${y2}`,lx:mid,ly:(y1+y2)/2-8}}
const mid=(y1+y2)/2;return{x1,y1,x2,y2,d:`M ${x1} ${y1} L ${x1} ${mid} L ${x2} ${mid} L ${x2} ${y2}`,lx:(x1+x2)/2,ly:mid-8}}
function render(){
 svg.innerHTML="";const defs=el("defs"),marker=el("marker",{id:"arrow",markerWidth:10,markerHeight:10,refX:8,refY:3,orient:"auto",markerUnits:"strokeWidth"},defs);el("path",{d:"M0,0 L0,6 L9,3 z",fill:"#7ddbd0"},marker);
 const eg=el("g",{"aria-label":"Conexiones"});edges.forEach(e=>{const a=nodeById(e.from),b=nodeById(e.to);if(!a||!b)return;const p=edgePoints(a,b),g=el("g",{class:`edge-group${selectedEdgeId===e.id?" selected":""}`},eg);el("path",{d:p.d,class:`edge ${e.type||"process"}`},g);if(e.label)txt(g,p.lx,p.ly,e.label,"edge-label");const hit=el("path",{d:p.d,class:"edge-hit"},g);hit.addEventListener("click",ev=>{ev.stopPropagation();selectedEdgeId=e.id;selectedId=null;render();fillInspector()})});
 const ng=el("g",{"aria-label":"Equipos y operaciones"});nodes.forEach(n=>drawNode(ng,n));svg.classList.toggle("connect-mode",connectMode);$("#elementCount").textContent=`${nodes.length} elementos · ${edges.length} conexiones`;$("#canvasTitle").textContent=mode==="blocks"?"Diagrama de bloques del proceso":mode==="pfd"?"Diagrama de flujo de proceso (PFD)":"Tuberías e instrumentación (P&ID)";
}
function drawNode(parent,n){
 const d=dim(n),g=el("g",{class:`node${selectedId===n.id?" selected":""}`,transform:`translate(${n.x},${n.y})`,tabindex:0,role:"button","aria-label":n.title},parent);
 if(selectedId===n.id)el("rect",{x:-5,y:-5,width:d.w+10,height:d.h+10,rx:10,class:"selection-ring"},g);
 if(mode==="blocks"){el("rect",{x:0,y:0,width:d.w,height:d.h,rx:10,class:"shape"},g);el("rect",{x:0,y:0,width:5,height:d.h,rx:2,fill:"#b8f36b"},g);txt(g,d.w/2,d.h/2-4,n.title,"node-name");txt(g,d.w/2,d.h/2+17,n.subtitle,"node-sub");txt(g,d.w/2,d.h-7,n.tag,"node-tag")}else drawEquipment(g,n,d);
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
 $("#nodeFields").classList.toggle("hidden",isEdge);$("#edgeFields").classList.toggle("hidden",!isEdge);$("#duplicateBtn").classList.toggle("hidden",isEdge);
 $("#propTitle").parentElement.classList.toggle("hidden",isEdge);$("#propSubtitle").parentElement.classList.toggle("hidden",isEdge);$("#propTag").parentElement.classList.toggle("hidden",isEdge);$("#propNote").parentElement.classList.toggle("hidden",isEdge);
 if(isEdge){$("#propEdgeLabel").value=e.label||"";$("#propEdgeType").value=e.type||"process";$("#propTitle").value="";$("#propSubtitle").value="";$("#propTag").value="";$("#propNote").value=""}
 else{$("#propTitle").value=n.title;$("#propSubtitle").value=n.subtitle;$("#propTag").value=n.tag;$("#propNote").value=n.note;$("#propX").value=Math.round(n.x);$("#propY").value=Math.round(n.y)}
}
$("#propertyForm").addEventListener("submit",e=>{e.preventDefault();if(selectedEdgeId){const edge=edgeById(selectedEdgeId);if(!edge)return;edge.label=$("#propEdgeLabel").value.trim();edge.type=$("#propEdgeType").value;render();fillInspector();markUnsaved();notify("Conexión actualizada");return}const n=nodeById(selectedId);if(!n)return;n.title=$("#propTitle").value.trim()||"Elemento";n.subtitle=$("#propSubtitle").value.trim();n.tag=$("#propTag").value.trim();n.note=$("#propNote").value.trim();n.x=Math.max(0,Math.min(1020,Number($("#propX").value)||0));n.y=Math.max(0,Math.min(560,Number($("#propY").value)||0));render();fillInspector();markUnsaved();notify("Propiedades actualizadas")});
$("#duplicateBtn").addEventListener("click",()=>{const n=nodeById(selectedId);if(!n)return;const copy={...n,id:"n"+(++idCounter),x:Math.min(930,n.x+35),y:Math.min(520,n.y+35),title:n.title+" (copia)",tag:"CP-"+idCounter};nodes.push(copy);selectedId=copy.id;selectedEdgeId=null;render();fillInspector();markUnsaved();notify("Elemento duplicado")});
$("#deleteBtn").addEventListener("click",deleteSelected);
function deleteSelected(){if(selectedEdgeId){edges=edges.filter(e=>e.id!==selectedEdgeId);selectedEdgeId=null;render();fillInspector();markUnsaved();notify("Conexión eliminada");return}if(!selectedId){notify("Selecciona un elemento o una conexión");return}nodes=nodes.filter(n=>n.id!==selectedId);edges=edges.filter(e=>e.from!==selectedId&&e.to!==selectedId);selectedId=null;render();fillInspector();markUnsaved();notify("Elemento eliminado")}
$("#connectBtn").addEventListener("click",()=>{connectMode=!connectMode;connectFrom=null;selectedId=null;selectedEdgeId=null;$("#connectBtn").textContent=connectMode?"Cancelar conexión":"↗ Conectar";svg.classList.toggle("connect-mode",connectMode);render();fillInspector();notify(connectMode?"Selecciona el origen y luego el destino":"Conexión cancelada")});
$("#diagramMode").addEventListener("change",e=>{mode=e.target.value;render();markUnsaved()});
$("#resetBtn").addEventListener("click",()=>{if(!confirm("¿Restablecer el diagrama de ejemplo? Se perderán los cambios no guardados."))return;nodes=defaults();edges=initialEdges();selectedId=null;selectedEdgeId=null;connectMode=false;render();fillInspector();markUnsaved();notify("Diagrama restaurado")});
svg.addEventListener("click",e=>{if(e.target===svg&&!connectMode){selectedId=null;selectedEdgeId=null;render();fillInspector()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&connectMode){connectMode=false;connectFrom=null;$("#connectBtn").textContent="↗ Conectar";render();notify("Conexión cancelada")}if((e.key==="Delete"||e.key==="Backspace")&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName))deleteSelected()});
function projectData(){return{app:"MILKLAB",version:2,mode,nodes,edges}}
let remoteSaveInProgress=false;
let remoteChannel=null;
let hasUnsavedChanges=false;
let supabaseClient=null;
const remoteTable="milklab_diagram";
const remoteIdColumn="id";
const remoteDiagramColumn="diagram";
const remoteUpdatedColumn="updated_at";

function markUnsaved(){
  hasUnsavedChanges=true;
  $("#saveStatus").textContent="Cambios sin guardar";
  $("#saveStatus").style.color="#e3c981";
}
function savedStatus(){
  hasUnsavedChanges=false;
  $("#saveStatus").textContent=supabaseClient?"Guardado en la nube":"Guardado localmente";
  $("#saveStatus").style.color="#b8f36b";
}
function applyProjectData(data){
  if(!data || data.app!=="MILKLAB" || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) return false;
  nodes=data.nodes;
  edges=data.edges.map((e,i)=>({...e,id:e.id||"e"+(i+1)}));
  mode=data.mode||"blocks";
  $("#diagramMode").value=mode;
  idCounter=Math.max(10,...nodes.map(n=>Number(String(n.id).replace(/\D/g,""))||0),...edges.map(e=>Number(String(e.id).replace(/\D/g,""))||0));
  selectedId=null; selectedEdgeId=null;
  render(); fillInspector();
  return true;
}
function initSupabase(){
  const url=window.MILKLAB_SUPABASE_URL;
  const key=window.MILKLAB_SUPABASE_KEY;
  if(!window.supabase || !url || !key || url.includes("PEGA_AQUI") || key.includes("PEGA_AQUI")){
    $("#saveStatus").textContent="Modo local · falta configurar nube";
    $("#saveStatus").style.color="#e3c981";
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
  $("#saveStatus").textContent="Guardando en la nube…";
  try{
    const row={
      [remoteIdColumn]:1,
      [remoteDiagramColumn]:snapshot,
      [remoteUpdatedColumn]:new Date().toISOString()
    };
    const {error}=await supabaseClient.from(remoteTable).upsert(row,{onConflict:remoteIdColumn});
    if(error) throw error;
    savedStatus();
    notify("Proyecto guardado y compartido en la nube");
  }catch(err){
    console.error("Error guardando MILKLAB:",err);
    $("#saveStatus").textContent="Error al guardar en nube";
    $("#saveStatus").style.color="#f08b8b";
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
try{
  const data=JSON.parse(localStorage.getItem("milklab-project")||"null");
  if(!applyProjectData(data)){nodes=defaults();edges=initialEdges();render();fillInspector();}
  else savedStatus();
}catch(e){nodes=defaults();edges=initialEdges();render();fillInspector();}
initSupabase();
