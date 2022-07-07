import { Link } from "react-router-dom";
import { Box, Card, Stack, Table, TableBody, TableCell, TableHead, TableContainer, TableRow, TablePagination } from "@mui/material";

import NormalCard from "../../components/normalCard";
import { useSelector } from "react-redux";
import './index.scss';
import loadingUrl from "../../../assets/image/loading.gif";

export default function TokenContractDetails() {
    const [
        contract_address,
        netType,
        holders,
        tokenName,
        tokenSymbol,
        tokenOwner,
        totalSupply,
        circulatingSupply,
        sourceCode,
        confirmVerify,
    ] = useSelector((state) => {
        return [
            state.data.address,
            state.data.netType,
            state.data.holders,
            state.data.tokenName,
            state.data.tokenSymbol,
            state.data.tokenOwner,
            state.data.totalSupply,
            state.data.circulatingSupply,
            state.data.sourceCode,
            state.data.confirmVerify,
        ];
    })
    return (
        <NormalCard className="tokencontract-container" title="Token Contract Details" component={
            <>
                <Stack className="detail" direction="row" justifyContent='space-between'>
                    <label>Network</label>
                    <span>{netType ? (String(netType).toUpperCase() + " MainNetWork") : ""}</span>
                </Stack>
                <Stack className="detail" direction="row" justifyContent='space-between'>
                    <label>Token Name</label>
                    <span>{tokenName ? (tokenName == "loading" ? (<img className="loading" src={loadingUrl} />) : tokenName) : ""}</span>
                </Stack>
                <Stack className="detail" direction="row" justifyContent='space-between'>
                    <label>Token Symbol</label>
                    <span>{tokenSymbol ? (tokenSymbol == "loading" ? (<img className="loading" src={loadingUrl} />) : tokenSymbol) : ""}</span>
                </Stack>
                <Stack className="detail" direction="row" justifyContent='space-between'>
                    <label>Token Owner</label>
                    <span title={tokenOwner}>{(tokenOwner && tokenOwner != "loading") ? (String(tokenOwner).slice(0, 7) + "..." + String(tokenOwner).slice(-5)) : (tokenOwner ? (tokenOwner == "loading" ? (<img className="loading" src={loadingUrl} />) : tokenOwner) : "")}</span>
                </Stack>
                <Stack className="detail" direction="row" justifyContent='space-between'>
                    <label>Total Supply</label>
                    <span>{totalSupply ? (totalSupply == "loading" ? (<img className="loading" src={loadingUrl} />) : totalSupply) : ""}</span>
                </Stack>
                <Stack className="detail" direction="row" justifyContent='space-between'>
                    <label>Token CirculatingSupply</label>
                    <span>{circulatingSupply ? (circulatingSupply == "loading" ? (<img className="loading" src={loadingUrl} />) : circulatingSupply) : ""}</span>
                </Stack>
                <Stack className="detail" direction="row" justifyContent='space-between'>
                    <label>Contract Verified: </label>
                    <span>{confirmVerify == "true" ? "YES" : (confirmVerify == "false" ? "NO" : (confirmVerify == "loading" ? (<img className="loading" src={loadingUrl} />) : confirmVerify))}</span>
                </Stack>
                <Stack className="detail" direction="row" justifyContent='space-between'>
                    <label>Contract Source Code</label>
                    <span>{
                        sourceCode == "loading" ? 
                        (<img className="loading" src={loadingUrl} />) : (
                        (sourceCode && sourceCode.name != "Error")?(
                            <Link target='_blank' to={"/code?id=" + contract_address + "&nt=" + netType}>Move Code</Link>
                            // <Link target='_blank' to={{pathname: "code", state: sourceCode }}>Move Code</Link>
                        ):("Can't find code."))
                    }</span>
                </Stack>
                <Stack className="detail" direction="column" justifyContent='space-between' alignItems="end">
                    <Stack sx={{ width: '100%' }} direction="row" justifyContent='space-between'>
                        <label>List of Holders</label>
                        <span>{
                            (netType == "eth")?
                            (<a target='_blank' href={"https://etherscan.io/token/generic-tokenholders2?m=normal&a=" + contract_address + "&s="+totalSupply+"&p=1"}>Total Holders</a>)
                            :(<a target='_blank' href={"https://bscscan.com/token/generic-tokenholders2?m=normal&a=" + contract_address + "&s="+totalSupply+"&p=1"}>Total Holders</a>)
                        }</span>
                    </Stack>
                    {
                        holders && (
                            <TableContainer className="holders-table">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No</TableCell>
                                            <TableCell>Address</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Percentage</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ maxHeight: "100px", overflowY: "auto" }}>
                                        {
                                            holders?.length ?
                                                (holders.map((item, index) => {
                                                    if (index > 10) return;
                                                    return (<TableRow key={index}>
                                                        <TableCell align="center">{index + 1}</TableCell>
                                                        <TableCell align="center">{item.address}</TableCell>
                                                        <TableCell align="center">{item.quantity}</TableCell>
                                                        <TableCell align="center">{item.percentage}</TableCell>
                                                    </TableRow>)
                                                })) :
                                                (<TableRow>
                                                    <TableCell align="center" colSpan={4}>empty</TableCell>
                                                </TableRow>)
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                    }
                </Stack>
            </>
        }>
        </NormalCard>
    )
}