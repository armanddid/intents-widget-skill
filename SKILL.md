---
name: intents-widget
description: Implement Aurora Labs Intents Swap Widget for cross-chain token swapping. Use when setting up, configuring, or troubleshooting the intents-swap-widget package.
---

# Intents Swap Widget Implementation Guide

You are helping implement the Aurora Labs Intents Swap Widget (`@aurora-is-near/intents-swap-widget`), a cross-chain token swapping component.

## Installation

```bash
npm install @aurora-is-near/intents-swap-widget
# or
yarn add @aurora-is-near/intents-swap-widget
# or
pnpm add @aurora-is-near/intents-swap-widget
```

## Basic Setup

The widget requires two components:
1. `WidgetConfigProvider` - Wraps the app and provides configuration
2. `Widget` - The actual swap interface

```tsx
import {
  type WidgetConfig,
  WidgetConfigProvider,
  Widget,
} from '@aurora-is-near/intents-swap-widget';

const config: WidgetConfig = {
  appName: 'My App',
  connectedWallets: {
    default: '0x...', // EVM wallet address
    // Add other chain wallets as needed
  },
};

export default function App() {
  return (
    <WidgetConfigProvider config={config}>
      <Widget />
    </WidgetConfigProvider>
  );
}
```

## Configuration Reference

### Required Properties

- **`appName`**: string - Your app identifier used in NEAR Intents transfers
- **`connectedWallets`**: object - Map of wallet addresses by chain (`default`, `ton`, `near`, `sol`, etc.)

### Wallet & Account Options

- **`enableStandaloneMode`**: boolean - Enable built-in AppKit wallet connection
- **`enableAccountAbstraction`**: boolean - Allow deposits/withdrawals from Intents account
- **`intentsAccountType`**: 'evm' | 'near' | 'solana' - Wallet provider type for signing
- **`walletSupportedChains`**: string[] - Supported blockchain networks
- **`sendAddress`**: string - Fixed destination wallet (optional)
- **`onWalletSignin`**: () => void - Callback for wallet connection
- **`onWalletSignout`**: () => void - Callback for signing out
- **`providers`**: Provider[] - Wallet providers for message signing

### Token Configuration

- **`defaultSourceToken`**: string | null - Preset source token
- **`defaultTargetToken`**: string | null - Preset target token
- **`allowedTokensList`**: string[] - Restrict tokens by asset ID or symbol
- **`allowedSourceTokensList`**: string[] - Restrict source tokens only
- **`allowedTargetTokensList`**: string[] - Restrict target tokens only
- **`filterTokens`**: (token) => boolean - Custom filter function
- **`showIntentTokens`**: boolean - Show NEAR Intents tokens
- **`priorityAssets`**: string[] - Token ordering for zero-balance items

### Chain Configuration

- **`allowedChainsList`**: string[] - Restrict available chains
- **`allowedSourceChainsList`**: string[] - Restrict source chains
- **`allowedTargetChainsList`**: string[] - Restrict target chains
- **`chainsOrder`**: string[] - Display order (e.g., `['eth', 'btc', 'near']`)
- **`topChainShortcuts`**: string[] | ((type) => string[]) - Quick-access chain buttons
- **`chainsFilter`**: object - Fine-grained chain category filtering

### Transaction Settings

- **`slippageTolerance`**: number - Tolerance in basis points (100 = 1%, 50 = 0.5%)
- **`refetchQuoteInterval`**: number - Milliseconds between quote refreshes
- **`enableAutoTokensSwitching`**: boolean - Auto-swap when same token selected
- **`lockSwapDirection`**: boolean - Disable direction switch arrow

### Fees Configuration

```tsx
const config: WidgetConfig = {
  appFees: [
    {
      recipient: 'your.account.near',
      fee: 100, // 1% in basis points
    },
  ],
};
```

### Custom API Integration

```tsx
const config: WidgetConfig = {
  // Custom quote fetching (useful for proxying)
  fetchQuote: async (data, { signal }) => {
    const res = await axios.post('https://my.proxy.com/quote', data, { signal });
    return res.data;
  },

  // Custom token fetching
  fetchSourceTokens: async () => { /* return tokens */ },
  fetchTargetTokens: async () => { /* return tokens */ },

  // API keys for enhanced balance fetching
  alchemyApiKey: 'your-alchemy-key',
  tonCenterApiKey: 'your-ton-center-key',
};
```

### UI Customization

- **`appIcon`**: string - URL for app icon in chain dropdown
- **`themeParentElementSelector`**: string - Element for CSS theme variables (default: `body`)
- **`hideTokenInputHeadings`**: boolean - Remove input box labels
- **`hideSendAddress`**: boolean - Hide destination address display

### Theme Configuration

Pass a `theme` object to `WidgetConfigProvider`:

```tsx
import type { Theme } from '@aurora-is-near/intents-swap-widget';

const theme: Theme = {
  colorScheme: 'dark',        // 'light' | 'dark'
  stylePreset: 'clean',       // 'clean' | 'bold'
  borderRadius: 'md',         // 'none' | 'sm' | 'md' | 'lg'
  accentColor: '#FFA61E',     // Primary accent color
  backgroundColor: '#24262D', // Widget background
  successColor: '#98FFB5',    // Success state color
  warningColor: '#FADFAD',    // Warning state color
  errorColor: '#FFB8BE',      // Error state color
};

<WidgetConfigProvider config={config} theme={theme}>
  <Widget />
</WidgetConfigProvider>
```

## Decision Points

When implementing the widget, you'll need to make these key decisions:

### 1. Framework Choice
- **Next.js (App Router)**: Recommended for full-stack apps with SSR support
- **Next.js (Pages Router)**: Simpler mental model, more tutorials available
- **Vite + React**: Lightweight, fast dev server for client-side apps

### 2. Wallet Connection Mode

Choose based on your app's architecture:

| Mode | When to Use | Config |
|------|-------------|--------|
| **Standalone Mode** | New apps, widget is the main feature, no existing wallet logic | `enableStandaloneMode: true` |
| **dApp Mode** | Existing dApps with wallet connection already implemented | Provide `connectedWallets` + `providers` |

**Standalone Mode**: Widget handles wallet connection via built-in AppKit. Users connect directly through the widget UI.

**dApp Mode**: Your app manages wallet connections (via wagmi, rainbowkit, etc.) and passes the connected address to the widget.

### 3. Intents Account Type (Standalone Mode only)

When using Standalone Mode, choose the primary signing method:
- **EVM**: Ethereum-compatible wallets (MetaMask, WalletConnect). Most common.
- **NEAR**: NEAR Protocol native wallets
- **Solana**: Solana wallets (Phantom, Solflare)

### 4. Component Structure (Next.js)

- **Single file**: Config and component together. Good for demos.
- **Separate files**: Config in `config/widget.ts`, component in `components/SwapWidget.tsx`. Better for larger apps.

**Important for Next.js App Router**: The widget must be a client component (`"use client"`) since it uses browser APIs.

## Common Patterns

### Standalone Mode Setup

```tsx
const config: WidgetConfig = {
  appName: 'My Swap App',
  enableStandaloneMode: true,
  intentsAccountType: 'evm', // or 'near' or 'solana'
};
```

### dApp Mode Setup

```tsx
// Your app already has wallet connection (e.g., via wagmi)
const { address } = useAccount();

const config: WidgetConfig = {
  appName: 'My dApp',
  connectedWallets: {
    default: address, // Pass the connected wallet address
  },
  providers: [provider], // Your wallet provider for signing
  onWalletSignin: () => openConnectModal(), // Trigger your wallet modal
  onWalletSignout: () => disconnect(),
};
```

### Restricting to Specific Tokens

```tsx
const config: WidgetConfig = {
  appName: 'My App',
  connectedWallets: { default: '0x...' },
  allowedTokensList: ['USDT', 'USDC', 'ETH', 'NEAR'],
  // Or use asset IDs:
  // allowedTokensList: ['nep141:eth.omft.near', 'nep141:usdt.tether-token.near'],
};
```

### Custom Chain Order with Shortcuts

```tsx
const config: WidgetConfig = {
  appName: 'My App',
  connectedWallets: { default: '0x...' },
  chainsOrder: ['eth', 'btc', 'near', 'sol'],
  topChainShortcuts: ['eth', 'arb', 'base', 'near'],
};
```

## Next.js App Router Setup (Critical)

When using Next.js App Router, you MUST follow these requirements:

### 1. Import CSS Styles

The widget requires its CSS files to be imported:

```tsx
// In your SwapWidget.tsx component
import '@aurora-is-near/intents-swap-widget/styles.css';
import '@aurora-is-near/intents-swap-widget/theme.css';
```

### 2. Disable SSR for the Widget

The widget uses browser APIs and a state machine that doesn't work with server-side rendering. Use dynamic import:

```tsx
// In your page.tsx
import dynamic from 'next/dynamic';

const SwapWidget = dynamic(
  () => import('@/components/SwapWidget').then((mod) => mod.SwapWidget),
  { ssr: false }
);
```

### 3. Disable React Strict Mode (Optional)

If you see state machine errors like `Invalid context state for transition request`, disable React Strict Mode in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  reactStrictMode: false,
};
```

### Complete Next.js Component Example

**src/config/widget.ts:**
```tsx
import type { WidgetConfig, Theme } from '@aurora-is-near/intents-swap-widget';

export const widgetConfig: WidgetConfig = {
  appName: 'My App',
  enableStandaloneMode: true,
  intentsAccountType: 'evm',
  connectedWallets: {},
  walletSupportedChains: [],
  slippageTolerance: 50,
  showIntentTokens: true,
  enableAccountAbstraction: false, // Keep false to avoid state machine issues
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
```

**src/components/SwapWidget.tsx:**
```tsx
'use client';

import { useState, useEffect } from 'react';
import {
  WidgetConfigProvider,
  Widget,
} from '@aurora-is-near/intents-swap-widget';
import '@aurora-is-near/intents-swap-widget/styles.css';
import '@aurora-is-near/intents-swap-widget/theme.css';
import { widgetConfig, widgetTheme } from '@/config/widget';

export function SwapWidget() {
  // Hydration guard - prevents state machine issues during SSR/hydration
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
```

**src/app/page.tsx:**
```tsx
'use client'; // Required when using dynamic with ssr: false

import dynamic from 'next/dynamic';

const SwapWidget = dynamic(
  () => import('@/components/SwapWidget').then((mod) => mod.SwapWidget),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SwapWidget />
    </div>
  );
}
```

**Note**: The page must be a Client Component (`'use client'`) when using `dynamic` with `ssr: false`.

## TypeScript Required Fields

The `WidgetConfig` type requires several fields even when using Standalone Mode. Here's the minimal config that satisfies TypeScript:

```tsx
import type { WidgetConfig } from '@aurora-is-near/intents-swap-widget';

export const widgetConfig: WidgetConfig = {
  appName: 'My App',
  enableStandaloneMode: true,
  intentsAccountType: 'evm',

  // Required by TypeScript (even for standalone mode)
  connectedWallets: {},
  walletSupportedChains: [],
  slippageTolerance: 50, // 0.5% in basis points
  showIntentTokens: true,
  enableAccountAbstraction: false,
  enableAutoTokensSwitching: true,
  filterTokens: () => true,
  chainsOrder: ['eth', 'btc', 'near', 'sol'],
};
```

## Troubleshooting

### Common Issues

1. **Widget not rendering**: Ensure `WidgetConfigProvider` wraps the `Widget` component
2. **Wallet not connecting**: Check `connectedWallets` has valid addresses for the chains you support
3. **Tokens not showing**: Verify `allowedTokensList` includes the tokens you want
4. **Quote errors**: Check network connectivity and consider implementing custom `fetchQuote`
5. **TypeScript errors**: Ensure all required fields are present (see TypeScript Required Fields section above)
6. **No styles/broken design**: Import CSS files (`styles.css` and `theme.css`)
7. **Theme not applied**: Pass `theme` to `WidgetConfigProvider`, NOT to `Widget`

### State Machine Error

**Error**: `[WIDGET] Invalid context state for transition request with moveTo (from initial_dry to initial_wallet)`

**Cause**: Race condition in the widget's internal state machine. The transition guard requires specific conditions to be met simultaneously (wallet address set, quote status idle, transfer status idle).

**Mitigations**:
1. Add hydration guard (see Complete Example above)
2. Set `enableAccountAbstraction: false`
3. Disable React Strict Mode
4. Use dynamic import with `ssr: false`

**Note**: This error may be non-blocking - test if the widget still functions despite the console error.

### Next.js Specific Issues

| Issue | Solution |
|-------|----------|
| `ssr: false` not allowed in Server Components | Add `'use client'` to the page |
| Hydration mismatch | Add `isMounted` state guard |
| Double-mount in dev | Disable `reactStrictMode` |

## Documentation Reference

Full documentation: https://aurora-labs.gitbook.io/intents-swap-widget/
