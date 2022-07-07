import React, {useState} from 'react';
import {useSelector} from "react-redux";

import { Box, Button, Card, Stack } from "@mui/material";
import NormalCard from "../../components/normalCard";
import infoUrl from "../../../assets/image/info.jpg";
import { Link } from "react-router-dom";
import './index.scss';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export default function GraphAndChart() {
    const [tokenAddress, netType] = useSelector((state) => {
        return [state.data.address, state.data.netType];
    })
    return (
        <NormalCard className="graphandchart" title="Graphs and Charts" component={
            <>
                <Stack mb={2} direction="row" alignItems="center" justifyContent={"space-between"}>
                    <a target="_black" href={`https://poocoin.app/tokens/${tokenAddress}`}>Goin</a>
                    <a target="_black" href={`https://geckoterminal.com/bsc/pools`}>GecoTerminal</a>
                </Stack>
                <Stack mb={2} direction="row" alignItems="center" justifyContent={"space-between"}>
                    {
                        (netType == "eth")?
                        (<a target="_black" href={`https://etherscan.com/token/${tokenAddress}`}>ETHERScan</a>)
                        : 
                        (<a target="_black" href={`https://bscscan.com/token/${tokenAddress}`}>BSCSCAN</a>)
                    }
                    <a target="_black" href={`https://charts.bogged.finance/?c=bsc&t=${tokenAddress}`}>Blogged</a>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent={"space-around"}>
                    <Button className="rest-shew" size="small" variant="">
                        List of Transactions
                        <KeyboardDoubleArrowDownIcon />
                    </Button>
                </Stack>
            </>
        }>
        </NormalCard>
    )
}