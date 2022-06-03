import { combineReducers } from 'redux'
import filterReducer from './slices/filterSlice'
import nftsReducer from './slices/nftsSlice'
import ipfsReducer from './slices/ipfSlice'
import accountReducer from './slices/accountSlice'
const rootReducer = combineReducers({
  filter: filterReducer,
  nfts: nftsReducer,
  ipfs: ipfsReducer,
  account: accountReducer
})
export default rootReducer