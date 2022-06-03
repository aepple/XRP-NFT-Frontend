export const BASE_URL = 'https://ws.xrpnft.com/api';
export const RIPPLE_TEST_NET_URL = 'wss://xls20-sandbox.rippletest.net:51233'
export const NEW_RIPPLE_TEST_NET_URL = 'wss://s.altnet.rippletest.net:51233'
export const PINATA_PINNING_FILE_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
export const PINATA_GATEWAY = 'https://xrpnft.mypinata.cloud/'
export const XRPNFT_DOMAIN = 'xrpnft.com/ipfs/'
export const SUPPORTED_FILE_TYPES = [
    'JPG',
    'PNG',
    'GIF',
    'SVG',
    'MP4',
    'WEBM',
    'WAV',
    'OGG',
    'GLB',
    'GLTF'
]
export const ACCOUNTS = [
    {
        id: 1,
        key: "rPPfyzxWCXo2FhL6j7LQ3JC5kWCaBs4pvZ",
        secret: "ssjNJ1kqi3cuWES8FZVmSmY9pVCdC",
        sequence: 1824352
    },
    {
        id: 2,
        key: "rNZ8EFNxCTf2sZTVExQgayqPRsGZK9AgQ8",
        secret: "shh665kVoKGJzwjWmHdp1p3aqYCbQ",
        sequence: 1824368
    },
    {
        id: 3,
        key: "rpRSDXFztBAsgAyFvSBqXF8B8CJXGu6DbZ",
        secret: "ssSEzKkkK57yePdHU4jTt7DjfXSX5",
        sequence: 1824374
    },
];
export const TOP_BAR_HEIGHT_DESKTOP = 50
export const BASIC_COLOR = '#00AB55'
export const tfTransferable = 0x00000008
export const tfTrustLine = 0x00000004
export const tfOnlyXRP = 0x00000002
export const tfBurnable = 0x00000001
export const TOKEN_FLAGS = [
    {
        label: 'Burnable',
        value: 1,
    },
    {
        label: 'OnlyXRP',
        value: 2,
    },
    {
        label: 'TrustLine',
        value: 4,
    },
    {
        label: 'Transferable',
        value: 8,
    },
]

export const NON_FLAGS = [6, 7, 14, 15]
