import { useState } from 'react';
import { generateTradeTicket } from '../utils/opra';

const TradeTicketForm = () => {
  const [opra, setOpra] = useState('');
  const [entry, setEntry] = useState('');
  const [target, setTarget] = useState('');
  const [stop, setStop] = useState('');
  const [qty, setQty] = useState('');
  const [result, setResult] = useState('Trade details will appear here');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticket = generateTradeTicket(opra, entry, target, stop, qty);
    setResult(ticket);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  const handleClear = () => {
    setOpra('');
    setEntry('');
    setTarget('');
    setStop('');
    setQty('');
    setResult('Trade details will appear here');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-lg">
      <div>
        <label className="block text-sm font-semibold mb-1">OPRA Code</label>
        <input
          type="text"
          value={opra}
          onChange={e => setOpra(e.target.value)}
          className="w-full p-3 border border-green-500 rounded bg-zinc-800 focus:outline-none"
          placeholder="Paste OPRA code here"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Quantity</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={e => setQty(Number(e.target.value))}
          className="w-full p-3 border border-green-500 rounded bg-zinc-800 focus:outline-none"
          placeholder="Enter number of contracts"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Entry Price</label>
        <input
          type="number"
          step="0.01"
          value={entry}
          onChange={e => setEntry(e.target.value)}
          className="w-full p-3 border border-green-500 rounded bg-zinc-800 focus:outline-none"
          placeholder="Enter entry price"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Target Price</label>
        <input
          type="number"
          step="0.01"
          value={target}
          onChange={e => setTarget(e.target.value)}
          className="w-full p-3 border border-green-500 rounded bg-zinc-800 focus:outline-none"
          placeholder="Enter target price"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Stop Loss</label>
        <input
          type="number"
          step="0.01"
          value={stop}
          onChange={e => setStop(e.target.value)}
          className="w-full p-3 border border-green-500 rounded bg-zinc-800 focus:outline-none"
          placeholder="Enter stop loss"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 py-3 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600"
      >
        Generate Trade Ticket
      </button>
      <div className="mt-6 p-4 border border-green-500 rounded bg-zinc-800 whitespace-pre-wrap">
        {result}
      </div>
      <div className="flex gap-3 mt-1">
        <button
          type="button"
          onClick={handleCopy}
          className="py-3 px-4 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600"
        >
          Copy
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="py-3 px-4 bg-red-600 text-white font-semibold rounded hover:bg-red-500"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default TradeTicketForm;