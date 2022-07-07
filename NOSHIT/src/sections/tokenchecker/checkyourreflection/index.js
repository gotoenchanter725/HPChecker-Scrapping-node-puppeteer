import React, {useState} from "react";
import {Link} from "react-router-dom";
import { Box, Button, Card, Stack } from "@mui/material";
import NormalCard from "../../components/normalCard";
import Input from "../../components/input";
import './index.scss';

export default function CheckYourReflection() {
    const [value, setValue] = useState("");
    return (
        <NormalCard className="checkyourreflection-container" title="Check you Reflection" component={
            <>
                <Link to={2}>See Reflection Functions in this LINK</Link>
                <Stack className="contract-address" direction="row" justifyContent={"space-between"} alignItems="center">
                    <label>Contract Address</label>
                    <Input value={value} changeHandle={setValue}/>
                </Stack>
                <Stack className="contract-submit" direction="row" justifyContent={"end"}>
                    <Button className="custom-btn" variant="outlined">Submit</Button>
                </Stack>
            </>
        }>
        </NormalCard>
    )
}