(() => {
  const script = Array.from(document.scripts).find(s => /assets\/js\/search\.js(?:\?|$)/.test(s.src));
  if (!script) return;

  const root = new URL('../../', script.src);
  const u = p => new URL(p, root).href;
  const qEl = document.getElementById('q');
  const go = document.getElementById('go');
  const results = document.getElementById('results');
  const count = document.getElementById('result-count');
  if (!qEl || !go || !results) return;

  let index = [];

  const esc = s => String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));

  const norm = s => String(s || '')
    .toLocaleLowerCase('sr')
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '');

  const makeSnippet = (text, terms) => {
    const plain = String(text || '').replace(/\s+/g, ' ').trim();
    if (!plain) return '';
    const n = norm(plain);
    let pos = Infinity;
    terms.forEach(t => {
      const p = n.indexOf(t);
      if (p >= 0 && p < pos) pos = p;
    });
    if (!Number.isFinite(pos)) pos = 0;
    const start = Math.max(0, pos - 120);
    const end = Math.min(plain.length, start + 330);
    return (start ? '…' : '') + plain.slice(start, end).trim() + (end < plain.length ? '…' : '');
  };

  const search = () => {
    const raw = qEl.value.trim();
    const terms = norm(raw).split(/\s+/).filter(Boolean);

    const params = new URLSearchParams(location.search);
    if (raw) params.set('q', raw); else params.delete('q');
    history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params : ''));

    if (!terms.length) {
      results.innerHTML = '';
      if (count) count.textContent = '';
      return;
    }

    const matches = index.map(item => {
      const title = norm(item.title);
      const body = norm(item.text);
      const all = title + ' ' + body;
      if (!terms.every(t => all.includes(t))) return null;

      let score = 0;
      terms.forEach(t => {
        if (title === t) score += 100;
        else if (title.includes(t)) score += 30;
        score += Math.min(body.split(t).length - 1, 10);
      });
      return {item, score};
    }).filter(Boolean)
      .sort((a,b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'sr'))
      .slice(0, 100);

    if (count) {
      count.textContent = matches.length
        ? `${matches.length} ${matches.length === 1 ? 'rezultat' : 'rezultata'}`
        : 'Nema rezultata';
    }

    results.innerHTML = matches.length ? matches.map(({item}) => `
      <article class="search-result">
        <h2><a href="${u(item.url.replace(/^\//,''))}">${esc(item.title)}</a></h2>
        <p>${esc(makeSnippet(item.text, terms))}</p>
      </article>`).join('') : '<p>Nema rezultata za uneti pojam.</p>';
  };

  fetch(u('assets/search-index.json'))
    .then(r => {
      if (!r.ok) throw new Error('Search index could not be loaded');
      return r.json();
    })
    .then(data => {
      index = Array.isArray(data) ? data : [];
      const initial = new URLSearchParams(location.search).get('q') || '';
      if (initial) {
        qEl.value = initial;
        search();
      }
    })
    .catch(() => {
      results.innerHTML = '<p>Pretraživanje trenutno nije dostupno.</p>';
    });

  go.addEventListener('click', search);
  qEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') search();
  });
})();