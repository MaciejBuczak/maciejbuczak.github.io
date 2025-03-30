---
layout: default
title: topics
---
<div id="myMenu">
  <a href="/" class="menu-option">Cześć</a>
  <a href="/about" class="menu-option">Co robię</a>
  <a href="/topics" class="menu-option">Tematy badań</a>
  <a href="/publications" class="menu-option">Publications</a>
  <a href="/researches" class="menu-option">Researches</a>
  <a href="/conferences" class="menu-option">Lectures</a>
  <a href="/contact" class="menu-option">Contact</a>
</div>


<!-- Istniejące kwadraty -->
<div class="square"></div>
<div class="square1"></div>
<div class="square2"></div>
<div class="square-big"></div>

<br>

{% include animated-squares.html %}

<br>

{% include weibull-distribution.html %}

<br>

<div class="research-areas-grid">
  <div class="research-area-card">
    <div class="research-area-icon">
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
      </svg>
    </div>
    <h4>Model Risk</h4>
    <p>Comprehensive analysis of uncertainty and errors in financial models, along with methods for their identification, measurement, and risk management.</p>
  </div>
  
  <div class="research-area-card">
    <div class="research-area-icon">
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path fill="currentColor" d="M21 8V7l-3 2-3-2v1l3 2 3-2zm1-5H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 17H5v-2h3v2zm0-4H5v-2h3v2zm0-4H5V7h3v2zm6 8h-4V7h4v10zm6 0h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V7h3v2z"/>
      </svg>
    </div>
    <h4>Holistic Model Assessment</h4>
    <p>Comprehensive verification of models combining quantitative analysis (statistical tests) and qualitative analysis (business expertise) for a complete effectiveness evaluation.</p>
  </div>
  
  <div class="research-area-card">
    <div class="research-area-icon">
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path fill="currentColor" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
      </svg>
    </div>
    <h4>Credit Risk</h4>
    <p>Advanced methods for estimating expected (ECL) and unexpected losses, considering macroeconomic factors and the characteristics of the credit portfolio.</p>
  </div>
  
  <div class="research-area-card">
    <div class="research-area-icon">
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0-3h8v2h-8zm0 6h4v2h-4z"/>
      </svg>
    </div>
    <h4>Operational Risk</h4>
    <p>A statistical approach to quantifying operational risk, utilizing probability distributions of losses and advanced modeling techniques.</p>
  </div>
</div>

{% include analytics.html %}
