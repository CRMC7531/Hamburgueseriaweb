
const burger=document.getElementById('burger'),nav=document.getElementById('nav');
function cerrarNav(){nav.classList.remove('abierto');burger.setAttribute('aria-expanded','false')}
burger.addEventListener('click',()=>{
  const abierto=nav.classList.toggle('abierto');
  burger.setAttribute('aria-expanded',abierto);
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',cerrarNav));

const filtros=document.querySelectorAll('.filtro'),platos=document.querySelectorAll('.plato');
filtros.forEach(f=>f.addEventListener('click',()=>{
  filtros.forEach(x=>x.setAttribute('aria-pressed',x===f));
  platos.forEach(p=>p.hidden=!(f.dataset.cat==='todo'||p.dataset.cat===f.dataset.cat));
}));

const select=document.getElementById('select-plato');
platos.forEach(p=>{
  const n=p.querySelector('h3').textContent;
  select.add(new Option(n+' – '+p.querySelector('.precio').textContent,n));
});
document.querySelectorAll('[data-pedir]').forEach(b=>b.addEventListener('click',()=>{
  select.value=b.dataset.pedir;
  document.getElementById('pedido').scrollIntoView({behavior:'smooth'});
  select.focus({preventScroll:true});
}));

const form=document.getElementById('form-pedido'),msg=document.getElementById('mensaje');
form.addEventListener('submit',e=>{
  e.preventDefault();
  msg.hidden=false;
  if(!form.checkValidity()){
    msg.style.background='#FFD9D4';msg.style.borderColor='#C8281E';
    msg.textContent='Revisa los campos: falta tu nombre, un teléfono válido o el plato.';
    form.reportValidity();return;
  }
  const d=new FormData(form);
  msg.style.background='';msg.style.borderColor='';
  msg.textContent='¡Pedido enviado, '+d.get('nombre')+'! '+d.get('cantidad')+' × '+d.get('plato')+'. Te llamaremos al '+d.get('telefono')+'.';
  form.reset();
});
