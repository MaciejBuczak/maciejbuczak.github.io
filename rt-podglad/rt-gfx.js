/* Risk Trainings – grafiki tła (te same wzory co w dokumentach programów w narzędziu) */
const ACCS={terra:["Terakota","#bf8165"],copper:["Miedź","#a8694c"],rust:["Rdza","#9a3b25"],tan:["Piasek","#a8916f"],stone:["Kamień","#8d7a62"],graphite:["Grafit","#5c564d"],ink:["Czerń","#2b2926"],sage:["Szałwia","#7f8a6e"]};
function hashStr(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const f1=n=>Math.round(n*10)/10;
const gnorm=R=>{let u=0;for(let i=0;i<6;i++)u+=R();return(u-3)/1.2};
function gfx(style,seed,W,H,acc){
  const R=rng(seed*7919+13),o=[],P=(pts)=>pts.map((p,i)=>(i?"L":"M")+f1(p[0])+" "+f1(p[1])).join("");
  if(style==="kontury"){
    const m=Math.min(W,H),cs=[{x:W*(.55+R()*.32),y:H*(.22+R()*.36),n:15},{x:W*(.08+R()*.3),y:H*(.62+R()*.3),n:10}];
    const hl=3+Math.floor(R()*6);
    cs.forEach((c,ci)=>{const ph=[0,0,0,0,0,0].map(()=>R()*6.283),am=[0,0,.11,.07,.045,.03].map(a=>a*(.6+R()*.8));
      for(let i=1;i<=c.n;i++){const r=i*m*.052*(ci?0.9:1);const pts=[];
        for(let k=0;k<=110;k++){const th=k/110*6.283;let rr=1;for(let j=2;j<6;j++)rr+=am[j]*Math.sin(j*th+ph[j]+i*.16);pts.push([c.x+r*rr*Math.cos(th),c.y+r*rr*Math.sin(th)*.82])}
        const on=ci===0&&i===hl;o.push(`<path d="${P(pts)}Z" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.55:.2}" opacity="${on?.9:.32+.25*(1-i/c.n)}"/>`)}});
    const c=cs[0];o.push(`<rect x="${f1(c.x-1.6)}" y="${f1(c.y-1.6)}" width="3.2" height="3.2" fill="${acc}"/>`);
  }else if(style==="siatka"){
    const g=7;for(let x=g;x<W;x+=g)for(let y=g;y<H;y+=g)o.push(`<circle cx="${x}" cy="${y}" r=".32" fill="#000" opacity=".22"/>`);
    let x=W*(.35+R()*.1),y=H*(.75+R()*.12);const nodes=[[x,y]];
    for(let i=0;i<7;i++){x+=g*(2+Math.floor(R()*3));y-=g*(Math.floor(R()*4)-.6);x=Math.min(x,W-g*2);y=Math.max(g*2,Math.min(H-g*2,y));nodes.push([Math.round(x/g)*g,Math.round(y/g)*g])}
    o.push(`<path d="${P(nodes)}" fill="none" stroke="#000" stroke-width=".3" opacity=".6"/>`);
    const big=1+Math.floor(R()*(nodes.length-2));
    nodes.forEach((p,i)=>{const s=i===big?g*2.2:g*(.45+R()*.6),cl=i===big?acc:(R()<.3?acc:"#000");o.push(`<rect x="${f1(p[0]-s/2)}" y="${f1(p[1]-s/2)}" width="${f1(s)}" height="${f1(s)}" rx="${f1(s*.12)}" fill="${cl}" opacity="${i===big?.95:.85}"/>`)});
    for(let i=0;i<5;i++){const cx=Math.round(R()*W/g)*g,cy=Math.round(R()*H/g)*g;o.push(`<rect x="${cx-g/2}" y="${cy-g/2}" width="${g}" height="${g}" fill="none" stroke="#000" stroke-width=".2" opacity=".35"/>`)}
  }else if(style==="linie"){
    const cx=W*(.45+R()*.4),cy=H*(.3+R()*.3),N=44,ph=R()*6.283,fr=.025+R()*.03;
    for(let i=0;i<N;i++){const yb=H*.06+(H*.88)*i/(N-1),pts=[];
      for(let k=0;k<=120;k++){const x=W*k/120,bump=Math.exp(-(((x-cx)/(W*.22))**2)-(((yb-cy)/(H*.35))**2));pts.push([x,yb-bump*H*.09*(1+.5*Math.sin(x*fr*6.283+ph+i*.2))+Math.sin(x*fr*2+i*.3+ph)*1.1])}
      const on=i===Math.floor(N*.58);o.push(`<path d="${P(pts)}" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.45:.18}" opacity="${on?.9:.36}"/>`)}
  }else if(style==="okregi"){
    const cx=W*(.62+R()*.3),cy=H*(.18+R()*.3),hl=6+Math.floor(R()*8),n=34;
    for(let i=1;i<=n;i++){const r=i*Math.max(W,H)*.03;const dash=i%5===0?' stroke-dasharray="1 1.4"':"";const on=i===hl;
      o.push(`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.55:.18}" opacity="${on?.9:.42*(1-i/n)+.08}"${dash}/>`);
      if(on){const a=R()*6.283;o.push(`<rect x="${f1(cx+r*Math.cos(a)-1.6)}" y="${f1(cy+r*Math.sin(a)-1.6)}" width="3.2" height="3.2" fill="${acc}"/>`)}}
    for(let k=0;k<24;k++){const a=k/24*6.283,r1=Math.max(W,H)*.03,r2=Math.max(W,H)*(k%6?.2:.55);o.push(`<line x1="${f1(cx+r1*Math.cos(a))}" y1="${f1(cy+r1*Math.sin(a))}" x2="${f1(cx+r2*Math.cos(a))}" y2="${f1(cy+r2*Math.sin(a))}" stroke="#000" stroke-width=".15" opacity=".22"/>`)}
    o.push(`<rect x="${f1(cx-1.2)}" y="${f1(cy-1.2)}" width="2.4" height="2.4" fill="#000"/>`);
  }else if(style==="rozklad"){ /* Dzwony – nakładające się łagodne krzywe, bez osi */
    const y0=H*.9,N=24,hl=Math.floor(R()*N);
    for(let c=0;c<N;c++){const mu=W*(.05+.9*R()),sd=W*(.05+.13*R()),hg=H*(.18+.55*R()*R()+.12),pts=[];
      for(let k=0;k<=120;k++){const x=W*k/120;pts.push([x,y0-hg*Math.exp(-(((x-mu)/sd)**2)/2)])}
      const on=c===hl;o.push(`<path d="${P(pts)}" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.5:.18}" opacity="${on?.9:.22+.25*R()}"/>`)}
  }else if(style==="slupki"){ /* Rytm – pionowe kreski jak fala dźwięku */
    const N=Math.round(W/2.4),cy=H*(.42+R()*.16),ph=[R()*6,R()*6,R()*6],hl=Math.floor(N*(.3+R()*.5));
    for(let i=0;i<N;i++){const t=i/(N-1),env=.15+.85*Math.pow(Math.sin(Math.PI*t),1.4)*(.6+.4*Math.sin(t*5+ph[0])),a=H*.36*env*(.45+.55*Math.abs(Math.sin(t*23+ph[1])*Math.cos(t*7+ph[2])));
      const x=W*.04+t*W*.92,on=i===hl;o.push(`<line x1="${f1(x)}" y1="${f1(cy-a)}" x2="${f1(x)}" y2="${f1(cy+a*.8)}" stroke="${on?acc:"#000"}" stroke-width="${on?.6:.3}" opacity="${on?.95:.32}" stroke-linecap="round"/>`)}
  }else if(style==="punkty"){ /* Chmura – drobny pył w spiralnych ramionach */
    const cx=W*(.55+R()*.25),cy=H*(.38+R()*.2),rot=R()*6.28,arms=2+Math.floor(R()*2);
    for(let i=0;i<900;i++){const arm=i%arms,r=Math.pow(R(),.7)*Math.max(W,H)*.55,th=rot+arm*6.283/arms+r*.035+gnorm(R)*.35;
      const x=cx+r*Math.cos(th),y=cy+r*Math.sin(th)*.62;o.push(`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(.25+R()*.45)}" fill="#000" opacity="${f1(.15+.4*(1-r/(Math.max(W,H)*.55)))}"/>`)}
    for(let i=0;i<6;i++){const r=R()*W*.3,th=R()*6.28;o.push(`<rect x="${f1(cx+r*Math.cos(th)-1)}" y="${f1(cy+r*Math.sin(th)*.62-1)}" width="2" height="2" fill="${acc}"/>`)}
  }else if(style==="wachlarz"){ /* Wiązka – płynne ścieżki rozchodzące się z jednego punktu */
    const x0=W*(.04+R()*.1),y0=H*(.45+R()*.2),N=46,hl=Math.floor(R()*N),steps=90,dx=(W*.98-x0)/steps;
    for(let s=0;s<N;s++){let y=y0,v=0;const pts=[[x0,y0]];for(let k=1;k<=steps;k++){v=v*.95+gnorm(R)*.32;y+=v;pts.push([x0+k*dx,y])}
      const on=s===hl;o.push(`<path d="${P(pts)}" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.5:.16}" opacity="${on?.95:.3}"/>`)}
    o.push(`<rect x="${f1(x0-1.5)}" y="${f1(y0-1.5)}" width="3" height="3" fill="#000"/>`);
  }else if(style==="interferencja"){
    const c1=[W*(.22+R()*.15),H*(.3+R()*.3)],c2=[W*(.6+R()*.25),H*(.4+R()*.3)],st=Math.max(W,H)*.022,hl=8+Math.floor(R()*10);
    [c1,c2].forEach((c,ci)=>{for(let i=1;i<60;i++){const on=ci===1&&i===hl;o.push(`<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(i*st)}" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.5:.14}" opacity="${on?.9:.3}"/>`)}});
    o.push(`<rect x="${f1(c2[0]-1.4)}" y="${f1(c2[1]-1.4)}" width="2.8" height="2.8" fill="${acc}"/>`);
  }else if(style==="spirala"){
    const cx=W*(.55+R()*.25),cy=H*(.32+R()*.22),turns=13,b=Math.max(W,H)*.0075,a0=R()*6.28,pts=[],acc0=Math.floor(260+R()*500),accL=160;
    for(let k=0;k<=turns*90;k++){const th=k/90*6.283,r=b*th*(1+.04*Math.sin(th*3+a0));pts.push([cx+r*Math.cos(th+a0),cy+r*Math.sin(th+a0)*.86])}
    o.push(`<path d="${P(pts)}" fill="none" stroke="#000" stroke-width=".2" opacity=".5"/><path d="${P(pts.slice(acc0,acc0+accL))}" fill="none" stroke="${acc}" stroke-width=".6"/>`);
    o.push(`<rect x="${f1(cx-1.3)}" y="${f1(cy-1.3)}" width="2.6" height="2.6" fill="#000"/>`);
  }else if(style==="przeplyw"){ /* Przepływ – linie pola, jak wiatr albo prąd */
    const ph=[R()*6,R()*6,R()*6],fr=[.012+R()*.012,.015+R()*.012,.008+R()*.008],sp=Math.max(W,H)/32,L=Math.max(W,H)/120;
    const ang=(x,y)=>1.6*Math.sin(x*fr[0]+ph[0])+1.3*Math.cos(y*fr[1]+ph[1])+.9*Math.sin((x+y)*fr[2]+ph[2]);
    let n=0;for(let gx=-sp;gx<W+sp;gx+=sp)for(let gy=-sp;gy<H+sp;gy+=sp){let x=gx+R()*sp,y=gy+R()*sp;const pts=[[x,y]];
      for(let k=0;k<26;k++){const a=ang(x,y);x+=Math.cos(a)*L;y+=Math.sin(a)*L;pts.push([x,y])}
      const on=++n%37===0;o.push(`<path d="${P(pts)}" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.45:.17}" opacity="${on?.9:.38}" stroke-linecap="round"/>`)}
  }else if(style==="luki"){ /* Łuki – wschód: łuki z dolnej krawędzi */
    const cs=[[W*(.62+R()*.25),H*1.02,26],[W*(.08+R()*.2),H*1.02,12]],st=Math.max(W,H)*.03,hl=7+Math.floor(R()*10);
    cs.forEach(([cx,cy,n],ci)=>{for(let i=1;i<=n;i++){const r=i*st,on=ci===0&&i===hl,dash=i%4===0?' stroke-dasharray="1 1.3"':"";
      o.push(`<path d="M${f1(cx-r)} ${f1(cy)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(cx+r)} ${f1(cy)}" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.55:.18}" opacity="${on?.9:.45*(1-i/n)+.1}"${dash}/>`)}});
    const c=cs[0],r=hl*st,a=Math.PI*(1.15+R()*.7);o.push(`<rect x="${f1(c[0]+r*Math.cos(a)-1.5)}" y="${f1(c[1]+r*Math.sin(a)-1.5)}" width="3" height="3" fill="${acc}"/>`);
  }else if(style==="orbity"){
    const cx=W*(.52+R()*.25),cy=H*(.38+R()*.18),N=16,base=R()*180,hl=4+Math.floor(R()*9);
    for(let i=1;i<=N;i++){const rx=i*Math.max(W,H)*.032,ry=rx*.36,rot=base+i*7,on=i===hl;
      o.push(`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" transform="rotate(${f1(rot)} ${f1(cx)} ${f1(cy)})" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.5:.18}" opacity="${on?.9:.42}"/>`);
      if(i%3===0||on){const t=R()*6.28,rr=rot*Math.PI/180,x=rx*Math.cos(t),y=ry*Math.sin(t);o.push(`<circle cx="${f1(cx+x*Math.cos(rr)-y*Math.sin(rr))}" cy="${f1(cy+x*Math.sin(rr)+y*Math.cos(rr))}" r="${on?1.3:.7}" fill="${on?acc:"#000"}"/>`)}}
    o.push(`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="1.4" fill="#000"/>`);
  }else if(style==="soczewka"){ /* Siatka zgięta jak w soczewce */
    const g=Math.max(W,H)/34,cx=W*(.5+R()*.3),cy=H*(.35+R()*.25),s=Math.max(W,H)*.26,k=1.1+R()*.5,hl=Math.floor(R()*12)+6;
    const warp=(x,y)=>{const dx=x-cx,dy=y-cy,f=k*Math.exp(-(dx*dx+dy*dy)/(s*s));return[x+dx*f,y+dy*f]};
    let j=0;for(let y=0;y<=H+g;y+=g){const pts=[];for(let x=0;x<=W;x+=2)pts.push(warp(x,y));const on=j++===hl;o.push(`<path d="${P(pts)}" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.5:.16}" opacity="${on?.9:.38}"/>`)}
    for(let x=0;x<=W+g;x+=g){const pts=[];for(let y=0;y<=H;y+=2)pts.push(warp(x,y));o.push(`<path d="${P(pts)}" fill="none" stroke="#000" stroke-width=".16" opacity=".38"/>`)}
  }else if(style==="harmonograf"){
    const cx=W*(.55+R()*.2),cy=H*(.45+R()*.1),S=Math.min(W,H)*.42,f=[2+R()*.02,3+R()*.02,3+R()*.02,2+R()*.02],p=[R()*6,R()*6,R()*6,R()*6],d=.005+R()*.002,pts=[];
    for(let i=0;i<1700;i++){const t=i*.12,e=Math.exp(-d*t);pts.push([cx+S*e*(.6*Math.sin(f[0]*t+p[0])+.4*Math.sin(f[1]*t+p[1]))*1.25,cy+S*e*(.6*Math.sin(f[2]*t+p[2])+.4*Math.sin(f[3]*t+p[3]))])}
    o.push(`<path d="${P(pts)}" fill="none" stroke="#000" stroke-width=".12" opacity=".38"/><path d="${P(pts.slice(0,60))}" fill="none" stroke="${acc}" stroke-width=".5"/>`);
  }else if(style==="pierscienie"){ /* Pierścienie – słoje drewna */
    const cx=W*(.5+R()*.3),cy=H*(.4+R()*.2),n=28,ph=[R()*6,R()*6,R()*6],hl=6+Math.floor(R()*14);
    for(let i=1;i<=n;i++){const r0=i*Math.max(W,H)*.022*(1+.02*Math.sin(i*1.7)),pts=[];
      for(let k=0;k<=140;k++){const th=k/140*6.283,rr=r0*(1+.06*Math.sin(3*th+ph[0]+i*.05)+.04*Math.sin(5*th+ph[1])+.025*Math.sin(9*th+ph[2]+i*.2));pts.push([cx+rr*Math.cos(th)*1.25,cy+rr*Math.sin(th)])}
      const on=i===hl;o.push(`<path d="${P(pts)}Z" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.5:.17}" opacity="${on?.9:.28+.3*(i%3===0)}"/>`)}
    o.push(`<rect x="${f1(cx-1.3)}" y="${f1(cy-1.3)}" width="2.6" height="2.6" fill="#000"/>`);
  }else if(style==="macierz"){
    const c=8.4,gp=1.3,cols=Math.floor(W*.66/(c+gp)),rows=Math.floor(H*.7/(c+gp)),ox=W-cols*(c+gp)-W*.05,oy=H*.08,ph=R()*6,hx=Math.floor(R()*cols),hy=Math.floor(R()*rows*.6);
    for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const v=Math.max(0,Math.min(1,(i/cols)*.55+(1-j/rows)*.35+.12*Math.sin(i*.7+j*.5+ph)+.1*(R()-.5)));
      const on=i===hx&&j===hy;o.push(`<rect x="${f1(ox+i*(c+gp))}" y="${f1(oy+j*(c+gp))}" width="${c}" height="${c}" rx=".6" fill="${on?acc:"#000"}" opacity="${on?.95:f1(.03+v*.32)}"/>`)}
  }else if(style==="promienie"){
    const cx=W*(.08+R()*.15),cy=H*(.88+R()*.08),N=72,hl=Math.floor(N*(.3+R()*.4));
    for(let i=0;i<N;i++){const a=-Math.PI*(.02+.5*i/(N-1)),L=Math.max(W,H)*(.45+.5*Math.abs(Math.sin(i*.37+seed))*.9+.1*R()),on=i===hl;
      const x2=cx+L*Math.cos(a),y2=cy+L*Math.sin(a);o.push(`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${on?acc:"#000"}" stroke-width="${on?.5:.16}" opacity="${on?.9:.35}"/>`);
      if(i%3===0||on)o.push(`<circle cx="${f1(x2)}" cy="${f1(y2)}" r="${on?1.4:.6}" fill="${on?acc:"#000"}" opacity="${on?1:.5}"/>`)}
  }else if(style==="drzewo"){
    const lv=5,x0=W*.1,dx=(W*.85)/lv,nodes=[[x0,H*.5,0,0]],path=[0];let pick=0;
    const ed=[];for(let l=0;l<lv;l++){const span=H*.21/Math.pow(2,l);const cur=nodes.filter(n=>n[2]===l);cur.forEach(n=>{for(const s of[-1,1]){const ch=[n[0]+dx,n[1]+s*span*(.75+R()*.35),l+1,nodes.length];ed.push([n,ch]);nodes.push(ch)}})}
    let at=nodes[0];const hp=[at];for(let l=0;l<lv;l++){const kids=ed.filter(e=>e[0]===at).map(e=>e[1]);at=kids[R()<.5?0:1];hp.push(at)}
    ed.forEach(([a,b])=>{const on=hp.includes(a)&&hp.includes(b);const mx=a[0]+dx*.45;o.push(`<path d="M${f1(a[0])} ${f1(a[1])}L${f1(mx)} ${f1(a[1])}L${f1(mx)} ${f1(b[1])}L${f1(b[0])} ${f1(b[1])}" fill="none" stroke="${on?acc:"#000"}" stroke-width="${on?.55:.2}" opacity="${on?.95:.4}"/>`)});
    nodes.forEach(n=>{const on=hp.includes(n),s=on?3:(n[2]===lv?1.4:2);o.push(`<rect x="${f1(n[0]-s/2)}" y="${f1(n[1]-s/2)}" width="${s}" height="${s}" fill="${on?acc:"#000"}" opacity="${on?1:.7}"/>`)});
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${o.join("")}</svg>`;
}
