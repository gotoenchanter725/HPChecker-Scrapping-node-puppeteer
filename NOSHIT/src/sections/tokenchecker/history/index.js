import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Box, TablePagination, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import "./history.scss";
import { BASE_URL } from "../../../config/const";

export default function Noshitcheck() {
    const [historys, setHistorys] = useState([]);
    useEffect(() => {
        axios.post(`${BASE_URL}/api/db/get-all`, {}).then((response) => {
            console.log(response.data);
            setHistorys(response.data);
        });
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box className="history-container">
            <Typography
                className="title"
                component="h3"
                variant="subtitle1"
            >
                Statistic
                <IconButton className="back" size="small">
                    <Link to="/tokenchecker">
                        <ArrowBackIcon sx={{ fontSize: 30, color: "var(--primary)" }} />
                    </Link>
                </IconButton>
            </Typography>
            <Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Count</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Honeypot</TableCell>
                                <TableCell>Rugpull</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Net</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                historys &&
                                historys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{page * rowsPerPage + historys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length - index}</TableCell>
                                                <TableCell>{item.address}</TableCell>
                                                <TableCell>{item.honeypot ? "YES" : "NO"}</TableCell>
                                                <TableCell>{item.rugpull ? "YES" : "NO"}</TableCell>
                                                <TableCell>
                                                    {
                                                        String(item.date).substr(0, 10) + " " + String(item.date).substr(12, 8)
                                                    }
                                                </TableCell>
                                                <TableCell>{String(item.net).toUpperCase()}</TableCell>
                                            </TableRow>
                                        )
                                    })
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={historys?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </Box>
    )
}