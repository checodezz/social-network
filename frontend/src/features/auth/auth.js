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
        return rejectWithValue("An unexpected error occured")
    }
});

export const loginUserAsync = createAsyncThunk("auth/loginUser", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:3000/login", formData);
        console.log(response.data.user);
        return response.data.user
    } catch (error) {
        if (error.response && error.response.data) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
        return rejectWithValue("An unexpected error occured")
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
                state.isError = false
                state.token = action.payload.token;
                state.message = "SignUp Successful"
            })
            .addCase(signUpUserAsync.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload
            })
            .addCase(loginUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false
                state.token = action.payload.token
                state.message = "Login Successful"
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false;
                state.message = action.payload.error
            })
    }
})

export default authSlice.reducer