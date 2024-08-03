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
    if (serializedState === null) {
      return { user: null, token: null, status: "idle", error: null, qrCodes: [] };
    }
    return JSON.parse(serializedState)
  } catch (error) {
    console.error("Could not save state", error)
    return { user: null, token: null, status: "idle", error: null, };

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }

);


export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:3000/auth/allusers', {
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })

      console.log("respone redux", response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);

    }
  }
)


export const fetchQRCodes = createAsyncThunk(
  'auth/fetchQRCodes',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3000/auth/generateQR');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteQRCode = createAsyncThunk(
  'auth/deleteQRCode',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:3000/auth/deletecode/${id}`);
      console.log("response", response.data)

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatedData = createAsyncThunk(
  'auth/updatedData',
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3000/auth/editCode/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);

    }
  }
);




const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
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
      .addCase(deleteQRCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.qrCodes = state.qrCodes.filter(qrCode => qrCode._id !== action.meta.arg);
        saveAuthState(state);
      })
      .addCase(deleteQRCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updatedData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.qrCodes.findIndex(qrCode => qrCode._id === action.payload._id)
        if (index !== -1) {
          state.qrCodes[index] = action.payload;
        }
        saveAuthState(state)
      })
      .addCase(updatedData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        console.log("raaaaj",action.payload)
        state.user = action.payload;
        state.status = 'succeeded';
        saveAuthState(state);
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
