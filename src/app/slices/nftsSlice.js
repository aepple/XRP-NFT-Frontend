import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  offset: 0,
  nfts: [],
}

export const nftsSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    resetNFTs: () => initialState,
    addNfts: (state, action) => {
      state.nfts = [...state.nfts, ...action.payload]
    },
    increaseOffset: (state) => {
      state.offset++
    },
  },
})

// Action creators are generated for each case reducer function
export const { addNfts, increaseOffset, resetNFTs } = nftsSlice.actions

export default nftsSlice.reducer