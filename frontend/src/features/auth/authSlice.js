import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const signUpUserAsync = createAsyncThunk("auth/signUpUser", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, formData);
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
        const response = await axios.post(`${API_URL}/login`, formData);
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
        token: localStorage.getItem("token") || null,
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        isLoading: false,
        isError: false,
        isSignUpSuccess: false,
        isSuccess: !!localStorage.getItem("token"),
        message: ""
    },
    reducers: {
        resetSignUpSuccessful: (state) => {
            state.isSignUpSuccess = false
        },
        logout: (state) => {
            state.token = null;
            state.user = null
            state.isSuccess = false;
            localStorage.removeItem("token"); // Clear token from localStorage on logout
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signUpUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSignUpSuccess = true;
                state.isError = false
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
                state.user = action.payload
                state.message = "Login Successful"
                localStorage.setItem("token", action.payload.token)
                localStorage.setItem("user", JSON.stringify(action.payload))

            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false;
                state.message = action.payload.error
            })
    }
})

export const { resetSignUpSuccessful, logout } = authSlice.actions;
export default authSlice.reducer