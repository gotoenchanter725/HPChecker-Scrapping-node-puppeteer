function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("EXCLUDED_ADDRESSES", 
    [
        "0x0dcb9863b54f3150b7d749f7d5b68d8542263edb",
        "0x000000000000000000000000000000000000dead",
        "0x00000000000000000000045261d4ee77acdb3286",
        "0x1a9c8182c09f50c8318d769245bea52c32be35bc",
        "0x0000000000000000000000000000000000000000"
    ]
);

module.exports.case_honeypot = "There I add additional information for the case of honeypot";
module.exports.case_not_honeypot = "then here i write any message that is relevant";
module.exports.case_rughpull = "my message";
module.exports.case_not_rughpull = "my message is called";
module.exports.case_excluded = "BSC  or ETH is determined based on token network";