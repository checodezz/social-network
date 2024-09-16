import { configureStore, } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import feedSlice from "../features/feed/feedSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        feed: feedSlice
    }
}) 