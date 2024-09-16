import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import axios from "axios";

export const fetchFeedData = createAsyncThunk("feed/fetchFeedData", async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token") //acxess the tokem from auth slice
    try {
        const response = await axios.get(`${API_URL}/feed`, {
            headers: {
                Authorization: `Bearer ${token}`//send token in authorization header
            }
        })
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.response)
        return rejectWithValue(error.response ? error.response.data : "An unexpected error occured")
    }
})

export const feedSlice = createSlice({
    name: "feed",
    initialState: {
        feedData: [],
        isLoading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null; // Add a way to clear the error manually
        },
    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchFeedData.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchFeedData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedData = action.payload;
                state.error = null
            })
            .addCase(fetchFeedData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const { clearError } = feedSlice.actions;
export default feedSlice.reducer