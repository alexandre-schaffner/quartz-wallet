import { For, type Component } from 'solid-js';
import { Chain, useWallet } from "solid-ethers";

type NetworksProps = {
    chains: Array<Chain>,
}

const Networks: Component<NetworksProps> = (props) => {
    const { switchChain, chainId } = useWallet();

    function onChainSwitch(event: Event) {
        const target = event.target as HTMLSelectElement;
        const chain = props.chains.find(({ chainId }) => chainId.toString() == target.value);

        chain && switchChain(chain);
    }

    return (
        <>
        <select name="Networks" value={chainId()} onChange={onChainSwitch}>
            <For each={props.chains}>
                {(chain: Chain) => <option value={chain.chainId}>{chain.chainName}</option>}
            </For>
        </select>
        </>
    );
};

export default Networks;