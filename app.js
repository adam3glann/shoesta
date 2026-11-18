const arrivals=[
  {name:'The Sunday Sneaker',color:'Tomato / Cloud',price:118,image:'photo-1552346154-21d32810aba3',tag:'BESTSELLER'},
  {name:'The Easy One',color:'Butter / Chalk',price:98,image:'photo-1542291026-7eec264c27ff',tag:'JUST LANDED'},
  {name:'The Anywhere Low',color:'Pine / Natural',price:124,image:'photo-1495555961986-6d4c1ecb7be3',tag:'NEW COLOR'},
  {name:'The Day Trip',color:'Rose / Sand',price:108,image:'photo-1525966222134-fcfa99b8ae77',tag:'JUST LANDED'}
];
const grid=document.querySelector('#arrival-grid');
if(grid)grid.innerHTML=arrivals.map(item=>`<article class="arrival-card"><a class="arrival-photo" href="product.html"><img src="https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=800&q=85" alt="${item.name}, ${item.color}" loading="lazy"><span class="arrival-tag">${item.tag}</span><span class="arrival-quick">VIEW THE PAIR <span style="float:right">↗</span></span></a><div class="arrival-meta"><div><h3>${item.name}</h3><p>${item.color}</p></div><strong>$${item.price}</strong></div></article>`).join('');
const toast=document.querySelector('.toast');let toastTimer;
function getBag(){try{return Number(localStorage.getItem('shoesta-bag')||0)}catch{return 0}}
function setBag(value){try{localStorage.setItem('shoesta-bag',String(value))}catch{}document.querySelectorAll('.bag-count').forEach(el=>el.textContent=value)}
function showToast(message){if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
setBag(getBag());
document.querySelector('.menu-toggle')?.addEventListener('click',event=>{const button=event.currentTarget,open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));document.querySelector('.nav-main')?.classList.toggle('open',!open)});
document.querySelector('.search-open')?.addEventListener('click',()=>document.querySelector('.search-dialog')?.showModal());
document.querySelector('.search-close')?.addEventListener('click',()=>document.querySelector('.search-dialog')?.close());
document.querySelector('.search-dialog input')?.addEventListener('input',event=>{const result=document.querySelector('.search-result');result.hidden=!event.target.value.trim()});
document.querySelector('.signup')?.addEventListener('submit',event=>{event.preventDefault();event.currentTarget.querySelector('.signup-message').textContent='You’re on the list. See you out there.';event.currentTarget.reset()});
window.shoestaBag={get:getBag,set:setBag,toast:showToast};
