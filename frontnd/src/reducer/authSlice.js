
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerStart(state) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;

        },
        registerFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
        },
        updateStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateSuccess(state, action) {
            state.loading = false;
            state.user = action.payload.updatedUser;

        },
        updateFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});


export const {
    registerStart,
    registerSuccess,
    registerFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateStart,
    updateSuccess,
    updateFailure
} = authSlice.actions;

export default authSlice.reducer;

export const updateUser  = (id, data) => async (dispatch) => {
    try {
        dispatch(updateStart());

        const response = await axios.put(`/api/update/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(updateSuccess(response.data));
    } catch (error) {
        dispatch(updateFailure(error.response?.data?.message))
    }

};
