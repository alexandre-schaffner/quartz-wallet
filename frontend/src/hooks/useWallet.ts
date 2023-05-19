import type { Accessor } from "solid-js";
import { createSignal, createRenderEffect, onMount, onCleanup } from "solid-js";
import { BrowserProvider, Eip1193Provider, Provider, ethers } from "ethers";

function useWallet(): {
  chainId: Accessor<number | undefined>;
  account: Accessor<string>;
  provider: Accessor<BrowserProvider | unknown>;
  connect: Function;
} {
  const [connected, setConnected] = createSignal(false);
  const [chainId, setChainId] = createSignal(undefined);
  const [account, setAccount] = createSignal("");
  const [provider, setProvider] = createSignal();

  async function connectBrowserWallet(askSigner: boolean = true) {
    const _provider = new BrowserProvider(window.ethereum, "any");

    if (!_provider) return;

    setProvider(_provider);
    console.log(`🖧 Connected to network ${(await _provider.getNetwork()).chainId}`);

    if (!(await _provider.hasSigner(0)) && !askSigner) return;

    try {
      const signer = await _provider.getSigner();
      const address = signer.address;

      setConnected(true);
      setAccount(address);
      console.log(`🦊 Browser Wallet connected as ${address}`);
    } catch (_) {
      console.log("🦊 Browser Wallet not connected");
      setConnected(false);
    }
  }

  connectBrowserWallet(false);

  function onChainChange(chainId: string) {
    const newChainId = parseInt(chainId);

    console.log("🖧 Switched to network", newChainId);
  }

  function onAccountChange(accounts: string[]) {
    if (accounts.length <= 0) {
      setConnected(false);
      setAccount("");
      console.log("👤 Account disconnected");
    } else {
      setConnected(true);
      setAccount(accounts[0]);
      console.log(`👤 Connected as ${accounts[0]}`);
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

  return { chainId, account, provider, connect: connectBrowserWallet };
}

export default useWallet;
