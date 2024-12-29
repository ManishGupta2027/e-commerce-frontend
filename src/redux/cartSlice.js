import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to hold cart items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, name, price, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      if (existingItem) {
        // Update quantity if product already in cart
        existingItem.quantity += quantity;
      } else {
        // Add new item to cart
        state.items.push({ productId, name, price, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
