(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(o){if(o.ep)return;o.ep=!0;const e=n(o);fetch(o.href,e)}})();function u(){const r=document.querySelector(".cart-count");console.log("updateCartCount: Invoked");const t=JSON.parse(localStorage.getItem("cart"))||[];r.textContent=t.length}function h(r){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(r)}function p(r,t){let n=JSON.parse(localStorage.getItem(r))||[];n.push(t),localStorage.setItem(r,JSON.stringify(n)),localStorage.setItem("product-cart-count",JSON.stringify(m("cart")?.length||0))}function m(r){return JSON.parse(localStorage.getItem(r))}document.addEventListener("DOMContentLoaded",function(){const r=document.querySelectorAll(".hero-slide"),t=document.querySelectorAll(".nav-dot");let n=0;const a=5e3;function o(c){r.forEach(i=>i.classList.remove("active")),t.forEach(i=>i.classList.remove("active")),r[c].classList.add("active"),t[c].classList.add("active"),n=c}function e(){let c=n+1;c>=r.length&&(c=0),o(c)}let s=setInterval(e,a);const l=document.querySelector(".hero-slideshow");l.addEventListener("mouseenter",()=>{clearInterval(s)}),l.addEventListener("mouseleave",()=>{s=setInterval(e,a)}),t.forEach((c,i)=>{c.addEventListener("click",()=>{clearInterval(s),o(i),s=setInterval(e,a)})})});const f=document.querySelector(".mobile-menu-btn"),d=document.querySelector(".nav-menu");document.querySelector(".cart-btn");document.querySelector(".cart-count");f.addEventListener("click",()=>{d.classList.toggle("show"),console.log("I totally agree")});window.addEventListener("resize",()=>{var t=document.querySelector("header").offsetHeight;d.style.top=`${t}px`});u();async function g(r){try{const t=await fetch(r);if(!t.ok)throw new Error("Network response was not ok");return await t.json()}catch(t){return console.error("Error fetching data:",t),null}}if(document.querySelector(".products-grid")){let t=function(n,a){const o=document.querySelector(a);o.innerHTML=n.map(e=>`
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
        `).join(""),document.querySelectorAll(".add-to-cart").forEach(e=>{e.addEventListener("click",addToCart)})};async function r(){const n=await g("https://scout-amazon-data.p.rapidapi.com/search?keyword=toys");n&&n.products&&t(n.products,".products-grid")}r()}if(document.querySelector(".testimonial-slider")){let t=function(){const n=document.querySelector(".testimonial-slider");n.innerHTML=r.map(a=>`
        <div class="testimonial">
            <div class="testimonial-rating">
                ${"★".repeat(a.rating)}${"☆".repeat(5-a.rating)}
            </div>
            <p class="testimonial-content">"${a.content}"</p>
            <div class="testimonial-author">
                <strong>${a.name}</strong>
                <span>${a.role}</span>
            </div>
        </div>
    `).join("")};const r=[{name:"Sarah J.",role:"Parent of two",content:"WonderNest Finds has become my go-to for birthday gifts. The quality is always excellent and the kids love them!",rating:5},{name:"Michael T.",role:"Grandfather",content:"I appreciate the educational toys selection. My grandson is learning while having fun - perfect combination!",rating:4},{name:"Lisa M.",role:"Teacher",content:"I regularly purchase classroom toys from WonderNest. The prices are fair and the products hold up well with lots of use.",rating:5}];t()}export{h as f,m as g,p as s,u};
