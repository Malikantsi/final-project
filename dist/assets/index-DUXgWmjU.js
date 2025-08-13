(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=a(e);fetch(e.href,n)}})();document.addEventListener("DOMContentLoaded",function(){const c=document.querySelectorAll(".hero-slide"),t=document.querySelectorAll(".nav-dot");let a=0;const r=5e3;function e(i){c.forEach(s=>s.classList.remove("active")),t.forEach(s=>s.classList.remove("active")),c[i].classList.add("active"),t[i].classList.add("active"),a=i}function n(){let i=a+1;i>=c.length&&(i=0),e(i)}let o=setInterval(n,r);const l=document.querySelector(".hero-slideshow");l.addEventListener("mouseenter",()=>{clearInterval(o)}),l.addEventListener("mouseleave",()=>{o=setInterval(n,r)}),t.forEach((i,s)=>{i.addEventListener("click",()=>{clearInterval(o),e(s),o=setInterval(n,r)})})});const u=document.querySelector(".mobile-menu-btn"),m=document.querySelector(".main-nav");document.querySelector(".cart-btn");const d=document.querySelector(".cart-count");u.addEventListener("click",()=>{m.classList.toggle("active")});function f(){const c=JSON.parse(localStorage.getItem("cart"))||[];d.textContent=c.reduce((t,a)=>t+a.quantity,0)}f();function h(c){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(c)}async function p(c){try{const t=await fetch(c);if(!t.ok)throw new Error("Network response was not ok");return await t.json()}catch(t){return console.error("Error fetching data:",t),null}}if(document.querySelector(".products-grid")){let t=function(r,e){const n=document.querySelector(e);n.innerHTML=r.map(o=>`
            <div class="product-card">
                <div class="product-image">
                    <img src="${o.thumbnail}" alt="${o.title}">
                    <button class="quick-view" data-id="${o.id}">Quick View</button>
                </div>
                <div class="product-info">
                    <h3>${o.title}</h3>
                    <div class="product-price">${h(o.price)}</div>
                    <div class="product-rating">${"★".repeat(Math.round(o.rating))} ${"☆".repeat(5-Math.round(o.rating))}</div>
                    <button class="btn btn-primary add-to-cart" data-id="${o.id}">Add to Cart</button>
                </div>
            </div>
        `).join(""),document.querySelectorAll(".add-to-cart").forEach(o=>{o.addEventListener("click",a)})},a=function(r){const e=r.target.dataset.id;alert(`Product ${e} added to cart`);const n=parseInt(d.textContent);d.textContent=n+1};var v=t,y=a;async function c(){const r=await p("https://dummyjson.com/products?limit=6");r&&r.products&&t(r.products,".products-grid")}c()}if(document.querySelector(".testimonial-slider")){let t=function(){const a=document.querySelector(".testimonial-slider");a.innerHTML=c.map(r=>`
        <div class="testimonial">
            <div class="testimonial-rating">
                ${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}
            </div>
            <p class="testimonial-content">"${r.content}"</p>
            <div class="testimonial-author">
                <strong>${r.name}</strong>
                <span>${r.role}</span>
            </div>
        </div>
    `).join("")};var g=t;const c=[{name:"Sarah J.",role:"Parent of two",content:"WonderNest Finds has become my go-to for birthday gifts. The quality is always excellent and the kids love them!",rating:5},{name:"Michael T.",role:"Grandfather",content:"I appreciate the educational toys selection. My grandson is learning while having fun - perfect combination!",rating:4},{name:"Lisa M.",role:"Teacher",content:"I regularly purchase classroom toys from WonderNest. The prices are fair and the products hold up well with lots of use.",rating:5}];t()}
