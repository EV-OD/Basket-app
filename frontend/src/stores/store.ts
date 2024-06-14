import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import deliveriesSlice from './deliveries/deliveriesSlice';
import ordersSlice from './orders/ordersSlice';
import productsSlice from './products/productsSlice';
import reviewsSlice from './reviews/reviewsSlice';
import subscriptionsSlice from './subscriptions/subscriptionsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    deliveries: deliveriesSlice,
    orders: ordersSlice,
    products: productsSlice,
    reviews: reviewsSlice,
    subscriptions: subscriptionsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
