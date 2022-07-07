import { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config/const";
export default function Statistic() {
    const location = useLocation();
    // var [sourceCode] = useSelector((state) => {
    //     return [state.data.sourceCode];
    // });
    const [sourceCode, setSourceCode] = useState("");
    const [address, setAddress] = useState("");
    const [netType, setNetType] = useState("");
    useEffect(() => {
        console.log(window.location.search);
        setAddress(window.location.search.substr(4, 42))
        setNetType(window.location.search.substr(50))
        axios.post(`${BASE_URL}/api/${window.location.search.substr(50)}/get-sourcecode`, {
            contract_address: window.location.search.substr(4, 42)
        }).then((response) => {
            setSourceCode(response.data);
        });
    }, []);
    return (
        <Container>
            <pre style={{ color: "var(--primary)" }}>
                {sourceCode}
            </pre>
        </Container>
    );
}