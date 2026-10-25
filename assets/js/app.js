/* Navy Night Creative — site + voyage scene. Requires three.js r128 (+ postprocessing) loaded before this file. */
const IMG={agora1:"assets/img/work/agora-01.jpg",agora2:"assets/img/work/agora-02.jpg",anatolia1:"assets/img/work/anatolia-01.jpg",anatolia2:"assets/img/work/anatolia-02.jpg"};
const DRAFT="Taslak metin. Görsellerden yazıldı, işletmeyle doğrulanacak.";
const SERVICES=[
 {id:"social-media",n:"01",name:"Social Media",kicker:"Management, content and performance",lede:"Build a consistent presence and turn content into attention, trust and action.",draft:false,
  groups:[{t:"Management",i:["Instagram, Facebook, TikTok, LinkedIn, X and Google Business Profile","Content strategy, calendars, scheduling and publishing","Profile optimization, community management and reporting"]},{t:"Content",i:["Static posts, carousels, Stories, Reels and TikTok videos","Campaign, seasonal and industry-specific concepts","Platform-ready formats, versioning and performance analysis"]}],note:"",work:["agora","anatolia"]},
 {id:"creative",n:"02",name:"Creative",kicker:"Design, copy and print",lede:"Make every touchpoint look and sound like the same brand, from a single post to a printed catalog.",draft:true,
  groups:[{t:"Design & copy",i:["Campaign graphics, digital ads, presentations and marketing collateral","Menus, catalogs, brochures, posters and product sheets","Website, advertising, product and corporate copy"]},{t:"Print & delivery",i:["Business cards, stationery, event materials and branded merchandise","Supplier sourcing, cost coordination and production management","Quality control and final delivery coordination"]}],note:"",work:["agora","anatolia"]},
 {id:"production",n:"03",name:"Production",kicker:"Photo, video and post-production",lede:"Capture the product, the place and the people, then cut it for every channel you use.",draft:true,
  groups:[{t:"On location",i:["Brand, product, food, hospitality, lifestyle and corporate photography","Short-form, promotional, interview and testimonial video","Event coverage, multi-camera recording and on-site content","Drone photography, video and commercial property footage"]},{t:"Post-production",i:["Editing, color correction, sound, captions and motion graphics","Branded intros, outros, highlight videos and event recaps","Long-form to short-form adaptation and multi-format delivery"]}],note:"Same-event social content and archive organization are available when included in the agreed scope.",work:[]},
 {id:"branding",n:"04",name:"Branding",kicker:"Identity and brand development",lede:"Give the business a clear look, a clear voice and a system that keeps both consistent.",draft:true,
  groups:[{t:"Visual identity",i:["Logo, color palette, typography and brand guidelines","Corporate stationery, email signatures and document templates","Presentation, sales and social media identity systems"]},{t:"Brand development",i:["Positioning, brand voice and messaging","Naming support, taglines and storytelling","Brand refresh, rebranding and consistency systems"]}],note:"",work:[]},
 {id:"digital",n:"05",name:"Digital",kicker:"Web, search and advertising",lede:"Get found, give people a clear next step, and measure what happens after the click.",draft:true,
  groups:[{t:"Web & search",i:["Responsive websites, landing pages and product or service pages","Forms, analytics, CRM integrations and e-commerce when required","On-page and local SEO, keyword research and Google Business optimization"]},{t:"Advertising",i:["Meta Ads, Instagram and Facebook advertising support","Audience strategy, lead campaigns, creative and advertising copy","Search-friendly content and performance evaluation"]}],note:"Advertising budgets, media spend, software subscriptions and third-party platform costs are separate from NNC service fees.",work:[]},
 {id:"influence",n:"06",name:"Influence & Partnerships",kicker:"Creators and collaborations",lede:"Put the brand in front of the right local audiences through people they already follow.",draft:true,
  groups:[{t:"Creator campaigns",i:["Influencer and micro-influencer research and shortlists","Outreach, negotiation, content briefs and visit coordination","Reels and Stories, content review, follow-up and evaluation"]},{t:"Partnerships",i:["Local business, brand and creator collaborations","Cross-promotional, community and event campaigns","Strategic partnerships and long-term creator relationships"]}],note:"",work:[]},
 {id:"marketing-business",n:"07",name:"Marketing & Business",kicker:"Growth strategy and U.S. business support",lede:"Plan the growth, and get the paperwork moving so you can launch and operate in the U.S.",draft:true,
  groups:[{t:"Marketing & growth",i:["Marketing plans, positioning, audience research and competitor analysis","Lead generation, landing page strategy and conversion messaging","Campaign management, audits, consulting and market entry support"]},{t:"U.S. business support",i:["LLC and corporation formation, state registration and EIN application coordination","License research, registered agent and business address coordination","Bank account preparation, documentation and filing reminders","Sales tax processes and coordination with accounting, bookkeeping and tax professionals"]}],note:"NNC provides administrative support and process coordination. Legal, accounting and tax advice is delivered by appropriately qualified third-party professionals when required.",work:[]}
];
const CASES=[
 {id:"agora",n:"01",name:"Agora Truck Parts",client:"Agora Truck & Trailer Parts",year:"2026",tags:["Social Media","Creative Direction","Campaign Design"],
  imgs:[{src:IMG.agora1,alt:"Agora Truck Parts water pump campaign design."},{src:IMG.agora2,alt:"Agora Truck Parts DEF pump campaign design."}],
  summary:"Product campaign posts for a truck and trailer parts supplier, built around the exact part, the trucks it fits and one clear Shop Now.",
  brief:"Truck parts are bought by fit. Each post had to show the part, the models it fits and the part numbers buyers search for, without turning into a spec sheet.",
  made:"A stone-and-steel campaign look: one hero part per post, an oversized product name, a fitment card with part numbers and the same Shop Now line pointing to the store every time.",
  deliv:["Social media campaign posts","Creative direction","Campaign design system"]},
 {id:"anatolia",n:"02",name:"Anatolia Chicago",client:"Anatolia Mediterranean Restaurant",year:"",tags:["Social Media","Content Creation","Graphic Design"],
  imgs:[{src:IMG.anatolia1,alt:"Anatolia Chicago Mixed Kebab design featuring a sharing platter."},{src:IMG.anatolia2,alt:"Anatolia Chicago cocktail design in a warmly lit restaurant."}],
  summary:"Social content for a Mediterranean restaurant in Chicago: low-light food and cocktail designs that make the table feel booked for tonight.",
  brief:"A restaurant feed has two jobs: make people hungry, and make the room look worth the trip.",
  made:"A dark, warmly lit look where the dish or the drink is the only thing in the light, classic lettering for the item name and the Anatolia mark at the foot of every post.",
  deliv:["Social media content","Menu item designs","Cocktail feature designs"]}
];
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t;
const seg=(t,a,b)=>clamp((t-a)/(b-a),0,1),ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,easeOut=x=>1-Math.pow(1-x,3);
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("show"),1800)}
async function copyText(txt,label){try{await navigator.clipboard.writeText(txt);toast(label||"Copied")}catch(e){const tmp=document.createElement("textarea");tmp.value=txt;tmp.style.position="fixed";tmp.style.opacity="0";document.body.appendChild(tmp);tmp.select();let ok=false;try{ok=document.execCommand("copy")}catch(_){}tmp.remove();toast(ok?(label||"Copied"):"Select the text to copy it")}}
const homeEl=$("#view-home"),page=$("#view-page"),onHome=()=>!homeEl.hidden;
const root=document.documentElement;

/* ================= THE VOYAGE (three.js) ================= */
const INTRO=13.2;
const T3=!!window.THREE;
const V={ok:false,t0:0,introActive:false,visible:true,raf:0,last:0,offset:{x:0,z:0},trim:{p:0,r:0,h:0}};
(function buildCompassTicks(){return;const g=$("#ticks");let s="";for(let d=0;d<360;d+=10){const a=d*Math.PI/180,l=d%90===0?14:d%30===0?9:5;s+=`<line x1="${(Math.sin(a)*76).toFixed(1)}" y1="${(-Math.cos(a)*76).toFixed(1)}" x2="${(Math.sin(a)*(76-l)).toFixed(1)}" y2="${(-Math.cos(a)*(76-l)).toFixed(1)}"/>`}g.innerHTML=s})();

/* one wave function, shared by the GPU (sea surface) and the CPU (boat motion) */
const WAVES=[[.8,.6,.16,.55,.9],[-.42,.91,.25,.32,1.25],[.95,-.31,.43,.15,1.8],[.1,.99,.78,.07,2.6],[-.71,-.7,1.35,.035,3.4],[.3,-.95,2.1,.018,4.3],[-.9,.43,3.0,.01,5.2]];
const WAVE_GLSL=`float waveH(vec2 p,float t,out vec2 g){float h=0.;g=vec2(0.);vec2 d;float k,a,s,ph;
${WAVES.map(([dx,dz,k,a,s])=>`d=vec2(${dx},${dz});k=${k};a=${a};s=${s};ph=dot(d,p)*k+t*s;h+=a*sin(ph);g+=a*k*cos(ph)*d;`).join("")}
return h;}`;
const waveJS=(x,z,t)=>{let h=0;for(const [dx,dz,k,a,s] of WAVES)h+=a*Math.sin((dx*x+dz*z)*k+t*s);return h};
const NOISE_GLSL=`float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float vnoise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
float fbm2(vec2 p){return vnoise(p)*.6+vnoise(p*2.13+7.1)*.3+vnoise(p*4.7+3.3)*.1;}`;
/* night sky, used by the sky dome and by the sea's reflection */
const SKY_GLSL=`uniform vec3 uMoonDir,uLampDirS;uniform float uMoonI,uLampGlow,uSkyFog;uniform vec3 uFogC;
vec3 skyCol(vec3 d){d=normalize(d);float h=clamp(d.y,0.,1.);
  vec3 c=mix(vec3(.045,.115,.19),vec3(.006,.022,.042),pow(h,.42));
  float m=max(dot(d,uMoonDir),0.);
  vec3 tU=normalize(cross(uMoonDir,vec3(0.,1.,0.)));vec3 tV=cross(tU,uMoonDir);vec2 lc=vec2(dot(d,tU),dot(d,tV))/.0165;float lr=length(lc);
  float disc=smoothstep(1.,.93,lr)*step(0.,m);float maria=fbm2(lc*1.8+vec2(3.1,1.7));
  c+=vec3(.86,.88,.9)*disc*(.78+.3*smoothstep(.35,.75,maria)*-1.+.3-.22*smoothstep(.3,1.,lr))*1.35*uMoonI;
  c+=vec3(.55,.62,.72)*(pow(m,220.)*.35+pow(m,18.)*.07)*uMoonI;
  vec2 cp=d.xz/(d.y+.08)*1.6;float cl=smoothstep(.45,.85,fbm2(cp*.9+vec2(3.,1.)));
  c=mix(c,c*.55+vec3(.11,.13,.16)*pow(m,6.)*uMoonI,cl*.65*smoothstep(.02,.25,d.y));
  float l=max(dot(d,uLampDirS),0.);c+=vec3(.94,.73,.19)*pow(l,16.)*.32*uLampGlow;
  return mix(c,uFogC,uSkyFog*(1.-smoothstep(.0,.9,d.y)*.15));}`;

function canvasTex(w,h,draw,rep){const c=document.createElement("canvas");c.width=w;c.height=h;draw(c.getContext("2d"),w,h);const t=new THREE.CanvasTexture(c);if(rep){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rep[0],rep[1])}t.anisotropy=4;return t}
function glowTex(){return canvasTex(128,128,(x)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,"rgba(255,255,255,1)");g.addColorStop(.18,"rgba(255,255,255,.6)");g.addColorStop(.5,"rgba(255,255,255,.12)");g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.fillRect(0,0,128,128)})}
function hash3(x,y,z){const s=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return s-Math.floor(s)}
function vnoise3(x,y,z){const xi=Math.floor(x),yi=Math.floor(y),zi=Math.floor(z),xf=x-xi,yf=y-yi,zf=z-zi;const u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf),w=zf*zf*(3-2*zf);let r=0;
  for(let a=0;a<2;a++)for(let b=0;b<2;b++)for(let c=0;c<2;c++)r+=hash3(xi+a,yi+b,zi+c)*(a?u:1-u)*(b?v:1-v)*(c?w:1-w);return r}
function rockGeo(r,seed){const g=new THREE.IcosahedronGeometry(r,3);const p=g.attributes.position;
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);const n=vnoise3(x*.32+seed,y*.32,z*.32)*.62+vnoise3(x*.95,y*.95+seed,z*.95)*.28;const k=.72+n*.6;p.setXYZ(i,x*k,y*k*.55,z*k)}
  g.computeVertexNormals();return g}

let R,S,CAM,COMP=null,BLOOM=null,GRADE=null,water,WU,SKYU,boat,house,lhG,lampPos,glows=[],beams=[],BUs=[],spot,lampLight,stars,sky,rig,radar,mastGlow,deckLight;
const LH={dist:165,ang:30*Math.PI/180};
const H1=13*Math.PI/180;
const MOON=T3?new THREE.Vector3(-.52,.3,-.8).normalize():null;
const CAMS=!T3?{}:{inside:new THREE.Vector3(0,3.92,1.25),bow:new THREE.Vector3(0,3.95,-5.6),
  wideL:new THREE.Vector3(-10,9.8,23),wideP:new THREE.Vector3(3.6,11.5,31),ctrl:new THREE.Vector3(3,11,3)};
const _a=T3?new THREE.Vector3():null,_b=T3?new THREE.Vector3():null,_c=T3?new THREE.Vector3():null;

function buildBoat(env){
  const g=new THREE.Group();
  const navy=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.32,metalness:.15,envMap:env,envMapIntensity:1.2,side:THREE.DoubleSide,vertexColors:true});
  const cream=new THREE.MeshStandardMaterial({color:0xe2ded2,roughness:.5,metalness:.05,envMap:env,envMapIntensity:.6});
  const chrome=new THREE.MeshStandardMaterial({color:0xb9b7b0,roughness:.28,metalness:.85,envMap:env,envMapIntensity:1});
  const dark=new THREE.MeshStandardMaterial({color:0x0a1520,roughness:.6,metalness:.2,envMap:env});
  const teak=canvasTex(512,512,(x,w,h)=>{x.fillStyle="#3f3329";x.fillRect(0,0,w,h);for(let i=0;i<32;i++){x.fillStyle=["#43372c","#3c3127","#463a2f"][i%3];x.fillRect(i*16,0,15,h)}x.fillStyle="#171310";for(let i=0;i<32;i++)x.fillRect(i*16+15,0,1,h);for(let k=0;k<900;k++){x.fillStyle=`rgba(0,0,0,${Math.random()*.08})`;x.fillRect(Math.random()*w,Math.random()*h,1,Math.random()*30)}},[1,1]);
  const deckMat=new THREE.MeshStandardMaterial({map:teak,roughness:.75,metalness:0,side:THREE.DoubleSide});
  /* hull: lofted from 49 cross-sections */
  const NS=48,NU=14,L=14,Wd=NU*2+1,st=[];
  for(let i=0;i<=NS;i++){const s=i/NS,z=7-L*s;
    let hb=s<.5?2.25*(.9+.1*Math.sin(s/.5*Math.PI/2)):2.25*Math.pow(Math.cos((s-.5)/.5*Math.PI/2),.85);hb=Math.max(hb,.002);
    const sh=1.55+.95*s*s;let kd=-.95+.1*Math.sin(Math.PI*s);if(s>.8)kd=lerp(kd,sh*.55,Math.pow((s-.8)/.2,1.6));if(s<.06)kd=lerp(-.35,kd,s/.06);
    const ring=[];for(let j=0;j<=NU;j++){const u=j/NU;ring.push([hb*(1-Math.pow(1-u,2))*(1+.05*u),kd+(sh-kd)*Math.pow(u,1.1),z])}st.push({ring,sh,hb,z})}
  const pos=[],col=[],idx=[];const cTop=[.075,.19,.33],cBoot=[.91,.89,.84],cBot=[.02,.05,.08];
  st.forEach(({ring})=>{const full=[];for(let j=NU;j>=1;j--)full.push([-ring[j][0],ring[j][1],ring[j][2]]);full.push(ring[0]);for(let j=1;j<=NU;j++)full.push(ring[j]);
    full.forEach(([x,y,z])=>{pos.push(x,y,z);const c=y<.12?cBot:y<.3?cBoot:cTop;col.push(...c)})});
  for(let i=0;i<NS;i++)for(let k=0;k<Wd-1;k++){const a=i*Wd+k,b=a+1,c=a+Wd,d=c+1;idx.push(a,c,b,b,c,d)}
  /* transom */
  const t0=pos.length/3;pos.push(0,(st[0].ring[0][1]+st[0].sh)/2,7);col.push(...cTop);for(let k=0;k<Wd-1;k++)idx.push(t0,k,k+1);
  const hg=new THREE.BufferGeometry();hg.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));hg.setAttribute("color",new THREE.Float32BufferAttribute(col,3));hg.setIndex(idx);hg.computeVertexNormals();
  g.add(new THREE.Mesh(hg,navy));
  /* deck with camber */
  const dp=[],du=[],di=[];st.forEach(({hb,sh,z},i)=>{const w=hb*1.02;[[-w,sh],[0,sh+.07],[w,sh]].forEach(([x,y])=>{dp.push(x,y+.005,z);du.push(x*.36+.5,z*.1)})});
  for(let i=0;i<NS;i++){const a=i*3;di.push(a,a+3,a+1,a+1,a+3,a+4,a+1,a+4,a+2,a+2,a+4,a+5)}
  const dg=new THREE.BufferGeometry();dg.setAttribute("position",new THREE.Float32BufferAttribute(dp,3));dg.setAttribute("uv",new THREE.Float32BufferAttribute(du,2));dg.setIndex(di);dg.computeVertexNormals();
  g.add(new THREE.Mesh(dg,deckMat));
  /* rub rail + guard rails + bow pulpit */
  const sheerPts=side=>st.filter((_,i)=>i%3===0||i===NS).map(({hb,sh,z})=>new THREE.Vector3(side*hb*1.03,sh,z));
  [-1,1].forEach(side=>g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sheerPts(side)),80,.055,6,false),cream)));
  const railPts=[];const rs=st.filter((_,i)=>i>=2&&i<=NS-1&&i%2===0);
  rs.forEach(({hb,sh,z})=>railPts.push(new THREE.Vector3(-hb*.94,sh+.88,z)));railPts.push(new THREE.Vector3(0,st[NS].sh+.86,st[NS].z+.35));
  rs.slice().reverse().forEach(({hb,sh,z})=>railPts.push(new THREE.Vector3(hb*.94,sh+.88,z)));
  g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(railPts),160,.028,6,false),chrome));
  const postG=new THREE.CylinderGeometry(.022,.022,1,6);
  st.forEach(({hb,sh,z},i)=>{if(i<2||i%4||i>NS-2)return;[-1,1].forEach(side=>{const m=new THREE.Mesh(postG,chrome);m.scale.y=.88;m.position.set(side*hb*.94,sh+.44,z);g.add(m)})});
  /* foredeck fittings */
  const winch=new THREE.Mesh(new THREE.CylinderGeometry(.22,.26,.32,16),chrome);winch.position.set(0,st[40].sh+.2,st[40].z);g.add(winch);
  const hatch=new THREE.Mesh(new THREE.BoxGeometry(1.1,.18,1.1),cream);hatch.position.set(0,st[33].sh+.14,st[33].z);g.add(hatch);
  [[-1,38],[1,38],[-1,6],[1,6]].forEach(([sd,i])=>{const c=new THREE.Mesh(new THREE.BoxGeometry(.08,.08,.32),chrome);c.position.set(sd*st[i].hb*.8,st[i].sh+.09,st[i].z);g.add(c)});
  const plat=new THREE.Mesh(new THREE.BoxGeometry(3.7,.12,.9),deckMat);plat.position.set(0,.42,7.45);g.add(plat);
  /* superstructure */
  house=new THREE.Group();g.add(house);
  const prof=[[4.0,0],[-1.8,0],[-1.8,.95],[-1.25,.95],[-.45,2.55],[2.7,2.55],[2.7,.95],[4.0,.95]];
  const shp=new THREE.Shape();prof.forEach(([zz,y],i)=>i?shp.lineTo(-zz,y):shp.moveTo(-zz,y));shp.closePath();
  const sg=new THREE.ExtrudeGeometry(shp,{depth:3.1,bevelEnabled:true,bevelSize:.05,bevelThickness:.05,bevelSegments:2,curveSegments:2});sg.rotateY(Math.PI/2);sg.translate(-1.55,1.8,0);
  house.add(new THREE.Mesh(sg,cream));
  const roof=new THREE.Mesh(new THREE.BoxGeometry(3.5,.1,3.75),cream);roof.position.set(0,1.8+2.62,1.05);house.add(roof);
  const glass=new THREE.MeshStandardMaterial({color:0x101d2b,roughness:.08,metalness:.3,envMap:env,envMapIntensity:1.6,emissive:0xf0ba31,emissiveIntensity:.18});
  const glassWarm=glass.clone();glassWarm.emissiveIntensity=.55;
  const win=(w,h,p,n,m)=>{const q=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m);q.position.copy(p).addScaledVector(n,.07);q.lookAt(_a.copy(q.position).add(n));house.add(q)};
  const fn=new THREE.Vector3(0,.447,-.894);
  [-1,0,1].forEach(k=>win(.95,1.5,new THREE.Vector3(k*1.0,1.8+1.75,-.85),fn,glass));
  [-1,1].forEach(sd=>{win(2.4,.82,new THREE.Vector3(sd*1.62,1.8+1.85,1.0),new THREE.Vector3(sd,0,0),glassWarm);win(2.6,.3,new THREE.Vector3(sd*1.62,1.8+.5,2.2),new THREE.Vector3(sd,0,0),glassWarm)});
  win(1.7,.75,new THREE.Vector3(0,1.8+1.85,2.75),new THREE.Vector3(0,0,1),glassWarm);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.3,.065,10,24),cream);ring.position.set(1.0,1.8+.5,4.08);house.add(ring);
  /* mast, radar, lights */
  const mast=new THREE.Mesh(new THREE.CylinderGeometry(.05,.08,3.2,10),chrome);mast.position.set(0,1.8+2.67+1.6,1.6);house.add(mast);
  const arch=new THREE.Mesh(new THREE.BoxGeometry(1.6,.07,.07),chrome);arch.position.set(0,1.8+2.67+2.1,1.6);house.add(arch);
  radar=new THREE.Group();radar.position.set(0,1.8+2.67+2.45,1.6);house.add(radar);
  const ant=new THREE.Mesh(new THREE.BoxGeometry(1.5,.12,.16),cream);radar.add(ant);
  const sl=new THREE.Mesh(new THREE.CylinderGeometry(.13,.16,.28,14),chrome);sl.rotation.x=Math.PI/2;sl.position.set(0,1.8+2.8,-.25);house.add(sl);
  const gt=glowTex();
  mastGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:gt,color:0xffe9b8,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false,opacity:.95}));mastGlow.position.set(0,1.8+2.67+3.28,1.6);mastGlow.scale.set(1.3,1.3,1);house.add(mastGlow);
  const mh=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),new THREE.MeshBasicMaterial({color:0xfff3d6}));mh.position.copy(mastGlow.position);house.add(mh);
  deckLight=new THREE.PointLight(0xffd9a0,.32,8,2);deckLight.position.set(0,1.8+2.4,-1.4);g.add(deckLight);
  const cabinLight=new THREE.PointLight(0xffc56b,.28,6,2);cabinLight.position.set(0,1.8+3.2,4.6);g.add(cabinLight);
  return g}

function buildLighthouse(env){
  const g=new THREE.Group();
  const rockM=new THREE.MeshStandardMaterial({color:0x1b252e,roughness:.95,metalness:0,flatShading:true});
  const BASE=6.2;
  [[0,0,0,12,1],[9,-.5,5,6,2],[-8,-.6,4,5.5,3],[4,-.8,-9,6.5,4],[-6,-.8,-7,4.5,5],[13,-1.2,-3,3.5,6],[-12,-1.3,-1,3.2,7]].forEach(([x,y,z,r,s],i)=>{const m=new THREE.Mesh(rockGeo(r,s*3.7),rockM);m.position.set(x,y+r*.18,z);m.rotation.y=s;if(!i)m.scale.y=.6;g.add(m)});
  const stone=new THREE.MeshStandardMaterial({color:0x4a535c,roughness:.9});
  const plat=new THREE.Mesh(new THREE.CylinderGeometry(6.4,7.2,2.4,40),stone);plat.position.y=BASE-1.2;g.add(plat);
  const creamM=new THREE.MeshStandardMaterial({color:0xdcd8cc,roughness:.65,envMap:env,envMapIntensity:.4});
  const navyM=new THREE.MeshStandardMaterial({color:0x0e2034,roughness:.45,metalness:.4,envMap:env,envMapIntensity:.9});
  /* keeper's house */
  const kh=new THREE.Group();kh.position.set(5.2,BASE,3.6);kh.rotation.y=-.5;g.add(kh);
  const walls=new THREE.Mesh(new THREE.BoxGeometry(6.5,3,4.2),creamM);walls.position.y=1.5;kh.add(walls);
  const rs=new THREE.Shape();rs.moveTo(-2.4,0);rs.lineTo(2.4,0);rs.lineTo(0,1.7);rs.closePath();
  const rg=new THREE.ExtrudeGeometry(rs,{depth:7,bevelEnabled:false});rg.translate(0,0,-3.5);rg.rotateY(Math.PI/2);const roofM=new THREE.Mesh(rg,navyM);roofM.position.y=3;kh.add(roofM);
  const chim=new THREE.Mesh(new THREE.BoxGeometry(.6,1.4,.6),stone);chim.position.set(-2,4.2,.6);kh.add(chim);
  const warm=new THREE.MeshBasicMaterial({color:0xc9932c});
  [[-1.8,1.6],[0,1.6],[1.8,1.6]].forEach(([x,y])=>{const w=new THREE.Mesh(new THREE.PlaneGeometry(.8,1),warm);w.position.set(x,y,2.12);kh.add(w)});
  /* tower: a lathe with a gentle concave taper and a corbelled top */
  const P=[];for(let i=0;i<=30;i++){const t=i/30;P.push(new THREE.Vector2(3.35-1.15*Math.pow(t,.8),t*21.5))}
  P.push(new THREE.Vector2(2.35,21.9),new THREE.Vector2(2.75,22.4),new THREE.Vector2(3.05,22.8),new THREE.Vector2(3.05,23.1),new THREE.Vector2(0,23.1));
  const bands=canvasTex(64,512,(x,w,h)=>{x.fillStyle="#e2ded2";x.fillRect(0,0,w,h);x.fillStyle="#0f2238";x.fillRect(0,h*(1-.62),w,h*.1);x.fillRect(0,h*(1-.34),w,h*.1);x.fillStyle="rgba(0,0,0,.05)";for(let i=0;i<h;i+=6)x.fillRect(0,i,w,1)});
  const tower=new THREE.Mesh(new THREE.LatheGeometry(P,72),new THREE.MeshStandardMaterial({map:bands,roughness:.55,envMap:env,envMapIntensity:.5}));tower.position.y=BASE;g.add(tower);
  const dark=new THREE.MeshStandardMaterial({color:0x0a1724,roughness:.3,metalness:.3});
  const tr=y=>3.35-1.15*Math.pow(y/21.5,.8)+.04;
  [[0,1.2,1.1,2.2],[1.1,8,.55,.9],[2.5,13.5,.5,.85],[3.8,18.6,.5,.85]].forEach(([a,y,w,h])=>{const r=tr(y);const d=new THREE.Mesh(new THREE.PlaneGeometry(w,h),dark);d.position.set(Math.sin(a)*r,BASE+y,Math.cos(a)*r);d.lookAt(_a.set(d.position.x*2,d.position.y,d.position.z*2));g.add(d)});
  /* gallery, railing, lantern room, dome */
  const galY=BASE+23.1;
  const rail=new THREE.MeshStandardMaterial({color:0x0e2034,roughness:.4,metalness:.6});
  for(let i=0;i<32;i++){const a=i/32*Math.PI*2;const p=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,1.05,6),rail);p.position.set(Math.cos(a)*2.95,galY+.52,Math.sin(a)*2.95);g.add(p)}
  [.55,1.05].forEach(h=>{const t=new THREE.Mesh(new THREE.TorusGeometry(2.95,.04,6,64),rail);t.rotation.x=Math.PI/2;t.position.y=galY+h;g.add(t)});
  const lw=new THREE.Mesh(new THREE.CylinderGeometry(1.95,1.95,.9,32),navyM);lw.position.y=galY+.45;g.add(lw);
  const glassM=new THREE.MeshStandardMaterial({color:0xffe7a8,emissive:0xf0ba31,emissiveIntensity:.55,transparent:true,opacity:.35,roughness:.05,metalness:0,side:THREE.DoubleSide,depthWrite:false});
  const gl=new THREE.Mesh(new THREE.CylinderGeometry(1.85,1.85,2.5,24,1,true),glassM);gl.position.y=galY+.9+1.25;g.add(gl);
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const b=new THREE.Mesh(new THREE.BoxGeometry(.07,2.5,.07),rail);b.position.set(Math.cos(a)*1.87,galY+.9+1.25,Math.sin(a)*1.87);g.add(b)}
  [.9,3.4].forEach(h=>{const t=new THREE.Mesh(new THREE.TorusGeometry(1.88,.05,6,48),rail);t.rotation.x=Math.PI/2;t.position.y=galY+h;g.add(t)});
  const lens=new THREE.Mesh(new THREE.CylinderGeometry(.62,.62,1.5,24),new THREE.MeshBasicMaterial({color:0xfff0c8}));lens.position.y=galY+2.15;g.add(lens);
  const dome=new THREE.Mesh(new THREE.SphereGeometry(2.05,32,12,0,Math.PI*2,0,Math.PI/2),navyM);dome.position.y=galY+3.4;g.add(dome);
  const vent=new THREE.Mesh(new THREE.SphereGeometry(.32,14,10),navyM);vent.position.y=galY+5.65;g.add(vent);
  const rod=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1.6,6),rail);rod.position.y=galY+6.5;g.add(rod);
  g.userData.lampY=galY+2.15;
  return g}

/* ---------- the wheelhouse, seen from inside ---------- */
let INT=null;
function basisMesh(geo,mat,X,Y,Z,o){const m=new THREE.Mesh(geo,mat);m.matrixAutoUpdate=false;m.matrix.makeBasis(X,Y,Z).setPosition(o);return m}
function glassMaterial(shared,seed){
  return new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false,
    uniforms:{uT:shared.uT,uHaze:shared.uHaze,uLight:shared.uLight,uSeed:{value:seed},uAsp:{value:1}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform float uT,uHaze,uLight,uSeed,uAsp;varying vec2 vUv;
      float h(vec2 p){return fract(sin(dot(p+uSeed*13.17,vec2(127.1,311.7)))*43758.5453);}
      float drops(vec2 uv,float sc,out float rim){vec2 g=uv*sc;vec2 id=floor(g);vec2 f=fract(g)-.5;float r=h(id);vec2 o=(vec2(h(id+3.1),h(id+7.7))-.5)*.55;
        float s=.05+.16*r*r;vec2 q=(f-o)*vec2(1.,.85);float d=length(q);float on=step(.58,r);
        float body=smoothstep(s,s*.55,d)*on;float cres=smoothstep(s*.95,s*.7,length(q-vec2(-.25,.3)*s))*smoothstep(s*.25,s*.75,length(q-vec2(.18,-.22)*s))*on;rim=cres;return body;}
      void main(){vec2 uv=vec2(vUv.x*uAsp,vUv.y);
        float r1,r2;float d1=drops(uv,11.,r1);float d2=drops(uv+.37,23.,r2);
        float col=floor(uv.x*31.);float tr=step(.9,h(vec2(col,1.)));float run=fract(uv.y*.7+h(vec2(col,2.))+uT*.05*(.5+h(vec2(col,3.))));
        float trail=smoothstep(.06,0.,abs(fract(uv.x*31.)-.5))*tr*smoothstep(.0,.25,run)*smoothstep(.6,.25,run);
        float edge=smoothstep(0.,.12,vUv.y)*smoothstep(1.,.85,vUv.y);
        float haze=uHaze*(.16+.1*smoothstep(.55,0.,vUv.y))*(.8+.2*sin(uv.x*3.+uT*.2));
        vec3 base=vec3(.55,.62,.7);
        vec3 glint=vec3(1.,.84,.52)*(r1+r2*.7+trail*.5)*uLight*1.1+vec3(.6,.68,.78)*(r1+r2)*.05;
        float a=haze+(d1+d2)*.035+(r1+r2)*.22*(.08+uLight)+trail*.08*(.2+uLight);
        vec3 warm=vec3(.95,.62,.25)*.05*smoothstep(.35,0.,vUv.y);
        gl_FragColor=vec4(base*haze*.6+glint+warm,clamp(a,0.,.85)*edge+warm.r*.4);}`})}
function screenTex(w,h){const c=document.createElement("canvas");c.width=w;c.height=h;const t=new THREE.CanvasTexture(c);return{c,x:c.getContext("2d"),t}}
function buildInterior(){
  const g=new THREE.Group();const FL=2.75,CE=4.35;
  const X=new THREE.Vector3(1,0,0),SL=new THREE.Vector3(0,.894,.447),IN=new THREE.Vector3(0,-.447,.894);
  const frameM=new THREE.MeshStandardMaterial({color:0x151e29,roughness:.55,metalness:.35});
  const panelM=new THREE.MeshStandardMaterial({color:0x1a2430,roughness:.9,metalness:0});
  const dashM=new THREE.MeshStandardMaterial({color:0x0b1117,roughness:.82,metalness:.08});
  const wood=new THREE.MeshStandardMaterial({color:0x6a4529,roughness:.38,metalness:.05});
  const chrome=new THREE.MeshStandardMaterial({color:0xb9b7b0,roughness:.25,metalness:.9});
  const shared={uT:{value:0},uHaze:{value:1},uLight:{value:0}};
  /* raked front frame with three windows */
  const LEN=1.79,W=1.56,v0=.32,v1=1.6,wins=[[-1.46,-.54],[-.46,.46],[.54,1.46]];
  const fs=new THREE.Shape();fs.moveTo(-W,0);fs.lineTo(W,0);fs.lineTo(W,LEN);fs.lineTo(-W,LEN);fs.closePath();
  wins.forEach(([a,b])=>{const p=new THREE.Path();p.moveTo(a,v0);p.lineTo(b,v0);p.lineTo(b,v1);p.lineTo(a,v1);p.closePath();fs.holes.push(p)});
  const fo=new THREE.Vector3(0,FL,-1.25).addScaledVector(IN,.03);
  g.add(basisMesh(new THREE.ExtrudeGeometry(fs,{depth:.1,bevelEnabled:true,bevelSize:.015,bevelThickness:.015,bevelSegments:2}),frameM,X,SL,IN,fo));
  const panes=[];
  wins.forEach(([a,b],i)=>{const m=glassMaterial(shared,i+1);m.uniforms.uAsp.value=(b-a)/(v1-v0);const pg=new THREE.PlaneGeometry(b-a,v1-v0);pg.translate((a+b)/2,(v0+v1)/2,.05);const pm=basisMesh(pg,m,X,SL,IN,fo.clone());pm.renderOrder=5;g.add(pm);panes.push(pm)});
  /* side walls with windows (trapezoids that follow the rake) */
  [-1,1].forEach((sd,k)=>{const s=new THREE.Shape();s.moveTo(0,0);s.lineTo(3.95,0);s.lineTo(3.15,1.6);s.lineTo(0,1.6);s.closePath();
    const hp=new THREE.Path();hp.moveTo(.7,.52);hp.lineTo(2.85,.52);hp.lineTo(2.85,1.36);hp.lineTo(.7,1.36);hp.closePath();s.holes.push(hp);
    const Xs=new THREE.Vector3(0,0,-1),Ys=new THREE.Vector3(0,1,0),Zs=new THREE.Vector3(1,0,0);const o=new THREE.Vector3(sd*1.5-(sd>0?0:.08),FL,2.7);
    g.add(basisMesh(new THREE.ExtrudeGeometry(s,{depth:.08,bevelEnabled:false}),panelM,Xs,Ys,Zs,o));
    const m=glassMaterial(shared,7+k);m.uniforms.uAsp.value=2.15/.84;const pg=new THREE.PlaneGeometry(2.15,.84);pg.translate(1.775,.94,.04);const pm=basisMesh(pg,m,Xs,Ys,Zs,o.clone());pm.renderOrder=5;g.add(pm)});
  /* ceiling, beams, floor */
  const ceil=new THREE.Mesh(new THREE.BoxGeometry(3.1,.06,3.35),panelM);ceil.position.set(0,CE+.03,1.15);g.add(ceil);
  [.1,1.0,1.9].forEach(z=>{const b=new THREE.Mesh(new THREE.BoxGeometry(3.05,.09,.1),frameM);b.position.set(0,CE-.04,z);g.add(b)});
  const dome=new THREE.Mesh(new THREE.SphereGeometry(.09,16,8,0,Math.PI*2,0,Math.PI/2),new THREE.MeshBasicMaterial({color:0x6b4a1c}));dome.rotation.x=Math.PI;dome.position.set(0,CE-.01,1.5);g.add(dome);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(3,4),new THREE.MeshStandardMaterial({color:0x2a2119,roughness:.85}));floor.rotation.x=-Math.PI/2;floor.position.set(0,FL+.01,.9);g.add(floor);
  /* dashboard */
  const prof=[[-1.2,0],[-1.2,.62],[-.42,.52],[-.36,.44],[-.36,0]];const ds=new THREE.Shape();prof.forEach(([zz,y],i)=>i?ds.lineTo(-zz,y):ds.moveTo(-zz,y));ds.closePath();
  const dg=new THREE.ExtrudeGeometry(ds,{depth:2.92,bevelEnabled:true,bevelSize:.02,bevelThickness:.02,bevelSegments:2});dg.rotateY(Math.PI/2);dg.translate(-1.46,FL,0);g.add(new THREE.Mesh(dg,dashM));
  const camPt=new THREE.Vector3(0,4.0,1.2);
  const mkScreen=(w,h,cw,chh,pos)=>{const s=screenTex(cw,chh);const bz=new THREE.Mesh(new THREE.BoxGeometry(w+.05,h+.05,.04),dashM);bz.position.copy(pos);bz.lookAt(camPt);g.add(bz);
    const sc=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:s.t,toneMapped:false}));sc.position.copy(pos);sc.lookAt(camPt);sc.translateZ(.022);g.add(sc);return s};
  const plot=mkScreen(.6,.42,320,224,new THREE.Vector3(.68,3.58,-.86));
  const ro=mkScreen(.5,.26,320,166,new THREE.Vector3(-.66,3.53,-.86));
  /* compass binnacle */
  const bin=new THREE.Group();bin.position.set(0,3.47,-.66);bin.rotation.x=.35;g.add(bin);
  const bb=new THREE.Mesh(new THREE.CylinderGeometry(.14,.16,.08,28),dashM);bin.add(bb);
  const cardT=screenTex(256,256);drawCard(cardT.x);cardT.t.needsUpdate=true;
  const card=new THREE.Mesh(new THREE.CircleGeometry(.12,40),new THREE.MeshBasicMaterial({map:cardT.t,toneMapped:false}));card.rotation.x=-Math.PI/2;card.position.y=.045;bin.add(card);
  const lub=new THREE.Mesh(new THREE.TorusGeometry(.125,.012,8,40),chrome);lub.rotation.x=Math.PI/2;lub.position.y=.05;bin.add(lub);
  const gd=new THREE.Mesh(new THREE.SphereGeometry(.125,24,12,0,Math.PI*2,0,Math.PI/2),new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.12,roughness:.05,metalness:0}));gd.position.y=.045;bin.add(gd);
  const lub2=new THREE.Mesh(new THREE.BoxGeometry(.006,.003,.05),new THREE.MeshBasicMaterial({color:0xf0ba31}));lub2.position.set(0,.06,-.095);bin.add(lub2);
  /* wheel */
  const wh=new THREE.Group();wh.position.set(0,3.28,-.16);wh.rotation.x=-.95;g.add(wh);
  const spin=new THREE.Group();wh.add(spin);
  spin.add(new THREE.Mesh(new THREE.TorusGeometry(.27,.024,12,48),wood));
  for(let i=0;i<6;i++){const sp=new THREE.Mesh(new THREE.CylinderGeometry(.01,.013,.27,8),chrome);sp.position.set(Math.cos(i*Math.PI/3)*.135,Math.sin(i*Math.PI/3)*.135,0);sp.rotation.z=i*Math.PI/3+Math.PI/2;spin.add(sp)}
  const hub=new THREE.Mesh(new THREE.CylinderGeometry(.045,.05,.06,16),chrome);hub.rotation.x=Math.PI/2;spin.add(hub);
  const col=new THREE.Mesh(new THREE.CylinderGeometry(.035,.04,.4,12),dashM);col.rotation.x=Math.PI/2;col.position.z=-.2;wh.add(col);
  /* throttles, switches, indicator lights */
  [-.06,.06].forEach(dx=>{const l=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.2,8),chrome);l.position.set(1.0+dx,3.36,-.55);l.rotation.x=-.5;g.add(l);const k=new THREE.Mesh(new THREE.SphereGeometry(.028,12,8),dashM);k.position.set(1.0+dx,3.45,-.5);g.add(k)});
  const ledM=new THREE.MeshBasicMaterial({color:0xf0ba31}),ledD=new THREE.MeshBasicMaterial({color:0x5a4614});
  for(let i=0;i<7;i++){const l=new THREE.Mesh(new THREE.SphereGeometry(.009,8,6),i%3?ledD:ledM);l.position.set(-1.05+i*.06,3.37,-.55);g.add(l)}
  for(let i=0;i<5;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(.03,.012,.05),chrome);s.position.set(-.35+i*.07,3.34,-.47);s.rotation.x=.2;g.add(s)}
  /* warm instrument light */
  const il=new THREE.PointLight(0xffb45a,.75,3.6,2);il.position.set(0,3.85,-.25);g.add(il);
  const il2=new THREE.PointLight(0xf0ba31,.25,2,2);il2.position.set(.68,3.6,-.6);g.add(il2);
  INT={group:g,panes,center:panes[1],fo,X,SL,IN,shared,plot,ro,card,spin,v0,v1};
  return g}
function drawCard(x){const w=256,c=128;x.fillStyle="#0a1520";x.fillRect(0,0,w,w);x.strokeStyle="rgba(247,245,239,.75)";x.fillStyle="#e8e2d2";x.lineWidth=2;
  for(let d=0;d<360;d+=5){const a=d*Math.PI/180,l=d%30===0?20:d%10===0?13:7;x.beginPath();x.moveTo(c+Math.sin(a)*118,c-Math.cos(a)*118);x.lineTo(c+Math.sin(a)*(118-l),c-Math.cos(a)*(118-l));x.stroke()}
  x.font="700 26px Anek Latin, Arial, sans-serif";x.textAlign="center";x.textBaseline="middle";
  [["N",0],["E",90],["S",180],["W",270]].forEach(([t,d])=>{const a=d*Math.PI/180;x.fillStyle=t==="N"?"#f0ba31":"#e8e2d2";x.fillText(t,c+Math.sin(a)*78,c-Math.cos(a)*78)});
  x.fillStyle="#f0ba31";x.beginPath();x.moveTo(c,c-58);x.lineTo(c+9,c);x.lineTo(c-9,c);x.closePath();x.fill()}
let scrFrame=0;
function drawScreens(T,time,st,relLight,fog){
  if(!INT||(scrFrame++%2))return;
  /* radar / chart plotter */
  const {x,c}=INT.plot;const w=c.width,h=c.height,cx=w*.5,cy=h*.58,R0=h*.52;
  x.fillStyle="#03101a";x.fillRect(0,0,w,h);
  x.strokeStyle="rgba(240,186,49,.22)";x.lineWidth=1;for(let i=1;i<=3;i++){x.beginPath();x.arc(cx,cy,R0*i/3,0,Math.PI*2);x.stroke()}
  x.beginPath();x.moveTo(cx-R0,cy);x.lineTo(cx+R0,cy);x.moveTo(cx,cy-R0);x.lineTo(cx,cy+R0);x.stroke();
  const sw=(time*1.6)%(Math.PI*2);const gr=x.createRadialGradient(cx,cy,0,cx,cy,R0);gr.addColorStop(0,"rgba(240,186,49,.35)");gr.addColorStop(1,"rgba(240,186,49,.04)");
  x.fillStyle=gr;x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,R0,sw-.5-Math.PI/2,sw-Math.PI/2);x.closePath();x.fill();
  /* clutter */
  x.fillStyle="rgba(240,186,49,.25)";for(let i=0;i<60;i++){const a=hash3(i,1,2)*6.283,r=(hash3(i,3,4)*.9+.08)*R0;const fade=.5+.5*Math.cos(((a+Math.PI/2)-sw+6.283)%6.283);x.globalAlpha=fade*.6;x.fillRect(cx+Math.cos(a)*r,cy+Math.sin(a)*r,1.5,1.5)}x.globalAlpha=1;
  /* the lighthouse island echo */
  const la=relLight-Math.PI/2,lr=R0*.82;const age=((la-(sw-Math.PI/2))%6.283+6.283)%6.283;x.fillStyle=`rgba(247,236,200,${.35+.65*Math.max(0,1-age/3)})`;x.beginPath();x.arc(cx+Math.cos(la)*lr,cy+Math.sin(la)*lr,4,0,6.283);x.fill();
  /* course line once set */
  if(st.course>0){x.strokeStyle=`rgba(240,186,49,${st.course})`;x.setLineDash([6,5]);x.lineWidth=2;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx,cy-R0);x.stroke();x.setLineDash([])}
  x.fillStyle="#f7f5ef";x.beginPath();x.moveTo(cx,cy-7);x.lineTo(cx+5,cy+5);x.lineTo(cx-5,cy+5);x.closePath();x.fill();
  x.fillStyle="rgba(247,245,239,.65)";x.font="600 13px Anek Latin, Arial, sans-serif";x.textAlign="left";x.fillText("RNG 0.25 NM",10,18);x.textAlign="right";x.fillText(st.course>.5?"ROUTE ACTIVE":"NO ROUTE",w-10,18);
  INT.plot.t.needsUpdate=true;
  /* readout */
  const r=INT.ro,X2=r.x,W2=r.c.width,H2=r.c.height;X2.fillStyle="#03101a";X2.fillRect(0,0,W2,H2);
  const hdg=T<7.2?"---":String(Math.round((360-st.heading*180/Math.PI)%360)).padStart(3,"0");
  const vis=(.2+clamp((.017-fog)/(.017-.0028),0,1)*5.8).toFixed(1),sog=(st.speed*1.944).toFixed(1);
  [["HDG",hdg+"°"],["VIS",vis+" NM"],["SOG",sog+" KN"]].forEach(([k,v],i)=>{const y=34+i*48;X2.textAlign="left";X2.fillStyle="rgba(247,245,239,.55)";X2.font="600 18px Anek Latin, Arial, sans-serif";X2.fillText(k,16,y);X2.textAlign="right";X2.fillStyle="#f0ba31";X2.font="700 30px Anek Latin, Arial, sans-serif";X2.fillText(v,W2-16,y+2)});
  r.t.needsUpdate=true}
/* drifting fog banks in front of the camera */
let MIST=[];
function buildMist(){const geo=new THREE.PlaneGeometry(1,1);[[14,.0,1],[32,.37,1.6],[70,.71,2.4]].forEach(([d,seed,sc])=>{
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,fog:false,uniforms:{uT:{value:0},uA:{value:0},uSeed:{value:seed},uSc:{value:sc},uGold:{value:0}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:NOISE_GLSL+`uniform float uT,uA,uSeed,uSc,uGold;varying vec2 vUv;void main(){vec2 p=vUv*vec2(3.2,1.6)*uSc+vec2(uT*.035+uSeed*9.,uSeed*5.);
      float n=fbm2(p)*.65+fbm2(p*2.3-uT*.05)*.35;float a=smoothstep(.38,.9,n)*uA;a*=smoothstep(0.,.2,vUv.x)*smoothstep(1.,.8,vUv.x)*smoothstep(0.,.35,vUv.y)*smoothstep(1.,.6,vUv.y);
      vec3 c=mix(vec3(.12,.2,.29),vec3(.95,.78,.45),uGold*smoothstep(.3,1.,vUv.x));gl_FragColor=vec4(c,a);}`});
  const q=new THREE.Mesh(geo,m);q.userData.d=d;q.renderOrder=3;S.add(q);MIST.push(q)})}
function placeMist(time,amount,gold){const hf=Math.tan(CAM.fov*Math.PI/360);MIST.forEach(q=>{const d=q.userData.d;q.visible=amount>.01;if(!q.visible)return;
  q.position.copy(CAM.position).add(_a.set(0,0,-d).applyQuaternion(CAM.quaternion));q.quaternion.copy(CAM.quaternion);q.scale.set(d*hf*CAM.aspect*2.8,d*hf*2.2,1);
  q.material.uniforms.uT.value=time;q.material.uniforms.uA.value=amount;q.material.uniforms.uGold.value=gold})}

/* ---------- realism extras: Gerstner sea, env reflections, spray, distant coast ---------- */
const gf=v=>Number.isInteger(v)?v.toFixed(1):String(v);
const GER_GLSL=`vec3 gerstner(vec2 p,float t,float amp,out vec3 n,out float h){vec3 o=vec3(0.);vec3 nn=vec3(0.,1.,0.);vec2 d;float k,a,s,q,ph,c,sn;
${WAVES.map(([dx,dz,k,a,s])=>`d=normalize(vec2(${gf(dx)},${gf(dz)}));k=${gf(k)};a=${gf(a)}*amp;s=${gf(s)};q=${(0.11/(a*k)).toFixed(3)};ph=dot(d,p)*k+t*s;c=cos(ph);sn=sin(ph);o.x+=q*a*d.x*c;o.z+=q*a*d.y*c;o.y+=a*sn;nn.x-=d.x*k*a*c;nn.z-=d.y*k*a*c;nn.y-=q*k*a*sn;`).join("")}
h=o.y;n=normalize(nn);return o;}`;
/* a night-sky cube map painted on canvases, prefiltered for glossy reflections */
function makeEnv(renderer){
  const S0=64,faces=[];const top=[.006,.022,.042],hor=[.05,.12,.2],sea=[.01,.028,.045];const m=MOON;
  const dirs=[(u,v)=>[1,-v,-u],(u,v)=>[-1,-v,u],(u,v)=>[u,1,v],(u,v)=>[u,-1,-v],(u,v)=>[u,-v,1],(u,v)=>[-u,-v,-1]];
  for(let f=0;f<6;f++){const c=document.createElement("canvas");c.width=c.height=S0;const x=c.getContext("2d");const img=x.createImageData(S0,S0);
    for(let j=0;j<S0;j++)for(let i=0;i<S0;i++){const u=2*(i+.5)/S0-1,v=2*(j+.5)/S0-1;let [dx,dy,dz]=dirs[f](u,v);const l=Math.hypot(dx,dy,dz);dx/=l;dy/=l;dz/=l;
      let r,g,b;if(dy>=0){const t=Math.pow(dy,.42);r=hor[0]+(top[0]-hor[0])*t;g=hor[1]+(top[1]-hor[1])*t;b=hor[2]+(top[2]-hor[2])*t}else{const t=Math.min(1,-dy*4);r=hor[0]+(sea[0]-hor[0])*t;g=hor[1]+(sea[1]-hor[1])*t;b=hor[2]+(sea[2]-hor[2])*t}
      const md=Math.max(0,dx*m.x+dy*m.y+dz*m.z);const mg=Math.pow(md,900)*3+Math.pow(md,40)*.12;r+=.8*mg;g+=.84*mg;b+=.9*mg;
      const k=(j*S0+i)*4;img.data[k]=Math.min(255,r*255);img.data[k+1]=Math.min(255,g*255);img.data[k+2]=Math.min(255,b*255);img.data[k+3]=255}
    x.putImageData(img,0,0);faces.push(c)}
  const cube=new THREE.CubeTexture(faces);cube.needsUpdate=true;
  try{const pm=new THREE.PMREMGenerator(renderer);const t=pm.fromCubemap(cube).texture;pm.dispose();return t}catch(e){return null}}
/* spray at the bow and bubbles in the wake */
function makeParticles(n,size,color){const pos=new Float32Array(n*3),al=new Float32Array(n);const g=new THREE.BufferGeometry();
  g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("alpha",new THREE.BufferAttribute(al,1));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,fog:false,uniforms:{uSize:{value:size},uScale:{value:400},uCol:{value:new THREE.Color(color)}},
    vertexShader:`attribute float alpha;varying float vA;uniform float uSize,uScale;void main(){vA=alpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=max(1.,uSize*uScale/-mv.z);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:`varying float vA;uniform vec3 uCol;void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,.05,d)*vA;if(a<.003)discard;gl_FragColor=vec4(uCol,a);}`});
  const p=new THREE.Points(g,m);p.frustumCulled=false;p.renderOrder=4;
  return{p,pos,al,vel:new Float32Array(n*3),life:new Float32Array(n),max:new Float32Array(n),n,i:0,acc:0}}
let SPRAY=null,WAKEP=null;
function emit(P,x,y,z,vx,vy,vz,life){const i=P.i;P.i=(P.i+1)%P.n;P.pos[i*3]=x;P.pos[i*3+1]=y;P.pos[i*3+2]=z;P.vel[i*3]=vx;P.vel[i*3+1]=vy;P.vel[i*3+2]=vz;P.life[i]=life;P.max[i]=life}
function stepParticles(P,dt,grav,alphaK,floorY){for(let i=0;i<P.n;i++){if(P.life[i]<=0){P.al[i]=0;continue}P.life[i]-=dt;const k=i*3;P.vel[k+1]-=grav*dt;P.pos[k]+=P.vel[k]*dt;P.pos[k+1]+=P.vel[k+1]*dt;P.pos[k+2]+=P.vel[k+2]*dt;
  if(P.pos[k+1]<floorY){P.life[i]=0}const t=P.life[i]/P.max[i];P.al[i]=Math.max(0,t)*Math.min(1,(1-t)*6)*alphaK}
  P.p.geometry.attributes.position.needsUpdate=true;P.p.geometry.attributes.alpha.needsUpdate=true}
function updateSpray(dt,time,st){if(!SPRAY)return;const sk=clamp(st.speed/7,0,1);const R1=Math.random;
  SPRAY.acc+=dt*(15+sk*190*(.55+.45*Math.abs(Math.sin(time*1.15))));while(SPRAY.acc>1){SPRAY.acc--;const sd=R1()<.5?-1:1;const z=-5.6+R1()*1.6;const hbz=2.25*Math.pow(Math.cos(Math.min(1,((7-z)/14-.5)/.5)*Math.PI/2),.85);
    emit(SPRAY,sd*(hbz+.05),.25,z,sd*(1.2+R1()*2.2)*(.4+sk),(1+R1()*2.6)*(.35+sk),st.speed*.75+R1()*.6,.7+R1()*.7)}
  stepParticles(SPRAY,dt,9.8,.72,-.4);
  WAKEP.acc+=dt*(8+sk*70);while(WAKEP.acc>1){WAKEP.acc--;const sd=R1()<.5?-1:1;emit(WAKEP,sd*(1.4+R1()*.6),.12,6.8+R1()*.4,sd*(.25+R1()*.5),0,st.speed*.92+R1()*.3,3.5+R1()*2.5)}
  stepParticles(WAKEP,dt,0,.32,-9);
  const sc=R.domElement.height/(2*Math.tan(CAM.fov*Math.PI/360));SPRAY.p.material.uniforms.uScale.value=sc;WAKEP.p.material.uniforms.uScale.value=sc}
/* a distant coastline with harbour lights on the horizon */
let COAST=null;
function buildCoast(){const g=new THREE.Group();const seg=260,R0=1300,a0=-2.75,a1=-.2,pos=[],idx=[],tops=[];
  for(let i=0;i<=seg;i++){const t=i/seg,a=a0+(a1-a0)*t;const x=Math.cos(a)*R0,z=Math.sin(a)*R0;
    const h=6+22*vnoise3(i*.045,0,1.3)+30*Math.pow(vnoise3(i*.012,4,2),2)+4*vnoise3(i*.3,1,7);tops.push([x,h,z]);pos.push(x,-6,z,x,h,z)}
  for(let i=0;i<seg;i++){const a=i*2;idx.push(a,a+2,a+1,a+1,a+2,a+3)}
  const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));geo.setIndex(idx);
  const U={uC:{value:new THREE.Color(0x050c14)},uFogC:SKYU.uFogC,uHaze:{value:1}};
  g.add(new THREE.Mesh(geo,new THREE.ShaderMaterial({uniforms:U,fog:false,depthWrite:true,side:THREE.DoubleSide,
    vertexShader:`varying float vY;void main(){vY=position.y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform vec3 uC,uFogC;uniform float uHaze;varying float vY;void main(){float k=mix(.55,1.,uHaze)*(1.-smoothstep(-6.,40.,vY)*.25);gl_FragColor=vec4(mix(uC,uFogC,k),1.);}`})));
  COAST={g,U};return g}
function updateCoast(time,fog){if(!COAST)return;const haze=clamp((fog-.0028)/(.009-.0028),0,1);COAST.U.uHaze.value=haze;}

function initVoyage(){
  if(!window.THREE)return false;
  const canvas=$("#scene");
  try{R=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:"high-performance"})}catch(e){return false}
  if(!R.getContext())return false;
  const mobile=innerWidth<760;
  R.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.4:1.6));
  R.setClearColor(0x050f1a,1);
  S=new THREE.Scene();S.fog=new THREE.FogExp2(0x0b1f33,.017);
  CAM=new THREE.PerspectiveCamera(56,1,.1,3000);
  rig=new THREE.Object3D();S.add(rig);
  SKYU={uMoonDir:{value:MOON.clone()},uLampDirS:{value:new THREE.Vector3(1,0,0)},uMoonI:{value:1},uLampGlow:{value:0},uSkyFog:{value:1},uFogC:{value:new THREE.Color(0x0b1f33)}};
  const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:SKYU,
    vertexShader:`varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:NOISE_GLSL+SKY_GLSL+`varying vec3 vP;void main(){gl_FragColor=vec4(skyCol(vP),1.);}`});
  sky=new THREE.Mesh(new THREE.SphereGeometry(1800,48,24),skyMat);sky.renderOrder=-1;S.add(sky);
  /* environment map from a clear-night copy of the sky, for glossy reflections */
  let env=null;
  env=makeEnv(R);
  if(!mobile){R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap}
  /* lights */
  S.add(new THREE.HemisphereLight(0x2c4d72,0x03080d,1.05));
  const moonL=new THREE.DirectionalLight(0xc6d3e6,1.15);moonL.position.copy(MOON).multiplyScalar(60);S.add(moonL);
  if(!mobile){moonL.castShadow=true;moonL.shadow.mapSize.set(2048,2048);const sc=moonL.shadow.camera;sc.left=-13;sc.right=13;sc.top=13;sc.bottom=-13;sc.near=1;sc.far=140;moonL.shadow.bias=-.0004;moonL.shadow.normalBias=.03}
  /* stars */
  const sp=[];for(let i=0;i<1100;i++){const u=Math.random()*Math.PI*2,v=Math.random()*.92+.06;const r=1700,c=Math.cos(Math.asin(v));sp.push(Math.cos(u)*c*r,v*r,Math.sin(u)*c*r)}
  const sg=new THREE.BufferGeometry();sg.setAttribute("position",new THREE.Float32BufferAttribute(sp,3));
  stars=new THREE.Points(sg,new THREE.PointsMaterial({color:0xf7f5ef,size:1.5,sizeAttenuation:false,transparent:true,opacity:0,fog:false,depthWrite:false}));S.add(stars);
  /* sea */
  const N=mobile?160:230,half=1100,pos=[],idx=[];
  for(let j=0;j<=N;j++)for(let i=0;i<=N;i++){const u=i/N*2-1,v=j/N*2-1;pos.push(Math.sign(u)*Math.pow(Math.abs(u),2)*half,0,Math.sign(v)*Math.pow(Math.abs(v),2)*half)}
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){const a=j*(N+1)+i,b=a+1,c=a+N+1,d=c+1;idx.push(a,c,b,b,c,d)}
  const wg=new THREE.BufferGeometry();wg.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));wg.setIndex(idx);
  WU=Object.assign({uTime:{value:0},uOffset:{value:new THREE.Vector2()},uAmp:{value:1.2},uFogD:{value:.017},
    uLamp:{value:new THREE.Vector3()},uLampI:{value:0},uBeamDir:{value:new THREE.Vector3(1,0,0)},uBeamTan:{value:Math.tan(4*Math.PI/180)},uBeamI:{value:0},
    uPathL:{value:new THREE.Vector3(0,.07,-1)},uPathRev:{value:0},uPathI:{value:0},
    uFwd:{value:new THREE.Vector2(0,-1)},uWake:{value:0},uIsland:{value:new THREE.Vector2()},uHead:{value:0}},SKYU);
  water=new THREE.Mesh(wg,new THREE.ShaderMaterial({uniforms:WU,extensions:{derivatives:true},fog:false,
    vertexShader:GER_GLSL+`uniform float uTime,uAmp;uniform vec2 uOffset;varying vec3 vW;varying vec2 vP0;
      void main(){vec4 w=modelMatrix*vec4(position,1.);vec2 p0=w.xz+uOffset;vec3 n;float h;w.xyz+=gerstner(p0,uTime,uAmp,n,h);vW=w.xyz;vP0=p0;gl_Position=projectionMatrix*viewMatrix*w;}`,
    fragmentShader:GER_GLSL+NOISE_GLSL+SKY_GLSL+`varying vec2 vP0;uniform float uTime,uAmp,uFogD,uLampI,uBeamTan,uBeamI,uPathRev,uPathI,uWake,uHead;uniform vec2 uOffset,uFwd,uIsland;uniform vec3 uLamp,uBeamDir,uPathL;varying vec3 vW;
      void main(){
        float chh=cos(uHead),shh=sin(uHead);float hlx=vW.x*chh-vW.z*shh,hlz=vW.x*shh+vW.z*chh;float hs=(7.-hlz)/14.;
        if(hs>0.&&hs<1.){float hbw=hs<.5?2.25*(.9+.1*sin(hs/.5*1.5708)):2.25*pow(max(cos((hs-.5)/.5*1.5708),0.),.85);if(abs(hlx)<hbw*.97)discard;}
        vec2 p=vP0;vec3 gn;float h;gerstner(p,uTime,uAmp,gn,h);
        vec3 toC=cameraPosition-vW;float dist=length(toC);vec3 V=toC/dist;
        /* small ripples on top of the swell */
        float e=.09;vec2 q1=p*.75+uTime*vec2(.28,.17),q2=p*1.9-uTime*vec2(.22,.36);
        float a0=fbm2(q1),a1=fbm2(q1+vec2(e,0.)),a2=fbm2(q1+vec2(0.,e));float b0=fbm2(q2),b1=fbm2(q2+vec2(e,0.)),b2=fbm2(q2+vec2(0.,e));
        vec2 rg=(vec2(a1-a0,a2-a0)*.75+vec2(b1-b0,b2-b0)*.45)/e;float rk=.22*exp(-dist*.012);
        vec3 n=normalize(gn+vec3(-rg.x*rk,0.,-rg.y*rk));
        float F=.02+.98*pow(1.-max(dot(n,V),0.),5.);
        vec3 Rf=reflect(-V,n);Rf.y=max(Rf.y,.015);
        vec3 deep=vec3(.007,.024,.04)+vec3(.02,.065,.08)*clamp(h*.6+.25,0.,1.)*.45+vec3(.015,.06,.07)*smoothstep(.35,1.1,h)*max(dot(V,vec3(0.,.3,0.)+n*.5),0.);
        vec3 col=mix(deep,skyCol(Rf),F);
        vec3 glow=vec3(0.);
        float mr=max(dot(Rf,uMoonDir),0.);col+=vec3(.78,.82,.88)*(pow(mr,420.)*1.6+pow(mr,60.)*.06)*uMoonI*(1.-uSkyFog);
        vec3 Ld=normalize(uLamp-vW);float lr=max(dot(Rf,Ld),0.);glow+=vec3(1.,.82,.45)*(pow(lr,700.)*3.+pow(lr,70.)*.22)*uLampI;
        /* the route: a road of glitter ahead of the bow, where the beam lights the haze */
        float along=dot(vW.xz,uFwd);
        float pm=smoothstep(4.,16.,along)*(1.-smoothstep(uPathRev*240.-25.,uPathRev*240.,along));
        float pr=max(dot(Rf,uPathL),0.);glow+=vec3(1.,.84,.5)*(pow(pr,260.)*2.6+pow(pr,45.)*.16)*pm*uPathI;
        /* beam footprint on the water */
        vec3 rel=vW-uLamp;float tb=dot(rel,uBeamDir);
        if(tb>0.){float rr=tb*uBeamTan;float bl=smoothstep(rr,rr*.2,length(rel-uBeamDir*tb))*exp(-tb*.004);glow+=vec3(.95,.76,.35)*bl*(.12+pow(max(dot(n,-normalize(rel)),0.),8.)*.5)*uBeamI;}
        /* foam: crests, wake, rocks */
        float fn=fbm2(p*1.3+uTime*.2);
        float foam=smoothstep(.62,1.05,h+fn*.35)*.28;
        float behind=-along-7.;float acr=abs(vW.x*uFwd.y-vW.z*uFwd.x);
        float bwv=smoothstep(1.9,2.5,acr)*smoothstep(3.6,2.6,acr)*smoothstep(-6.,0.,along)*smoothstep(8.,4.,along)*.6;
        float wl=0.,wc=0.;if(behind>0.){float v=abs(acr-behind*.36-1.8);wl=smoothstep(.9+behind*.03,0.,v)*exp(-behind*.018);wc=smoothstep(2.+behind*.04,0.,acr)*exp(-behind*.03);}
        foam+=(wl*.8+wc*.7+bwv)*smoothstep(.25,.7,fn+.2)*uWake;
        float di=length(vW.xz-uIsland);foam+=smoothstep(22.,13.,di)*smoothstep(.35,.75,fbm2(p*.9-uTime*.35))*.8;
        foam=clamp(foam,0.,1.);
        vec3 foamC=vec3(.5,.56,.62)*(.35+.5*uMoonI*(1.-uSkyFog))+vec3(.9,.7,.35)*uLampI*.25*smoothstep(60.,10.,di);
        col=mix(col,foamC,foam);
        float f=1.-exp(-pow(uFogD*dist,2.));
        gl_FragColor=vec4(mix(col,uFogC,f)+glow*(1.-f*.8),1.);}`}));
  S.add(water);
  /* boat and lighthouse */
  boat=buildBoat(env);S.add(boat);
  if(!mobile)boat.traverse(o=>{if(o.isMesh&&!(o.material&&o.material.transparent)){o.castShadow=true;o.receiveShadow=true}});
  boat.add(buildInterior());buildMist();
  SPRAY=makeParticles(mobile?140:320,.22,0xd2dde8);WAKEP=makeParticles(mobile?160:380,.3,0xa9b8c8);boat.add(SPRAY.p);boat.add(WAKEP.p);
  S.add(buildCoast());
  lhG=buildLighthouse(env);S.add(lhG);
  const gt=glowTex();
  const mk=(sc,op)=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:gt,color:0xffd889,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false,fog:false,opacity:0}));s.scale.setScalar(sc);s.userData.base=sc;S.add(s);glows.push(s);return s};
  mk(9);mk(26);mk(120);
  lampLight=new THREE.PointLight(0xffd27a,0,45,2);S.add(lampLight);
  spot=new THREE.SpotLight(0xffe2a0,0,520,.075,.6,1);S.add(spot);S.add(spot.target);
  /* two opposed beams, as a rotating optic throws */
  const bg=new THREE.ConeGeometry(1,1,56,1,true);bg.translate(0,-.5,0);bg.rotateX(-Math.PI/2);
  for(let k=0;k<2;k++){const U={uI:{value:0},uT:{value:0},uColor:{value:new THREE.Color(0xf8d27a)}};BUs.push(U);
    const b=new THREE.Mesh(bg,new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,fog:false,
      vertexShader:`varying vec2 vUv;varying vec3 vN;varying vec3 vV;void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(position,1.);vV=-mv.xyz;vN=normalMatrix*normal;gl_Position=projectionMatrix*mv;}`,
      fragmentShader:`uniform float uI,uT;uniform vec3 uColor;varying vec2 vUv;varying vec3 vN;varying vec3 vV;
        void main(){float e=abs(dot(normalize(vN),normalize(vV)));float dust=.82+.18*sin(vUv.y*55.-uT*.8+vUv.x*31.)*sin(vUv.y*23.+uT*.5);
          float a=pow(vUv.y,2.)*pow(e,1.8)*uI*dust;a+=pow(vUv.y,16.)*.7*uI;gl_FragColor=vec4(uColor*a,a);}`}));
    S.add(b);beams.push(b)}
  /* post-processing: bloom + a light film grade */
  if(!mobile&&THREE.EffectComposer&&THREE.UnrealBloomPass&&THREE.ShaderPass){
    try{COMP=new THREE.EffectComposer(R);COMP.addPass(new THREE.RenderPass(S,CAM));
      BLOOM=new THREE.UnrealBloomPass(new THREE.Vector2(512,512),.6,.45,.9);COMP.addPass(BLOOM);
      GRADE=new THREE.ShaderPass({uniforms:{tDiffuse:{value:null},uT:{value:0}},
        vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader:`uniform sampler2D tDiffuse;uniform float uT;varying vec2 vUv;float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
          void main(){vec3 c=texture2D(tDiffuse,vUv).rgb;c=c/(1.+c*.18);float v=smoothstep(1.15,.35,length(vUv-.5)*1.25);c*=mix(.62,1.,v);c+=(h(vUv*913.+uT)-.5)*.022;gl_FragColor=vec4(c,1.);}`});
      COMP.addPass(GRADE)}catch(e){COMP=null}}
  layoutVoyage();
  return true}

function layoutVoyage(){const w=$("#top").clientWidth,h=$("#top").clientHeight;if(!R||!w)return;R.setSize(w,h,false);if(COMP){COMP.setSize(w,h);COMP.setPixelRatio&&COMP.setPixelRatio(R.getPixelRatio())}
  const asp=w/h;CAM.aspect=asp;V.baseFov=asp<.8?68:asp<1.2?62:54;CAM.fov=V.baseFov;CAM.updateProjectionMatrix();
  const hh=Math.atan(Math.tan(CAM.fov*Math.PI/360)*asp);LH.ang=clamp(hh*.62,8*Math.PI/180,31*Math.PI/180);
  lhG.position.set(Math.sin(LH.ang)*LH.dist,0,-Math.cos(LH.ang)*LH.dist);
  lampPos=new THREE.Vector3(lhG.position.x,lhG.userData.lampY,lhG.position.z);WU.uLamp.value.copy(lampPos);WU.uIsland.value.set(lhG.position.x,lhG.position.z);
  glows.forEach(s=>s.position.copy(lampPos));lampLight.position.copy(lampPos);spot.position.copy(lampPos);
  SKYU.uLampDirS.value.copy(lampPos).normalize()}

function voyageState(T){
  const s={};
  const fl=T-4.3;let f=0;if(fl>=0)for(const [at,v] of [[0,.7],[.08,0],[.2,.45],[.26,0],[.42,1],[.5,.2],[.6,1]])if(fl>=at)f=v;s.flicker=f;
  s.sweep=ease(seg(T,4.9,7.3));s.course=ease(seg(T,7.2,9.6));s.push=ease(seg(T,7.6,9.8));s.crane=ease(seg(T,9.4,13.2));
  s.fog=T<4.5?.017:T<8?lerp(.017,.0062,easeOut(seg(T,4.5,8))):lerp(.0062,.0028,ease(seg(T,8,11.5)));
  s.speed=lerp(.7,7,ease(seg(T,7.8,11.5)));s.amp=lerp(1.25,.9,seg(T,7,11.5));
  s.pathI=seg(T,6.6,7.6);s.pathRev=easeOut(seg(T,6.6,9.6));s.wake=lerp(.25,1,seg(T,8.2,11));s.heading=lerp(0,H1,s.course);
  return s}
function bez(p0,p1,p2,t,out){const u=1-t;return out.set(u*u*p0.x+2*u*t*p1.x+t*t*p2.x,u*u*p0.y+2*u*t*p1.y+t*t*p2.y,u*u*p0.z+2*u*t*p1.z+t*t*p2.z)}
let lastHdgTxt="",lastVis="";
function renderVoyage(T,time,dt){
  const st=voyageState(T);
  const fwd={x:-Math.sin(st.heading),z:-Math.cos(st.heading)};
  V.offset.x+=fwd.x*st.speed*dt;V.offset.z+=fwd.z*st.speed*dt;
  WU.uTime.value=time;WU.uOffset.value.set(V.offset.x,V.offset.z);WU.uAmp.value=st.amp;WU.uFwd.value.set(fwd.x,fwd.z);WU.uWake.value=st.wake;WU.uHead.value=st.heading;
  S.fog.density=st.fog;WU.uFogD.value=st.fog;
  const fogK=clamp(st.fog/.017,0,1);SKYU.uSkyFog.value=clamp((st.fog-.0028)/(.012-.0028),0,1);SKYU.uMoonI.value=1;
  stars.material.opacity=clamp((.011-st.fog)/.007,0,1)*.8;
  /* the boat rides the actual waves under it */
  const H=(lx,lz)=>{const c=Math.cos(st.heading),s=Math.sin(st.heading);const x=lx*c+lz*s,z=-lx*s+lz*c;return waveJS(x+V.offset.x,z+V.offset.z,time)*st.amp};
  const hb=H(0,-6.2),hs=H(0,6),hp=H(-2.1,0),hr=H(2.1,0);
  const k=1-Math.exp(-dt*3.5);
  V.trim.h+=(((hb+hs+hp+hr)/4)*.8-V.trim.h)*k;
  V.trim.p+=((Math.atan2(hb-hs,12.2)*.75+.012*st.speed/7)-V.trim.p)*k;
  V.trim.r+=((Math.atan2(hr-hp,4.2)*.6)-V.trim.r)*k;
  boat.position.set(0,V.trim.h-.05,0);boat.rotation.set(V.trim.p,st.heading,V.trim.r,"YXZ");
  radar.rotation.y=time*2.4;
  house.visible=!(st.push<.3&&st.crane===0);INT.group.visible=st.crane<.15;
  /* the lighthouse */
  const LI=T<4.9?st.flicker:1;
  glows[0].material.opacity=LI;glows[1].material.opacity=LI*.55;glows[2].material.opacity=LI*(.12+fogK*.55);glows[2].scale.setScalar(lerp(70,170,fogK));
  lampLight.intensity=LI*.9;WU.uLampI.value=LI;SKYU.uLampGlow.value=LI*clamp(st.fog/.012,.25,1);
  const tx=fwd.x*150,tz=fwd.z*150;
  const yt=Math.atan2(-Math.cos(H1)*150-lampPos.z,-Math.sin(H1)*150-lampPos.x),yCam=Math.atan2(-lampPos.z,-lampPos.x);
  const yaw=T<INTRO?lerp(yCam-1.05,yt,st.sweep):yt+Math.sin(time*.3)*.03;
  const pitch=-.12+Math.sin(time*.45)*.004;
  const bd=_c.set(Math.cos(yaw)*Math.cos(pitch),Math.sin(pitch),Math.sin(yaw)*Math.cos(pitch)).normalize();
  const BI=seg(T,4.9,5.5);
  beams.forEach((b,i)=>{b.position.copy(lampPos);const d=i?_a.copy(bd).multiplyScalar(-1).setY(bd.y):_a.copy(bd);b.lookAt(_b.copy(lampPos).add(d));const L=i?260:360,Rb=L*Math.tan(4*Math.PI/180);b.scale.set(Rb,Rb,L);
    BUs[i].uI.value=BI*(i?.45:1)*(.3+fogK*.6);BUs[i].uT.value=time});
  spot.intensity=BI*1.4;spot.target.position.copy(lampPos).addScaledVector(bd,200);spot.target.updateMatrixWorld();
  WU.uBeamDir.value.copy(bd);WU.uBeamI.value=BI;
  const pe=.07;WU.uPathL.value.set(fwd.x*Math.cos(pe),Math.sin(pe),fwd.z*Math.cos(pe));WU.uPathI.value=st.pathI;WU.uPathRev.value=st.pathRev;
  /* camera */
  rig.position.set(0,boat.position.y*(1-st.crane),0);rig.rotation.set(V.trim.p*(1-st.crane),st.heading,V.trim.r*(1-st.crane),"YXZ");rig.updateMatrixWorld();
  const portrait=CAM.aspect<.85,wide=portrait?CAMS.wideP:CAMS.wideL;
  if(st.crane>0)bez(CAMS.bow,CAMS.ctrl,wide,st.crane,_b);else _b.lerpVectors(CAMS.inside,CAMS.bow,st.push);
  CAM.position.copy(rig.localToWorld(_b.clone()));
  const fovT=V.baseFov+4*(1-st.push)*(st.crane===0?1:0);if(Math.abs(CAM.fov-fovT)>.01){CAM.fov=fovT;CAM.updateProjectionMatrix()}
  const slide=seg(st.push,0,.25);INT.center.matrix.makeBasis(INT.X,INT.SL,INT.IN).setPosition(_a.copy(INT.fo).addScaledVector(INT.SL,-slide*1.35));
  INT.shared.uT.value=time;INT.shared.uHaze.value=clamp((st.fog-.004)/.013,0,1)*.85+.12;INT.shared.uLight.value=LI*.85;
  const lostYaw=(Math.sin(time*.45)*.13+Math.sin(time*1.27)*.04)*(1-st.course);
  const toLight=Math.atan2(lampPos.x,-lampPos.z)-st.heading;
  const lookLight=seg(T,4.6,5.8)*(1-seg(T,7,8.4));
  const yawL=lerp(lostYaw,-toLight*.55,lookLight);
  const lookLocal=new THREE.Vector3(Math.sin(-yawL)*40,lerp(3.0,2.6,st.push),-Math.cos(yawL)*40);
  lookLocal.lerp(portrait?new THREE.Vector3(0,-1,2):new THREE.Vector3(-7,1.6,-26),st.crane);
  CAM.lookAt(rig.localToWorld(lookLocal));
  sky.position.copy(CAM.position);stars.position.copy(CAM.position);
  placeMist(time,clamp((st.fog-.004)/.013,0,1)*.95,LI*.4);
  updateSpray(dt,time,st);updateCoast(time,st.fog);
  if(COMP){GRADE.uniforms.uT.value=time%10;COMP.render()}else R.render(S,CAM);
  const needle=T<7.2?Math.sin(time*1.1)*48+Math.sin(time*2.9)*16+Math.sin(time*.37)*30:lerp(Math.sin(time*1.1)*48,-13,seg(T,7.2,8.6))+Math.sin(time*2)*1.2*(1-seg(T,8.6,10));
  INT.card.rotation.z=needle*Math.PI/180;INT.spin.rotation.z=lostYaw*3.2+Math.sin(time*.7)*.05;
  drawScreens(T,time,st,toLight,st.fog);
  /* flash as the beam sweeps across us */
  const cross=Math.abs(Math.atan2(Math.sin(yaw-yCam),Math.cos(yaw-yCam)));const fl=T<INTRO?BI*Math.max(0,1-cross/.11):0;
  const flEl=$("#flash");flEl.style.opacity=(fl*.85).toFixed(3);
  if(fl>0){const sp=lampPos.clone().project(CAM);flEl.style.setProperty("--fx",((sp.x*.5+.5)*100).toFixed(1)+"%");flEl.style.setProperty("--fy",((-sp.y*.5+.5)*100).toFixed(1)+"%")}
  return st}

/* captions */
const LOG=[[0,"02:14","Fog. No bearing."],[4.5,"02:15","Light on the starboard bow."],[7.3,"02:16","Course set."],[10.2,"02:17","Steady as she goes."]];
let logIdx=-1;
function updateLog(T){let i=-1;LOG.forEach((l,k)=>{if(T>=l[0]+.5)i=k});if(i!==logIdx){logIdx=i;const el=$("#logLine");if(i<0){el.innerHTML="";return}$("#logStamp").textContent=`Ship's log · ${LOG[i][1]}`;el.innerHTML=[...LOG[i][2]].map(c=>`<span>${c===" "?"&nbsp;":esc(c)}</span>`).join("");const sp=$$("span",el);sp.forEach((s,k)=>setTimeout(()=>s.classList.add("on"),k*28))}
  $("#log").style.opacity=T>12.2?Math.max(0,1-(T-12.2)/.8):1}

function setIntro(on){V.introActive=on;root.classList.toggle("intro-on",on);$("#log").hidden=!on;$("#skipIntro").hidden=!on;if(!on){$("#flash").style.opacity="0";onScroll()}}
function startVoyage(fromT){V.t0=performance.now()-fromT*1000;V.offset.x=0;V.offset.z=0;logIdx=-1;setIntro(fromT<INTRO);if(!V.raf&&V.visible)V.raf=requestAnimationFrame(loop)}
function skipIntro(){if(!V.introActive)return;V.t0=performance.now()-INTRO*1000;setIntro(false)}
function loop(now){if(!V.visible||!onHome()){V.raf=0;return}
  const dt=Math.min(.05,(now-(V.last||now))/1000);V.last=now;const T=(now-V.t0)/1000;
  renderVoyage(T,now/1000,dt);
  if(V.introActive){updateLog(T);if(T>=INTRO-.6)setIntro(false)}
  V.raf=requestAnimationFrame(loop)}

/* ================= static content ================= */
$("#workGrid").innerHTML=CASES.map(c=>`<a class="wcard" href="#case-${c.id}"><div class="frame"><img src="${c.imgs[0].src}" alt="${esc(c.imgs[0].alt)}" loading="lazy"><img src="${c.imgs[1].src}" alt="" loading="lazy"></div>
  <div class="meta"><div style="display:grid;gap:10px"><span class="label gold">${c.n} · ${esc(c.client)}</span><h3 class="big">${esc(c.name)}</h3><ul class="tags">${c.tags.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div><span class="label muted"${c.year?"":` data-note="Yıl bilgisi işletmeye sorulacak."`}>${c.year||"Ongoing"}</span></div></a>`).join("");
$("#svcList").innerHTML=SERVICES.map((s,i)=>`
  <div class="svc${i===0?" open":""}" id="service-${s.id}">
    <h3 style="margin:0"><button class="svc-btn" type="button" aria-expanded="${i===0}" aria-controls="sp-${s.id}"><span class="n">${s.n}</span><span class="t">${esc(s.name)}</span><span class="k">${esc(s.kicker)}</span><span class="pm" aria-hidden="true"></span></button></h3>
    <div class="svc-panel" id="sp-${s.id}" ${i===0?"":"inert"}><div><div class="svc-body">
      <div class="svc-pitch"><p class="lede"${s.draft?` data-note="Taslak metin, onaylanacak."`:""}>${esc(s.lede)}</p><div class="svc-links"><a class="arrow-link" href="#svc-${s.id}">Explore ${esc(s.name)} <span>→</span></a><a class="arrow-link" href="#contact" data-service="${s.id}">Let's talk <span>↗</span></a></div></div>
      <div class="groups">${s.groups.map(g=>`<div class="group"><h4>${esc(g.t)}</h4><ul>${g.i.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}${s.note?`<p class="svc-note">${esc(s.note)}</p>`:""}</div>
    </div></div></div>
  </div>`).join("");
function setSvc(el,open){el.classList.toggle("open",open);$(".svc-btn",el).setAttribute("aria-expanded",open);const p=$(".svc-panel",el);if(open)p.removeAttribute("inert");else p.setAttribute("inert","")}
$$(".svc").forEach(el=>$(".svc-btn",el).addEventListener("click",()=>setSvc(el,!el.classList.contains("open"))));
$("#foot-svcs").innerHTML=SERVICES.map(s=>`<li><a href="#svc-${s.id}">${esc(s.name)}</a></li>`).join("");
$("#svc-chips").innerHTML=SERVICES.map(s=>`<label class="chip"><input type="checkbox" name="services" id="c-${s.id}" value="${esc(s.name)}"><span>${esc(s.name)}</span></label>`).join("")+`<label class="chip"><input type="checkbox" name="services" id="c-unsure" value="Not sure yet"><span>Not sure yet</span></label>`;
/* route lights up as it scrolls in */
const stps=$$(".stp");
const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const i=stps.indexOf(e.target);setTimeout(()=>e.target.classList.add("lit"),reduce?0:i*180);rio.unobserve(e.target)}}),{threshold:.6});stps.forEach(s=>rio.observe(s));

/* header, nav */
function setNav(id){$$(".nav a").forEach(a=>a.setAttribute("aria-current",a.dataset.nav===id?"true":"false"))}
function onScroll(){const y=scrollY;$("#head").classList.toggle("solid",!onHome()||y>innerHeight*.6);
  if(!onHome())return;const yy=innerHeight*.4;let cur="top";for(const id of ["work","services","contact"]){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<yy)cur=id}setNav(cur)}
addEventListener("scroll",()=>{if(V.introActive&&scrollY>40)skipIntro();onScroll()},{passive:true});
["wheel","touchmove"].forEach(ev=>addEventListener(ev,()=>{if(V.introActive)skipIntro()},{passive:true}));
addEventListener("keydown",e=>{if(V.introActive&&["Escape","ArrowDown","PageDown"," ","Enter"].includes(e.key))skipIntro()});
$("#skipIntro").onclick=skipIntro;
$("#replay").onclick=()=>{if(!V.ok){toast("3D isn't available on this device");return}scrollTo({top:0,behavior:"instant"});startVoyage(0)};

/* fit the headline */
function fitHero(){const h=$("#heroH");h.style.fontSize="";const fs=parseFloat(getComputedStyle(h).fontSize);const wrap=h.parentElement;const cs=getComputedStyle(wrap);const maxW=(Math.min(wrap.clientWidth,$("#top").clientWidth)-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight))*(innerWidth>900?.72:1);const w=h.getBoundingClientRect().width;if(w>maxW)h.style.fontSize=(fs*maxW/w*.98).toFixed(1)+"px"}

/* ================= lightbox, pages, router ================= */
const lb=$("#lb");let lbSet=[],lbI=0,lbCase=null,lbReturn=null;
function lbShow(){const im=lbSet[lbI];$("#lb-img").src=im.src;$("#lb-img").alt=im.alt;$("#lb-cap").textContent=`${lbI+1} / ${lbSet.length} · ${im.alt}`;$("#lb-title").textContent=lbCase.name}
document.addEventListener("click",e=>{const b=e.target.closest("[data-lb]");if(!b)return;lbCase=CASES.find(c=>c.id===b.dataset.lb);lbSet=lbCase.imgs;lbI=+b.dataset.i;lbReturn=b;lbShow();lb.showModal()});
$("#lb-close").onclick=()=>lb.close();$("#lb-prev").onclick=()=>{lbI=(lbI-1+lbSet.length)%lbSet.length;lbShow()};$("#lb-next").onclick=()=>{lbI=(lbI+1)%lbSet.length;lbShow()};
lb.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")$("#lb-prev").click();if(e.key==="ArrowRight")$("#lb-next").click()});
lb.addEventListener("click",e=>{if(e.target.classList.contains("lb-stage")||e.target===lb)lb.close()});
lb.addEventListener("close",()=>lbReturn&&lbReturn.focus());
function shot(img,caseId,idx){return `<button class="shot" type="button" data-lb="${caseId}" data-i="${idx}" aria-label="Enlarge: ${esc(img.alt)}"><img src="${img.src}" alt="${esc(img.alt)}" width="960" height="1200"></button>`}
function ctaBand(title,svc){return `<section class="cta-band cream"><div class="wrap"><h2 class="big">${title}</h2><a class="btn dark" href="#contact" ${svc?`data-service="${svc}"`:""}>Start a project ↗</a></div></section>`}
function caseCard(c){return `<a class="rel-card" href="#case-${c.id}"><span class="shot"><img src="${c.imgs[0].src}" alt="" loading="lazy"></span><span class="label gold">${c.tags.join(" · ")}</span><h3 class="h3">${esc(c.name)}</h3></a>`}
function renderCase(c){const i=CASES.indexOf(c),next=CASES[(i+1)%CASES.length];
 page.innerHTML=`<article><header class="wrap page-hero"><a class="back" href="#work">← All work</a><span class="label gold">Case study · ${c.n}</span><h1 class="big">${esc(c.name).replace(" ","<br>")}</h1>
    <p class="lede muted" style="max-width:46ch" data-note="${DRAFT}">${esc(c.summary)}</p>
    <dl class="meta-dl"><div><dt>Client</dt><dd>${esc(c.client)}</dd></div><div><dt>Services</dt><dd>${c.tags.map(esc).join(", ")}</dd></div><div><dt>Year</dt><dd ${c.year?"":`data-note="Yıl bilgisi işletmeye sorulacak."`}>${c.year||"Ongoing"}</dd></div></dl></header>
  <div class="wrap case-gallery">${c.imgs.map((im,j)=>shot(im,c.id,j)).join("")}</div>
  <div class="wrap case-body" data-note="${DRAFT}"><section><span class="label gold">The brief</span><p>${esc(c.brief)}</p></section><section><span class="label gold">What we made</span><p>${esc(c.made)}</p></section><section><span class="label gold">Deliverables</span><ul>${c.deliv.map(d=>`<li>${esc(d)}</li>`).join("")}</ul></section></div>
  <div class="wrap"><div class="results review-only" data-note="Sonuç rakamları müşteriden izin alınarak eklenecek. Yoksa bu blok çıkar."><span class="label gold">Results</span><p class="muted">Reach, engagement or sales numbers go here once the client approves them.</p></div></div>
  <div class="wrap"><div class="next-band"><span class="label muted">Next case</span><a href="#case-${next.id}"><span class="big">${esc(next.name)} →</span></a></div></div></article>${ctaBand("Want work<br>like this?")}`;
 setNav("work");document.title=`${c.name} · Navy Night Creative`}
function renderSvc(s){const rel=s.work.map(id=>CASES.find(c=>c.id===id));
 page.innerHTML=`<article><header class="wrap page-hero"><a class="back" href="#services">← All services</a><span class="label gold">Service ${s.n} of 07 · ${esc(s.kicker)}</span><h1 class="big">${esc(s.name)}</h1>
    <p class="lede" style="max-width:40ch" ${s.draft?`data-note="Taslak metin, onaylanacak."`:""}>${esc(s.lede)}</p>
    <div class="hero-ctas"><a class="btn" href="#contact" data-service="${s.id}">Start a ${esc(s.name.toLowerCase())} project ↗</a><a class="arrow-link" href="#work">See our work <span>→</span></a></div></header>
  <section class="cream"><div class="wrap"><div class="svc-page-groups">${s.groups.map(g=>`<div class="group"><h4>${esc(g.t)}</h4><ul>${g.i.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>${s.note?`<p class="muted" style="font-size:14px;padding-bottom:48px">${esc(s.note)}</p>`:`<div style="height:24px"></div>`}</div></section>
  <section class="related wrap"><h2 class="big" style="font-size:clamp(2.4rem,6vw,4.6rem)">${esc(s.name)}<br><span class="outline">in practice</span></h2>
    ${rel.length?`<div class="rel-grid">${rel.map(caseCard).join("")}</div>`:`<div class="empty" data-note="Bu hizmet için henüz vaka yok. İş bitince buraya eklenecek."><p>Case studies for ${esc(s.name.toLowerCase())} are on the way. Ask us for recent examples when you get in touch.</p></div>`}
    <div style="margin-top:56px"><span class="label muted">Other services</span><div class="other-svcs">${SERVICES.filter(x=>x!==s).map(x=>`<a href="#svc-${x.id}">${x.n} ${esc(x.name)}</a>`).join("")}</div></div></section></article>${ctaBand(`Let's talk<br>${esc(s.name.toLowerCase())}.`,s.id)}`;
 setNav("services");document.title=`${s.name} · Navy Night Creative`}
function renderAbout(){
 page.innerHTML=`<article><header class="wrap page-hero"><a class="back" href="#top">← Home</a><span class="label gold">About Navy Night Creative</span><h1 class="big">One partner.<br><span class="outline">Every marketing</span><br>need<span class="gold">.</span></h1>
    <p class="lede muted" style="max-width:44ch">We bring strategy, creative execution, production and business support together under one accountable team.</p></header>
  <div class="wrap about-grid"><div style="display:grid;gap:22px"><svg viewBox="0 0 125.31 461.37" style="width:56px;height:206px" aria-hidden="true"><g fill="#f7f5ef"><path  d="M125.05,461.37H0s.16-3.23.16-3.23l15.04-177.89,7.28-83.31c26.65-5.31,53.28-5.38,79.95.09l22.62,264.33Z"></path><path  d="M79.83,165.91c-21.81-1.48-44.68-.95-66.16,4.92l.02-31.43c0-.73,1.14-1.74,1.68-1.66.68.09,1.42.82,1.91,1.71,3.92-1.06,7.73-2.11,11.83-2.5l.45-7.05c2.42-1.13,5.16-1.33,8.13-1.88.84-13.55.45-26.9.26-40.33l.21-4.51c-2.5.36-4.52.74-6.98,1.75-1.71-3.1,0-7.38-1.22-8.94-.51-.65-1.92-1.01-3-1.49-.95-2.1-1.01-5.19.06-7.19l29.12-25.02c.62-1.64.62-3.55.67-5.24,1.46-.18,2.32-.72,2.45-2.13s-.16-2.29-1.85-2.63c-.99-4.66-.45-9.68,3.73-12.25l.94-15.06.74-.02.88,14.92c4.27,2.66,4.83,7.18,4.04,12.34-1.3.51-1.9.76-2.05,2.14-.2,1.9.61,1.98,2.23,2.69.68,1.22.67,3.27.63,4.86l29.55,25.18c.77,2.33.94,5.25-.06,7.46-1.14.5-2.78.7-3.23,1.42-1.29,2.08.84,5.23-.91,8.95-2.28-.79-4.21-1.33-7.01-1.67l-.03,43.5c1.44,3.2,8.34.96,8.5,3.89l.35,6.2c4.15.5,8.01,1.29,11.93,2.48.54-.56,1.2-1.37,1.71-1.45s1.47.69,2,1.27v31.5c-10.87-2.64-20.79-4.13-31.52-4.71Z"></path><path  d="M73.2,190.12c-7.14-.48-14.27-.48-21.41,0-9.84.85-19.43,1.19-29.41,4.02-.61-7.74-3.64-14.2-9.24-19.99,8.75-3.19,17.42-3.67,26.31-4.91,15.16-1.22,30.64-1.29,45.79,0,8.9,1.25,17.55,1.75,26.67,4.85-5.37,5.72-9.08,12.19-9.36,20.1-9.77-2.62-19.43-3.24-29.35-4.06Z"></path></g></svg><h2 class="big" style="font-size:clamp(2.6rem,6vw,5rem)">Why a<br>lighthouse</h2></div>
    <div style="display:grid;gap:18px" data-note="Taslak metin: marka hikayesi işletmeyle onaylanacak."><p class="lede">A lighthouse doesn't sail the ship. It shows where the rocks are and where the harbor is.</p><p class="muted">That is the job we take on for the brands we work with. Direction comes first: who you are talking to, what you want them to do, and the shortest route there. Then we make the work that gets you there, and we stay on it after it ships.</p></div></div>
  <section class="cream"><div class="wrap principles"><div><span class="label" style="color:var(--gold-ink)">Navigate</span><p>Research, positioning and a practical path to growth.</p></div><div><span class="label" style="color:var(--gold-ink)">Narrate</span><p>A clear voice, meaningful messaging and a story worth telling.</p></div><div><span class="label" style="color:var(--gold-ink)">Create</span><p>Design, content, photography, video and print that bring it to life.</p></div></div></section>
  <div class="wrap principles"><div><h3 class="h3">One team</h3><p class="muted">Strategy, creative, production, digital and business support under one roof, so nothing gets lost between agencies.</p></div><div><h3 class="h3">One standard</h3><p class="muted">Specialists and suppliers are coordinated under one standard, with quality control before anything goes live.</p></div><div><h3 class="h3">Clear ownership</h3><p class="muted">One accountable partner from the first conversation to the next cycle of improvement.</p></div></div>
  <div class="wrap review-only" style="padding-bottom:64px" data-note="Ekip isimleri, rolleri ve fotoğrafları işletmeden alınacak."><span class="label gold">The team</span><div class="team-grid"><div>Photo · Name · Role</div><div>Photo · Name · Role</div><div>Photo · Name · Role</div><div>Photo · Name · Role</div></div></div>
  <div class="wrap us-band"><h2 class="big" style="font-size:clamp(2.6rem,6vw,5rem)">Launching<br>in the U.S.?</h2><div style="display:grid;gap:18px"><p class="muted">Alongside marketing, we coordinate the admin work of setting up: LLC formation, EIN application, license research, registered agent and bank account preparation, working with qualified professionals for legal, accounting and tax advice.</p><a class="arrow-link" href="#svc-marketing-business">Marketing &amp; Business <span>→</span></a></div></div></article>${ctaBand("Have an idea?<br>Let's give it direction.")}`;
 setNav("about");document.title="About · Navy Night Creative"}
let pendingService=null;
function showPage(fn,arg){if(V.introActive)setIntro(false);homeEl.hidden=true;page.hidden=false;fn(arg);scrollTo({top:0,behavior:"instant"});closeMenu();onScroll()}
function route(){const h=decodeURIComponent(location.hash.slice(1));
  if(h.startsWith("case-")){const c=CASES.find(x=>"case-"+x.id===h);if(c)return showPage(renderCase,c)}
  if(h.startsWith("svc-")){const s=SERVICES.find(x=>"svc-"+x.id===h);if(s)return showPage(renderSvc,s)}
  if(h==="about")return showPage(renderAbout);
  const was=homeEl.hidden;page.hidden=true;page.innerHTML="";homeEl.hidden=false;document.title="Navy Night Creative — Ideas With Direction";closeMenu();
  if(was){layout();if(V.ok&&!V.raf&&V.visible)V.raf=requestAnimationFrame(loop)}
  if(h.startsWith("service-")){const el=document.getElementById(h);if(el)setSvc(el,true)}
  const el=h&&h!=="review"&&document.getElementById(h);
  if(el){if(V.introActive&&h!=="top")skipIntro();requestAnimationFrame(()=>scrollTo({top:h==="top"?0:el.getBoundingClientRect().top+scrollY,behavior:was||reduce?"instant":"smooth"}))}else if(was)scrollTo({top:0,behavior:"instant"});
  if(h==="contact"&&pendingService){applyService(pendingService);pendingService=null}}
addEventListener("hashchange",route);
document.addEventListener("click",e=>{const a=e.target.closest("a[data-service]");if(!a)return;pendingService=a.dataset.service;if(location.hash==="#contact")route()});
function layout(){fitHero();if(V.ok)layoutVoyage()}
let rz;addEventListener("resize",()=>{clearTimeout(rz);rz=setTimeout(()=>{if(onHome())layout()},120)});

/* mobile menu, copy */
const mnav=$("#mnav");function closeMenu(){if(mnav.hidden)return;mnav.hidden=true;$("#burger").setAttribute("aria-expanded","false");document.body.style.overflow=""}
$("#burger").onclick=()=>{mnav.hidden=false;$("#burger").setAttribute("aria-expanded","true");document.body.style.overflow="hidden";$("#mclose").focus()};
$("#mclose").onclick=()=>{closeMenu();$("#burger").focus()};
mnav.addEventListener("click",e=>{if(e.target.closest("a"))closeMenu()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!mnav.hidden){closeMenu();$("#burger").focus()}});
document.addEventListener("click",e=>{const b=e.target.closest("[data-copy]");if(b)copyText(b.dataset.copy,"Email copied")});

/* planner */
const form=$("#brief"),stepsEls=$$(".pstep",form),bar=$$(".steps-bar li",form);let cur=0;
function showStep(i){cur=i;stepsEls.forEach((s,j)=>s.hidden=j!==i);bar.forEach((b,j)=>{b.classList.toggle("cur",j===i);b.classList.toggle("done",j<i)});$("#p-back").hidden=i===0;$("#p-next").hidden=i===2;$("#p-send").hidden=i!==2}
function setErr(id,msg,field){$("#"+id).textContent=msg;if(field)field.setAttribute("aria-invalid",msg?"true":"false")}
function validate(i){let first=null;
  if(i===0){const ok=$$('input[name="services"]:checked',form).length>0;setErr("err-svc",ok?"":"Pick at least one service, or choose Not sure yet.");if(!ok)first=$('input[name="services"]',form)}
  if(i===2){const n=$("#f-name"),m=$("#f-email"),t=$("#f-msg");
    const nOk=n.value.trim().length>1;setErr("err-name",nOk?"":"Add your name so we know who to reply to.",n);if(!nOk)first=first||n;
    const mOk=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m.value.trim());setErr("err-email",mOk?"":"Enter an email like you@company.com.",m);if(!mOk)first=first||m;
    const tOk=t.value.trim().length>=10;setErr("err-msg",tOk?"":"Add a sentence or two about the project (10 characters or more).",t);if(!tOk)first=first||t}
  if(first){first.focus();return false}return true}
$("#p-next").onclick=()=>{if(validate(cur)){showStep(cur+1);const f=stepsEls[cur].querySelector("input");f&&f.focus({preventScroll:true})}};
$("#p-back").onclick=()=>showStep(cur-1);
function collect(){const fd=new FormData(form);return{services:fd.getAll("services"),budget:fd.get("budget")||"",timeline:fd.get("timeline")||"",ongoing:!!fd.get("ongoing"),name:fd.get("name")||"",email:fd.get("email")||"",company:fd.get("company")||"",site:fd.get("site")||"",message:fd.get("message")||""}}
function restore(d){if(!d)return;$$('input[name="services"]',form).forEach(c=>c.checked=!!(d.services&&d.services.includes(c.value)));["budget","timeline"].forEach(k=>$$(`input[name="${k}"]`,form).forEach(r=>r.checked=r.value===d[k]));$("#ongoing").checked=!!d.ongoing;$("#f-name").value=d.name||"";$("#f-email").value=d.email||"";$("#f-company").value=d.company||"";$("#f-site").value=d.site||"";$("#f-msg").value=d.message||""}
let saveT;form.addEventListener("input",e=>{if(e.target.name==="services")setErr("err-svc","");if(e.target.getAttribute&&e.target.getAttribute("aria-invalid")==="true")e.target.setAttribute("aria-invalid","false");clearTimeout(saveT);saveT=setTimeout(()=>{store.set("nnc-brief",collect());$("#saved").textContent="Draft saved on this device"},500)});
function applyService(id){const s=SERVICES.find(x=>x.id===id);if(!s)return;const cb=$("#c-"+id);if(cb&&!cb.checked){cb.checked=true;form.dispatchEvent(new Event("input"))}if(!$("#done").hidden)return;showStep(0);toast(`${s.name} selected`)}
form.addEventListener("submit",e=>{e.preventDefault();if(!validate(2))return;if($("#f-hp").value)return;const d=collect();
  const brief=[`Project brief for Navy Night Creative`,``,`From: ${d.name}${d.company?" · "+d.company:""}`,`Email: ${d.email}`,d.site?`Website / Instagram: ${d.site}`:null,``,`Services: ${d.services.join(", ")}`,`Budget: ${d.budget||"Not specified"}`,`Start: ${d.timeline||"Not specified"}`,`Ongoing partner: ${d.ongoing?"Yes":"No"}`,``,`Message:`,d.message.trim()].filter(x=>x!==null).join("\n");
  $("#done-brief").textContent=brief;$("#done-h").textContent=`Thanks, ${d.name.trim().split(" ")[0]}.`;form.hidden=true;$("#done").hidden=false;$("#done").focus();store.del("nnc-brief")});
$("#copy-brief").onclick=()=>copyText($("#done-brief").textContent,"Brief copied");
$("#restart").onclick=()=>{form.reset();$("#saved").textContent="";form.hidden=false;$("#done").hidden=true;showStep(0)};
const draft=store.get("nnc-brief");if(draft){restore(draft);$("#saved").textContent="Draft restored from this device"}

/* review notes */
root.classList.remove("review");store.del("nnc-review");

/* ================= boot ================= */
V.ok=initVoyage();
if(!V.ok){root.classList.add("no-gl");setIntro(false)}
else{
  new IntersectionObserver(es=>{V.visible=es[0].isIntersecting;if(V.visible&&!V.raf&&onHome()&&!reduce)V.raf=requestAnimationFrame(loop)}).observe($("#top"));
  document.addEventListener("visibilitychange",()=>{if(document.hidden){cancelAnimationFrame(V.raf);V.raf=0}else if(V.visible&&onHome()&&!reduce){V.last=0;V.raf=requestAnimationFrame(loop)}});
  const deep=location.hash.slice(1)&&location.hash!=="#top"&&location.hash!=="#review";
  if(reduce){V.t0=performance.now()-INTRO*1000-5000;setIntro(false);renderVoyage(INTRO+5,0,0)}
  else startVoyage(deep?INTRO:0);
}
fitHero();route();onScroll();
if(document.fonts)document.fonts.ready.then(()=>fitHero());
