(()=>{
  const lang=document.body.dataset.lang;
  try{localStorage.setItem('ryvo-locale',lang)}catch{}
  const menu=document.querySelector('.mobile-menu'),open=document.querySelector('.menu-button'),close=document.querySelector('.menu-close');
  menu?.setAttribute('role','dialog');menu?.setAttribute('aria-modal','true');
  const setMenu=shown=>{menu.hidden=!shown;open.setAttribute('aria-expanded',String(shown));document.body.style.overflow=shown?'hidden':'';if(shown)close.focus();else open.focus()};
  open?.addEventListener('click',()=>setMenu(true));close?.addEventListener('click',()=>setMenu(false));
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.hidden=true;document.body.style.overflow='';open.setAttribute('aria-expanded','false')}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden)setMenu(false)});
  document.addEventListener('keydown',e=>{if(e.key!=='Tab'||menu.hidden)return;const items=[...menu.querySelectorAll('a,button')].filter(el=>el.getClientRects().length);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
  document.querySelectorAll('[data-lang]').forEach(a=>a.addEventListener('click',()=>{try{localStorage.setItem('ryvo-locale',a.dataset.lang)}catch{}if(location.hash)a.href+=location.hash}));
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced){try{if(!sessionStorage.getItem('ryvo-intro-seen')){sessionStorage.setItem('ryvo-intro-seen','1');document.body.classList.add('intro-active');setTimeout(()=>document.body.classList.remove('intro-active'),1450)}}catch{}}
  document.addEventListener('click',event=>{if(reduced||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const a=event.target.closest('a[href]');if(!a||a.target||a.hasAttribute('download'))return;const next=new URL(a.href,location.href);if(next.origin!==location.origin||next.pathname===location.pathname)return;event.preventDefault();document.body.classList.add('is-leaving');setTimeout(()=>location.assign(next.href),280)});
  window.addEventListener('pageshow',()=>document.body.classList.remove('is-leaving'));
  const form=document.querySelector('.contact-form');if(!form)return;
  const message=lang==='pt'?{name:'Indica o teu nome.',email:'Indica um email válido.',topic:'Escolhe um tema.',message:'Escreve pelo menos 10 caracteres.',subject:'Contacto RYVO',fields:['Nome','Email','Tema','Mensagem']}:{name:'Enter your name.',email:'Enter a valid email address.',topic:'Choose a topic.',message:'Write at least 10 characters.',subject:'RYVO contact',fields:['Name','Email','Topic','Message']};
  for(const field of form.elements){if(!field.name)continue;for(const type of ['input','change'])field.addEventListener(type,()=>{field.setCustomValidity('');field.removeAttribute('aria-invalid')})}
  form.addEventListener('submit',event=>{event.preventDefault();const fields=Object.fromEntries(['name','email','topic','message'].map(key=>[key,form.elements.namedItem(key)]));for(const field of Object.values(fields)){field.setCustomValidity('');field.removeAttribute('aria-invalid')}
    if(!fields.name.value.trim())fields.name.setCustomValidity(message.name);
    if(!fields.email.value.trim()||fields.email.validity.typeMismatch)fields.email.setCustomValidity(message.email);
    if(!fields.topic.value)fields.topic.setCustomValidity(message.topic);
    if(fields.message.value.trim().length<10)fields.message.setCustomValidity(message.message);
    const invalid=Object.values(fields).find(field=>!field.checkValidity());if(invalid){invalid.setAttribute('aria-invalid','true');invalid.reportValidity();invalid.focus();return}
    const subject=`${message.subject} — ${fields.topic.value}`;
    const body=[`${message.fields[0]}: ${fields.name.value.trim()}`,`${message.fields[1]}: ${fields.email.value.trim()}`,`${message.fields[2]}: ${fields.topic.value}`,'',`${message.fields[3]}:`,fields.message.value.trim()].join('\n');
    form.querySelector('.contact-form__status').textContent=form.querySelector('.contact-form__status').dataset.success;
    location.href=`mailto:geral@ryvo.pt?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
