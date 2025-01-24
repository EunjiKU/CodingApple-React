import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name: "cart",
  initialState: [
    // { id: 0, name: "", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let item = state.find((id) => id.id === action.payload);
      if (item) {
        item.count += 1;
      }
      // let 번호 = state.findIndex((a)=>{ return a.id === action.payload })
      // state[번호].count++
    },
    minusCount(state, action) {
      let item = state.find((id) => id.id === action.payload);
      if (item) {
        if (item.count > 1) {
          item.count -= 1;
        } else {
          return state.filter((id) => id.id !== action.payload); // 상태 변경
        }
      }
      return state; // 상태 변경이 없을 경우 반환
    },
    addCart(state, action) {
      let item = state.find((id) => id.id === action.payload.id);
      if (item) {
        item.count += 1;
      } else {
        state.push({
          id: action.payload.id,
          name: action.payload.title,
          count: 1,
        });
      }
    },
  },
});

export let { addCount, minusCount, addCart } = cart.actions;

export default cart;
