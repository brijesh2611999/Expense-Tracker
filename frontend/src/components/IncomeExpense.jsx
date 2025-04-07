import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const IncomeExpense = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter(tx => tx.amount > 0)
    .reduce((acc, tx) => acc + tx.amount, 0)
    .toFixed(2);

  const expense = transactions
    .filter(tx => tx.amount < 0)
    .reduce((acc, tx) => acc + tx.amount, 0)
    .toFixed(2);

  return (
    <div className="flex justify-between bg-white p-4 rounded shadow mb-4">
      <div className="text-center w-1/2">
        <h4>Income</h4>
        <p className="text-green-600 font-medium">${income}</p>
      </div>
      <div className="text-center w-1/2 border-l">
        <h4>Expense</h4>
        <p className="text-red-600 font-medium">${Math.abs(expense)}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
