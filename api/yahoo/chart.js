module.exports = async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.status(204).end();
      return;
    }

    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { symbol, interval = '1d', range, period1, period2 } = req.query || {};
    const safeSymbol = typeof symbol === 'string' ? symbol.toUpperCase() : '';

    if (!safeSymbol || !/^[A-Z0-9.^-]{1,20}$/.test(safeSymbol)) {
      res.status(400).json({ error: 'Invalid Yahoo Finance symbol' });
      return;
    }

    const yahooSymbol = safeSymbol.includes('.') ? safeSymbol : `${safeSymbol}.JK`;
    const allowedIntervals = new Set(['1m', '5m', '15m', '30m', '60m', '1d', '1wk', '1mo']);
    const normalizedInterval = allowedIntervals.has(interval) ? interval : '1d';

    const yahooUrl = new URL(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}`);
    yahooUrl.searchParams.set('interval', normalizedInterval);

    for (const name of ['range', 'period1', 'period2']) {
      const value = { range, period1, period2 }[name];
      if (value && (name === 'range' ? /^[0-9]+[a-z]+$/.test(String(value)) || value === 'ytd' || value === 'max' : /^\d+$/.test(String(value)))) {
        yahooUrl.searchParams.set(name, String(value));
      }
    }

    const response = await fetch(yahooUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(15000)
    });

    const body = await response.text();
    res.status(response.status);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(body);
  } catch (error) {
    console.error('Yahoo proxy failed:', error);
    res.status(502).json({ error: `Yahoo Finance request failed: ${error.message}` });
  }
};
