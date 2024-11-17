import React from 'react';
import { Check, Loader2 } from 'lucide-react';

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  paymentType: string;
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, paymentType }) => {
  const [status, setStatus] = React.useState<'processing' | 'success'>('processing');

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setStatus('success');
        setTimeout(onClose, 1500);
      }, 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className="bg-starbucks-brown p-8 rounded-xl shadow-xl max-w-md w-full border border-starbucks-green/20 text-center">
        {status === 'processing' ? (
          <>
            <Loader2 className="h-12 w-12 text-starbucks-green animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
            <p className="text-white/60 mb-4">Please wait while we process your payment...</p>
          </>
        ) : (
          <>
            <div className="h-12 w-12 rounded-full bg-starbucks-green mx-auto mb-4 flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-white/60">Thank you for your purchase</p>
          </>
        )}
        
        <div className="mt-6 p-4 bg-white/5 rounded-lg">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/60">Amount</span>
            <span className="text-starbucks-gold font-medium">${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Payment Method</span>
            <span className="text-white/90">{paymentType}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;