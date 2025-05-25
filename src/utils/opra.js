// Parses the OPRA code into symbol, date, type, and strike
export function parseOpraCode(opraCode) {
  if (opraCode.startsWith('.')) opraCode = opraCode.slice(1);

  const symbolMatch = opraCode.match(/^[A-Z]+/);
  const symbol = symbolMatch[0];
  const rest = opraCode.slice(symbol.length);
  const expiration = rest.slice(0, 6); // YYMMDD
  const optionType = rest[6]; // C or P
  const strike = rest.slice(7);

  const year = '20' + expiration.slice(0, 2);
  const month = expiration.slice(2, 4);
  const day = expiration.slice(4);

  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const formattedDate = `${day} ${months[parseInt(month, 10) - 1]} ${year.slice(2)}`;
  const optionTypeStr = optionType === 'C' ? 'CALL' : 'PUT';

  return { symbol, formattedDate, optionTypeStr, strike };
}

// Generates a formatted trade ticket using OPRA info and user inputs
export function generateTradeTicket(opraCode, entryPrice, targetPrice, stopPrice, qty = 1) {
  const { symbol, formattedDate, optionTypeStr, strike } = parseOpraCode(opraCode);

  return `BUY +${qty} ${symbol} 100 (Weeklys) ${formattedDate} ${strike} ${optionTypeStr} @${entryPrice} MKT GTC TRG BY OCO WHEN ${symbol} MARK AT OR BELOW ${entryPrice}
SELL -${qty} ${symbol} 100 (Weeklys) ${formattedDate} ${strike} ${optionTypeStr} MKT GTC TRG BY OCO WHEN ${symbol} MARK AT OR ABOVE ${targetPrice}
SELL -${qty} ${symbol} 100 (Weeklys) ${formattedDate} ${strike} ${optionTypeStr} MKT GTC TRG BY OCO WHEN ${symbol} MARK AT OR BELOW ${stopPrice}`;
}