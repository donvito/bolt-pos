import React from 'react';
import { X } from 'lucide-react';
import type { CartItem } from '../App';

type CartItemsProps = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const CartItems: React.FC<CartItemsProps> = ({ cart, setCart }) => {
  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="h-[calc(100%-8rem)] overflow-auto">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-2 hover:bg-white/5 border-b border-white/10 text-sm"
        >
          <div className="flex-1">
            <h3 className="font-medium text-white/90">{item.name}</h3>
            <p className="text-xs text-starbucks-gold">${item.price.toFixed(2)}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-sm"
              >
                -
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-sm"
              >
                +
              </button>
            </div>
            
            <span className="w-16 text-right font-medium text-white/90">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;