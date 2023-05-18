import type { Accessor } from "solid-js";
import { createSignal, createRenderEffect, onMount, onCleanup } from "solid-js";
import { BigNumber, Provider } from "ethers";

function useWallet(): {
  chainId: Accessor<number | undefined>;
  account: Accessor<string>;
  provider: Accessor<Provider | undefined>;
} {
  const [connected, setConnected] = createSignal(false);
  const [chainId, setChainId] = createSignal(undefined);
  const [account, setAccount] = createSignal("");
  const [provider, setProvider] = createSignal(undefined);

  function onChainChange(chainId) {
    const newChainId = parseInt(chainId);
  }

  function onAccountChange(accounts: string[]) {
    if (accounts.length <= 0) {
      setConnected(false);
      setAccount("");
      console.log("👤 Account disconnected");
    } else {
      setConnected(true);
      setAccount(accounts[0]);
      console.log("👤 Connected as", accounts[0]);
    }
  }

  onMount(() => {
    if (!window.ethereum) return;

    window.ethereum.on("chainChanged", onChainChange);
    window.ethereum.on("accountsChanged", onAccountChange);
  });

  onCleanup(() => {
    window.ethereum.removeListener("chainChanged", onChainChange);
    window.ethereum.removeListener("accountsChanged", onAccountChange);
  });

  return { chainId, account, provider };
}

export default useWallet;
