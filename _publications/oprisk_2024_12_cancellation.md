---
layout: default
title: "Bieg wsteczny w rozwoju koncepcji modelowania wartości nieoczekiwanej w sektorze finansowym na przykładzie decyzji o wycofaniu frameworku AMA w ryzyku operacyjnym"
date: 15-12-2024
source: "Przesłano do: Metody ilościowe w badaniach ekonomicznych"
views: 245
status: "review"
pinned: true
---
<div class="back-link">
 <a href="/publications" class="back-button">
   ← Powrót do listy publikacji
 </a>
</div>
<div class="square"></div>
<div class="square1"></div>
<div class="square2"></div>
<div class="square-big"></div>

<!-- Dodajemy skrypt do obsługi liczników -->
<script>
// Funkcja dla pobrań
function countDownload(lang) {
   if (window.goatcounter && typeof window.goatcounter.count === 'function') {
       window.goatcounter.count({
           path: 'download/oprisk_2024_12_cancellation_' + lang,
           title: 'Download Article ' + lang.toUpperCase(),
           event: true
       });
   }
}

// Funkcja dla aktualizacji statystyk
async function updateViewStats() {
   try {
       console.log('Rozpoczynam pobieranie statystyk');
       
       // Dodajemy token do nagłówków
       const headers = {
           'Authorization': 'Bearer YOUR_API_TOKEN',
           'Content-Type': 'application/json'
       };

       // Pobieranie statystyk PL
       const plResponse = await fetch(
           'https://maciejbuczak.goatcounter.com/api/v0/stats/hits?path=download/oprisk_2024_12_cancellation_pl',
           { headers }
       );
       const plData = await plResponse.json();
       console.log('Dane PL:', plData);

       // Pobieranie statystyk EN
       const enResponse = await fetch(
           'https://maciejbuczak.goatcounter.com/api/v0/stats/hits?path=download/oprisk_2024_12_cancellation_en',
           { headers }
       );
       const enData = await enResponse.json();
       console.log('Dane EN:', enData);

       // Aktualizacja liczników na stronie
       if (plData && plData.count) {
           document.getElementById('pl-downloads').textContent = plData.count;
       }
       if (enData && enData.count) {
           document.getElementById('en-downloads').textContent = enData.count;
       }

   } catch (error) {
       console.error('Błąd podczas pobierania statystyk:', error);
   }
}

// Uruchamiamy po załadowaniu strony
document.addEventListener('DOMContentLoaded', updateViewStats);
</script>

<div class="publication-full">
   <div class="publication-header">
       <span class="publication-pin">📌 Przypięte</span>
       <span class="publication-status status-review">PROCES RECENZJI</span>
       
       <div class="publication-source">{{ page.source }}</div>

       <div class="publication-domain">
           <span class="domain-primary">Zarządzanie ryzykiem</span>
           <span class="domain-separator">|</span>
           <span class="domain-secondary">Ryzyko operacyjne</span>
       </div>
   
       <h1 class="publication-title-full">{{ page.title }}</h1>
       
       <div class="publication-meta-full">
           📅 {{ page.date | date: "%d-%m-%Y" }} &nbsp;&nbsp;|&nbsp;&nbsp; 
           👁️ {{ page.views }} wyświetleń
       </div>

       <div class="download-links">
           <a href="/assets/pdfs/oprisk_2024_12_cancellation_pl.pdf" 
              class="download-button" 
              onclick="countDownload('pl')">
               📄 Pobierz artykuł (PL) (<span id="pl-downloads">0</span>)
           </a>
           <a href="/assets/pdfs/oprisk_2024_12_cancellation_en.pdf" 
              class="download-button" 
              onclick="countDownload('en')">
               📄 Download article (EN) (<span id="en-downloads">0</span>)
           </a>
       </div>
       <div class="publication-resources">
           <a href="URL_DO_CZASOPISMA" class="resource-link" target="_blank">
               <span class="resource-icon">📰</span> Czasopismo
           </a>
           <a href="URL_DO_PREPRINTU" class="resource-link" target="_blank">
               <span class="resource-icon">📄</span> Preprint
           </a>
           <a href="URL_DO_MEDIUM" class="resource-link" target="_blank">
               <span class="resource-icon">💡</span> Artykuł popularnonaukowy
           </a>
       </div>
   </div>
   <div class="publication-content">
       <h5>Abstrakt</h5>
       <p>
           1 stycznia 2025 r. za pośrednictwem przepisów CRR III wchodzi w życie nowa architektura bezpieczeństwa sektora finansowego. Działaniom związanym z wypracowaniem nowych regulacji towarzyszyła pogłębiona refleksja na temat skuteczności dotychczasowej, opracowanej 
w 2004 r. (Basel II) koncepcji bezpieczeństwa kapitałowego. W niektórych obszarach refleksja ta zaprowadziła regulatora do decyzji dychotomicznych 
i ostatecznych. Taką decyzję podjęto w stosunku do stosowanej w przestrzeni ryzyka operacyjnego Metody Zaawansowanego Pomiaru AMA. 
W niniejszym artykule staram się przedstawić szeroki kontekst, jaki tej decyzji towarzyszył, wraz z własnym, skromnym osądem sytuacji.
       </p>
       <h5>Abstrakt - ENG</h5>
       <p>
On January 1, 2025, a new financial sector security architecture comes into force through the CRR III regulations. The actions related to developing new regulations were accompanied by deep reflection on the effectiveness of the previous capital security concept developed in 2004 (Basel II). In some areas, this reflection led the regulator to dichotomous and final decisions. Such a decision was made regarding the Advanced Measurement Approach (AMA) used in the operational risk space. In this article, I attempt to present the broad context that accompanied this decision, along with my own modest assessment of the situation.
       </p>
       <h5>Słowa kluczowe</h5>
       <p>
ryzyko operacyjne, Metoda Zaawansowanego Pomiaru, AMA, IRB, Basel II, Basel III, CRR III, adekwatność kapitałowa, model ryzyka operacyjnego, model wartości nieoczekiwanej, model wartości ekstremalnych, EVT, model wartości oczekiwanej
       </p>
       <h5>Keywords</h5>
       <p>
operational risk, Advanced Measurement Approach, AMA, IRB, Basel II, Basel III, CRR III, capital adequacy, operational risk model, unexpected value model, extreme value model, EVT, expected value model
       </p>
       <h5>JEL classification</h5>
       <p>
G21, G32, C52
       </p>
   </div>
</div>

{% include analytics.html %}
