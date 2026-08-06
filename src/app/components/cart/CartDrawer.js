// src/app/components/cart/CartDrawer.js
"use client";


export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  // คำนวณราคารวม
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-zinc-100">
            <h2 className="text-base font-normal tracking-wide text-zinc-900 uppercase">
              Shopping Cart ({cartItems.length})
            </h2>
            <button 
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-900 transition-colors text-sm uppercase tracking-widest"
            >
              Close
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400">
                <p className="text-sm font-light">Your cart is empty.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product_code} className="flex space-x-4 pb-6 border-b border-zinc-100">
                  <div className="relative w-20 h-24 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image?.public_url || "/placeholder.jpg"} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm font-light text-zinc-900 line-clamp-1">{item.name}</h3>
                        <button 
                          onClick={() => onRemoveItem(item.product_code)}
                          className="text-zinc-400 hover:text-red-600 text-xs transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">฿{Number(item.price).toLocaleString()}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="flex items-center border border-zinc-200 rounded-md">
                        <button 
                          onClick={() => onUpdateQuantity(item.product_code, item.quantity - 1)}
                          className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs text-zinc-900">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product_code, item.quantity + 1)}
                          className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-medium text-zinc-900 ml-auto">
                        ฿{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-zinc-100 px-6 py-6 bg-zinc-50">
              <div className="flex justify-between text-sm text-zinc-900 mb-4">
                <span className="font-light">Subtotal</span>
                <span className="font-medium">฿{totalPrice.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => alert("Proceeding to checkout...")}
                className="w-full bg-zinc-900 text-white py-3.5 rounded-full text-xs font-medium uppercase tracking-widest hover:bg-amber-700 transition-colors shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}