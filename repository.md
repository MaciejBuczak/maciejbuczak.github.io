---
layout: default
title: Repository
---


<div class="square"></div>
<div class="square1"></div>
<div class="square2"></div>
<div class="square-big"></div>





<style>

.repo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 12px 0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.repo-item-name {
  color: #333;
  font-size: 1.1em;
  text-indent: 0;
  margin: 0;
}

.repo-item .download-button {
  padding: 5px 14px;
  font-size: 0.9em;
}

@media screen and (max-width: 600px) {
  .repo-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

  
</style>




##### Repozytorium


<div class="repo-container">

  <div class="repo-item">
    <p class="repo-item-name">Nazwa dokumentu 1</p>
    <a href="/assets/files/dokument1.pdf" class="download-button" download>Pobierz</a>
  </div>

  <div class="repo-item">
    <p class="repo-item-name">Nazwa dokumentu 2</p>
    <a href="/assets/files/dokument2.pdf" class="download-button" download>Pobierz</a>
  </div>

  <div class="repo-item">
    <p class="repo-item-name">Nazwa dokumentu 3</p>
    <a href="/assets/files/dokument3.pdf" class="download-button" download>Pobierz</a>
  </div>

</div>


{% include analytics.html %}

















