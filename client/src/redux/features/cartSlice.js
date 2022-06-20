import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { userRequest } from "../../requestMethod";

export const order = createAsyncThunk(
  "order",
  async ({ stripeToken, total, navigate }, { rejectWithValue }) => {
    try {
      console.log(total);
      const res = await userRequest.post("checkout/payment", {
        tokenId: stripeToken.id,
        amount: total,
      });
      console.log(res);
      toast.success("Order Placed Successfully");
      navigate("/success");
      return res.data;
    } catch (error) {
      toast.error("Not able to place order ");
      return rejectWithValue(error.res.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    qnt: 0,
    total: 0,
  },
  reducers: {
    // addToCart: (state, action) => {
    //   state.quantity += 1;
    //   state.products.push(action.payload);
    //   const sum = action.payload.price * action.payload.qnt;
    //   // console.log(action.payload);
    //   state.total += sum;
    //   // console.log("state.total: " + state.total);
    //   toast.success("Item added to Cart");
    // },
    addToWishList: (state, action) => {
      state.wishList += action.payload;
      // state.products.push(action.payload);
      // state.wishList.push(action.payload.list);
      toast.success("Added to WishList");
    },
    addToCart: (state, action) => {
      const existingIndex = state.products?.findIndex(
        product => product._id === action.payload._id
      );
      // console.log("hellodsbvi");
      if (existingIndex > -1) {
        state.products[existingIndex] = {
          ...state.products[existingIndex],
          qnt: state.products[existingIndex].qnt + 1,
        };

        toast.success("Quantity increased");
      } else {
        // state.cart.push({ ...action.payload, qty: 1 });
        state.products.push({ ...action.payload, qnt: action.payload.qnt });
        toast.success("Added to cart");
      }
      // console.log();
    },

    decreaseCart: (state, action) => {
      const itemIndex = state.products.findIndex(
        product => product._id === action.payload._id
      );
      // console.log(action.payload);
      // console.log(itemIndex);
      if (state.products[itemIndex].qnt > 1) {
        state.products[itemIndex].qnt -= 1;
        toast.success("Quantity decreased ");
      } else if (state.products[itemIndex].qnt === 1) {
        const nextCartItems = state.products.filter(
          product => product._id !== action.payload._id
        );
        state.products = nextCartItems;
        toast.error("Product removed from cart");
      }
    },
    totalPrice: (state, action) => {
      let { total, qnt } = state.products.reduce(
        (cartTotal, product) => {
          const { price, qnt } = product;
          const itemTotal = price * qnt;
          cartTotal.total += itemTotal;
          cartTotal.qnt += qnt;
          // console.log(cartTotal);
          return cartTotal;
        },
        {
          total: 0,
          qnt: 0,
        }
      );
      state.qnt = qnt;
      state.total = total;
    },
  },
  extraReducers: {
    [order.pending]: (state, action) => {
      state.loading = true;
    },
    [order.fulfilled]: (state, action) => {
      state.products = [];
      state.loading = false;
      state.qnt = 0;
    },
    [order.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { addToCart, decreaseCart, totalPrice, addToWishList } =
  cartSlice.actions;
export default cartSlice.reducer;

// useEffect(() => {
//   const makeRequest = async () => {
//     try {
//       const res = await userRequest.post(
//         "localhost:5000/api/cart/checkout/payment",
//         {
//           tokenId: stripeToken.id,
//           amount: 500,
//         }
//       );
//       navigate("/success", {
//         stripeData: res.data,
//         products: products,
//       });
//     } catch {}
//   };
//   stripeToken && makeRequest();
// }, [stripeToken, total, navigate]);
