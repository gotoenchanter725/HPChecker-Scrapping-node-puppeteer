import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Card, Stack } from "@mui/material";
import NormalCard from "../../components/normalCard";
import Input from "../../components/input";
import './index.scss';
import infoUrl from "../../../assets/image/info.jpg";

export default function CheckList() {
    const [
        transfer, 
        circulatingSupplyGivenAddress
    ] = useSelector((state) => {
        return [
            state.data.transfer, 
            state.data.circulatingSupplyGivenAddress, 
        ];
    })

    const [islocked, setIslocked] = useState(true);
    const [tokenAddress, setToken] = useState("");
    const [anotherAddress, setAnother] = useState("");
    return (
        <NormalCard className="checklist-container" title="Check List of Transfer Events Specific SC and account" component={
            <>
                <Stack direction={{lg: "row", md: "row", sm: "column", xs:"column"}}  justifyContent={'space-between'}>
                    <Stack className="address-wrap" direction="column" justifyContent={'space-between'}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <label>Token Address</label>
                            <Input value={tokenAddress} changeHandle={setToken} />
                            <img src={infoUrl} />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <label>Another Address</label>
                            <Input value={anotherAddress} changeHandle={setAnother} />
                            <img src={infoUrl} />
                        </Stack>
                        <p>See Results</p>
                    </Stack>
                    <Stack className="result-wrap" direction="column"  justifyContent={'space-between'}>
                        <Stack className="column">
                            <p>Token Circulating Supply for given Address</p>
                            <Button className="custom-btn" variant="outlined">Result</Button>
                        </Stack>
                        <Button className="custom-btn submit" variant="outlined">Submit</Button>
                    </Stack>
                </Stack>
            </>
        }>
        </NormalCard>
    )
}