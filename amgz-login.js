/* "Login with AMOGENZ" — identitas opsional di web utama.
 * Alur: tombol Masuk -> PKCE -> account.amogenz.xyz/authorize ->
 *        /oauth/callback -> simpan identitas di localStorage.
 */
(() => {
  const CLIENT_ID = 'web-amogenz';
  const REDIRECT_URI = 'https://amogenz.xyz/oauth/callback';
  const AUTH_URL = 'https://account.amogenz.xyz/api/oauth/authorize';

  const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const rand = (n) => b64u(crypto.getRandomValues(new Uint8Array(n)));

  async function pkceChallenge(v) {
    const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(v));
    return b64u(d);
  }

  window.amgzLogin = async () => {
    const verifier = rand(48), state = rand(24);
    const challenge = await pkceChallenge(verifier);
    sessionStorage.setItem('amgz_oauth_verifier', verifier);
    sessionStorage.setItem('amgz_oauth_state', state);
    sessionStorage.setItem('amgz_oauth_return', location.pathname + location.search);
    const u = new URL(AUTH_URL);
    u.searchParams.set('client_id', CLIENT_ID);
    u.searchParams.set('redirect_uri', REDIRECT_URI);
    u.searchParams.set('response_type', 'code');
    u.searchParams.set('scope', 'openid profile email');
    u.searchParams.set('state', state);
    u.searchParams.set('code_challenge', challenge);
    u.searchParams.set('code_challenge_method', 'S256');
    location.href = u.toString();
  };

  window.amgzLogout = () => {
    localStorage.removeItem('amgz_identity');
    location.reload();
  };

  window.amgzIdentity = () => {
    try { return JSON.parse(localStorage.getItem('amgz_identity') || 'null'); }
    catch { return null; }
  };

  /* Render tombol Masuk / chip user di .topbar-actions */
  function render() {
    const wrap = document.querySelector('.topbar-actions');
    if (!wrap || wrap.dataset.amgzDone) return;
    wrap.dataset.amgzDone = '1';
    const id = window.amgzIdentity();
    const old = wrap.querySelector('[data-amgz]');
    if (old) old.remove();
    if (id) {
      const chip = document.createElement('button');
      chip.dataset.amgz = '1';
      chip.className = 'amgz-chip';
      chip.title = 'Keluar';
      const initial = (id.name || '?')[0].toUpperCase();
      chip.innerHTML = `<span class="amgz-av">${initial}</span><span>${escapeHtml(id.name)}</span>`;
      chip.onclick = () => { if (confirm('Keluar dari AMOGENZ di perangkat ini?')) window.amgzLogout(); };
      wrap.prepend(chip);
    } else {
      const btn = document.createElement('button');
      btn.dataset.amgz = '1';
      btn.className = 'amgz-login-btn';
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg><span>Masuk</span>`;
      btn.onclick = window.amgzLogin;
      wrap.prepend(btn);
    }
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', render);
  else render();
})();
