import { Card } from "@mui/material";
import "./normalcard.scss";

export default function NormalCard(props) {
    return (
        <div className={"normal-card " + props.className}>
            <h3>{props.title}</h3>
            <Card>
                {props.component}
            </Card>
        </div>
    )
}