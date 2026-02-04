/**
 * widget-config command
 * Generate widget configuration for standalone or dApp mode
 * 
 * Usage: /widget-config
 * 
 * This command helps generate the appropriate WidgetConfig
 * based on the user's requirements.
 */

const STANDALONE_CONFIG = `import type { WidgetConfig } from '@aurora-is-near/intents-swap-widget';

export const widgetConfig: WidgetConfig = {
  appName: 'My App',
  enableStandaloneMode: true,
  intentsAccountType: 'evm', // 'evm' | 'near' | 'solana'
  
  // Required by TypeScript
  connectedWallets: {},
  walletSupportedChains: [],
  slippageTolerance: 50, // 0.5% in basis points
  showIntentTokens: true,
  enableAccountAbstraction: false,
  enableAutoTokensSwitching: true,
  filterTokens: () => true,
  chainsOrder: ['eth', 'btc', 'near', 'sol'],
};
`;

const DAPP_CONFIG = `import type { WidgetConfig } from '@aurora-is-near/intents-swap-widget';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export function useWidgetConfig(): WidgetConfig {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  return {
    appName: 'My dApp',
    connectedWallets: {
      default: address,
    },
    providers: [], // Add your wallet providers here
    onWalletSignin: () => openConnectModal?.(),
    onWalletSignout: () => disconnect(),
    
    // Additional options
    slippageTolerance: 50,
    showIntentTokens: true,
    enableAccountAbstraction: false,
    enableAutoTokensSwitching: true,
    filterTokens: () => true,
    chainsOrder: ['eth', 'btc', 'near', 'sol'],
  };
}
`;

const THEME_CONFIG = `import type { Theme } from '@aurora-is-near/intents-swap-widget';

export const widgetTheme: Theme = {
  colorScheme: 'dark',        // 'light' | 'dark'
  stylePreset: 'clean',       // 'clean' | 'bold'
  borderRadius: 'md',         // 'none' | 'sm' | 'md' | 'lg'
  accentColor: '#FFA61E',     // Primary accent color
  backgroundColor: '#24262D', // Widget background
  successColor: '#98FFB5',    // Success state color
  warningColor: '#FADFAD',    // Warning state color
  errorColor: '#FFB8BE',      // Error state color
};
`;

const TOKEN_RESTRICTION_CONFIG = `// Restrict to specific tokens
const config: WidgetConfig = {
  // ... base config
  allowedTokensList: ['USDT', 'USDC', 'ETH', 'NEAR'],
  // Or use asset IDs:
  // allowedTokensList: ['nep141:eth.omft.near', 'nep141:usdt.tether-token.near'],
};
`;

const CHAIN_CONFIG = `// Custom chain order and shortcuts
const config: WidgetConfig = {
  // ... base config
  chainsOrder: ['eth', 'btc', 'near', 'sol'],
  topChainShortcuts: ['eth', 'arb', 'base', 'near'],
  allowedChainsList: ['eth', 'near', 'sol'], // Restrict available chains
};
`;

const FEES_CONFIG = `// Add application fees
const config: WidgetConfig = {
  // ... base config
  appFees: [
    {
      recipient: 'your.account.near',
      fee: 100, // 1% in basis points
    },
  ],
};
`;

module.exports = {
  STANDALONE_CONFIG,
  DAPP_CONFIG,
  THEME_CONFIG,
  TOKEN_RESTRICTION_CONFIG,
  CHAIN_CONFIG,
  FEES_CONFIG,
  
  instructions: `
Ask the user which mode they need:

1. **Standalone Mode** - Widget handles wallet connection
   Use STANDALONE_CONFIG template
   
2. **dApp Mode** - App already has wallet connection (wagmi, rainbowkit, etc.)
   Use DAPP_CONFIG template

Then ask about customization:
- Theme: Use THEME_CONFIG
- Token restrictions: Use TOKEN_RESTRICTION_CONFIG
- Chain restrictions: Use CHAIN_CONFIG
- Application fees: Use FEES_CONFIG
`
};
