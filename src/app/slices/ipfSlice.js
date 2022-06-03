import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pinnedFileHash: '',
  flags: 13,
  metadata: {
    name: '',
    description: '',
    externalLink: '',
    properties: [],
    levels: [],
  }
}
export const ipfSlice = createSlice({
  name: 'ipfs',
  initialState,
  reducers: {
    setPinnedFileHash: (state, action) => {
      state.pinnedFileHash = action.payload
    },
    setFlags: (state, action) => {
      state.flags = action.payload
    },
    setMetadata: (state, action) => {
      state.metadata = { ...state.metadata, ...action.payload }
    },
    updateLevel: (state, action) => {
      const { value, idx } = action.payload
      if (idx > -1)
        state.metadata.levels[idx] = { ...state.metadata.levels[idx], ...value }
    },
    updateProperty: (state, action) => {
      const { value, idx } = action.payload
      if (idx > -1)
        state.metadata.properties[idx] = { ...state.metadata.properties[idx], ...value }
    },
    resetIpfsState: () => initialState,
  },
})

// Action creators are generated for each case reducer function
export const { setMetadata, resetIpfsState, setPinnedFileHash, setFlags, updateLevel, updateProperty } = ipfSlice.actions

export default ipfSlice.reducer