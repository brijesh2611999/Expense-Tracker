import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0).toFixed(2);

  return (
    <div className="text-center mb-4">
      <h4 className="text-lg">Your Balance</h4>
      <h1 className="text-3xl font-semibold">${total}</h1>
    </div>
  );
};

export default Balance;
