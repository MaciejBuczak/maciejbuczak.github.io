---
layout: default
title: "Bieg wsteczny w rozwoju koncepcji modelowania wartości nieoczekiwanej w sektorze finansowym na przykładzie decyzji o wycofaniu frameworku AMA w ryzyku operacyjnym"
date: 15-12-2024
source: "Przesłano do: Metody ilościowe w badaniach ekonomicznych"
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
// Funkcja zliczająca pobrania
function countDownload(lang) {
    window.goatcounter.count({
        path: 'download/oprisk_2024_12_cancellation_' + lang,
        title: 'Download Article ' + lang.toUpperCase(),
        event: true
    });
}

// Funkcja pobierająca i wyświetlająca statystyki
async function updateViewStats() {
    try {
        // Pobierz statystyki wyświetleń strony
        const pageResponse = await fetch('https://[twój-kod].goatcounter.com/api/v0/count?path=/publications/oprisk-2024-12-cancellation');
        const pageData = await pageResponse.json();
        
        // Pobierz statystyki pobrań PL
        const plResponse = await fetch('https://[twój-kod].goatcounter.com/api/v0/count?path=download/oprisk_2024_12_cancellation_pl');
        const plData = await plResponse.json();
        
        // Pobierz statystyki pobrań EN
        const enResponse = await fetch('https://[twój-kod].goatcounter.com/api/v0/count?path=download/oprisk_2024_12_cancellation_en');
        const enData = await enResponse.json();
        
        // Aktualizuj liczniki na stronie
        document.getElementById('page-views').textContent = pageData.count || 0;
        document.getElementById('pl-downloads').textContent = plData.count || 0;
        document.getElementById('en-downloads').textContent = enData.count || 0;
    } catch (error) {
        console.error('Błąd podczas pobierania statystyk:', error);
    }
}

// Wywołaj aktualizację statystyk po załadowaniu strony
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
            👁️ <span id="page-views">0</span> wyświetleń
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

        <!-- Reszta kodu pozostaje bez zmian -->

    </div>
    <!-- Reszta treści pozostaje bez zmian -->
</div>

{% include analytics.html %}
