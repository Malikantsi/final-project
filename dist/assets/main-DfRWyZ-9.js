import{s as l,u}from"./utils-BLfInb8w.js";document.addEventListener("DOMContentLoaded",function(){const n=document.querySelectorAll(".hero-slide"),e=document.querySelectorAll(".nav-dot");let r=0;const o=5e3;function s(a){n.forEach(i=>i.classList.remove("active")),e.forEach(i=>i.classList.remove("active")),n[a].classList.add("active"),e[a].classList.add("active"),r=a}function t(){let a=r+1;a>=n.length&&(a=0),s(a)}let c=setInterval(t,o);const d=document.querySelector(".hero-slideshow");d.addEventListener("mouseenter",()=>{clearInterval(c)}),d.addEventListener("mouseleave",()=>{c=setInterval(t,o)}),e.forEach((a,i)=>{a.addEventListener("click",()=>{clearInterval(c),s(i),c=setInterval(t,o)})})});document.querySelector(".cart-count");document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".mobile-menu-btn"),e=document.querySelector(".nav-menu");n&&e?l(n,e):console.warn("Mobile menu elements not found.")});u();async function m(n){try{const e=await fetch(n);if(!e.ok)throw new Error("Network response was not ok");return await e.json()}catch(e){return console.error("Error fetching data:",e),null}}if(document.querySelector(".products-grid")){let e=function(r,o){const s=document.querySelector(o);s.innerHTML=r.map(t=>`
            <div class="product-card">
                <div class="product-image">
                    <img src="${t.thumbnail}" alt="${t.title}">
                    <button class="quick-view" data-id="${t.id}">Quick View</button>
                </div>
                <div class="product-info">
                    <h3>${t.title}</h3>
                    <div class="product-price">${formatPrice(t.price)}</div>
                    <div class="product-rating">${"★".repeat(Math.round(t.rating))} ${"☆".repeat(5-Math.round(t.rating))}</div>
                    <button class="btn btn-primary add-to-cart" data-id="${t.id}">Add to Cart</button>
                </div>
            </div>
        `).join(""),document.querySelectorAll(".add-to-cart").forEach(t=>{t.addEventListener("click",addToCart)})};async function n(){const r=await m("https://scout-amazon-data.p.rapidapi.com/search?keyword=toys");r&&r.products&&e(r.products,".products-grid")}n()}if(document.querySelector(".testimonial-slider")){let e=function(){const r=document.querySelector(".testimonial-slider");r.innerHTML=n.map(o=>`
        <div class="testimonial">
            <div class="testimonial-rating">
                ${"★".repeat(o.rating)}${"☆".repeat(5-o.rating)}
            </div>
            <p class="testimonial-content">"${o.content}"</p>
            <div class="testimonial-author">
                <strong>${o.name}</strong>
                <span>${o.role}</span>
            </div>
        </div>
    `).join("")};const n=[{name:"Sarah J.",role:"Parent of two",content:"WonderNest Finds has become my go-to for birthday gifts. The quality is always excellent and the kids love them!",rating:5},{name:"Michael T.",role:"Grandfather",content:"I appreciate the educational toys selection. My grandson is learning while having fun - perfect combination!",rating:4},{name:"Lisa M.",role:"Teacher",content:"I regularly purchase classroom toys from WonderNest. The prices are fair and the products hold up well with lots of use.",rating:5}];e()}
