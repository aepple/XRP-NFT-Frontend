import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  flag: 0
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.flag ^= action.payload;
    },
    resetFlags: () => initialState
  },
})

// Action creators are generated for each case reducer function
export const { changeFilter, resetFlags } = filterSlice.actions

export default filterSlice.reducer