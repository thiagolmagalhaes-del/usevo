import { loadSqlFormatter } from './sql-formatter-client.js';

// Client-side module placed next to the page so the built index.html's
// relative import ./SqlFormatter.client.js resolves to a real file in dist.

function showError(errorEl, msg) {
  if (!errorEl) return;
  errorEl.style.display = 'block';
  errorEl.textContent = msg;
}
function clearError(errorEl) {
  if (!errorEl) return;
  errorEl.style.display = 'none';
  errorEl.textContent = '';
}

function init() {
  const sqlInput = document.getElementById('sqlInput');
  const dialectEl = document.getElementById('dialect');
  const formatBtn = document.getElementById('formatBtn');
  const copyBtn = document.getElementById('copyBtn');
  const clearBtn = document.getElementById('clearBtn');
  const formatted = document.getElementById('formatted');
  const errorEl = document.getElementById('error');

  if (!formatBtn) return; // nothing to do

  const supportedDialects = ['sql', 'postgresql', 'mysql', 'sqlite'];

  let formatFn = null;

  async function ensureFormatter() {
    if (formatFn) return formatFn;
    try {
      // loadSqlFormatter performs static import normalization
      const fn = loadSqlFormatter();
      formatFn = fn;
      return formatFn;
    } catch (e) {
      console.error('Failed to load sql-formatter via helper (client module)', e);
      throw e;
    }
  }

  async function onFormatClick() {
    clearError(errorEl);
    try {
      const sql = (sqlInput && sqlInput.value) || '';
      if (!sql.trim()) { showError(errorEl, 'Nenhum SQL fornecido.'); return; }
      const chosen = dialectEl ? dialectEl.value : 'sql';
      const dialect = supportedDialects.includes(chosen) ? chosen : 'sql';
      try {
        const fmt = await ensureFormatter();
        const formattedSql = fmt(sql, { language: dialect });
        if (formatted) formatted.textContent = formattedSql;
      } catch (e) {
        // fallback to plain format without dialect
        try {
          const fmt = await ensureFormatter();
          if (formatted) formatted.textContent = fmt(sql);
        } catch (inner) {
          console.error(inner);
          showError(errorEl, 'Falha ao formatar SQL.');
        }
      }
    } catch (err) {
      console.error(err);
      showError(errorEl, 'Erro ao processar a solicitação.');
    }
  }

  formatBtn.addEventListener('click', onFormatClick);

  copyBtn && copyBtn.addEventListener('click', async () => {
    clearError(errorEl);
    try {
      await navigator.clipboard.writeText((formatted && formatted.textContent) || '');
      if (errorEl) {
        errorEl.style.display = 'block';
        errorEl.textContent = 'Copiado para a área de transferência.';
        setTimeout(() => clearError(errorEl), 1800);
      }
    } catch (err) {
      console.error(err);
      showError(errorEl, 'Não foi possível copiar para a área de transferência.');
    }
  });

  clearBtn && clearBtn.addEventListener('click', () => { if (sqlInput) sqlInput.value = ''; if (formatted) formatted.textContent = ''; clearError(errorEl); });
}

// Initialize when module is loaded in browser
if (typeof window !== 'undefined') {
  // Run on next tick to ensure DOM is present
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
