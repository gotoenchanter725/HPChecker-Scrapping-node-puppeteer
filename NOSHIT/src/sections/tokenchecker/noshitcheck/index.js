import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, IconButton } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BarChartIcon from '@mui/icons-material/BarChart'; import "./tokenchecker.scss";
import Input from "../../components/input";
import axios from "axios";
import {
    changeCurrentTokenIshoneypot,
    changeCurrentTokenHoneypotState,
    changeCurrentTokenIsRugpull,
    changeCurrentTokenRugpullState,
    changeNetwork,
    changeContractAddress,
    changeTokenHolders,
    changeTokenName,
    changeTokenSymbol,
    changeTokenOwner,
    changeTotalSupply,
    changeCirculatingSupply,
    changeSourceCode,
    changeConfirmVerify,
    changeTransfer,
    changeCirculatingSupplyGivenAddress,
} from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../config/const";

export default function Noshitcheck() {
    // const honeypotMessage = "Show the error message";
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [netType, setNetType] = useState('eth');

    const handleChange = (event) => {
        setNetType(event.target.value);
    };

    const CheckHandle = async () => {
        if (!String(address)) {
            setError("Hey! I need a token contract to check how it smells. Please provide it!");
            return;
        }
        if (String(address).substr(0, 2) != "0x" || String(address).length != 42) {
            setError("This token address is invalid");
            return;
        }
        setError("");
        navigate(`/tokenchecker/${address}`);

        // ------- Token address that user set matched info show -----------

        dispatch(changeCurrentTokenIshoneypot("loading"));
        dispatch(changeCurrentTokenIsRugpull("loading"));
        dispatch(changeNetwork(netType));
        dispatch(changeContractAddress(address));
        dispatch(changeTokenName("loading"));
        dispatch(changeTokenSymbol("loading"));
        dispatch(changeTokenOwner("loading"));
        dispatch(changeTotalSupply("loading"));
        dispatch(changeCirculatingSupply("loading"));
        dispatch(changeConfirmVerify("loading"));
        dispatch(changeSourceCode("loading"));
        dispatch(changeCurrentTokenHoneypotState(""));
        dispatch(changeCurrentTokenRugpullState(""));
        dispatch(changeTokenHolders(undefined));

        var exist_flag = 1;
        await axios.post(`${BASE_URL}/api/${netType}/check-honeypot`, {
            contract_address: address
        }).then(response => {
            console.log(response.data);
            if (response.data.data == "not") exist_flag = 0;
            if (response.data?.exclude == true) exist_flag = 2;
            if (response.data.data != "nftnot") {
                dispatch(changeCurrentTokenIshoneypot(response.data.data));
                dispatch(changeCurrentTokenHoneypotState(response.data.info));
            } else {
                dispatch(changeCurrentTokenIshoneypot("This is a NFT Token, and these analysis are not relevant for it"));
                dispatch(changeCurrentTokenHoneypotState("This is a NFT Token, and these analysis are not relevant for it"));
                exist_flag = 2;
            }
        });
        console.log("exist_flag", exist_flag);
        if (exist_flag != 1) {
            if (exist_flag == 0) {
                dispatch(changeCurrentTokenIshoneypot("Token is not exist"));
                dispatch(changeCurrentTokenHoneypotState("Token is not exist"));
            }
            dispatch(changeCurrentTokenIsRugpull(""));
            dispatch(changeTokenName(""));
            dispatch(changeTokenSymbol(""));
            dispatch(changeTokenOwner(""));
            dispatch(changeTotalSupply(""));
            dispatch(changeCirculatingSupply(""));
            dispatch(changeConfirmVerify(""));
            dispatch(changeSourceCode(""));
            dispatch(changeCurrentTokenRugpullState(""));
            dispatch(changeTokenHolders(undefined));
            return;
        }

        await axios.post(`${BASE_URL}/api/${netType}/check-rugpull`, {
            contract_address: address
        }).then(response => {
            console.log(response);
            if (response.data.status == "1") {
                dispatch(changeCurrentTokenIsRugpull(response.data.text));
                dispatch(changeCurrentTokenRugpullState(response.data.info));
                dispatch(changeTokenHolders(response.data.list));
            } else {
                dispatch(changeCurrentTokenIsRugpull(""));
                dispatch(changeCurrentTokenRugpullState(response.data.info));
                dispatch(changeTokenHolders([]));
            }
        });

        await axios.post(`${BASE_URL}/api/${netType}/check-detail`, {
            contract_address: address
        }).then(response => {
            const data = response.data;
            console.log(data);
            if (response.data.status == "1") {
                dispatch(changeTokenName(data.tokenName));
                dispatch(changeTokenSymbol(data.tokenSymbol));
                dispatch(changeTokenOwner(data.tokenOwner));
                dispatch(changeTotalSupply(data.totalSupply));
                dispatch(changeCirculatingSupply(data.circulatingSupply));
                dispatch(changeSourceCode(data.sourceCode));
                dispatch(changeConfirmVerify(data.confirmVerify));
            } else {
                dispatch(changeTokenName(""));
                dispatch(changeTokenSymbol(""));
                dispatch(changeTokenOwner(""));
                dispatch(changeTotalSupply(""));
                dispatch(changeCirculatingSupply(""));
                dispatch(changeSourceCode("Can't Code."));
                dispatch(changeConfirmVerify(""));
            }
        });

        // await axios.post(`${BASE_URL}/api/${netType}/check-transfer`, {
        //     contract_address: address,
        //     another_address: address
        // }).then(response => {
        //     if (response.data.status == '1') {
        //         const data = response.data;
        //         dispatch(changeTransfer(data.transfer));
        //         dispatch(changeCirculatingSupplyGivenAddress(data.circulatingSupplyGivenAddress));
        //     } else {
        //     }
        // })
    }

    return (
        <div className="tokencheck-container">
            <Stack direction="column" sx={{ margin: "auto" }} alignItems="center">
                <Stack direction={{ lg: "row", md: "row", sm: "column", xs: "column" }} alignItems="center" justifyContent="space-around" sx={{ marginBottom: "20px" }}>
                    <h2>NOSHIT CHECKER</h2>
                    <FormControl className="netType-wrap" sx={{ width: 200 }}>
                        {/* <InputLabel id="demo-simple-select-autowidth-label">NET</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={netType}
                            onChange={handleChange}
                            autoWidth
                            // readOnly
                            label="nettype"
                            sx={{ color: "var(--primary)" }}
                        >
                            <MenuItem value={'eth'}>ETH MainNetWork</MenuItem>
                            <MenuItem value={'bsc'}>BSC MainNetWork</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction={{ lg: "row", md: "row", sm: "column", xs: "column" }} alignItems="center" justifyContent="space-around">
                    <Stack className="address-wrap" sx={{ marginRight: "10px" }} direction="row" alignItems="center" justifyContent="space-around">
                        <label htmlFor="token" style={{ marginRight: "10px" }}>Token Address</label>
                        <Input id="token" value={address} changeHandle={setAddress} />
                        {
                            error && <span className="error">{error}</span>
                        }
                    </Stack>
                    <Stack className="btn-wrap" direction="row" alignItems="center" justifyContent="space-around">
                        <Button onClick={CheckHandle} className={"custom-btn " + (error ? "sm-mb" : "")} variant="contained">NOSHIT CHECK</Button>
                        <Link to="/statistic">
                            <IconButton size="small">
                                <BarChartIcon sx={{ fontSize: 40, color: "white" }} />
                            </IconButton>
                            <span>status</span>
                        </Link>
                    </Stack>
                </Stack>
            </Stack>
        </div>
    )
}