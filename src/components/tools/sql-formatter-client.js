// Helper module to load sql-formatter in a way Vite will handle for the browser.
// Using a static import so the bundler rewrites/links the module correctly.
import * as sqlFormatter from 'sql-formatter';

let cachedFn = null;

export function loadSqlFormatter() {
  if (cachedFn) return cachedFn;
  // Normalize exports
  let fn = null;
  if (typeof sqlFormatter === 'function') fn = sqlFormatter;
  else if (sqlFormatter && typeof sqlFormatter.format === 'function') fn = sqlFormatter.format;
  else if (sqlFormatter && sqlFormatter.default) {
    if (typeof sqlFormatter.default === 'function') fn = sqlFormatter.default;
    else if (sqlFormatter.default && typeof sqlFormatter.default.format === 'function') fn = sqlFormatter.default.format;
  }
  if (!fn) {
    console.error('sql-formatter: format function not found on static import', sqlFormatter);
    throw new Error('sql-formatter format function not found');
  }
  cachedFn = fn;
  return cachedFn;
}
