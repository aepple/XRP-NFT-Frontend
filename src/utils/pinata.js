import pinataSDK from '@pinata/sdk'
import axios from 'axios';

const xrpl = require("xrpl");


const pinata = pinataSDK(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_SECRET_KEY)

export const testPinata = async () => {
    try {
        const res = await pinata.testAuthentication()
        console.log(res)
        return res
    } catch (e) {
        console.log(e)
        return { authenticated: false }
    }
}

const options = {
    pinataMetadata: {
        name: 'XRPNFT',
        keyValues: {
            decription: 'pinned nft metadata',
            properties: 'metadata'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
}

/**
 * Send JSON to Pinata for direct pinning to IPFS.
 * @param {Object} body Javascript object or Valid JSON you wish to pin to IPFS
 * @returns {Object} { success : true | false,
 * response ? : {
        IpfsHash : This is the IPFS multi-hash provided back for your content,
        PinSize : This is how large (in bytes) the content you just pinned is,
        Timestamp : This is the timestamp for your content pinning (represented in ISO 8601 format)
    }
 */
export const pinJsonToIPFS = async (body) => {
    console.log('Pinning JSON to pinata')
    try {
        const res = await pinata.pinJSONToIPFS(body, options)
        console.log('Pinning JSON result from Pinata:', res)
        return { success: true, response: res }
    } catch (e) {
        console.log(e)
        return { success: false }
    }
}

export const getMetadataFromURI = async (uri) => {
    const res = await axios.get(uri)
    console.log('metadata from axios', res)
}

export const parsePinataNFTUrl = (tokenURL) => {
    if (!tokenURL) return null;
    else return xrpl.convertHexToString(tokenURL)
}

