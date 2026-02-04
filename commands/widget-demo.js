/**
 * widget-demo command
 * Creates a minimal Next.js demo page with the Aurora Intents Swap Widget
 * 
 * Usage: /widget-demo
 * 
 * This command will:
 * 1. Create a Next.js app structure (if not exists)
 * 2. Add the widget configuration file
 * 3. Add the SwapWidget component
 * 4. Add the demo page
 */

const WIDGET_CONFIG = `import type { WidgetConfig, Theme } from '@aurora-is-near/intents-swap-widget';

export const widgetConfig: WidgetConfig = {
  appName: 'Intents Demo',
  enableStandaloneMode: true,
  intentsAccountType: 'evm',
  connectedWallets: {},
  walletSupportedChains: [],
  slippageTolerance: 50,
  showIntentTokens: true,
  enableAccountAbstraction: false,
  enableAutoTokensSwitching: true,
  filterTokens: () => true,
  chainsOrder: ['eth', 'btc', 'near', 'sol', 'base', 'arb'],
};

export const widgetTheme: Theme = {
  colorScheme: 'dark',
  stylePreset: 'clean',
  borderRadius: 'md',
  accentColor: '#FFA61E',
  backgroundColor: '#24262D',
  successColor: '#98FFB5',
  warningColor: '#FADFAD',
  errorColor: '#FFB8BE',
};
`;

const SWAP_WIDGET_COMPONENT = `'use client';

import { useState, useEffect } from 'react';
import {
  WidgetConfigProvider,
  Widget,
} from '@aurora-is-near/intents-swap-widget';
import '@aurora-is-near/intents-swap-widget/styles.css';
import '@aurora-is-near/intents-swap-widget/theme.css';
import { widgetConfig, widgetTheme } from '@/config/widget';

export function SwapWidget() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <div className="w-[400px] h-[500px] bg-[#24262D] rounded-xl animate-pulse" />;
  }

  return (
    <WidgetConfigProvider config={widgetConfig} theme={widgetTheme}>
      <Widget />
    </WidgetConfigProvider>
  );
}
`;

const DEMO_PAGE = `'use client';

import dynamic from 'next/dynamic';

const SwapWidget = dynamic(
  () => import('@/components/SwapWidget').then((mod) => mod.SwapWidget),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <SwapWidget />
    </div>
  );
}
`;

module.exports = {
  WIDGET_CONFIG,
  SWAP_WIDGET_COMPONENT,
  DEMO_PAGE,
  
  // Instructions for Claude
  instructions: `
To create the demo, execute these steps:

1. Install the widget package:
   npm install @aurora-is-near/intents-swap-widget

2. Create src/config/widget.ts with WIDGET_CONFIG content

3. Create src/components/SwapWidget.tsx with SWAP_WIDGET_COMPONENT content

4. Update src/app/page.tsx with DEMO_PAGE content

5. Disable React Strict Mode in next.config.ts:
   const nextConfig = { reactStrictMode: false };

6. Run: npm run dev
`
};
