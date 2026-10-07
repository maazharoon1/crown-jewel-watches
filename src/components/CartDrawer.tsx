import React, { useState } from 'react';
import type { CartItem } from '../types/watch';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'United States',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('confirmed');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl text-neutral-900 font-normal">
                {checkoutStep === 'confirmed' ? 'ORDER CONFIRMATION' : 'YOUR SHOPPING BAG'}
              </h2>
              {checkoutStep === 'cart' && (
                <span className="text-xs text-neutral-600 tabular-nums">
                  ({items.reduce((s, i) => s + i.quantity, 0)} {items.length === 1 ? 'piece' : 'pieces'})
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setCheckoutStep('cart');
                onClose();
              }}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* Step 1: Cart Items List */}
            {checkoutStep === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <p className="font-serif text-xl text-neutral-500">Your shopping bag is empty.</p>
                    <p className="mt-2 text-xs text-neutral-600 max-w-xs">
                      Discover our curated collection of exceptional timepieces.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-6 py-2.5 text-xs tracking-[0.16em] uppercase font-semibold text-white bg-neutral-900 hover:bg-red-800 transition-colors cursor-pointer"
                    >
                      Browse Timepieces
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 divide-y divide-neutral-100">
                    {items.map((item) => (
                      <div key={item.product.id} className="pt-6 first:pt-0 flex gap-4">
                        {/* Thumbnail */}
                        <div className="w-20 h-20 bg-neutral-50 border border-neutral-200 p-2 flex-shrink-0 flex items-center justify-center">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h4 className="font-serif text-base text-neutral-900 font-normal">
                                {item.product.name}
                              </h4>
                              <p className="text-[11px] text-neutral-600">
                                {item.product.category}
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-neutral-900 tabular-nums">
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-neutral-200">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 hover:bg-neutral-100 text-neutral-600 cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-xs tabular-nums text-neutral-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 hover:bg-neutral-100 text-neutral-600 cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-neutral-400 hover:text-red-700 transition-colors p-1 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Step 2: Checkout Information */}
            {checkoutStep === 'checkout' && (
              <form onSubmit={handleCheckoutSubmit} id="checkout-form" className="space-y-4">
                <div className="text-xs text-neutral-600 pb-2 border-b border-neutral-100">
                  Please provide your dispatch details. Our concierge will confirm shipment and security escrow.
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-neutral-700 font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lord Alistair Vance"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-neutral-700 font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@luxury.com"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-neutral-700 font-medium mb-1">
                    Telephone (for courier security pin) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 555-019-2834"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-neutral-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-red-700" />
                    <span>White-Glove Insured Armored Dispatch</span>
                  </div>
                  <div>Complimentary worldwide air transit with serial verification.</div>
                </div>
              </form>
            )}

            {/* Step 3: Order Confirmed */}
            {checkoutStep === 'confirmed' && (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-neutral-900 font-normal">
                  Order Successfully Placed
                </h3>
                <p className="mt-3 text-xs text-neutral-600 leading-relaxed max-w-xs mx-auto">
                  Thank you. An official allocation confirmation and private courier tracking details will be dispatched to your email address shortly.
                </p>
                <div className="mt-6 p-4 bg-neutral-50 border border-neutral-200 text-xs text-neutral-700">
                  <div className="font-medium text-neutral-900">Concierge Desk:</div>
                  <div className="mt-1">crownjewelwatches@outlook.com</div>
                  <div>+1 213-375-4470</div>
                </div>
                <button
                  onClick={() => {
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="mt-6 w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer"
                >
                  Return to Collection
                </button>
              </div>
            )}

          </div>

          {/* Drawer Footer */}
          {items.length > 0 && checkoutStep !== 'confirmed' && (
            <div className="p-6 border-t border-neutral-200 bg-neutral-50/50">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-xs tracking-[0.16em] uppercase text-neutral-600">Subtotal</span>
                <span className="font-serif text-2xl text-neutral-900 tabular-nums font-normal">
                  ${subtotal.toLocaleString()}
                </span>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3.5 bg-neutral-900 hover:bg-red-800 text-white text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200"
                >
                  <span>Proceed to Concierge Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-3 border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs tracking-[0.15em] uppercase font-medium cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-2/3 py-3 bg-neutral-900 hover:bg-red-800 text-white text-xs tracking-[0.15em] uppercase font-semibold cursor-pointer transition-colors"
                  >
                    Authorize Order
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
