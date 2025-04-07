// import { useState, useContext } from 'react';
// import { GlobalContext } from '../context/GlobalState';

// const AddTransaction = () => {
//   const [text, setText] = useState('');
//   const [amount, setAmount] = useState('');
//   const { addTransaction } = useContext(GlobalContext);

//   const onSubmit = (e) => {
//     e.preventDefault();
//     const newTx = {
//       id: Date.now(),
//       text,
//       amount: +amount,
//     };
//     addTransaction(newTx);
//     setText('');
//     setAmount('');
//   };

//   return (
//     <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow">
//       <h3 className="text-xl font-semibold mb-2">Add new transaction</h3>
//       <div className="mb-2">
//         <label className="block text-sm">Text</label>
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Enter description..."
//           className="w-full border rounded px-2 py-1"
//           required
//         />
//       </div>
//       <div className="mb-2">
//         <label className="block text-sm">Amount</label>
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Enter amount..."
//           className="w-full border rounded px-2 py-1"
//           required
//         />
//       </div>
//       <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full mt-2">
//         Add Transaction
//       </button>
//     </form>
//   );
// };

// export default AddTransaction;



import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const amt = type === 'expense' ? -Math.abs(+amount) : +Math.abs(+amount);

    const newTx = {
      id: Date.now(),
      text,
      amount: amt,
    };

    addTransaction(newTx);
    setText('');
    setAmount('');
    setType('income');
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-2">Add new transaction</h3>

      <div className="mb-2">
        <label className="block text-sm">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="income">Income (+)</option>
          <option value="expense">Expense (-)</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm">Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter description..."
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount..."
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>

      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full mt-2">
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransaction;
