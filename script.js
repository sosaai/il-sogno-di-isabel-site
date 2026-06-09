
const $ = (q, ctx=document) => ctx.querySelector(q);
const $$ = (q, ctx=document) => [...ctx.querySelectorAll(q)];
const loader = $('.site-loader');
if (loader) {
  let loaderSeen = false;
  try {
    loaderSeen = sessionStorage.getItem('isabelLoaderSeen') === '1';
    if (!loaderSeen) sessionStorage.setItem('isabelLoaderSeen', '1');
  } catch {}

  if (loaderSeen) {
    loader.remove();
  } else {
    setTimeout(() => {
      document.body.classList.add('loader-done');
      loader.addEventListener('transitionend', () => loader.remove(), {once: true});
      setTimeout(() => loader.remove(), 1000);
    }, 3000);
  }
}
const mobile = $('.mobile');
$('.hamb')?.addEventListener('click', () => mobile.classList.toggle('open'));
const io = new IntersectionObserver((entries)=> entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }}), {threshold:.14});
$$('.reveal').forEach(el=>io.observe(el));
$$('[data-lightbox]').forEach(img=>{
  img.addEventListener('click', ()=>{
    const o=document.createElement('div');
    o.style.cssText='position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.88);display:grid;place-items:center;padding:24px;cursor:zoom-out';
    o.innerHTML=`<img src="${img.src}" style="max-width:94vw;max-height:90vh;object-fit:contain;box-shadow:0 30px 90px rgba(0,0,0,.4)">`;
    o.onclick=()=>o.remove(); document.body.appendChild(o);
  });
});

$$('[data-whatsapp-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const phone = form.dataset.whatsappPhone;
    if (!phone) return;

    const data = new FormData(form);
    const lines = [form.dataset.whatsappLabel || 'Richiesta appuntamento'];
    for (const [key, value] of data.entries()) {
      const text = String(value).trim();
      if (text) lines.push(`${key}: ${text}`);
    }

    window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
  });
});
