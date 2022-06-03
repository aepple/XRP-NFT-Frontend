import { Icon } from '@iconify/react';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import mint from '@iconify/icons-file-icons/mint';
import spinnerIcon from '@iconify/icons-fontisto/spinner';
import progressBar from '@iconify/icons-carbon/progress-bar';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    id: 'all',
    title: 'All NFTs',
    path: '/',
    icon: getIcon(mint)
  },
  {
    id: 'xrpnft',
    title: 'SiteNFTs',
    path: '/xrpnfts',
    icon: getIcon(shoppingBagFill)
  },
  {
    id: 'collections',
    title: 'Collections',
    path: '/#',
    icon: getIcon('ep:collection')
  },
  {
    id: 'token-tester',
    title: 'NFToken Tester',
    path: '/tester',
    icon: getIcon('mdi:postage-stamp')
  },
  {
    id: 'spinners',
    title: 'Spinners',
    path: '/spinners',
    icon: getIcon(spinnerIcon)
  },
  {
    id: 'progress',
    title: 'Progress',
    path: '/progress',
    icon: getIcon(progressBar)
  },
];

export default sidebarConfig;
