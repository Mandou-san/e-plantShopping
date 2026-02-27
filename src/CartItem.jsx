import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    // Initialize a variable total to hold the cumulative sum
    let total = 0;

    // Iterate over the cart array using cart.forEach()
    cart.forEach((item) => {
        // Extract quantity/cost and convert "$10.00" to number 10.00
        const quantity = item.quantity;
        const priceAsNumber = parseFloat(item.cost.substring(1));
        // Multiply cost by quantity and add to total
        total += priceAsNumber * quantity;
    });
    // After processing all items, return the final total sum
    return total;
  };

  const handleContinueShopping = (e) => {
    // Prevent default behavior if necessary (like form submission)
    e.preventDefault();
    // Call the function passed down from the parent component
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ 
      name: item.name, 
      quantity: item.quantity + 1 
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // If quantity is greater than 1, decrease it
      dispatch(updateQuantity({ 
        name: item.name, 
        quantity: item.quantity - 1 
      }));
    } else {
      // If quantity is 1 and decrement is clicked, remove the item
      dispatch(removeItem(item.name));
      //dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); 
    }
  };

  const handleRemove = (item) => {
    // Dispatch the removeItem action using the item's name as the payload
    dispatch(removeItem(item.name));
  };
  
  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Extract the numeric value by removing the "$" and converting to a float
    const numericPrice = parseFloat(item.cost.substring(1));
    // Calculate the total by multiplying the numeric price by quantity
    return numericPrice * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


