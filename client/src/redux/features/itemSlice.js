import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

// import * as api from "../api";
// export const fetchItems = createAsyncThunk(
//   "items",
//   async ({ toast }, { rejectWithValue }) => {
//     try {
//       const res = await api.itemFetch();
//       return res.data;
//     } catch (error) {
//       toast.error("internal server error");
//       return rejectWithValue(error.res.data);
//     }
//   }
// );
// export const order = createAsyncThunk(
//   "order",
//   async ({ toast, obj, navigate }, { rejectWithValue }) => {
//     try {
//       console.log(obj);
//       const res = await api.newOrder(obj);
//       console.log(res);
//       toast.success("Order Placed Successfully");
//       navigate("/orders");
//       return res.data;
//     } catch (error) {
//       toast.error("Not able to place order ");
//       return rejectWithValue(error.res.data);
//     }
//   }
// );

const itemSlice = createSlice({
  name: "AllItems",
  initialState: {
    items: [
      {
        id: 1,
        img: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
        price: "₹299",
      },
      {
        id: 2,
        img: "https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388",
        price: "₹299",
      },
      {
        id: 3,
        img: "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
        price: "₹299",
      },
      {
        id: 4,
        img: "https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
        price: "₹399",
      },
      {
        id: 5,
        img: "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
        price: "₹299",
      },
      {
        id: 6,
        img: "https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
        price: "₹299",
      },
      {
        id: 7,
        img: "https://www.vintageindustries.nl/download_front/qympzk1762/2217_Arrow_Jacket_Forest.png",
        price: "₹299",
      },
      {
        id: 8,
        img: "https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
        price: "₹299",
      },
    ],
    cart: [],
    cartTotalQty: 0,
    itemTotalPrice: 0,
    loading: false,
    query: true,
  },
  reducers: {
    // addToCart: (state, action) => {
    //   const existingIndex = state.cart.findIndex(
    //     item => item.id === action.payload.id
    //   );
    //   if (existingIndex > -1) {
    //     state.cart[existingIndex] = {
    //       ...state.cart[existingIndex],
    //       qty: state.cart[existingIndex].qty + 1,
    //     };
    //     // toast.success("Quantity increased");
    //   } else {
    //     state.cart.push({ ...action.payload, qty: 1 });
    //     // toast.success("Added to cart");
    //   }
    // },
    totalPrice: (state, action) => {
      let { total, quantity } = state.cart.reduce(
        (cartTotal, item) => {
          const { price, qty } = item;
          const itemTotal = price * qty;
          cartTotal.total += itemTotal;
          cartTotal.quantity += qty;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQty = quantity;
      state.itemTotalPrice = total;
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        item => item.id === action.payload.id
      );
      console.log(itemIndex);
      if (state.cart[itemIndex].qty > 1) {
        state.cart[itemIndex].qty -= 1;
        // toast.success("Quantity decreased ");
      } else if (state.cart[itemIndex].qty === 1) {
        const nextCartItems = state.cart.filter(
          item => item.id !== action.payload.id
        );
        state.cart = nextCartItems;
        // toast.error("Product removed from cart");
      }
    },
  },
  //   extraReducers: {
  //     [fetchItems.pending]: (state, action) => {
  //       state.loading = true;
  //     },
  //     [fetchItems.fulfilled]: (state, action) => {
  //       state.loading = false;
  //       state.items = action.payload;
  //     },
  //     [fetchItems.rejected]: (state, action) => {
  //       state.loading = true;
  //     },
  //     [order.pending]: (state, action) => {
  //       state.loading = true;
  //     },
  //     [order.fulfilled]: (state, action) => {
  //       state.cart = [];
  //       state.loading = false;
  //       state.cartTotalQty = 0;
  //     },
  //     [order.rejected]: (state, action) => {
  //       state.loading = true;
  //     },
  //   },
});

export const { addToCart, totalPrice, decreaseCart } = itemSlice.actions;

export default itemSlice.reducer;
