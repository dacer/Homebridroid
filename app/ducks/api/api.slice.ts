import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthInfo } from "../userPreferences/userPreferences.slice";
import APIKit from "./APIKit";
import { GET_DEIVCES, LOGIN } from "./types";

export const login = createAsyncThunk(LOGIN, async (
  {username, password, serverAddress} : AuthInfo
) => {
  if (serverAddress.endsWith('/')) {
    serverAddress = serverAddress.slice(0, -1)
  }
  const response = await APIKit.getInstance(serverAddress).post('/api/auth/login', {
    username,
    password
  })
  try {
    const token = (await response.data).access_token as string
    return token
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
})

export const getDevices = createAsyncThunk(GET_DEIVCES, async (
  {serverAddress, token} : AuthInfo
) => {
  try {
    const devices = (await APIKit.getInstance(serverAddress, token).get('/api/accessories')).data as Device[]
    const layoutList = (await APIKit.getInstance(serverAddress, token).get('/api/accessories/layout')).data as Layout[]

    const deviceLayoutList: DeviceLayout[] = layoutList.map(layout => (
      {
        name: layout.name, 
        services: layout.services.map(s => ({
          uniqueId: s.uniqueId,
          serviceName: devices.find(d => d.uniqueId === s.uniqueId)!.serviceName
        }))
      }
    ))
    console.log(`deviceLayoutList: ${JSON.stringify(deviceLayoutList)}`)
    return deviceLayoutList
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
})

const initialState = {
  token: "",
  devices: [],
  loading: 'idle'
} as ApiState

interface ApiState {
  token: string,
  devices: DeviceLayout[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export type Device = {
  uniqueId: string,
  serviceName: string
}

type Layout = {
  name: string,
  services: {
    uniqueId: string,
  }[]
}

export type DeviceLayout = {
  name: string,
  services: {
    uniqueId: string,
    serviceName: string
  }[]
}

const emissions = createSlice({
  name: "api",
  initialState,
  reducers: {
    logout: (state, action: PayloadAction<typeof undefined>) => {
      state.token = ""
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, action) => {
        state.devices = []
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = 'idle'
        state.token = payload
        console.log(`${payload} <- payload`)
      })
      .addCase(getDevices.fulfilled, (state, { payload }) => {
        state.loading = 'idle'
        state.devices = payload
      })
      
    }
});

const { logout } = emissions.actions;

export const actions = { login, getDevices, logout };

export const namespace = emissions.name;

export const reducer = emissions.reducer;
