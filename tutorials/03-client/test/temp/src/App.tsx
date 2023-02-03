import '@twa-dev/sdk';
import './App.css';
import { useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { useCounterContract } from './hooks/useCounterContract';

function App() {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();
  const [ money, setMoney ] = useState('0');

  return (
    <div className='App'>
      <div className='Container'>
        <TonConnectButton />

        <div className='Card'>
          <b>Counter Address</b>
          {/* <div className='Hint'>{address?.slice(0, 30) + '...'}</div> */}
          <div className='Hint'>{address}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{value ?? 'Loading...'}</div>
        </div>

        <label className='inline-block'>輸入金額：</label>
        <input className='inline-block' type="text" value={money} onChange={(event) => setMoney(event.target.value)} />

        <a
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
          onClick={() => {
            sendIncrement(money);
          }}
        >
          Increment
        </a>
      </div>
    </div>
  );
}

export default App
