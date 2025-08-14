import"./base-DDXWwQWU.js";import{u as d}from"./utils-CQGMlDFX.js";document.addEventListener("DOMContentLoaded",function(){const t=document.querySelectorAll(".hero-slide"),e=document.querySelectorAll(".nav-dot");let a=0;const n=5e3;function i(o){t.forEach(r=>r.classList.remove("active")),e.forEach(r=>r.classList.remove("active")),t[o].classList.add("active"),e[o].classList.add("active"),a=o}function c(){let o=a+1;o>=t.length&&(o=0),i(o)}let s=setInterval(c,n);const l=document.querySelector(".hero-slideshow");l.addEventListener("mouseenter",()=>{clearInterval(s)}),l.addEventListener("mouseleave",()=>{s=setInterval(c,n)}),e.forEach((o,r)=>{o.addEventListener("click",()=>{clearInterval(s),i(r),s=setInterval(c,n)})})});const u=document.querySelector(".mobile-menu-btn"),m=document.querySelector(".main-nav");document.querySelector(".cart-btn");const h=document.querySelector(".cart-count");u.addEventListener("click",()=>{m.classList.toggle("active")});d(h);async function v(t){try{const e=await fetch(t);if(!e.ok)throw new Error("Network response was not ok");return await e.json()}catch(e){return console.error("Error fetching data:",e),null}}if(document.querySelector(".products-grid")){async function t(){const e=await v("https://scout-amazon-data.p.rapidapi.com/search?keyword=toys");console.log(e)}t()}if(document.querySelector(".testimonial-slider")){let e=function(){const a=document.querySelector(".testimonial-slider");a.innerHTML=t.map(n=>`
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
    `).join("")};const t=[{name:"Sarah J.",role:"Parent of two",content:"WonderNest Finds has become my go-to for birthday gifts. The quality is always excellent and the kids love them!",rating:5},{name:"Michael T.",role:"Grandfather",content:"I appreciate the educational toys selection. My grandson is learning while having fun - perfect combination!",rating:4},{name:"Lisa M.",role:"Teacher",content:"I regularly purchase classroom toys from WonderNest. The prices are fair and the products hold up well with lots of use.",rating:5}];e()}
