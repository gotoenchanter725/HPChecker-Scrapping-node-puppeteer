import React, { useState, useEffect, Fragment } from "react";
import { Box, Card, Stack, Modal, Link } from "@mui/material";
import NormalCard from "../../components/normalCard";
import infoUrl from "../../../assets/image/info.jpg";
import './index.scss';
import { useSelector } from "react-redux";
import axios from "axios";
import { VapingRoomsRounded } from "@mui/icons-material";
import loadingUrl from "../../../assets/image/loading.gif";
import { BASE_URL } from "../../../config/const";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: "#03441896 !important",
    backgroundImage: 'linear-gradient(161deg, black, transparent) !important',
    color: "var(--primary)",
    border: '1px solid var(--primary)',
    boxShadow: 24,
    padding: "20px",
};

export default function HoneyAndRugh() {
    var [currentTokenIshoneypot, currentTokenHoneypotState] = useSelector((state) => {
        return [state.data.currentTokenIshoneypot, state.data.currentTokenHoneypotState];
    });
    var [currentTokenIsRugpull, currentTokenRugpullState] = useSelector((state) => {
        return [state.data.currentTokenIsRugpull, state.data.currentTokenRugpullState];
    });


    const [openHoneypot, setOpenHoneypot] = React.useState(false);
    const handleOpenHoneypot = () => setOpenHoneypot(true);
    const handleCloseHoneypot = () => setOpenHoneypot(false);
    const [openRugpull, setOpenRugpull] = React.useState(false);
    const handleOpenRugpull = () => setOpenRugpull(true);
    const handleCloseRugpull = () => setOpenRugpull(false);
    return (
        <NormalCard className="honeyandrugh" title="Honeypot and Rugpull" component={
            <>
                <Stack className="hr-row" mb={4} direction="row" alignItems="center" justifyContent={"space-between"}>
                    <label>Honeypot</label>
                    <span>{(currentTokenIshoneypot == "loading" ? (<img className="loading" src={loadingUrl} />) : currentTokenIshoneypot)}</span>
                    <div className="tooltip-wrap" onClick={handleOpenHoneypot}>
                        <img src={infoUrl} />
                        <span className="tooltip-text">
                            {currentTokenHoneypotState ?
                                <Fragment>
                                    {currentTokenHoneypotState}.
                                    <br /> See more in the following
                                    <a target="_blank" href="http://google.com">&nbsp;link</a>
                                </Fragment>
                                : "Honeypot"}
                        </span>
                    </div>
                </Stack>
                <Stack className="hr-row" direction="row" alignItems="center" justifyContent={"space-between"}>
                    <label>Rugpull</label>
                    <span>{(currentTokenIsRugpull == "loading" ? (<img className="loading" src={loadingUrl} />) : currentTokenIsRugpull)}</span>
                    <div className="tooltip-wrap" onClick={handleOpenRugpull}>
                        <img src={infoUrl} />
                        <span className="tooltip-text">
                            {currentTokenRugpullState ?
                                <Fragment>
                                    {currentTokenRugpullState}.
                                    <br /> See more in the following
                                    <a target="_blank" href="http://google.com">&nbsp;link</a>
                                </Fragment>
                                : "Rugpull"}
                        </span>
                    </div>
                </Stack>
                <Modal
                    open={openHoneypot}
                    onClose={handleCloseHoneypot}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {currentTokenHoneypotState ?
                            <Fragment>
                                {currentTokenHoneypotState}.
                                <br /> See more in the following
                                <a target="_blank" href="http://google.com">&nbsp;link</a>
                            </Fragment>
                            : "Honeypot"}
                    </Box>
                </Modal>
                <Modal
                    open={openRugpull}
                    onClose={handleCloseRugpull}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {currentTokenRugpullState ?
                            <Fragment>
                                {currentTokenRugpullState}.
                                <br /> See more in the following
                                <a target="_blank" href="http://google.com">&nbsp;link</a>
                            </Fragment>
                            : "Rugpull"}
                    </Box>
                </Modal>
            </>
        }>
        </NormalCard>
    )
}