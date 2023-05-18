import type { Component } from 'solid-js';
import useWallet from '../../hooks/useWallet';

const Transfer: Component = () => {
  const {account, connect} = useWallet();

  return (
    <div>
      <h1>Transfer</h1>
      <button onClick={connect}>Connect</button>
      <p>
        {account()}
      </p>
    </div>
  );
};

export default Transfer;
