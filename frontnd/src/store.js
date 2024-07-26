import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authSlice";
import usersReducer from "./reducer/users/userSlice";


const store = configureStore({
    reducer: {
        auth:authReducer,
        users:usersReducer,
    },
});


export default store;