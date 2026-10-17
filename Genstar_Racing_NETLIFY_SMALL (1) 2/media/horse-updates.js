(function () {
'use strict';
const list=document.getElementById('genstar-feed-list');
const filter=document.getElementById('genstar-feed-horse');
if(!list || !filter) return;
let posts=[];
const safeHttp=(value)=>{try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)?u.href:''}catch(e){return ''}};
const esc=(v)=>String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function videoMarkup(src){
  const link=safeHttp(src);if(!link)return '';
  const u=new URL(link),host=u.hostname.toLowerCase().replace(/^www\./,'');
  let id='';
  if(['youtube.com','m.youtube.com','youtube-nocookie.com'].includes(host)){
    id=u.searchParams.get('v')||(/^\/(shorts|embed)\/([\w-]{11})/.exec(u.pathname)||[])[2]||'';
  }else if(host==='youtu.be'){id=u.pathname.slice(1).split('/')[0]}
  if(/^[\w-]{11}$/.test(id))return '<iframe class="genstar-update-video" title="Horse update video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen src="https://www.youtube-nocookie.com/embed/'+id+'"></iframe>';
  if(host==='vimeo.com'||host==='player.vimeo.com'){
    const match=u.pathname.match(/\/(?:video\/)?(\d{6,12})/);
    if(match)return '<iframe class="genstar-update-video" loading="lazy" title="Horse update video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen src="https://player.vimeo.com/video/'+match[1]+'"></iframe>';
  }
  if(/\.(mp4|webm|mov)(\?|$)/i.test(u.pathname))return '<video class="genstar-update-video" controls preload="metadata" src="'+esc(link)+'"></video>';
  return '<a class="genstar-update-video-link" target="_blank" rel="noopener noreferrer" href="'+esc(link)+'">Watch video ↗</a>';
}
function photoMarkup(items){
  const photos=Array.isArray(items)?items:[];
  const links=photos.map(p=>safeHttp(typeof p==='string'?p:p&&p.image)).filter(Boolean).slice(0,12);
  return links.length?'<div class="genstar-update-gallery">'+links.map(url=>'<img loading="lazy" alt="Stable update photo" src="'+esc(url)+'" data-genstar-photo="'+esc(url)+'">').join('')+'</div>':'';
}
function formatDate(text){const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(text||''));if(!m)return String(text||'');const d=new Date(Number(m[1]),Number(m[2])-1,Number(m[3]));return d.toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'});}
function draw(){const which=filter.value;const shown=posts.filter(p=>!which||p.horse===which||p.horse==='All horses').sort((a,b)=>String(b.date).localeCompare(String(a.date)));
if(!shown.length){list.innerHTML='<div class="genstar-feed-empty">No published updates for '+(which?esc(which):'the stable')+' yet. Check back for new training photos and videos.</div>';return}
list.innerHTML=shown.map(p=>{
 const photos=photoMarkup(p.photos);
 const v=videoMarkup(p.video_url||p.video_file||'');
 return '<article class="genstar-update">'+photos+v+'<div class="genstar-update-info"><div class="genstar-update-meta">'+esc(formatDate(p.date))+' · '+esc(p.horse||'Stable')+(p.category?' · '+esc(p.category):'')+'</div><h3>'+esc(p.title||'Stable update')+'</h3><p>'+esc(p.body||'')+'</p></div></article>';
}).join('');
}
filter.addEventListener('change',draw);
list.addEventListener('click',e=>{
 const img=e.target.closest('img[data-genstar-photo]');if(!img)return;
 const layer=document.createElement('div');layer.className='genstar-image-dialog';layer.setAttribute('role','button');layer.setAttribute('tabindex','0');layer.setAttribute('aria-label','Close photo');
 const photo=document.createElement('img');photo.src=img.dataset.genstarPhoto;photo.alt=img.alt;layer.appendChild(photo);
 const close=()=>layer.remove();layer.addEventListener('click',close);layer.addEventListener('keydown',ev=>{if(ev.key==='Escape'||ev.key==='Enter'){ev.preventDefault();close()}});document.body.appendChild(layer);layer.focus();
});
fetch('/content/horse-updates.json',{cache:'no-store'}).then(res=>{if(!res.ok)throw Error('Updates feed could not be loaded');return res.json()}).then(data=>{posts=(Array.isArray(data.posts)?data.posts:[]).filter(p=>p&&p.status!=='draft');draw()}).catch(()=>{list.innerHTML='<div class="genstar-feed-empty">Updates are not available right now. Please try again later.</div>'});
})();