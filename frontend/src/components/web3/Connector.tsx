import { Chain, Goerli, Mainnet, Sepolia, useWallet } from "solid-ethers";
import Networks from './Networks';
import { createEffect } from "solid-js";

const Connector = (props) => {
    const { switchChain, chainId, address, connected, connect } = useWallet();
    const supportedChains = [Mainnet, Goerli, Sepolia];

    const ConnectButton = () => <button onClick={connect}>Connect Wallet</button>;
    const WalletStatus = () => <>
        <button>{address()}</button>
        <Networks chains={supportedChains} />
    </>

    return <>{connected() ? <WalletStatus/> : <ConnectButton/>}</>
};

export default Connector;