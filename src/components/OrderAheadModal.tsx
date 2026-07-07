import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Clock, FileText, CheckCircle2, Award, ChevronRight, ChevronLeft } from 'lucide-react';
import { OrderItem } from '../types';

interface OrderAheadModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'cart' | 'details' | 'processing' | 'success';

export default function OrderAheadModal({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: OrderAheadModalProps) {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [pickupName, setPickupName] = useState('');
  const [pickupTime, setPickupTime] = useState('15 mins');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loadingText, setLoadingText] = useState('Connecting to Santa Elena bar...');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [ticketId, setTicketId] = useState('');
  const [finalizedPrice, setFinalizedPrice] = useState(0);
  const [finalizedUsdPrice, setFinalizedUsdPrice] = useState('0.00');

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const usdPrice = (totalPrice / 2).toFixed(2);

  const startCheckoutSimulation = () => {
    if (!pickupName.trim()) {
      alert('Please enter a name for the order pickup.');
      return;
    }

    setFinalizedPrice(totalPrice);
    setFinalizedUsdPrice((totalPrice / 2).toFixed(2));

    setStep('processing');
    setLoadingProgress(5);
    setLoadingText('Transmitting ticket to George Price Highway...');

    // Progress bar sequences for barista preparation simulation
    const steps = [
      { progress: 25, text: 'Transmitting order to barista dashboard...' },
      { progress: 55, text: 'Verifying bean and waffle griddle inventory...' },
      { progress: 85, text: 'Drafting pickup ticket #DG-' + Math.floor(1000 + Math.random() * 9000) },
      { progress: 100, text: 'Order confirmed! Sizzling grill started.' },
    ];

    steps.forEach((s, idx) => {
      setTimeout(() => {
        setLoadingProgress(s.progress);
        setLoadingText(s.text);
        if (s.progress === 100) {
          setTimeout(() => {
            const randomId = 'DG-' + Math.floor(1000 + Math.random() * 9000);
            setTicketId(randomId);
            setStep('success');
            onClearCart();
          }, 800);
        }
      }, (idx + 1) * 1200);
    });
  };

  const resetModalState = () => {
    setStep('cart');
    setPickupName('');
    setPickupTime('15 mins');
    setPaymentMethod('cash');
    setLoadingProgress(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={resetModalState} />

      {/* Slideout Panel */}
      <div className="relative bg-[#1E110A] text-white w-full max-w-md h-full shadow-2xl border-l border-[#3D2516] flex flex-col justify-between z-10 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#3D2516] flex justify-between items-center bg-[#25150D]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#C89D7C]" />
            <span className="font-bold text-base tracking-tight text-white uppercase">Your Order Draft</span>
          </div>
          <button
            onClick={resetModalState}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-[#3D2516] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Step Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-start">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Cart Items List */}
            {step === 'cart' && (
              <motion.div
                key="step-cart"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col"
              >
                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 py-12">
                    <ShoppingBag size={50} className="text-gray-600 mb-4" />
                    <p className="text-base font-semibold">Your draft is empty.</p>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs leading-relaxed">
                      Explore our local menu or use the custom builder to assemble your coffee beverage.
                    </p>
                    <button
                      onClick={resetModalState}
                      className="mt-6 px-6 py-2.5 bg-[#C89D7C] text-[#1E110A] rounded-xl text-xs font-bold uppercase"
                    >
                      Browse Offerings
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 flex-1">
                      {cart.map((item, index) => (
                        <div
                          key={`${item.id}-${index}`}
                          id={`cart-item-${item.id}`}
                          className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#25150D]/50 border border-[#3D2516]"
                        >
                          <div className="text-left flex-1">
                            <span className="block text-sm font-bold text-white">{item.name}</span>
                            {item.customization && (
                              <span className="block text-[10px] text-[#C89D7C] mt-1 font-mono leading-relaxed bg-[#2D1B10] px-2 py-1 rounded">
                                {item.customization}
                              </span>
                            )}
                            <div className="flex items-center gap-3 mt-3">
                              <span className="text-xs font-mono font-bold text-[#EFE3C3]/80">
                                BZ$ {(item.price * item.quantity).toFixed(2)}
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono">
                                (US$ {((item.price * item.quantity) / 2).toFixed(2)})
                              </span>
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <button
                              id={`cart-delete-${item.id}`}
                              onClick={() => onRemoveItem(item.id)}
                              className="text-gray-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-all cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 size={14} />
                            </button>

                            <div className="flex items-center gap-1.5 bg-[#1E110A] border border-[#3D2516] rounded-lg p-0.5 mt-2">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-5 h-5 rounded hover:bg-[#3D2516] flex items-center justify-center text-xs font-bold"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold w-5 text-center font-mono">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-5 h-5 rounded hover:bg-[#3D2516] flex items-center justify-center text-xs font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dual currency summary */}
                    <div className="bg-[#25150D] p-5 rounded-xl border border-[#3D2516] text-left shrink-0">
                      <div className="flex justify-between items-center text-gray-300 text-xs">
                        <span>Total (Belize Dollars)</span>
                        <span className="font-mono font-bold text-lg text-white">BZ$ {totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400 text-xs mt-1 border-t border-[#3D2516]/50 pt-2.5">
                        <span>Approx. US Dollars</span>
                        <span className="font-mono text-sm">US$ {usdPrice}</span>
                      </div>
                    </div>

                    {/* Proceed Button */}
                    <button
                      id="btn-cart-checkout"
                      onClick={() => setStep('details')}
                      className="w-full py-4 bg-[#C89D7C] hover:bg-[#B78C6A] text-[#1E110A] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
                    >
                      Fill Out Pickup Details
                      <ChevronRight size={14} />
                    </button>
                  </>
                )}
              </motion.div>
            )}

            {/* Step 2: Pickup details */}
            {step === 'details' && (
              <motion.div
                key="step-details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-left"
              >
                <div>
                  <button
                    onClick={() => setStep('cart')}
                    className="inline-flex items-center gap-1 text-xs text-[#C89D7C] hover:text-white font-mono uppercase mb-4"
                  >
                    <ChevronLeft size={12} /> Back to order draft
                  </button>
                  <h3 className="text-lg font-bold text-white">Coordinate Pickup</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-normal">
                    We prepare your items fresh. Tell us who is picking them up and when to ensure they are hot at arrival!
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#C89D7C] mb-1.5">Pickup Name</label>
                    <input
                      id="pickup-name"
                      type="text"
                      placeholder="Your Name (e.g. Liam)"
                      value={pickupName}
                      onChange={(e) => setPickupName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#25150D] border border-[#3D2516] rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#C89D7C]"
                      required
                    />
                  </div>

                  {/* Pickup Time */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#C89D7C] mb-1.5">Expected Arrival</label>
                    <select
                      id="pickup-time-select"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-4 py-3 bg-[#25150D] border border-[#3D2516] rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#C89D7C]"
                    >
                      <option value="10 mins">In 10 Minutes (Asap)</option>
                      <option value="15 mins">In 15 Minutes</option>
                      <option value="25 mins">In 25 Minutes</option>
                      <option value="45 mins">In 45 Minutes</option>
                      <option value="Custom">Custom Time (Later Today)</option>
                    </select>
                  </div>

                  {/* Payment Choice */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#C89D7C] mb-2">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cash')}
                        className={`py-3 rounded-xl text-xs font-bold uppercase border transition-all ${
                          paymentMethod === 'cash'
                            ? 'bg-[#C89D7C] border-[#C89D7C] text-[#1E110A]'
                            : 'bg-[#25150D] border-[#3D2516] text-gray-300'
                        }`}
                      >
                        Cash on Counter
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('transfer')}
                        className={`py-3 rounded-xl text-xs font-bold uppercase border transition-all ${
                          paymentMethod === 'transfer'
                            ? 'bg-[#C89D7C] border-[#C89D7C] text-[#1E110A]'
                            : 'bg-[#25150D] border-[#3D2516] text-gray-300'
                        }`}
                      >
                        WhatsApp Pay / Transfer
                      </button>
                    </div>
                    <span className="block text-[10px] text-gray-500 font-mono mt-2 leading-relaxed">
                      *For security and ease of local payments in Belize, we collect final settlement on-site at pickup. Cash and online bank transfers accepted!
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#3D2516]/50 pt-5 mt-6">
                  <div className="flex justify-between items-center text-xs text-gray-300">
                    <span>Final Amount (Dual currency)</span>
                    <div className="text-right">
                      <span className="block font-mono font-bold text-base text-white">BZ$ {totalPrice.toFixed(2)}</span>
                      <span className="block font-mono text-[10px] text-[#C89D7C]">US$ {usdPrice}</span>
                    </div>
                  </div>
                </div>

                <button
                  id="btn-submit-order-ahead"
                  onClick={startCheckoutSimulation}
                  className="w-full py-4 bg-[#C89D7C] hover:bg-[#B78C6A] text-[#1E110A] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Confirm Order & Prepare
                </button>
              </motion.div>
            )}

            {/* Step 3: Barista simulation loading */}
            {step === 'processing' && (
              <motion.div
                key="step-processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-12"
              >
                {/* Floating espresso loading spinner */}
                <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-[#3D2516]" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-4 border-t-[#C89D7C] border-r-transparent border-b-transparent border-l-transparent"
                  />
                  <Clock size={28} className="text-[#C89D7C] animate-pulse" />
                </div>

                <h4 className="text-base font-bold text-white mb-2 uppercase tracking-wide">Transmitting Order...</h4>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed mb-6 font-mono">
                  {loadingText}
                </p>

                {/* Progress bar container */}
                <div className="w-full max-w-xs bg-[#25150D] h-2 rounded-full overflow-hidden border border-[#3D2516]">
                  <motion.div
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-[#C89D7C]"
                  />
                </div>
                <span className="text-[10px] font-mono text-gray-500 mt-2">{loadingProgress}% Complete</span>
              </motion.div>
            )}

            {/* Step 4: Success confirmation screen */}
            {step === 'success' && (
              <motion.div
                key="step-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 text-center py-8 flex flex-col justify-center items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-600/10 text-emerald-500 flex items-center justify-center shadow-lg border border-emerald-500/20">
                  <CheckCircle2 size={36} strokeWidth={2.5} />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">Order Confirmed!</h3>
                  <p className="text-xs text-[#C89D7C] font-mono tracking-widest uppercase mt-1">Ticket ID: {ticketId}</p>
                  <p className="text-xs text-gray-400 mt-3 leading-relaxed max-w-xs">
                    Your breakfast / latte order has been loaded directly into the barista's display queue in our Santa Elena shop.
                  </p>
                </div>

                {/* Simulated Ticket receipt */}
                <div className="w-full bg-[#25150D] p-5 rounded-2xl border border-[#3D2516] text-left space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-gray-400 text-[10px] border-b border-[#3D2516] pb-2.5">
                    <span>THE DAILY GRIND RECEIPT</span>
                    <span>TODAY</span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span>Ticket Owner</span>
                    <span className="font-bold">{pickupName}</span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span>Expected Arrival</span>
                    <span className="font-bold">{pickupTime}</span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span>Payment Mode</span>
                    <span className="font-bold uppercase">{paymentMethod === 'cash' ? 'Pay Cash' : 'WhatsApp/Bank'}</span>
                  </div>
                  <div className="border-t border-[#3D2516]/50 pt-2.5 mt-2 space-y-1">
                    <div className="flex justify-between items-center text-sm font-black">
                      <span className="text-[#C89D7C]">Total Settled</span>
                      <span className="text-white">BZ$ {finalizedPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                      <span>Approx. USD Value</span>
                      <span>US$ {finalizedUsdPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#2D1B10] border border-[#3D2516] text-left flex gap-3">
                  <Award size={18} className="text-[#C89D7C] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Show this screen or quote receipt code <span className="text-white font-bold">{ticketId}</span> to the cashier upon arrival. Safe travels!
                  </p>
                </div>

                <button
                  id="btn-success-close"
                  onClick={resetModalState}
                  className="w-full py-4 bg-[#C89D7C] hover:bg-[#B78C6A] text-[#1E110A] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Awesome, got it!
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
