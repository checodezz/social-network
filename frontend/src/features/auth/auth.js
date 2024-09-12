import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUpUserAsync = createAsyncThunk("auth/signUpUser", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:3000/register", formData);
        console.log(response.data);
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
        return rejectWithValue("An unecpected error occured")
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUpUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signUpUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.token = action.payload.token;
                state.message = "SignUp Successful"
            })
            .addCase(signUpUserAsync.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload
            })
    }
})

export default authSlice.reducer