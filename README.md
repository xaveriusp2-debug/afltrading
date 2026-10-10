# Kompas100 Strategy Monitor

A lightweight dashboard for monitoring Kompas100-inspired stock signals and paper-trading performance, designed to run as a static app with a Vercel serverless Yahoo Finance proxy.

## Features

- Stock universe input and reference ticker list
- Signal table for trend and RSI-based evaluation
- Historical chart modal for ticker price action
- Paper trading / portfolio simulation
- Yahoo Finance proxy compatible with Vercel serverless functions

## Local run

```bash
cd "c:\Users\HELLO\Downloads\kompas100-vercel-app"
npm install
node yahoo-finance-server.js
```

Then open:

```text
http://127.0.0.1:4173/
```

## Vercel deploy

```bash
cd "c:\Users\HELLO\Downloads\kompas100-vercel-app"
npx --yes vercel@63.1.2 --prod --yes
```

Set environment variables in Vercel if needed:

```text
AI_GATEWAY_API_KEY=your_key_here
```

## Notes

This project uses a serverless API endpoint at `/api/yahoo/chart` to proxy Yahoo Finance requests, which helps avoid client-side CORS issues in a production deployment.
