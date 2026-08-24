document.querySelectorAll('.menu-btn').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.toggle('open')));

// Comparadores antes/después: soporte robusto para ratón, trackpad, táctil y teclado.
document.querySelectorAll('.comparison').forEach(box=>{
  const input=box.querySelector('input[type="range"]');
  const before=box.querySelector('.before');
  const handle=box.querySelector('.handle');
  if(!before || !handle) return;

  const setValue=(value)=>{
    const n=Math.max(0,Math.min(100,Number(value)));
    const v=n+'%';
    before.style.width=v;
    handle.style.left=v;
    if(input) input.value=String(Math.round(n));
  };

  if(input){
    input.addEventListener('input',e=>setValue(e.target.value));
    setValue(input.value || 50);
  } else {
    setValue(50);
  }

  const valueFromPointer=(clientX)=>{
    const rect=box.getBoundingClientRect();
    return ((clientX-rect.left)/rect.width)*100;
  };

  let dragging=false;
  box.addEventListener('pointerdown',e=>{
    if(e.button!==undefined && e.button!==0) return;
    dragging=true;
    box.classList.add('is-dragging');
    try{ box.setPointerCapture(e.pointerId); }catch(_){ }
    setValue(valueFromPointer(e.clientX));
  });
  box.addEventListener('pointermove',e=>{
    if(!dragging) return;
    setValue(valueFromPointer(e.clientX));
  });
  const stop=(e)=>{
    if(!dragging) return;
    dragging=false;
    box.classList.remove('is-dragging');
    try{ box.releasePointerCapture(e.pointerId); }catch(_){ }
  };
  box.addEventListener('pointerup',stop);
  box.addEventListener('pointercancel',stop);

  // Evita que el navegador intente arrastrar la propia imagen.
  box.querySelectorAll('img').forEach(img=>img.addEventListener('dragstart',e=>e.preventDefault()));
});

function sendMail(event){event.preventDefault();const form=event.target;const msg=form.querySelector('.form-message');if(typeof emailjs==='undefined'){msg.className='form-message error';msg.textContent='No se ha podido cargar el envío. Escríbenos por WhatsApp.';return}emailjs.sendForm('capilartbcn@gmail.com','template_3cus0z8',form).then(()=>{msg.className='form-message success';msg.textContent='✓ Mensaje enviado correctamente. Te responderemos lo antes posible.';form.reset()},()=>{msg.className='form-message error';msg.textContent='No se ha podido enviar. Escríbenos por WhatsApp.'})}
