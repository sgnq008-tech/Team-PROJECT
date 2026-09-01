// ---------- data ----------
  const bins = [
    {id:'b1', type:'public', label:'공공 쓰레기통', x:220, y:180, name:'가부키초 공원 쓰레기통', meta:'현위치에서 148m · 도보 2분', food:{name:'타코야끼 긴타로', dist:'쓰레기통에서 90m'}},
    {id:'b2', type:'conv', label:'편의점 수거함', x:430, y:150, name:'세븐일레븐 신주쿠3초메점', meta:'현위치에서 210m · 도보 3분', food:{name:'야끼소바 아저씨네', dist:'쓰레기통에서 60m'}},
    {id:'b3', type:'public', label:'공공 쓰레기통', x:180, y:340, name:'오모이데요코초 골목 쓰레기통', meta:'현위치에서 175m · 도보 2분', food:{name:'모나카 아이스 노점', dist:'쓰레기통에서 40m'}},
    {id:'b4', type:'conv', label:'편의점 수거함', x:470, y:360, name:'로손 신주쿠역 동쪽출구점', meta:'현위치에서 260m · 도보 4분', food:{name:'다코센베 포장마차', dist:'쓰레기통에서 55m'}},
  ];
  const foods = [
    {id:'f1', name:'타코야끼 긴타로', cat:'타코야끼', x:270, y:130, emoji:'🐙', desc:'바삭한 겉면과 진한 소스, 8개들이 테이크아웃 인기 메뉴', dist:'가까운 쓰레기통까지 90m'},
    {id:'f2', name:'야끼소바 아저씨네', cat:'야끼소바', x:400, y:110, emoji:'🍜', desc:'양배추 듬뿍, 마요네즈 토핑이 시그니처인 노점', dist:'가까운 쓰레기통까지 60m'},
    {id:'f3', name:'모나카 아이스 노점', cat:'기타', x:140, y:300, emoji:'🍨', desc:'전통 모나카 과자 사이에 아이스크림을 채운 디저트', dist:'가까운 쓰레기통까지 40m'},
    {id:'f4', name:'다코센베 포장마차', cat:'기타', x:520, y:330, emoji:'🍘', desc:'문어를 통째로 눌러 구운 바삭한 전병 간식', dist:'가까운 쓰레기통까지 55m'},
    {id:'f5', name:'오코노미야키 하나', cat:'기타', x:90, y:200, emoji:'🥞', desc:'철판에서 바로 잘라주는 1인용 미니 오코노미야키', dist:'가까운 쓰레기통까지 120m'},
    {id:'f6', name:'야끼토리 골목', cat:'야끼소바', x:560, y:200, emoji:'🍢', desc:'숯불로 구운 꼬치를 그 자리에서 포장해주는 노점', dist:'가까운 쓰레기통까지 80m'},
  ];

  const pinLayer = document.getElementById('pinLayer');
  const routeLine = document.getElementById('routeLine');
  const svgNS = 'http://www.w3.org/2000/svg';

  function makePinEl(item, kind){
    const g = document.createElementNS(svgNS,'g');
    g.setAttribute('class','pin');
    g.dataset.filter = kind === 'food' ? 'food' : item.type;
    g.dataset.id = item.id;
    const color = kind === 'food' ? '#E07C33' : '#123D33';
    const circle = document.createElementNS(svgNS,'circle');
    circle.setAttribute('cx', item.x); circle.setAttribute('cy', item.y); circle.setAttribute('r', 10);
    circle.setAttribute('fill', color);
    circle.setAttribute('stroke', '#fff'); circle.setAttribute('stroke-width','2');
    g.appendChild(circle);
    if(kind === 'food'){
      const t = document.createElementNS(svgNS,'text');
      t.setAttribute('x', item.x); t.setAttribute('y', item.y+4); t.setAttribute('font-size','10');
      t.setAttribute('fill','#fff'); t.setAttribute('text-anchor','middle');
      t.textContent = '食';
      g.appendChild(t);
    } else {
      const dot = document.createElementNS(svgNS,'circle');
      dot.setAttribute('cx', item.x); dot.setAttribute('cy', item.y); dot.setAttribute('r', 3); dot.setAttribute('fill','#fff');
      g.appendChild(dot);
    }
    g.addEventListener('click', () => selectBin(item.id));
    return g;
  }

  bins.forEach(b => pinLayer.appendChild(makePinEl(b, 'bin')));
  foods.forEach(f => pinLayer.appendChild(makePinEl(f, 'food')));

  const infoEmpty = document.getElementById('infoEmpty');
  const infoCard = document.getElementById('infoCard');
  const infoType = document.getElementById('infoType');
  const infoTitle = document.getElementById('infoTitle');
  const infoMeta = document.getElementById('infoMeta');
  const infoFoodName = document.getElementById('infoFoodName');
  const infoFoodDist = document.getElementById('infoFoodDist');

  let selectedId = null;

  function selectBin(id){
    const bin = bins.find(b => b.id === id);
    if(!bin) return;
    selectedId = id;

    document.querySelectorAll('.pin').forEach(p => p.classList.remove('selected'));
    const el = pinLayer.querySelector('[data-id="'+id+'"]');
    if(el) el.classList.add('selected');

    infoEmpty.style.display = 'none';
    infoCard.classList.add('show');
    infoType.textContent = bin.label;
    infoType.style.background = bin.type === 'public' ? '#DCEAE5' : '#DCEAE5';
    infoType.style.color = '#123D33';
    infoTitle.textContent = bin.name;
    infoMeta.textContent = bin.meta;
    infoFoodName.textContent = bin.food.name;
    infoFoodDist.textContent = bin.food.dist;

    routeLine.setAttribute('x2', bin.x);
    routeLine.setAttribute('y2', bin.y);
    routeLine.classList.add('show');
  }

  document.getElementById('directionsBtn').addEventListener('click', () => {
    showToast('도보 경로를 안내합니다 🚶');
  });

  // filter chips
  document.getElementById('filterChips').addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if(!btn) return;
    document.querySelectorAll('#filterChips .chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.pin').forEach(p => {
      const match = filter === 'all' || p.dataset.filter === filter;
      p.classList.toggle('dim', !match);
    });
  });

  // ---------- food grid ----------
  const foodGrid = document.getElementById('foodGrid');
  function renderFoodGrid(){
    foodGrid.innerHTML = '';
    foods.forEach(f => {
      const card = document.createElement('div');
      card.className = 'food-card';
      card.dataset.cat = f.cat;
      card.innerHTML = `
        <div class="food-top">
          <span class="food-emoji">${f.emoji}</span>
          <button class="heart" aria-label="즐겨찾기">♥</button>
        </div>
        <div>
          <p class="food-name">${f.name}</p>
          <p class="food-cat">${f.cat}</p>
        </div>
        <p style="font-size:0.88rem;color:var(--ink-soft);margin:0;">${f.desc}</p>
        <div class="food-route">
          <span>${f.dist}</span>
          <button data-id="${f.id}">지도에서 보기</button>
        </div>`;
      foodGrid.appendChild(card);
    });
  }
  renderFoodGrid();

  foodGrid.addEventListener('click', (e) => {
    if(e.target.classList.contains('heart')){
      e.target.classList.toggle('active');
      showToast(e.target.classList.contains('active') ? '즐겨찾기에 추가했어요' : '즐겨찾기를 해제했어요');
      return;
    }
    const btn = e.target.closest('button[data-id]');
    if(btn){
      const fid = btn.dataset.id;
      const nearestBin = bins.find(b => b.food.name === foods.find(f=>f.id===fid).name) || bins[0];
      document.getElementById('map-feature').scrollIntoView({behavior:'smooth', block:'start'});
      setTimeout(() => selectBin(nearestBin.id), 350);
    }
  });

  document.getElementById('foodChips').addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if(!btn) return;
    document.querySelectorAll('#foodChips .chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.food-card').forEach(card => {
      card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
    });
  });

  // ---------- community tabs ----------
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });

  // ---------- login modal ----------
  const modal = document.getElementById('loginModal');
  document.getElementById('loginNavBtn').addEventListener('click', () => modal.classList.add('show'));
  document.getElementById('modalClose').addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('show'); });
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    modal.classList.remove('show');
    showToast('로그인되었습니다 · 환영합니다 👋');
  });

  // ---------- toast ----------
  let toastTimer;
  function showToast(msg){
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  // pre-select one bin so the panel isn't empty on load
  selectBin('b1');
