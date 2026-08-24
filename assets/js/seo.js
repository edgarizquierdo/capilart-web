document.querySelectorAll('.menu-btn').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.toggle('open')));

// Comparador V7: las dos fotos permanecen inmóviles; solo cambia una máscara de recorte.
document.querySelectorAll('.comparison').forEach(box=>{
  const input=box.querySelector('input[type="range"]');
  const handle=box.querySelector('.handle');
  if(!handle) return;

  let value=Number(input?.value || 50);
  const setValue=(n)=>{
    value=Math.max(0,Math.min(100,Number(n)));
    box.style.setProperty('--compare-pos', value+'%');
    if(input) input.value=String(Math.round(value));
    handle.setAttribute('aria-valuenow', String(Math.round(value)));
  };
  setValue(value);

  box.tabIndex=0;
  box.setAttribute('role','slider');
  box.setAttribute('aria-valuemin','0');
  box.setAttribute('aria-valuemax','100');
  box.setAttribute('aria-label', input?.getAttribute('aria-label') || 'Comparar antes y después');

  const fromX=(clientX)=>{
    const r=box.getBoundingClientRect();
    return ((clientX-r.left)/r.width)*100;
  };

  let dragging=false;
  box.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse' && e.button!==0) return;
    dragging=true;
    box.classList.add('is-dragging');
    if(e.pointerType==='mouse') e.preventDefault();
    try{box.setPointerCapture(e.pointerId)}catch(_){}
    setValue(fromX(e.clientX));
  });
  box.addEventListener('pointermove',e=>{
    if(!dragging) return;
    if(e.pointerType==='mouse') e.preventDefault();
    setValue(fromX(e.clientX));
  });
  const stop=e=>{
    if(!dragging) return;
    dragging=false; box.classList.remove('is-dragging');
    try{box.releasePointerCapture(e.pointerId)}catch(_){}
  };
  box.addEventListener('pointerup',stop);
  box.addEventListener('pointercancel',stop);
  box.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft'){e.preventDefault();setValue(value-2)}
    if(e.key==='ArrowRight'){e.preventDefault();setValue(value+2)}
    if(e.key==='Home'){e.preventDefault();setValue(0)}
    if(e.key==='End'){e.preventDefault();setValue(100)}
  });
  box.querySelectorAll('img').forEach(img=>img.addEventListener('dragstart',e=>e.preventDefault()));
});

function sendMail(event){event.preventDefault();const form=event.target;const msg=form.querySelector('.form-message');if(typeof emailjs==='undefined'){msg.className='form-message error';msg.textContent='No se ha podido cargar el envío. Escríbenos por WhatsApp.';return}emailjs.sendForm('capilartbcn@gmail.com','template_3cus0z8',form).then(()=>{msg.className='form-message success';msg.textContent='✓ Mensaje enviado correctamente. Te responderemos lo antes posible.';form.reset()},()=>{msg.className='form-message error';msg.textContent='No se ha podido enviar. Escríbenos por WhatsApp.'})}
