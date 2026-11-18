const products = [
  {name:'The Sunday Sneaker',color:'Tomato / Cloud',price:118,category:'Sneakers',badge:'BESTSELLER',image:'photo-1552346154-21d32810aba3',tone:'tomato'},
  {name:'The Easy One',color:'Butter / Chalk',price:98,category:'Everyday',badge:'JUST LANDED',image:'photo-1542291026-7eec264c27ff',tone:'butter'},
  {name:'The Anywhere Low',color:'Pine / Natural',price:124,category:'Sneakers',badge:'',image:'photo-1495555961986-6d4c1ecb7be3',tone:'pine'},
  {name:'The Day Trip',color:'Rose / Sand',price:108,category:'Everyday',badge:'JUST LANDED',image:'photo-1543163521-1bf539c55dd2',tone:'rose'}
];
const grid=document.querySelector('#product-grid');
let activeFilter='All';
const money=n=>'$'+n.toFixed(2);
function renderProducts(list=products){
  grid.innerHTML=list.map((p,i)=>`<article class="product-card" data-category="${p.category}"><div class="product-image-wrap"><img class="product-image" src="https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=800&q=80" alt="${p.name} in ${p.color}" loading="lazy" /><span class="product-badge" ${p.badge?'':'hidden'}>${p.badge}</span><button class="favorite-button" aria-label="Add ${p.name} to favorites" aria-pressed="false">♡</button><button class="quick-add" data-product="${p.name}">Add to bag <span>+</span></button></div><div class="product-info"><div><p class="product-name">${p.name}</p><p class="product-color">${p.color}</p></div><p class="product-price">${money(p.price)}</p></div></article>`).join('');
  document.querySelector('#product-count').textContent=String(list.length).padStart(2,'0');
}
renderProducts();
function filterProducts(filter){activeFilter=filter;const filtered=filter==='All'?products:filter==='New'?products.filter(p=>p.badge==='JUST LANDED'):products.filter(p=>p.category===filter);renderProducts(filtered);document.querySelector('#shop').scrollIntoView({behavior:'smooth'});}
document.querySelectorAll('[data-filter]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();filterProducts(link.dataset.filter)}));
const toast=document.querySelector('.toast');let toastTimer;
function showToast(text){toast.textContent=text;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
document.addEventListener('click',e=>{const add=e.target.closest('.quick-add');if(add){const count=document.querySelector('.bag-count');count.textContent=Number(count.textContent)+1;showToast(`${add.dataset.product} added to your bag`)}const favorite=e.target.closest('.favorite-button');if(favorite){const liked=favorite.getAttribute('aria-pressed')==='true';favorite.setAttribute('aria-pressed',String(!liked));favorite.classList.toggle('is-favorite',!liked);favorite.textContent=liked?'♡':'♥';favorite.setAttribute('aria-label',`${liked?'Add':'Remove'} ${favorite.parentElement.querySelector('.quick-add').dataset.product} ${liked?'to':'from'} favorites`)}});
document.querySelector('.sort-button').addEventListener('click',()=>{const sorted=[...products].reverse();renderProducts(sorted);showToast('Showing a fresh order');});
const searchDialog=document.querySelector('.search-dialog');document.querySelector('.search-trigger').addEventListener('click',()=>searchDialog.showModal());document.querySelector('.dialog-close').addEventListener('click',()=>searchDialog.close());
const searchInput=searchDialog.querySelector('input');searchInput.addEventListener('input',()=>{const query=searchInput.value.trim().toLowerCase();const matches=products.filter(p=>`${p.name} ${p.color} ${p.category}`.toLowerCase().includes(query));searchDialog.querySelector('.search-results').innerHTML=query?matches.map(p=>`<div>${p.name} <span style="float:right">${money(p.price)}</span></div>`).join('')||'No shoes found. Try another search.':''});
document.querySelector('.bag-button').addEventListener('click',()=>showToast(`${document.querySelector('.bag-count').textContent} items in your bag`));document.querySelector('.account-trigger').addEventListener('click',()=>showToast('Account sign-in is coming soon'));
document.querySelector('.mobile-menu').addEventListener('click',e=>{const button=e.currentTarget,nav=document.querySelector('.main-nav'),open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open)});document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.main-nav').classList.remove('is-open');document.querySelector('.mobile-menu').setAttribute('aria-expanded','false')}));
document.querySelector('.newsletter-form').addEventListener('submit',e=>{e.preventDefault();const input=e.currentTarget.querySelector('input');e.currentTarget.querySelector('.form-message').textContent='You’re on the list. Good things are coming.';input.value=''});
