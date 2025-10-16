import"./base-DDXWwQWU.js";import{u as l}from"./utils-Ds_x5a_2.js";document.addEventListener("DOMContentLoaded",function(){const a=document.querySelectorAll(".hero-slide"),t=document.querySelectorAll(".nav-dot");let r=0;const n=5e3;function s(o){a.forEach(i=>i.classList.remove("active")),t.forEach(i=>i.classList.remove("active")),a[o].classList.add("active"),t[o].classList.add("active"),r=o}function e(){let o=r+1;o>=a.length&&(o=0),s(o)}let c=setInterval(e,n);const d=document.querySelector(".hero-slideshow");d.addEventListener("mouseenter",()=>{clearInterval(c)}),d.addEventListener("mouseleave",()=>{c=setInterval(e,n)}),t.forEach((o,i)=>{o.addEventListener("click",()=>{clearInterval(c),s(i),c=setInterval(e,n)})})});const u=document.querySelector(".mobile-menu-btn"),m=document.querySelector(".main-nav");document.querySelector(".cart-btn");document.querySelector(".cart-count");u.addEventListener("click",()=>{m.classList.toggle("active")});l();async function v(a){try{const t=await fetch(a);if(!t.ok)throw new Error("Network response was not ok");return await t.json()}catch(t){return console.error("Error fetching data:",t),null}}if(document.querySelector(".products-grid")){let t=function(r,n){const s=document.querySelector(n);s.innerHTML=r.map(e=>`
            <div class="product-card">
                <div class="product-image">
                    <img src="${e.thumbnail}" alt="${e.title}">
                    <button class="quick-view" data-id="${e.id}">Quick View</button>
                </div>
                <div class="product-info">
                    <h3>${e.title}</h3>
                    <div class="product-price">${formatPrice(e.price)}</div>
                    <div class="product-rating">${"★".repeat(Math.round(e.rating))} ${"☆".repeat(5-Math.round(e.rating))}</div>
                    <button class="btn btn-primary add-to-cart" data-id="${e.id}">Add to Cart</button>
                </div>
            </div>
        `).join(""),document.querySelectorAll(".add-to-cart").forEach(e=>{e.addEventListener("click",addToCart)})};async function a(){const r=await v("https://scout-amazon-data.p.rapidapi.com/search?keyword=toys");r&&r.products&&t(r.products,".products-grid")}a()}if(document.querySelector(".testimonial-slider")){let t=function(){const r=document.querySelector(".testimonial-slider");r.innerHTML=a.map(n=>`
        <div class="testimonial">
            <div class="testimonial-rating">
                ${"★".repeat(n.rating)}${"☆".repeat(5-n.rating)}
            </div>
            <p class="testimonial-content">"${n.content}"</p>
            <div class="testimonial-author">
                <strong>${n.name}</strong>
                <span>${n.role}</span>
            </div>
        </div>
    `).join("")};const a=[{name:"Sarah J.",role:"Parent of two",content:"WonderNest Finds has become my go-to for birthday gifts. The quality is always excellent and the kids love them!",rating:5},{name:"Michael T.",role:"Grandfather",content:"I appreciate the educational toys selection. My grandson is learning while having fun - perfect combination!",rating:4},{name:"Lisa M.",role:"Teacher",content:"I regularly purchase classroom toys from WonderNest. The prices are fair and the products hold up well with lots of use.",rating:5}];t()}
