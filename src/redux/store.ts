import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import userSlice from "./userSlice";
import roomSlice from "./roomSlice";
import bookingSlice from "./bookingSlice";
import promotionSlice from "./promotionSlice";
import reviewSlice from "./reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    user: userSlice,
    room: roomSlice,
    booking: bookingSlice,
    promotion: promotionSlice,
    review: reviewSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
