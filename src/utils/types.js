import PropTypes from 'prop-types';

export const SnackbarProps = {
    isOpen: PropTypes.bool,
    close: PropTypes.func,
    message: PropTypes.string,
    variant: PropTypes.string
}

export const PinataNFTCardProps = {
    nftoken: PropTypes.object
}

export const NFTCardProps = {
    Flags: PropTypes.number,
    // Issuer: PropTypes.string,
    NFTokenID: PropTypes.string,
    // NFTokenTaxon: PropTypes.number,
    URI: PropTypes.string,
    // nft_serial: PropTypes.number
}

export const BuyOffersProps = {
    // id: PropTypes.number,
    // result: PropTypes.exact(buyOfferProps),
    _offers: PropTypes.array,
    // type: PropTypes.string,
    _NFTokenID: PropTypes.string,
    _isOwner: PropTypes.bool
}

export const LevelProps = {
    id: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.number,
    total: PropTypes.number,
}

export const LevelsProp = {
    levels: PropTypes.arrayOf(LevelProps)
}

export const NFTPreviewProps = {
    uri: PropTypes.string,
    title: PropTypes.string,
    favorites: PropTypes.number,
}

export const AddTraitDgProp = {
    // save: PropTypes.func,
    close: PropTypes.func,
    properties: PropTypes.array
}

export const AddLevelDgProp = {
    // save: PropTypes.func,
    close: PropTypes.func,
    properties: PropTypes.array
}

export const MetaDataProps = {
    description: PropTypes.any,
    image: PropTypes.string
}

export const NFTDetailsProps = {
    NFTokenID: PropTypes.string,
    NFToken: PropTypes.object,
    ParsedURI: PropTypes.string,
    data: PropTypes.exact(MetaDataProps)
}

export const NFTOffersDetailProps = {
    NFTokenID: PropTypes.string,
    name: PropTypes.string,
    Issuer: PropTypes.string,
}

export const ErrorPageProps = {
    message: PropTypes.string
}


