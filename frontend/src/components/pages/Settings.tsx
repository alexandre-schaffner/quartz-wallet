import type { Component } from 'solid-js';
import { useTheme } from '../../hooks/ThemeProvider';
import { Mainnet, Chain, Goerli, getChain, Sepolia } from "solid-ethers";
import Networks from '../web3/Networks';
import Connector from '../web3/Connector';

const Settings = () => {
  const { themes, setTheme } = useTheme();

  function onSelect(event: Event) {
    setTheme(event.target.value);
  }

  return (
    <div>
      <h1>Settings</h1>
      <select name="Theme" id="cars" onChange={onSelect}>
        {themes.map((theme: string) => <option value={theme}>{theme}</option>)}
      </select>
      <Connector/>
    </div>
  );
};

export default Settings;