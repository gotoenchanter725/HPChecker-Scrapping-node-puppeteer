const Web3 = require('web3');
let web3 = new Web3('https://bsc-dataseed.binance.org/');
// const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY;
BSCSCAN_API_KEY = '4XKBU6XVDMFW61YVHURHYJ5489BEPJFZF9';

const axios = require('axios');
const pancakeswap_address_v2 = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const pancakeswap_address_nsh3 = "0x0DCb9863b54f3150B7d749f7d5b68D8542263EDb";
const puppeteer = require("puppeteer");

const constants = require("../config/constants");
const constantHP = require("../config/constantHP");

var History = require('../models/history.js');

// =========================================HONEY===============================================
exports.honey_check = async (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  contract_address = req.body.contract_address;

  try {
    if (constantHP.excluded_address.indexOf(contract_address) != -1) {
      res.send({
        status: 1,
        data: 'The contract is not a honeypot. This type of contract is excluded since it does a particular activity in BSC/ETH network',
        info: constants.case_excluded,
        exclude: true,
      });
      return;
    }
  } catch (err) {
    next(err);
  }

  await check_honey(contract_address, async (status, data) => {
    if (status == "1") {
      res.send({
        status: status,
        data: data,
        info: data == "This token is honeypot" ? constants.case_honeypot : constants.case_not_honeypot,
      });
    } else {
      res.send({
        status: status,
        data: data,
        info: constants.case_honeypot,
      });
    }
  });
};

const check_honey = async (contract_address, result) => {
  let contract_abi;
  let contract_abi_error = null;
  let pancakeswap_balance_v2, pancakeswap_balance_nsh3;

  await get_contract_api(contract_address, (status, data) => {
    if (status == '1') {
      contract_abi = data;
    } else {
      contract_abi_error = data;
    }
  })

  if (contract_abi_error !== null) {
    result('0', "not");
    return;
  }

  try {
    const UserContract = new web3.eth.Contract(JSON.parse(contract_abi), contract_address);
    pancakeswap_balance_v2 = await UserContract.methods.balanceOf(pancakeswap_address_v2).call();
    pancakeswap_balance_nsh3 = await UserContract.methods.balanceOf(pancakeswap_address_nsh3).call();
  } catch (error) {
    // result('0', error);
    result('0', "nftnot");
    return;
  }

  if (parseInt(pancakeswap_balance_v2) === 0 && parseInt(pancakeswap_balance_nsh3) === 0) {
    result('1', "This token is honeypot");
    await DB_honeypotSet(contract_address, true);
  } else {
    result('1', "Does not seem to be a honeypot. This can change at any time. Always keep an eye on the behavior of the Smart Contract when selling/swapping tokens.");
    await DB_honeypotSet(contract_address, false);
  }
  return;
}
// ========================================RUGPULL================================================
exports.rugpull_check = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  contract_address = req.body.contract_address;
  await get_holder_list(contract_address, async (status, data) => {
    if (status == '1') {
      const result = data && data.filter((item) => !constants.EXCLUDED_ADDRESSES.includes(item.address));
      if (result && result.length) {
        if (parseFloat(result[0].percentage) > 15) {
          await DB_rugpullSet(contract_address, true);
          res.send({
            status: status,
            text: `Yes, it contains address which has ${result[0].percentage} which can drain liquidity`,
            list: result,
            info: constants.case_rughpull,
          });
        } else {
          await DB_rugpullSet(contract_address, false);
          res.send({
            status: status,
            text: "It doesn't contains the potential for rugpull",
            list: result,
            info: constants.case_not_rughpull
          });
        }
      } else {
        await DB_rugpullSet(contract_address, false);
        res.send({
          status: status,
          text: "", //"It doesn't contains the potential for rugpull",
          list: data,
          info: constants.case_not_rughpull
        });
      }
    } else {
      DB_rugpullSet(contract_address, false);
      res.send({
        status: status,
        text: "",
        error: data,
        info: constants.case_not_rughpull
      });
    }
  });
};

const get_holder_list = async (contract_address, result) => {
  let rst = "";
  let totalSupply = null;
  let totalSupplyError = null;

  await get_total_supply(contract_address, (status, data) => {
    if (status == '1') {
      totalSupply = data;
    } else {
      totalSupplyError = data;
    }
    return;
  })

  if (totalSupplyError !== null) {
    result('0', totalSupplyError);
    return;
  }

  const browser = await puppeteer.launch({ headless: false });
  try {
    console.log(`https://bscscan.com/token/generic-tokenholders2?m=normal&a=${contract_address}&s=${totalSupply}&p=1`);
    const page = await browser.newPage();
    await page.goto(`https://bscscan.com/token/generic-tokenholders2?m=normal&a=${contract_address}&s=${totalSupply}&p=1`)
    try {
      ;
      await page.waitForSelector('#maintable');

      rst = await page.evaluate(async () => {
        var data = [];
        var list = Array.from(document.querySelectorAll("table>tbody>tr"));
        if (list[0].querySelectorAll("td").length > 1) {
          list.forEach(element => {
            var tmpArray = {};
            tmpArray.address = element.querySelector("td:nth-of-type(2) a").getAttribute("href").slice(-42);
            tmpArray.quantity = element.querySelector("td:nth-of-type(3)").innerHTML;
            tmpArray.percentage = element.querySelector("td:nth-of-type(4)").innerText;
            data.push(tmpArray);
          });
        }
        return data;
      });

      await browser.close();
      result('1', rst);
    } catch (err) {
      await browser.close();
      result('0', err);
    }
  } catch (err) {
    result('0', err);
  }
};
// ========================================DETAILS================================================
exports.detail_check = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  let contract_address = req.body.contract_address, rst = {};

  // Token Name, Symbol, Owner
  await get_total_name_symbol_owner(contract_address, (status, data) => {
    if (status == "1") [rst.tokenName, rst.tokenSymbol, rst.tokenOwner] = [data.tokenName, data.tokenSymbol, data.tokenOwner];
    else[rst.tokenName, rst.tokenSymbol, rst.tokenOwner] = [];
  });

  // Token totalSupply
  await get_total_supply(contract_address, (status, data) => {
    if (status == "1") {
      rst.totalSupply = data;
    } else {
      rst.totalSupply = "";// data;
    }
  });

  // Token CirculatingSupply
  await get_circulating_supply(contract_address, (status, data) => {
    if (status == "1") {
      rst.circulatingSupply = data;
    } else {
      rst.circulatingSupply = "";// data;
    }
  });

  //  source code
  await get_soruce_code(contract_address, (status, data) => {
    if (status == "1") {
      rst.sourceCode = data;
    } else {
      rst.sourceCode = data;
    }
  });

  rst.status = "1";
  res.send(rst);
};
// ====================================GET SOURCE CODE========================================
exports.get_source = async (req, res) => {
  await get_soruce_code(req.body.contract_address, (status, data) => {
    res.send(data);
  });
}
// ========================================TRANSFER================================================
exports.transfer_check = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  let rst = {}, contract_address = req.body.contract_address, another_address = req.body.another_address;

  // Token CirculatingSupplyWithAnotherAddress
  await get_circulating_supply_width_another_address(contract_address, another_address, (status, data) => {
    if (status == "1") {
      rst.transfer = data;
    } else {
      rst.transfer = "";// data;
    }
  });

  // Token Circulating Supply for given Address
  await get_circulating_supply_given_address(contract_address, (status, data) => {
    if (status == "1") {
      rst.circulatingSupplyGivenAddress = data;
    } else {
      rst.circulatingSupplyGivenAddress = "";// data;
    }
  });

  rst.status = "1";
  res.send(rst);
}
// ========================================================================================
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const get_contract_api = async (contract_address, result) => {
  const url = `https://api.bscscan.com/api?module=contract&action=getabi&address=${contract_address}&apikey=${BSCSCAN_API_KEY}`;

  await delay(500);
  await axios.get(url)
    .then(response => {
      result(response.data.status, response.data.result);
      return;
    })
    .catch(error => {
      result('0', error);
      return;
    });
}

const get_total_supply = async (contract_address, result) => {
  const url = `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${contract_address}&apikey=${BSCSCAN_API_KEY}`;

  await delay(500);
  await axios.get(url)
    .then(response => {
      result(response.data.status, response.data.result);
      return;
    })
    .catch(error => {
      result('0', error);
      return;
    });
}

const get_total_name_symbol_owner = async (contract_address, result) => {
  await delay(500);

  let contract_abi = null, contract_abi_error = null, rst = {};
  await get_contract_api(contract_address, (status, data) => {
    if (status == '1') {
      contract_abi = data;
    } else {
      contract_abi_error = data;
    }
  })
  if (contract_abi_error !== null) {
    result('0', contract_abi_error);
    return;
  }

  try {
    const UserContract = new web3.eth.Contract(JSON.parse(contract_abi), contract_address);
    await UserContract.methods.name().call((err, name) => {
      rst.tokenName = name;
    });
    await UserContract.methods.symbol().call((err, symbol) => {
      rst.tokenSymbol = symbol;
    });
    // await UserContract.methods._owner().call((err, owner) => {
    //   rst.tokenOwner = owner;
    // });
    result("1", rst);
  } catch (error) {
    result('0', error);
    return;
  }
}


const get_circulating_supply = async (contract_address, result) => {
  const url = `https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=${contract_address}&apikey=${BSCSCAN_API_KEY}`;

  await delay(500);
  await axios.get(url)
    .then(response => {
      result(response.data.status, response.data.result);
      return;
    })
    .catch(error => {
      result('0', error);
      return;
    });
}

const get_soruce_code = async (contract_address, result) => {
  const url = `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${contract_address}&apikey=${BSCSCAN_API_KEY}`;

  await delay(500);
  await axios.get(url)
    .then(response => {
      if (response.data.status == "1") {
        // result("1", "");
        result("1", response.data.result[0].SourceCode);
      }
      else result("0", "There is not code.");
      return;
    })
    .catch(error => {
      result('0', error);
      return;
    });
}

const get_circulating_supply_width_another_address = async (contract_address, another_address, result) => {
  const url = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${contract_address}&address=${another_address}&offset=10&apikey=${BSCSCAN_API_KEY}`;

  await delay(500);
  await axios.get(url)
    .then(response => {
      result(response.data.status, response.data.result);
      return;
    })
    .catch(error => {
      result('0', error);
      return;
    });
}

const get_circulating_supply_given_address = async (contract_address, result) => {
  const url = `https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=${contract_address}&apikey=${BSCSCAN_API_KEY}`;

  await delay(500);
  await axios.get(url)
    .then(response => {
      result(response.data.status, response.data.result);
      return;
    })
    .catch(error => {
      result('0', error);
      return;
    });
}




// -----------------DB CRUD SECTION-----------------------
async function DB_honeypotSet(contract_address, value) {
  var arr = await History.findOne({ address: contract_address });
  if (!arr) {
    var new_history = new History({
      address: contract_address,
      honeypot: value,
      data: Date.now(),
      net: "bsc"
    })
    await new_history.save();
  } else {
    await History.updateOne({ address: contract_address }, { honeypot: value, net: "bsc" })
  }
}
async function DB_rugpullSet(contract_address, value) {
  var arr = await History.findOne({ address: contract_address });
  if (!arr) {
    var new_history = new History({
      address: contract_address,
      honeypot: value,
      data: Date.now(),
      net: "bsc"
    })
    await new_history.save();
  } else {
    await History.updateOne({ address: contract_address }, { rugpull: value, net: "bsc" })
  }
}