import React, { useState, useEffect } from 'react';
import { Delete, Percent, RotateCcw, Plus, Minus, X as Multiply, Divide, Equal } from 'lucide-react';

type NumpadProps = {
  onInput: (value: string) => void;
  onPayment?: (type: string) => void;
};

const Numpad: React.FC<NumpadProps> = ({ onInput, onPayment }) => {
  const [memory, setMemory] = useState<number>(0);
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumber(e.key);
      } else if (e.key === '.') {
        handleNumber('.');
      } else if (e.key === 'Enter') {
        calculate();
      } else if (e.key === '+') {
        handleOperation('+');
      } else if (e.key === '-') {
        handleOperation('-');
      } else if (e.key === '*') {
        handleOperation('*');
      } else if (e.key === '/') {
        handleOperation('/');
      } else if (e.key === '%') {
        handleOperation('%');
      } else if (e.key === 'Escape') {
        clear();
      } else if (e.key === 'Backspace') {
        setDisplay(prev => prev.slice(0, -1) || '0');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
    onInput(num);
  };

  const handleOperation = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
      setOperation(op);
      setDisplay('0');
    } else {
      calculate();
      setOperation(op);
    }
  };

  const calculate = () => {
    if (previousValue === null || !operation) return;
    
    const current = parseFloat(display);
    let result = 0;
    
    switch (operation) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '*':
        result = previousValue * current;
        break;
      case '/':
        result = previousValue / current;
        break;
      case '%':
        result = previousValue * (current / 100);
        break;
    }
    
    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    onInput('clear');
  };

  const handlePayment = (type: string) => {
    setSelectedPayment(type);
    if (onPayment) onPayment(type);
  };

  const buttons = [
    [
      { label: 'MC', action: () => setMemory(0), class: 'bg-gray-700' },
      { label: 'MR', action: () => setDisplay(memory.toString()), class: 'bg-gray-700' },
      { label: 'M+', action: () => setMemory(memory + parseFloat(display)), class: 'bg-gray-700' },
      { label: <Divide className="h-4 w-4" />, action: () => handleOperation('/'), class: 'bg-blue-900 text-blue-200' }
    ],
    [
      { label: '7', action: () => handleNumber('7') },
      { label: '8', action: () => handleNumber('8') },
      { label: '9', action: () => handleNumber('9') },
      { label: <Multiply className="h-4 w-4" />, action: () => handleOperation('*'), class: 'bg-blue-900 text-blue-200' }
    ],
    [
      { label: '4', action: () => handleNumber('4') },
      { label: '5', action: () => handleNumber('5') },
      { label: '6', action: () => handleNumber('6') },
      { label: <Minus className="h-4 w-4" />, action: () => handleOperation('-'), class: 'bg-blue-900 text-blue-200' }
    ],
    [
      { label: '1', action: () => handleNumber('1') },
      { label: '2', action: () => handleNumber('2') },
      { label: '3', action: () => handleNumber('3') },
      { label: <Plus className="h-4 w-4" />, action: () => handleOperation('+'), class: 'bg-blue-900 text-blue-200' }
    ],
    [
      { label: <Percent className="h-4 w-4" />, action: () => handleOperation('%') },
      { label: '0', action: () => handleNumber('0') },
      { label: '.', action: () => handleNumber('.') },
      { label: <Equal className="h-4 w-4" />, action: calculate, class: 'bg-blue-900 text-blue-200' }
    ]
  ];

  const paymentTypes = [
    { type: 'Cash', color: 'bg-green-600' },
    { type: 'Card', color: 'bg-blue-600' },
    { type: 'Mobile', color: 'bg-purple-600' },
    { type: 'Gift Card', color: 'bg-amber-600' }
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between bg-gray-900 p-3 rounded-lg border border-gray-700">
        <span className="text-lg font-mono text-gray-100">{display}</span>
        <div className="flex gap-2">
          <button
            onClick={clear}
            className="p-2 rounded-lg bg-red-900/50 hover:bg-red-900 text-red-200"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDisplay(prev => prev.slice(0, -1) || '0')}
            className="p-2 rounded-lg bg-red-900/50 hover:bg-red-900 text-red-200"
          >
            <Delete className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((btn, j) => (
              <button
                key={`${i}-${j}`}
                onClick={btn.action}
                className={`
                  p-4 text-sm font-semibold rounded-lg
                  ${btn.class || 'bg-gray-700 hover:bg-gray-600 text-gray-100'}
                  transition-colors
                `}
              >
                {btn.label}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 mt-2">
        {paymentTypes.map((payment) => (
          <button
            key={payment.type}
            onClick={() => handlePayment(payment.type)}
            className={`
              p-3 text-sm font-semibold rounded-lg text-white
              ${payment.color} hover:opacity-90 transition-opacity
              ${selectedPayment === payment.type ? 'ring-2 ring-white' : ''}
            `}
          >
            {payment.type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Numpad;