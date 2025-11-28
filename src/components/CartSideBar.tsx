'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { IoCart, IoClose } from 'react-icons/io5';

const CartSidebar = () => {
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();

  // State for showing/hiding the sidebar
  const [isOpen, setIsOpen] = useState(false);



  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Add some items before checking out.");
      return;
    }
    clearCart();
    alert('Order Placed Successfully! Your items will be processed.');
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-transform duration-300 transform hover:scale-110"
        aria-label="Open shopping cart"
      >
        <IoCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-800 rounded-full">
            {cartCount}
          </span>
        )}
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#1e1e1e] dark:bg-card-dark shadow-xl z-50 transform transition-transform duration-300 
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-white-900 dark:text-primary-text-dark flex items-center">
            <IoCart className="mr-2" /> Your Cart ({cartCount})
          </h2>
          <button onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-white-900 dark:text-secondary-text-dark dark:hover:text-primary-text-dark">
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 h-full overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-white-500 dark:text-secondary-text-dark mt-10">
              Your cart is empty.
            </p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={item.product.id}
                  className="flex items-center mb-4 p-2 border-b border-gray-100 dark:border-gray-700" >
                  <img src={item.product.thumbnail} alt={item.product.title} className="w-12 h-12 object-cover rounded mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white-900 dark:text-primary-text-dark truncate">
                      {item.product.title}</p>
                    <p className="text-xs text-white-500 dark:text-secondary-text-dark">
                      Qty: {item.quantity}</p>
                    <p className="text-xs text-green-500 dark:text-secondary-text-dark">
                      ${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 dark:border-gray-700 bg-[#1E1E1E] dark:bg-card-dark">
                <p className="text-lg font-bold mb-2 text-[#E0E0E0] dark:text-primary-text-dark">
                  Total: ${cartTotal.toFixed(2)}</p>
                <button
                  onClick={handleCheckout}
                  className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div >
    </>
  );
};

export default CartSidebar;
