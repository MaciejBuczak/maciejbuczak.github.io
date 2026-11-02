/* Risk Trainings – menu, nagłówek przy przewijaniu, płynne pojawianie się sekcji */
(function(){
  var top=document.getElementById("top"),btn=document.querySelector(".menu-btn"),nav=document.getElementById("nav");
  if(btn)btn.addEventListener("click",function(){var o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",o)});
  if(nav)nav.addEventListener("click",function(e){if(e.target.tagName==="A")nav.classList.remove("open")});
  var onS=function(){top&&top.classList.toggle("scrolled",scrollY>8)};addEventListener("scroll",onS,{passive:true});onS();
  var els=document.querySelectorAll(".rv");
  if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in")});return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{rootMargin:"0px 0px -8% 0px",threshold:.08});
  window.rtReveal=function(){document.querySelectorAll(".rv:not(.in)").forEach(function(e){io.observe(e)})};window.rtReveal();
})();
