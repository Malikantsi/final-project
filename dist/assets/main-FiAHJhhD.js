document.addEventListener("DOMContentLoaded",function(){const r=document.querySelectorAll(".hero-slide"),e=document.querySelectorAll(".nav-dot");let o=0;const t=5e3;function i(a){r.forEach(s=>s.classList.remove("active")),e.forEach(s=>s.classList.remove("active")),r[a].classList.add("active"),e[a].classList.add("active"),o=a}function c(){let a=o+1;a>=r.length&&(a=0),i(a)}let n=setInterval(c,t);const l=document.querySelector(".hero-slideshow");l.addEventListener("mouseenter",()=>{clearInterval(n)}),l.addEventListener("mouseleave",()=>{n=setInterval(c,t)}),e.forEach((a,s)=>{a.addEventListener("click",()=>{clearInterval(n),i(s),n=setInterval(c,t)})})});const u=document.querySelector(".mobile-menu-btn"),m=document.querySelector(".main-nav");document.querySelector(".cart-btn");const d=document.querySelector(".cart-count");u.addEventListener("click",()=>{m.classList.toggle("active")});function v(){const r=JSON.parse(localStorage.getItem("cart"))||[];d.textContent=r.reduce((e,o)=>e+o.quantity,0)}v();function h(r){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(r)}async function f(r){try{const e=await fetch(r);if(!e.ok)throw new Error("Network response was not ok");return await e.json()}catch(e){return console.error("Error fetching data:",e),null}}if(document.querySelector(".products-grid")){let e=function(t,i){const c=document.querySelector(i);c.innerHTML=t.map(n=>`
            <div class="product-card">
                <div class="product-image">
                    <img src="${n.thumbnail}" alt="${n.title}">
                    <button class="quick-view" data-id="${n.id}">Quick View</button>
                </div>
                <div class="product-info">
                    <h3>${n.title}</h3>
                    <div class="product-price">${h(n.price)}</div>
                    <div class="product-rating">${"★".repeat(Math.round(n.rating))} ${"☆".repeat(5-Math.round(n.rating))}</div>
                    <button class="btn btn-primary add-to-cart" data-id="${n.id}">Add to Cart</button>
                </div>
            </div>
        `).join(""),document.querySelectorAll(".add-to-cart").forEach(n=>{n.addEventListener("click",o)})},o=function(t){const i=t.target.dataset.id;alert(`Product ${i} added to cart`);const c=parseInt(d.textContent);d.textContent=c+1};var p=e,y=o;async function r(){const t=await f("https://dummyjson.com/products?limit=6");t&&t.products&&e(t.products,".products-grid")}r()}if(document.querySelector(".testimonial-slider")){let e=function(){const o=document.querySelector(".testimonial-slider");o.innerHTML=r.map(t=>`
        <div class="testimonial">
            <div class="testimonial-rating">
                ${"★".repeat(t.rating)}${"☆".repeat(5-t.rating)}
            </div>
            <p class="testimonial-content">"${t.content}"</p>
            <div class="testimonial-author">
                <strong>${t.name}</strong>
                <span>${t.role}</span>
            </div>
        </div>
    `).join("")};var g=e;const r=[{name:"Sarah J.",role:"Parent of two",content:"WonderNest Finds has become my go-to for birthday gifts. The quality is always excellent and the kids love them!",rating:5},{name:"Michael T.",role:"Grandfather",content:"I appreciate the educational toys selection. My grandson is learning while having fun - perfect combination!",rating:4},{name:"Lisa M.",role:"Teacher",content:"I regularly purchase classroom toys from WonderNest. The prices are fair and the products hold up well with lots of use.",rating:5}];e()}
