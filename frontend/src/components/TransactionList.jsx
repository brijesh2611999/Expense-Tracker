import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(GlobalContext);

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">History</h3>
      <ul>
        {transactions.map(tx => (
          <li
            key={tx._id}
            className={`flex justify-between items-center bg-white p-2 mb-2 rounded shadow border-r-4 ${
              tx.amount < 0 ? 'border-red-500' : 'border-green-500'
            }`}
          >
            <span>{tx.text}</span>
            <div className="flex gap-3">
              <span>{tx.amount > 0 ? '+' : '-'}${Math.abs(tx.amount)}</span>
              <button onClick={() => deleteTransaction(tx._id)} className="text-red-600">
  ❌
                    </button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
