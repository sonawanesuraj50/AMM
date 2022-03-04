import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";



export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42,97],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: "https://main-light.eth.linkpool.io",
    3: "https://ropsten.mycustomnode.com",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  },
  bridge: 'https://bridge.walletconnect.org',
});
