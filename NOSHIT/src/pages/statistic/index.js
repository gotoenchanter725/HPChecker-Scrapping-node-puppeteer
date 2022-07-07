import { Container, Grid } from "@mui/material";

import History from "../../sections/tokenchecker/history";
export default function Statistic() {
    return (
        <Container>
            <Grid container spacing={6} mt={2} mb={2}>
                
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <History />
                </Grid>
            </Grid>
        </Container>
    );
}