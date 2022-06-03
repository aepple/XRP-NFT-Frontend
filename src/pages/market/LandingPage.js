import { useEffect } from 'react';
import { resetFlags } from 'app/slices/filterSlice';
import { useDispatch } from 'react-redux'
import { resetNFTs } from 'app/slices/nftsSlice'
import PersistentDrawerLeft from 'components/layouts/Drawer';
import { AllNFTs } from 'components/NFTLists/AllNFTs';


export default function LedgerNFTList() {
  const dispatch = useDispatch()

  useEffect(() => {
    // reset filter, nfts redux states
    dispatch(resetFlags())
    dispatch(resetNFTs())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PersistentDrawerLeft>
      <AllNFTs />
    </PersistentDrawerLeft>
  );
}
