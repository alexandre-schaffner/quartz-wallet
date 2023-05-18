import type { Component } from 'solid-js';
import useWallet from '../../hooks/useWallet';

const Transfer: Component = () => {
  const {account} = useWallet();

  return (
    <div>
      <h1>Transfer</h1>
      <p>
        {account()}
      </p>
    </div>
  );
};

export default Transfer;
