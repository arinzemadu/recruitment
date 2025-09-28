document.getElementById('year').textContent = new Date().getFullYear();
const form=document.getElementById('contactForm');const status=document.getElementById('formStatus');
if(form){form.addEventListener('submit',async e=>{if(form.getAttribute('action')?.includes('formspree.io')){e.preventDefault();
const data=new FormData(form);const res=await fetch(form.action,{method:'POST',body:data,headers:{'Accept':'application/json'}});
if(res.ok){form.reset();status?.classList.remove('d-none');}else{alert('Something went wrong. Please email us.');}}});}