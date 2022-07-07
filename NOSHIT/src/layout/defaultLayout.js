import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

export default function DefaultLayout() {
    return (
        <>
            <div className="container">
                <Outlet />
            </div>
        </>
    )
};