---
layout: default
---

### Lead and Represent Teams | Negotiate and Implement Solutions | Develop People and Shape Leaders

### Model Risk Management | Major Risk Frameworks: IFRS9/Basel II/CRR | Holistic Model Assessment | Model Development/Implementation | Building Structural Risk Methodologies | Proprietary Analytical Tools | Impairment/ECL: PD/LGD/EAD/SICR/FLI | Operational Risk: AMA/LDA/SBA | Regulatory Capital | Economic Capital | ICAAP | Advanced Statistics | Quantitative Methods | IT Projects


<div class="context-menu" id="contextMenu">
    <a href="#" class="menu-item">O mnie</a>
    <a href="#" class="menu-item">Publikacje</a>
    <a href="#" class="menu-item">Kontakt</a>
</div>

<script>
    const contextMenu = document.getElementById('contextMenu');
    
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const { clientX: mouseX, clientY: mouseY } = e;
        
        contextMenu.style.display = 'block';
        contextMenu.style.left = `${mouseX}px`;
        contextMenu.style.top = `${mouseY}px`;
    });

    document.addEventListener('click', (e) => {
        if (!contextMenu.contains(e.target)) {
            contextMenu.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            contextMenu.style.display = 'none';
        }
    });
</script>
