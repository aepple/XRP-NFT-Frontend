import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account: {
    key: null,
    secret: null
  },
  login: false,
  nfts: []
}

export const accountSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    doSetAccount: (state, action) => {
      state.account = { ...action.payload };
    },
    setNFTs: (state, action) => {
      state.nfts = action.payload
    },
    login: (state) => { state.login = true },
    logout: (state) => { state.login = false },
    resetAccount: () => initialState
  },
})

// Action creators are generated for each case reducer function
export const { doSetAccount, resetAccount, login, logout, setNFTs } = accountSlice.actions

export default accountSlice.reducer