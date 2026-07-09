---
layout: default
title: Risk trainings
---
<div id="myMenu">
  <a href="/" class="menu-option">Cześć</a>
  <a href="/about" class="menu-option">O mnie</a>
  <a href="/risk_trainings" class="menu-option">Risk trainings</a>
  <a href="/publications" class="menu-option">Publikacje</a>
  <a href="/conferences" class="menu-option">Konferencje</a>
  <a href="/researches" class="menu-option">Projekty</a>
  <a href="/contact" class="menu-option">Kontakt</a>
</div>

<div class="square"></div>
<div class="square1"></div>
<div class="square2"></div>
<div class="square-big"></div>





<style>
.trainings-container {
  max-width: 900px;
  margin: 30px auto;
}

.training-card {
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #e5c9a8;
  border-radius: 12px;
  padding: 25px;
  margin: 25px 0;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.training-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(168,89,3,0.15);
}

.training-card-image {
  flex-shrink: 0;
  width: 220px;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.training-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.training-card-content {
  flex: 1;
  position: relative;
  z-index: 2;
}

.training-card-title {
  font-size: 1.4em;
  font-weight: bold;
  color: #333 !important;
  margin: 0 0 15px 0;
  text-indent: 0;
}

.training-card-description {
  color: #737373;
  font-size: 1em;
  line-height: 1.5;
  margin: 0;
  text-indent: 0;
}

.training-card-corner-image {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 130px;
  height: 90px;
  opacity: 0.85;
  border-top-left-radius: 8px;
  overflow: hidden;
  z-index: 1;
}

.training-card-corner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media screen and (max-width: 600px) {
  .training-card {
    flex-direction: column;
    text-align: center;
  }

  .training-card-image {
    margin-right: 0;
    margin-bottom: 20px;
    width: 100%;
    max-width: 280px;
  }

  .training-card-corner-image {
    display: none;
  }
}
</style>








##### Szkolenia

<div class="trainings-container">

  <div class="training-card">
    <div class="training-card-image">
      <img src="/assets/images/trainings/budowa-modeli-ryzyka.jpg" alt="Budowa modeli ryzyka">
    </div>
    <div class="training-card-content">
      <div class="training-card-title">Budowa modeli ryzyka</div>
      <div class="training-card-description">Metody statystyczne i techniki estymacyjne</div>
    </div>
    <div class="training-card-corner-image">
      <img src="/assets/images/trainings/budowa-modeli-ryzyka-corner.jpg" alt="">
    </div>
  </div>

</div>







{% include analytics.html %}

















