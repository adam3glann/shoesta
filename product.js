const imageSets={
  'Tomato / Cloud':['photo-1552346154-21d32810aba3','photo-1542291026-7eec264c27ff','photo-1525966222134-fcfa99b8ae77','photo-1495555961986-6d4c1ecb7be3'],
  'Butter / Chalk':['photo-1495555961986-6d4c1ecb7be3','photo-1552346154-21d32810aba3','photo-1525966222134-fcfa99b8ae77','photo-1542291026-7eec264c27ff'],
  'Pine / Natural':['photo-1525966222134-fcfa99b8ae77','photo-1495555961986-6d4c1ecb7be3','photo-1542291026-7eec264c27ff','photo-1552346154-21d32810aba3']
};
let activeSet=imageSets['Tomato / Cloud'];
let selectedIndex=0;
const mainImage=document.querySelector('#main-product-image');
const galleryMain=document.querySelector('.gallery-main');
function showImage(index){selectedIndex=index;const id=activeSet[index];mainImage.src=`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1500&q=90`;mainImage.alt=`The Sunday Sneaker in ${document.querySelector('.selected-color-name').textContent}, view ${index+1}`;document.querySelectorAll('.thumb').forEach((thumb,i)=>{thumb.classList.toggle('active',i===index);thumb.querySelector('img').src=`https://images.unsplash.com/${activeSet[i]}?auto=format&fit=crop&w=180&q=70`});document.querySelector('.gallery-index').innerHTML=`0${index+1} / 04 &nbsp; · &nbsp; CLICK TO ZOOM`;galleryMain.classList.remove('zoomed')}
document.querySelectorAll('.thumb').forEach(button=>button.addEventListener('click',()=>showImage(Number(button.dataset.index))));
galleryMain.addEventListener('click',()=>galleryMain.classList.toggle('zoomed'));
document.querySelectorAll('.color-swatch').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.color-swatch').forEach(swatch=>{const selected=swatch===button;swatch.classList.toggle('active',selected);swatch.setAttribute('aria-pressed',String(selected))});document.querySelector('.selected-color-name').textContent=button.dataset.color;activeSet=imageSets[button.dataset.color];showImage(0)}));
document.querySelectorAll('.size-option:not(:disabled)').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.size-option').forEach(size=>size.classList.remove('selected'));button.classList.add('selected');document.querySelector('.size-error').textContent=''}));
const sizeDialog=document.querySelector('.size-dialog');document.querySelector('.size-guide').addEventListener('click',()=>sizeDialog.showModal());sizeDialog.querySelector('.search-close').addEventListener('click',()=>sizeDialog.close());
document.querySelector('.add-button').addEventListener('click',()=>{const size=document.querySelector('.size-option.selected');if(!size){document.querySelector('.size-error').textContent='Choose your size to add this pair to your bag.';document.querySelector('.size-row').scrollIntoView({behavior:'smooth',block:'center'});return}const next=(window.shoestaBag?.get()??0)+1;window.shoestaBag?.set(next);window.shoestaBag?.toast(`The Sunday Sneaker · ${size.textContent} added to your bag`)});
