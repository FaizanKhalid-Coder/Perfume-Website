import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, Gift, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutDetails } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    itemCount,
    isGiftWrapped,
    setIsGiftWrapped,
    giftMessage,
    setGiftMessage,
    isCheckingOut,
    setIsCheckingOut,
    confirmedOrder,
    completeOrder,
    dismissOrderConfirmation
  } = useCart();

  const [checkoutForm, setCheckoutForm] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    isGiftWrapped: true,
    giftMessage: ''
  });

  const [formError, setFormError] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const checkoutModalRef = useRef<HTMLDivElement | null>(null);

  const freeShippingThreshold = 250;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Keyboard navigation & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (confirmedOrder) {
          dismissOrderConfirmation();
        } else if (isCheckingOut) {
          setIsCheckingOut(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen || isCheckingOut || confirmedOrder) {
      document.addEventListener('keydown', handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, isCheckingOut, confirmedOrder, setIsOpen, setIsCheckingOut, dismissOrderConfirmation]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.fullName.trim() || !checkoutForm.email.trim() || !checkoutForm.address.trim()) {
      setFormError('Please fill in your recipient name, email, and shipping address.');
      return;
    }
    setFormError(null);
    completeOrder({
      ...checkoutForm,
      isGiftWrapped,
      giftMessage
    });
  };

  return (
    <>
      {/* Slide-over cart drawer */}
      <AnimatePresence>
        {isOpen && !isCheckingOut && (
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-heading"
            className="fixed inset-0 z-50 overflow-hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                ref={drawerRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="w-screen max-w-md bg-[#0c0c10] border-l border-white/10 flex flex-col justify-between shadow-2xl text-neutral-100 relative"
              >
                {/* Header */}
                <header className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 id="cart-heading" className="text-lg font-serif tracking-widest uppercase text-neutral-100">
                      Your Shopping Bag
                    </h2>
                    <span className="text-xs font-mono text-amber-400">({itemCount})</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    aria-label="Close Shopping Bag"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </header>

                {/* Free shipping threshold banner */}
                <div className="px-6 py-3 bg-white/[0.03] border-b border-white/5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-neutral-300">
                      {remainingForFreeShipping === 0 ? (
                        <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" /> Complimentary Insured White-Glove Delivery
                        </span>
                      ) : (
                        `Add $${remainingForFreeShipping.toFixed(0)} more for Complimentary Insured Express Shipping`
                      )}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400">
                      ${subtotal} / ${freeShippingThreshold}
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={Math.round(subtotal)}
                    aria-valuemin={0}
                    aria-valuemax={freeShippingThreshold}
                    aria-label="Complimentary shipping progress"
                    className="w-full h-1 bg-white/10 rounded-full overflow-hidden"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Bag items list */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-neutral-400">
                        <Gift className="w-7 h-7" aria-hidden="true" />
                      </div>
                      <p className="text-neutral-400 font-serif text-lg italic">
                        Your fragrance bag is empty
                      </p>
                      <p className="text-xs text-neutral-500 max-w-xs">
                        Immerse yourself in our four seasonal extractions and choose your signature flacon.
                      </p>
                    </div>
                  ) : (
                    <ul role="list" aria-label="Bag items" className="space-y-6">
                      {items.map(item => (
                        <li
                          key={item.id}
                          className="flex gap-4 pb-6 border-b border-white/5 group relative"
                        >
                          <figure className="w-20 h-24 rounded-lg bg-neutral-900 border border-white/10 overflow-hidden shrink-0 m-0">
                            <img
                              src={item.image}
                              alt={item.fragranceName}
                              width={80}
                              height={96}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </figure>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                                    {item.season} Edition
                                  </span>
                                  <h3 className="text-base font-serif font-medium text-neutral-100">
                                    {item.fragranceName}
                                  </h3>
                                </div>
                                <span className="font-mono tabular-nums text-sm font-medium text-amber-200">
                                  ${item.price * item.quantity}
                                </span>
                              </div>

                              <div className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                                <span>{item.size}</span>
                                {item.engraving && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span className="text-amber-300/80 text-[11px] font-mono">
                                      Engraved: [{item.engraving}]
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity stepper */}
                              <div className="flex items-center border border-white/10 rounded-md bg-white/5">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="p-1.5 text-neutral-400 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
                                  aria-label={`Decrease quantity of ${item.fragranceName}`}
                                >
                                  <Minus className="w-3 h-3" aria-hidden="true" />
                                </button>
                                <span
                                  aria-live="polite"
                                  className="px-3 font-mono text-xs tabular-nums text-neutral-200"
                                >
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="p-1.5 text-neutral-400 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
                                  aria-label={`Increase quantity of ${item.fragranceName}`}
                                >
                                  <Plus className="w-3 h-3" aria-hidden="true" />
                                </button>
                              </div>

                              {/* Remove button */}
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-neutral-500 hover:text-rose-400 p-1 transition-colors text-xs flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-rose-400"
                                aria-label={`Remove ${item.fragranceName} from bag`}
                              >
                                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                                <span className="text-[11px]">Remove</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Gift presentation toggle */}
                  {items.length > 0 && (
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-300">
                          <input
                            type="checkbox"
                            checked={isGiftWrapped}
                            onChange={e => setIsGiftWrapped(e.target.checked)}
                            className="rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500/30"
                          />
                          <span className="font-medium">Complimentary Luxury Gift Presentation</span>
                        </label>
                        <span className="text-[11px] font-mono text-emerald-400 uppercase">Complimentary</span>
                      </div>

                      {isGiftWrapped && (
                        <div className="pl-6">
                          <p className="text-[11px] text-neutral-400 mb-2">
                            Sealed in custom black textured linen box with hot-stamped gold foil seal.
                          </p>
                          <input
                            type="text"
                            placeholder="Optional handwritten gift note..."
                            value={giftMessage}
                            onChange={e => setGiftMessage(e.target.value)}
                            maxLength={140}
                            aria-label="Gift note message"
                            className="w-full text-xs bg-white/5 border border-white/10 rounded-md px-3 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-400/50"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer summary */}
                {items.length > 0 && (
                  <footer className="p-6 border-t border-white/10 bg-[#08080b] space-y-4">
                    <div className="space-y-1.5 text-xs text-neutral-400">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-mono tabular-nums text-neutral-200 text-sm font-semibold">
                          ${subtotal}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insured Delivery</span>
                        <span className="text-emerald-400 font-mono">
                          {subtotal >= freeShippingThreshold ? 'FREE' : '$25'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Complimentary Discovery Samples</span>
                        <span className="text-neutral-300">Included (2 × 2ml)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsCheckingOut(true)}
                      className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-neutral-950 font-medium text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 focus-visible:ring-2 focus-visible:ring-amber-300"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-500 tracking-wider uppercase">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400/80" aria-hidden="true" /> Authentic Grasse Extraction
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Hassle-Free Returns</span>
                    </div>
                  </footer>
                )}
              </motion.div>
            </div>
          </aside>
        )}
      </AnimatePresence>

      {/* Checkout Modal (Elevated z-index to z-60) */}
      <AnimatePresence>
        {isCheckingOut && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-heading"
            className="fixed inset-0 z-60 overflow-y-auto p-4 sm:p-6 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckingOut(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              aria-hidden="true"
            />

            <motion.div
              ref={checkoutModalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#0f0f14] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-neutral-100 z-10 my-8"
            >
              <header className="flex items-center justify-between pb-5 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-sans block">
                    Quatréa Haute Parfumerie
                  </span>
                  <h3 id="checkout-heading" className="text-xl font-serif text-white mt-0.5">
                    Concierge Checkout
                  </h3>
                </div>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Close Checkout"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </header>

              {formError && (
                <div role="alert" className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {formError}
                </div>
              )}

              <form onSubmit={handleCheckoutSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-fullname" className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Recipient Full Name *
                    </label>
                    <input
                      id="checkout-fullname"
                      type="text"
                      required
                      placeholder="Lord / Lady Aurelius Vance"
                      value={checkoutForm.fullName}
                      onChange={e => setCheckoutForm({ ...checkoutForm, fullName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-email" className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Email for Shipment Tracking *
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      placeholder="client@luxury.estate"
                      value={checkoutForm.email}
                      onChange={e => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="checkout-address" className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                    Delivery Address *
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    required
                    placeholder="740 Park Avenue, Penthouse B"
                    value={checkoutForm.address}
                    onChange={e => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="checkout-city" className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      City
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      placeholder="New York"
                      value={checkoutForm.city}
                      onChange={e => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-postalcode" className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Postal Code
                    </label>
                    <input
                      id="checkout-postalcode"
                      type="text"
                      placeholder="10021"
                      value={checkoutForm.postalCode}
                      onChange={e => setCheckoutForm({ ...checkoutForm, postalCode: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-country" className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Country
                    </label>
                    <select
                      id="checkout-country"
                      value={checkoutForm.country}
                      onChange={e => setCheckoutForm({ ...checkoutForm, country: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Monaco">Monaco</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="United Arab Emirates">UAE</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-300">
                    <span>Order Total ({itemCount} bottles)</span>
                    <span className="font-mono text-amber-300 font-semibold text-sm">
                      ${subtotal}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Complimentary White-Glove Insured Delivery & Signature Grasse Packaging
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-neutral-950 font-medium text-xs uppercase tracking-[0.25em] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>Authorize Concierge Order</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Confirmed Modal */}
      <AnimatePresence>
        {confirmedOrder && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-confirmed-heading"
            className="fixed inset-0 z-60 p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={dismissOrderConfirmation}
              className="fixed inset-0 bg-black/90 backdrop-blur-lg"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0e0e13] border border-amber-500/30 rounded-2xl shadow-2xl p-8 text-neutral-100 z-10 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>

              <span className="text-[11px] uppercase tracking-[0.3em] text-amber-400 font-sans block">
                Acquisition Confirmed
              </span>
              <h3 id="order-confirmed-heading" className="text-2xl font-serif text-white mt-1">
                Welcome to the Quatréa Legacy
              </h3>

              <div className="my-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Order Reference</span>
                  <span className="font-mono text-amber-300 font-semibold">{confirmedOrder.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Recipient</span>
                  <span>{confirmedOrder.details.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Destination</span>
                  <span>{confirmedOrder.details.city || 'Private Address'}, {confirmedOrder.details.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Investment Total</span>
                  <span className="font-mono font-medium text-amber-200">${confirmedOrder.total}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto mb-6">
                Your bespoke flacon is currently being prepared and hand-sealed in Grasse, France. A tracking link with thermal monitoring has been sent to {confirmedOrder.details.email}.
              </p>

              <button
                onClick={dismissOrderConfirmation}
                className="px-8 py-3 rounded-full bg-white text-neutral-950 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-200 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Return to Gallery
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
