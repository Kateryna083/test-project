import{a as h,S as y,i as L}from"./assets/vendor-b11e2a50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();const w="44784729-ebc9a0f5cc587c2700d41657d",b="https://pixabay.com/api/";async function f(e,t=1){const i={key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{return(await h.get(b,{params:i})).data}catch(s){throw new Error(s.response.status)}}const p=document.querySelector(".gallery"),P=document.querySelector(".load-more");let a;function m(e){const t=e.map(({largeImageURL:i,webformatURL:s,likes:r,views:o,comments:c,downloads:g})=>`
      <li class="gallery-item">
        <a href="${i}">
          <img src="${s}" alt="" class="card-img"/>
        </a>
        <ul class="gallery-item-description">
          <li>
            <p class="count-text">Likes</p>
            <p class="count">${r}</p>
          </li>
          <li>
            <p class="count-text">Views</p>
            <p class="count">${o}</p>
          </li>
          <li>
            <p class="count-text">Comments</p>
            <p class="count">${c}</p>
          </li>
          <li>
            <p class="count-text">Downloads</p>
            <p class="count">${g}</p>
          </li>
        </ul>
      </li>
      `).join("");p.insertAdjacentHTML("beforeend",t),a?a.refresh():a=new y(".gallery a",{captionsData:"alt",captionDelay:250})}function q(){p.innerHTML="",a&&(a.destroy(),a=null)}function l(e,t="info"){L[t]({title:t.charAt(0).toUpperCase()+t.slice(1),message:e,position:"topRight",timeout:2e3})}function d(e){P.style.display=e?"block":"none"}function x(){const{height:e}=p.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}const S=document.querySelector(".search-form"),v=document.querySelector(".load-more");let n=1,u="";S.addEventListener("submit",async e=>{if(e.preventDefault(),u=e.currentTarget.elements.query.value.trim().toLowerCase(),!u){l("Please enter a search query.","error");return}n=1,q(),d(!1);try{const t=await f(u,n);t.hits.length===0?l("Nothing found for your request.","warning"):(m(t.hits),d(t.hits.length===15&&t.totalHits>n*15))}catch{l("Failed to fetch images. Please try again.","error")}});v.addEventListener("click",async()=>{n+=1;try{const e=await f(u,n);m(e.hits),x(),(e.hits.length<15||n*15>=e.totalHits)&&(d(!1),l("We're sorry, but you've reached the end of search results."))}catch{l("Failed to fetch images. Please try again.","error")}});
//# sourceMappingURL=commonHelpers.js.map
