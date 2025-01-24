// 1️⃣ Redux : store 생성
// (컴포넌트간 state 공유 편해짐!!!)
import { configureStore } from "@reduxjs/toolkit";

import user from "./store/userSlice";
import cart from "./store/cartSlice";

// 4️⃣ Redux : state 생성 (state 하나를 == slice 하나)
// useState랑 비슷한 용도...?
// 파일 분할 : [store] - ~slice.js

// 5️⃣ Redux : 생성한 slice(state)를 등록
export default configureStore({
  reducer: {
    // 작명 : createSlice만든거.reducer
    user: user.reducer,
    cart: cart.reducer,
  },
});
