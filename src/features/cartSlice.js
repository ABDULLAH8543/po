import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productdata from "../productdata";

const initialState = {
  cart: [],
  products: productdata,
  totalQuantity: 0,
  totalPrice: 0,
};

export const getCartTotal = createAsyncThunk("cart/getCartTotal", async (_, { getState }) => {
  const state = getState().cart;
  let { totalQuantity, totalPrice } = state.cart.reduce(
    (cartTotal, cartItem) => {
      const { price, quantity } = cartItem;
      const itemTotal = price * quantity;
      cartTotal.totalPrice += itemTotal;
      cartTotal.totalQuantity += quantity;
      return cartTotal;
    },
    {
      totalPrice: 0,
      totalQuantity: 0,
    }
  );
  return {
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    totalQuantity,
  };
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image } = action.payload;
      let find = state.cart.findIndex((item) => item.id === id);
      if (find >= 0) {
        state.cart[find].quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += price;
      } else {
        state.cart.push({ id, name, price, image, quantity: 1 });
        state.totalQuantity += 1;
        state.totalPrice += price;
      }
    },
    removeItem: (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        const item = state.cart[index];
        state.cart.splice(index, 1);
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
      }
    },
    increaseItemQuantity: (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.cart[index].quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += state.cart[index].price;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        const item = state.cart[index];
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartTotal.fulfilled, (state, action) => {
      state.totalPrice = action.payload.totalPrice;
      state.totalQuantity = action.payload.totalQuantity;
    });
  },
});

export const { addToCart, removeItem, increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
