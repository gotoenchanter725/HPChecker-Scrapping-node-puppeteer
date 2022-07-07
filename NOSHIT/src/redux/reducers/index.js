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

export default (state, action) => {
    switch (action.type) {
        case ADDRESS:
        case HONEY:
        case HONEY_STATE:
        case RUGPULL:
        case RUGPULL_STATE:
        case NETWORK:
        case TOKEN_HOLDERS:
        case TOKEN_NAME: 
        case TOKEN_SYMBOL: 
        case TOKEN_OWNER: 
        case TOTAL_SUPPLY: 
        case CIRCULATING_SUPPLY: 
        case SOURCE_CODE: 
        case CONFIRM_VERIFY: 
        case TRANSFER: 
        case CIRCULATING_SUPPLY_GIVEN_ADDRESS: 
            return {
                ...state,
                ...action.payload
            };
        default:
            return {
                ...state
            };
    }
};
