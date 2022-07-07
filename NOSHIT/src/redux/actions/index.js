import { ADDRESS, HONEY, HONEY_STATE, RUGPULL, RUGPULL_STATE, NETWORK, TOKEN_HOLDERS ,
TOKEN_NAME,
TOKEN_SYMBOL,
TOKEN_OWNER,
TOTAL_SUPPLY,
CIRCULATING_SUPPLY,
SOURCE_CODE,
CONFIRM_VERIFY,
TRANSFER, 
CIRCULATING_SUPPLY_GIVEN_ADDRESS,
} from "../types";

export const changeCurrentTokenIshoneypot = value => ({
    type: HONEY,
    payload: {
        currentTokenIshoneypot: value
    }
});
export const changeCurrentTokenHoneypotState = value => ({
    type: HONEY_STATE,
    payload: {
        currentTokenHoneypotState: value
    }
});
export const changeCurrentTokenIsRugpull = value => ({
    type: RUGPULL,
    payload: {
        currentTokenIsRugpull: value
    }
});
export const changeCurrentTokenRugpullState = value => ({
    type: RUGPULL_STATE,
    payload: {
        currentTokenRugpullState: value
    }
});
export const changeNetwork = value => ({
    type: NETWORK,
    payload: {
        netType: value
    }
});
export const changeTokenHolders = value => ({
    type: TOKEN_HOLDERS,
    payload: {
        holders: value
    }
});

export const changeTokenName = value => ({
    type: TOKEN_NAME,
    payload: {
        tokenName: value
    }
})
export const changeTokenSymbol = value => ({
    type: TOKEN_SYMBOL,
    payload: {
        tokenSymbol: value
    }
})
export const changeTokenOwner = value => ({
    type: TOKEN_OWNER,
    payload: {
        tokenOwner: value
    }
})
export const changeTotalSupply = value => ({
    type: TOTAL_SUPPLY,
    payload: {
        totalSupply: value
    }
})
export const changeCirculatingSupply = value => ({
    type: CIRCULATING_SUPPLY,
    payload: {
        circulatingSupply: value
    }
})
export const changeSourceCode = value => ({
    type: SOURCE_CODE,
    payload: {
        sourceCode: value
    }
})

export const changeConfirmVerify = value => ({
    type: CONFIRM_VERIFY,
    payload: {
        confirmVerify: value
    }
})

export const changeTransfer = value => ({
    type: TRANSFER,
    payload: {
        transfer: value
    }
})
export const changeCirculatingSupplyGivenAddress = value => ({
    type: CIRCULATING_SUPPLY_GIVEN_ADDRESS,
    payload: {
        circulatingSupplyGivenAddress: value
    }
})

export const changeContractAddress = value => ({
    type: ADDRESS,
    payload: {
        address: value
    }
})