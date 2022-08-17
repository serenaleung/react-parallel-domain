import React from "react";
import { Stack, Typography } from "@mui/material";

export default function Banner({ src, text }) {
    return (
        <Stack sx={{
            backgroundImage: `url(${src})`,
            height: "188px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
        }}>
            <Typography variant="h1" sx={{
                fontWeight: 300,
                letterSpacing: "-2.75px"
            }}>{text}</Typography>
        </Stack >
    )
}