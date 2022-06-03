import { Navigate, useRoutes } from 'react-router-dom';
import MainLayout from 'components/layouts/MainLayout';
import EmptyLayout from 'components/layouts/EmptyLayout';
import TokenTesterUpdated from 'pages/tester/TokenTesterUpdated';
import Spinner from 'pages/spinner/Spinner';
import ProgressPage from 'pages/progress/ProgressPage';
import NotFound from 'pages/Page404';
import Minting from 'pages/Mintpage'
import NFTInfo from 'pages/offpage/OffPage'
import Account from 'pages/account/Account'
import LoginPage from 'pages/LoginPage';
import { XRPNFTList } from 'components/NFTLists/XRPNFTList';
import LedgerNFTList from 'pages/market/LandingPage';

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { path: '/', element: <LedgerNFTList /> },
                { path: 'tester', element: <TokenTesterUpdated /> },
                { path: 'spinners', element: <Spinner /> },
                { path: 'progress', element: <ProgressPage /> },
                { path: 'nft/:tokenID/:tokenURI', element: <NFTInfo /> },
                { path: 'create', element: <Minting /> },
                { path: 'login', element: <LoginPage /> },
                { path: 'account/:key', element: <Account /> },
                { path: 'xrpnfts', element: <XRPNFTList /> },
                { path: '*', element: <Navigate to="/404/NotFound" /> }
            ]
        },
        {
            path: '/404',
            element: <EmptyLayout />,
            children: [
                { path: '*', element: <NotFound /> }
            ]
        }
    ]);
}
