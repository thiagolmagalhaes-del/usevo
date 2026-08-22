// Helper module to load sql-formatter in a way Vite will handle for the browser.
// Using a static import so the bundler rewrites/links the module correctly.
import * as sqlFormatter from 'sql-formatter';

let cachedFn = null;

export function loadSqlFormatter() {
  if (cachedFn) return cachedFn;
  if (typeof sqlFormatter.format !== 'function') {
    console.error('sql-formatter: format function not found on static import', sqlFormatter);
    throw new Error('sql-formatter format function not found');
  }
  cachedFn = sqlFormatter.format;
  return cachedFn;
}
