import { Container, Grid } from "@mui/material";

import NOSHITChecker from "../../sections/tokenchecker/noshitcheck";
import HoneyPotAndRoughpull from "../../sections/tokenchecker/honeyandrugh";
import GraphAndChart from "../../sections/tokenchecker/graphandchart";
import Tokenomiks from "../../sections/tokenchecker/tokenomiks";
import TokenContractDetails from "../../sections/tokenchecker/tokencontractdetail";
import CheckListOfTransferEvent from "../../sections/tokenchecker/checklistoftransfer"
import CheckYourReflection from "../../sections/tokenchecker/checkyourreflection";
import History from "../../sections/tokenchecker/history";
export default function TokenChecker() {
    return (
        <Container>
            <NOSHITChecker />
            <Grid container spacing={6} mt={2} mb={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <HoneyPotAndRoughpull />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <GraphAndChart />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Tokenomiks />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TokenContractDetails />
                </Grid>
                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CheckListOfTransferEvent />
                </Grid>
                <Grid item lg={3} md={3} sm={0} xs={0}>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <CheckYourReflection />
                </Grid> */}
            </Grid>
        </Container>
    );
}