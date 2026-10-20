const products = [
  { id: 'solar-panels', cat: 'power', name: 'Solar PV panels', Amt: 'N250,000', desc: 'Roof and ground-mount panels to generate your own clean power.', icon: 'M4 6h16l2 10H2z M12 6v10 M7 6l-1 10 M17 6l1 10 M2 11h20 M8 20h8 M12 16v4' },
  { id: 'hybrid-inverters', cat: 'power', name: 'Hybrid solar inverters', Amt: 'N250,000', desc: 'Convert and manage solar, battery and grid power in one unit.', icon: 'M4 5h16v14H4z M8 9h8 M8 13h3 M15 13h1' },
  { id: 'battery-storage', cat: 'power', name: 'Lithium battery storage', Amt: 'N250,000', desc: 'Store energy for the night, for outages and for peak demand.', icon: 'M3 8h15v8H3z M18 10.5h2v3h-2z M6 11v2 M9 11v2 M12 11v2' },
  { id: 'ups-stabilizers', cat: 'power', name: 'UPS and voltage stabilizers', Amt: 'N250,000', desc: 'Protect sensitive equipment from outages, surges and unstable supply.', icon: 'M9 3v5 M15 3v5 M6 8h12v3a6 6 0 0 1-12 0z M12 17v4' },
  { id: 'generators', cat: 'power', name: 'Backup generators', Amt: 'N250,000', desc: 'Dependable standby power for when the grid and solar are not enough.', icon: 'M3 7h18v10H3z M7 17v3 M17 17v3 M12 9l-2 3h4l-2 3' },
  { id: 'energy-meters', cat: 'smart', name: 'Smart energy meters', Amt: 'N250,000', desc: 'See what you use and what it costs, circuit by circuit.', icon: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z M12 12l4-3 M7 16h10' },
  { id: 'smart-lighting', cat: 'smart', name: 'Smart lighting and switches', Amt: 'N250,000', desc: 'Control lights and loads from your phone, by schedule or by scene.', icon: 'M9 18h6 M10 21h4 M12 3a6 6 0 0 0-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 0 0-4-10z' },
  { id: 'smart-locks', cat: 'smart', name: 'Smart door locks', Amt: 'N250,000', desc: 'Keyless entry with codes, cards or your phone.', icon: 'M6 11h12v9H6z M8 11V8a4 4 0 0 1 8 0v3 M12 15v2' },
  { id: 'automation-hubs', cat: 'smart', name: 'Automation controllers', Amt: 'N250,000', desc: 'The hub that ties your devices together into one connected system.', icon: 'M12 4v3 M12 17v3 M4 12h3 M17 12h3 M9 9h6v6H9z' },
  { id: 'cctv', cat: 'security', name: 'CCTV and IP cameras', Amt: 'N250,000', desc: 'Indoor and outdoor cameras with remote viewing and recording.', icon: 'M3 8l13-3 2 6-13 3z M18 10l3-1 M10 14l-1 6 M6 20h6' },
  { id: 'video-intercom', cat: 'security', name: 'Video door phones', Amt: 'N250,000', desc: 'See and speak to visitors before you open the door.', icon: 'M7 3h10v18H7z M10 7h4 M12 13a2 2 0 1 0 0 .01 M10 18h4' },
  { id: 'access-control', cat: 'security', name: 'Access control and biometrics', Amt: 'N250,000', desc: 'Fingerprint, card and code entry for offices, estates and sites.', icon: 'M12 4a7 7 0 0 0-7 7v2 M12 8a3 3 0 0 0-3 3v4 M12 12v4 M16 10a4 4 0 0 0-1-2 M19 13v-2a7 7 0 0 0-2-5' },
  { id: 'alarms', cat: 'security', name: 'Alarm and intruder detection', Amt: 'N250,000', desc: 'Sensors and sirens that alert you the moment something is wrong.', icon: 'M6 17v-5a6 6 0 0 1 12 0v5 M4 17h16 M10 20h4 M12 3v1' }
];
const categoryNames = { power: 'Power & solar', smart: 'Smart automation', security: 'Security' };
const featuredIds = ['solar-panels', 'hybrid-inverters', 'battery-storage', 'smart-lighting', 'smart-locks', 'cctv', 'access-control', 'alarms'];

function iconMarkup(path) { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"></path></svg>`; }
function productCard(product) { return `<article class="product-card" data-product-card="${product.id}"><div class="product-visual">${iconMarkup(product.icon)}</div><span class="product-category">${categoryNames[product.cat]}</span><h3>${product.name}</h3><p>${product.desc}</p><button class="product-quote" type="button" data-quote-product="${product.id}">Request a quote <span aria-hidden="true">↗</span></button></article>`; }
function renderProducts() {
  const featured = document.querySelector('[data-featured]');
  if (featured) featured.innerHTML = products.filter(p => featuredIds.includes(p.id)).map(productCard).join('');
  const catalog = document.querySelector('[data-catalog]');
  if (catalog) {
    catalog.innerHTML = products.map(productCard).join('');
    const search = document.querySelector('#product-search');
    const count = document.querySelector('#results-count');
    const empty = document.querySelector('#empty-state');
    let activeFilter = 'all';
    function filter() {
      const query = (search.value || '').trim().toLowerCase(); let shown = 0;
      products.forEach(p => { const matchesCategory = activeFilter === 'all' || p.cat === activeFilter; const matchesQuery = !query || `${p.name} ${p.desc} ${categoryNames[p.cat]}`.toLowerCase().includes(query); const card = catalog.querySelector(`[data-product-card="${p.id}"]`); const visible = matchesCategory && matchesQuery; card.hidden = !visible; if (visible) shown++; });
      count.textContent = `${shown} ${shown === 1 ? 'product' : 'products'}`; empty.hidden = shown !== 0;
    }
    search.addEventListener('input', filter);
    document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('is-active', b === button)); filter(); }));
    const hash = location.hash.replace('#', ''); if (['power', 'smart', 'security'].includes(hash)) { document.querySelector(`[data-filter="${hash}"]`)?.click(); }
    document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && search) { e.preventDefault(); search.focus(); } });
  }
  const select = document.querySelector('#quote-product');
  if (select) products.forEach(p => { const option = document.createElement('option'); option.value = p.id; option.textContent = p.name; select.append(option); });
}
function setupModal() {
  const modal = document.querySelector('#quote-modal'); if (!modal) return;
  const form = modal.querySelector('#quote-form'); const error = modal.querySelector('#form-error'); const success = modal.querySelector('#form-success'); let lastFocus = null;
  function open(productId = '') { lastFocus = document.activeElement; modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); if (productId) { const select = form.elements.product; if (select) select.value = productId; } error.textContent = ''; success.classList.remove('is-visible'); modal.querySelector('input[name="name"]').focus(); }
  function close() { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); if (lastFocus) lastFocus.focus(); }
  document.addEventListener('click', e => { const quote = e.target.closest('.js-quote,[data-quote],[data-quote-product]'); if (quote) { e.preventDefault(); open(quote.dataset.quoteProduct || ''); } if (e.target.closest('[data-close-modal]')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); if (e.key === 'Tab' && modal.classList.contains('is-open')) { const focusable = [...modal.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[href]')]; const first = focusable[0], last = focusable[focusable.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } } });
  form.addEventListener('submit', e => { e.preventDefault(); error.textContent = ''; success.classList.remove('is-visible'); if (!form.elements.name.value.trim() || !form.elements.phone.value.trim()) { error.textContent = 'Please enter your name and phone number so we can reach you.'; return; } success.classList.add('is-visible'); success.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
}
document.addEventListener('DOMContentLoaded', () => { renderProducts(); setupModal(); document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear()); const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.main-nav'); if (toggle && nav) { toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); })); } });
