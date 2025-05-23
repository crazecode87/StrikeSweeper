import React from 'react';
import TradeTicketForm from './components/TradeTicketForm';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold mb-8 uppercase">Strike Sweeper</h1>
      <TradeTicketForm />
    </div>
  );
}

export default App;