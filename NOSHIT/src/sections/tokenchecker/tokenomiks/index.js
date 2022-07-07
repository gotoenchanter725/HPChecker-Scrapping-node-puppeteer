import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Card, Stack } from "@mui/material";
import NormalCard from "../../components/normalCard";
import './index.scss';

export default function Tokenomiks() {
    const [islocked, setIslocked] = useState(true);
    return (
        <NormalCard className="tokenomiks-container" title="Tokenomiks" component={
            <>
                <div className="tokenomiks-main">
                    {islocked ?
                        <Link to="22">Liquidity Locked</Link>
                        : <></>
                    }
                </div>
            </>
        }>
        </NormalCard>
    )
}