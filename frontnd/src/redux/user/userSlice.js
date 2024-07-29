// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const saveAuthState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (error) {
    console.error("Could not save state", error)
  }
}

const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if(serializedState === null){
      return {user:null, token:null, status:"idle", error:null};
    }
    return JSON.parse(serializedState)
  } catch (error) {
    console.error("Could not save state", error)
    return {user:null, token:null, status:"idle", error:null};

  }
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);
      console.log("response", response)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', userData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const generateQR = createAsyncThunk('auth/generateqr', 
  async (qrData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/auth/generateQR', qrData, {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }

);



export const fetchQRCodes = createAsyncThunk(
  'auth/fetchQRCodes',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3000/auth/generateQR');
      console.log("response",response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk('auth/updateUser',
   async ({id, userData}, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`http://localhost:3000/auth/update/${id}`, userData,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });

console.log("response", response.data)
    return response.data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);

  }
})


const authSlice = createSlice({
  name: 'auth',
  initialState:loadAuthState(),
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        saveAuthState(state);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'succeeded';
        saveAuthState(state);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        // console.log('updateUser fulfilled', action.payload);

        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(generateQR.fulfilled, (state, action) => {
                console.log('generator', action.payload);

        state.qrCode = action.payload.qrCode;
        state.status = 'succeeded';
        saveAuthState(state);

      })
      .addCase(fetchQRCodes.fulfilled, (state, action) => {
        state.qrCodes = action.payload;
        state.status = 'succeeded';
        saveAuthState(state);
      })
      .addCase(fetchQRCodes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;

      })
      
  }, 
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
